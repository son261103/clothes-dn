import { GoogleGenAI } from '@google/genai';
import { Product } from '../products/shared/product.model';
import { Category } from '../categories/shared/category.model';
import { Brand } from '../brands/shared/brand.model';
import mongoose from 'mongoose';

export class AIService {
    private client: any;

    constructor() {
        this.client = new (GoogleGenAI as any)({
            apiKey: process.env.GOOGLE_AI_API_KEY || '',
        });
    }

    async generateChatResponse(messages: any[], image?: { data: string; mimeType: string }) {

        const model = 'gemini-2.5-flash-lite';

        const systemInstruction = `Bạn là "DN Fashion Advisor" - một trợ lý AI thông minh, nhiệt tình và am hiểu thời trang của cửa hàng ClothesDN.
    Nhiệm vụ của bạn:
    1. Tư vấn phong cách thời trang cho khách hàng.
    2. Giúp khách hàng tìm kiếm sản phẩm phù hợp trong hệ thống ClothesDN.
    3. Trả lời các câu hỏi về thông tin sản phẩm (chất liệu, kích thước, giá cả).
    4. Nhận diện quần áo qua hình ảnh khách hàng gửi và gợi ý sản phẩm tương tự có trong cửa hàng.
    
    Quy tắc giao tiếp:
    - Luôn lịch sự, thân thiện và sử dụng ngôn ngữ Tiếng Việt tự nhiên.
    - Khi giới thiệu sản phẩm, hãy tóm tắt các đặc điểm nổi bật và đưa ra link/ID nếu cần.
    - Nếu không tìm thấy sản phẩm chính xác, hãy gợi ý các sản phẩm tương tự.
    - Luôn khuyến khích khách hàng mua hàng nếu họ có vẻ ưng ý.
    
    Bạn có quyền truy cập vào các công cụ tìm kiếm sản phẩm, danh mục và thương hiệu. Hãy sử dụng chúng khi khách hàng hỏi về hàng hóa.`;

        const tools = [
            {
                functionDeclarations: [
                    {
                        name: 'search_products',
                        description: 'Tìm kiếm sản phẩm theo tên, danh mục, thương hiệu, giá cả.',
                        parameters: {
                            type: 'object',
                            properties: {
                                query: { type: 'string', description: 'Từ khóa tìm kiếm' },
                                category: { type: 'string', description: 'Tên danh mục' },
                                brand: { type: 'string', description: 'Tên thương hiệu' },
                                minPrice: { type: 'number' },
                                maxPrice: { type: 'number' }
                            }
                        }
                    },
                    {
                        name: 'get_product_details',
                        description: 'Lấy thông tin chi tiết của một sản phẩm cụ thể.',
                        parameters: {
                            type: 'object',
                            properties: {
                                productId: { type: 'string', description: 'ID của sản phẩm' }
                            },
                            required: ['productId']
                        }
                    },
                    {
                        name: 'get_categories',
                        description: 'Lấy danh sách các danh mục sản phẩm của cửa hàng.',
                        parameters: {
                            type: 'object',
                            properties: {}
                        }
                    }
                ]
            }
        ];

        // Prepare contents
        const contents = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Add image to last user message if provided
        if (image && contents.length > 0 && contents[contents.length - 1].role === 'user') {
            contents[contents.length - 1].parts.push({
                inline_data: {
                    mime_type: image.mimeType,
                    data: image.data.split(',')[1] || image.data // Handle data:image/jpeg;base64, format
                }
            } as any);
        }

        try {
            const result = await this.withRetry<any>(() => this.client.models.generateContent({
                model,
                systemInstruction,
                contents,
                tools,
                config: {
                    safetySettings: [
                        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
                    ]
                }
            } as any));

            let response = result;

            // Debug logging
            if (!response || !response.candidates || response.candidates.length === 0) {
                console.error('Gemini Error - No Candidates:', JSON.stringify(result, null, 2));
                return 'Xin lỗi, hiện tại hệ thống đang bận. Anh/chị vui lòng thử lại sau ít phút nhé 🙏';
            }
            let lastCall = response.candidates[0]?.content?.parts?.find((p: any) => p.functionCall || p.function_call);

            // Handle function calls (loop until no more calls)
            while (lastCall) {
                const functionCall = lastCall.functionCall || lastCall.function_call;
                const toolResults = await this.executeTool(functionCall.name, functionCall.args);

                // Add function response to history
                contents.push({
                    role: 'model',
                    parts: [lastCall]
                } as any);

                contents.push({
                    role: 'tool',
                    parts: [{
                        functionResponse: {
                            name: functionCall.name,
                            response: toolResults
                        }
                    }]
                } as any);

                const nextResult = await this.withRetry<any>(() => this.client.models.generateContent({
                    model,
                    systemInstruction,
                    contents,
                    tools,
                    config: {
                        safetySettings: [
                            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
                        ]
                    }
                } as any));

                const nextResponse = nextResult;
                if (!nextResponse || !nextResponse.candidates || nextResponse.candidates.length === 0) {
                    break;
                }
                lastCall = nextResponse.candidates[0].content?.parts?.find((p: any) => p.functionCall || p.function_call);
                if (!lastCall) {
                    return nextResponse.candidates?.[0]?.content?.parts?.[0]?.text || '';
                }
                // Update response for next iteration if needed
                (response as any) = nextResponse;
            }

            return response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        } catch (error: any) {
            console.error('AI Service Error:', error);
            // Attach status to error if it exists
            const customError: any = new Error(error.message || 'Không thể xử lý yêu cầu AI');
            customError.status = error.status || 500;
            throw customError;
        }
    }

    private async withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
        try {
            return await fn();
        } catch (error: any) {
            const isRetryable = error.status === 503 || error.status === 429 ||
                (error.message && (error.message.includes('503') || error.message.includes('429') || error.message.includes('overloaded')));

            if (retries > 0 && isRetryable) {
                console.warn(`AI Service transient error (status: ${error.status}). Retrying in ${delay}ms... (${retries} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.withRetry(fn, retries - 1, delay * 2);
            }
            throw error;
        }
    }


    private async executeTool(name: string, args: any) {
        console.log(`Executing tool: ${name}`, args);
        switch (name) {
            case 'search_products':
                return await this.searchProducts(args);
            case 'get_product_details':
                return await this.getProductDetails(args);
            case 'get_categories':
                return await this.getCategories();
            default:
                return { error: 'Tool not found' };
        }
    }

    private async searchProducts(args: any) {
        const { query, category, brand, minPrice, maxPrice } = args;
        const filter: any = { isActive: true };

        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }

        if (category) {
            const cat = await Category.findOne({ name: { $regex: category, $options: 'i' } });
            if (cat) filter.category = cat._id;
        }

        if (brand) {
            const b = await Brand.findOne({ name: { $regex: brand, $options: 'i' } });
            if (b) filter.brand = b._id;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = minPrice;
            if (maxPrice) filter.price.$lte = maxPrice;
        }

        const products = await Product.find(filter)
            .limit(10)
            .select('name price salePrice slug images')
            .populate('category', 'name')
            .populate('brand', 'name');

        return products;
    }

    private async getProductDetails(args: any) {
        const { productId } = args;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            // Try searching by SKU if not valid ID
            return await Product.findOne({ sku: productId, isActive: true })
                .populate('category', 'name')
                .populate('brand', 'name');
        }
        return await Product.findById(productId)
            .populate('category', 'name')
            .populate('brand', 'name');
    }

    private async getCategories() {
        return await Category.find({ isActive: true }).select('name slug');
    }
}
