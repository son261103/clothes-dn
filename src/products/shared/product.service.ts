import { Product, IProduct } from './product.model';
import { 
  CreateProductDto, 
  UpdateProductDto, 
  ProductResponseDto,
  ProductStatsDto 
} from './product.dto';
import { 
  getPaginationParams, 
  calculatePagination, 
  getSkipValue,
  PaginatedResponse 
} from '../../utils/pagination';
import { uploadMultipleImages, deleteMultipleImages } from '../../utils/cloudinary';
import { Request } from 'express';

export class ProductService {
  /**
   * Get all products with pagination and filtering
   */
  async getAllProducts(req: Request): Promise<PaginatedResponse<ProductResponseDto>> {
    try {
      const { page, limit, sort } = getPaginationParams(req);
      const skip = getSkipValue(page, limit);

      // Build filter query
      const filter: any = {};
      
      // Text search
      if (req.query.search) {
        filter.$text = { $search: req.query.search as string };
      }

      // Category filter
      if (req.query.category) {
        filter.category = req.query.category;
      }

      // Brand filter
      if (req.query.brand) {
        filter.brand = req.query.brand;
      }

      // Price range filter
      if (req.query.minPrice || req.query.maxPrice) {
        filter.price = {};
        if (req.query.minPrice) {
          filter.price.$gte = parseFloat(req.query.minPrice as string);
        }
        if (req.query.maxPrice) {
          filter.price.$lte = parseFloat(req.query.maxPrice as string);
        }
      }

      // Size filter
      if (req.query.sizes) {
        const sizes = Array.isArray(req.query.sizes) ? req.query.sizes : [req.query.sizes];
        filter['variants.size'] = { $in: sizes };
      }

      // Color filter
      if (req.query.colors) {
        const colors = Array.isArray(req.query.colors) ? req.query.colors : [req.query.colors];
        filter['variants.color'] = { $in: colors };
      }

      // Tags filter
      if (req.query.tags) {
        const tags = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags];
        filter.tags = { $in: tags };
      }

      // Active status filter
      if (req.query.isActive !== undefined) {
        filter.isActive = req.query.isActive === 'true';
      }

      // Featured filter
      if (req.query.isFeatured !== undefined) {
        filter.isFeatured = req.query.isFeatured === 'true';
      }

      // In stock filter
      if (req.query.inStock !== undefined) {
        if (req.query.inStock === 'true') {
          filter.totalStock = { $gt: 0 };
        } else {
          filter.totalStock = { $eq: 0 };
        }
      }

      // Get total count
      const totalCount = await Product.countDocuments(filter);

      // Get products
      const products = await Product.find(filter)
        .populate('category', 'name slug')
        .populate('brand', 'name slug')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();

      // Calculate pagination
      const pagination = calculatePagination(page, limit, totalCount);

      // Format response
      const formattedProducts = products.map(product => 
        this.formatProductResponse(product as IProduct)
      );

      return {
        success: true,
        data: formattedProducts,
        pagination
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(productId: string): Promise<ProductResponseDto> {
    try {
      const product = await Product.findById(productId)
        .populate('category', 'name slug')
        .populate('brand', 'name slug');

      if (!product) {
        throw new Error('Product not found');
      }

      // Increment view count
      await Product.findByIdAndUpdate(productId, { $inc: { viewsCount: 1 } });

      return this.formatProductResponse(product);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get product by slug
   */
  async getProductBySlug(slug: string): Promise<ProductResponseDto> {
    try {
      const product = await Product.findOne({ slug, isActive: true })
        .populate('category', 'name slug')
        .populate('brand', 'name slug');

      if (!product) {
        throw new Error('Product not found');
      }

      // Increment view count
      await Product.findByIdAndUpdate(product._id, { $inc: { viewsCount: 1 } });

      return this.formatProductResponse(product);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new product
   */
  async createProduct(productData: CreateProductDto): Promise<ProductResponseDto> {
    try {
      let imagesData: any[] = [];

      // Upload images if provided
      if (productData.images && productData.images.length > 0) {
        const imageBuffers = productData.images.map(file => file.buffer);
        const uploadResults = await uploadMultipleImages(imageBuffers, {
          folder: 'clothing-shop/products'
        });
        
        imagesData = uploadResults.map((result, index) => ({
          public_id: result.public_id,
          secure_url: result.secure_url,
          alt: productData.images![index].originalname
        }));
      }

      const product = await Product.create({
        ...productData,
        images: imagesData
      });

      const populatedProduct = await Product.findById(product._id)
        .populate('category', 'name slug')
        .populate('brand', 'name slug');

      return this.formatProductResponse(populatedProduct!);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update product
   */
  async updateProduct(productId: string, updateData: UpdateProductDto): Promise<ProductResponseDto> {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      let imagesData = product.images;

      // Handle image update
      if (updateData.images && updateData.images.length > 0) {
        // Delete old images
        if (product.images.length > 0) {
          const publicIds = product.images.map(img => img.public_id);
          await deleteMultipleImages(publicIds);
        }

        // Upload new images
        const imageBuffers = updateData.images.map(file => file.buffer);
        const uploadResults = await uploadMultipleImages(imageBuffers, {
          folder: 'clothing-shop/products'
        });
        
        imagesData = uploadResults.map((result, index) => ({
          public_id: result.public_id,
          secure_url: result.secure_url,
          alt: updateData.images![index].originalname
        }));
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { 
          ...updateData,
          images: imagesData
        },
        { new: true, runValidators: true }
      ).populate('category', 'name slug')
       .populate('brand', 'name slug');

      return this.formatProductResponse(updatedProduct!);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete product
   */
  async deleteProduct(productId: string): Promise<void> {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Delete images
      if (product.images.length > 0) {
        const publicIds = product.images.map(img => img.public_id);
        await deleteMultipleImages(publicIds);
      }

      await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get product statistics
   */
  async getProductStats(): Promise<ProductStatsDto> {
    try {
      const [basicStats, categoryStats, brandStats] = await Promise.all([
        // Basic statistics
        Product.aggregate([
          {
            $group: {
              _id: null,
              totalProducts: { $sum: 1 },
              activeProducts: {
                $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
              },
              inactiveProducts: {
                $sum: { $cond: [{ $eq: ['$isActive', false] }, 1, 0] }
              },
              featuredProducts: {
                $sum: { $cond: [{ $eq: ['$isFeatured', true] }, 1, 0] }
              },
              outOfStockProducts: {
                $sum: { $cond: [{ $eq: ['$totalStock', 0] }, 1, 0] }
              },
              totalValue: { $sum: '$price' },
              averagePrice: { $avg: '$price' }
            }
          }
        ]),
        
        // Top categories
        Product.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: '$category', count: { $sum: 1 } } },
          { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
          { $unwind: '$category' },
          { $project: { _id: '$category._id', name: '$category.name', count: 1 } },
          { $sort: { count: -1 } },
          { $limit: 5 }
        ]),
        
        // Top brands
        Product.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: '$brand', count: { $sum: 1 } } },
          { $lookup: { from: 'brands', localField: '_id', foreignField: '_id', as: 'brand' } },
          { $unwind: '$brand' },
          { $project: { _id: '$brand._id', name: '$brand.name', count: 1 } },
          { $sort: { count: -1 } },
          { $limit: 5 }
        ])
      ]);

      const stats = basicStats[0] || {
        totalProducts: 0,
        activeProducts: 0,
        inactiveProducts: 0,
        featuredProducts: 0,
        outOfStockProducts: 0,
        totalValue: 0,
        averagePrice: 0
      };

      return {
        ...stats,
        topCategories: categoryStats,
        topBrands: brandStats
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Format product response
   */
  private formatProductResponse(product: IProduct): ProductResponseDto {
    return {
      _id: product._id,
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      salePrice: product.salePrice,
      currentPrice: (product as any).currentPrice || product.salePrice || product.price,
      discountPercentage: (product as any).discountPercentage || 0,
      images: product.images,
      category: product.category as any,
      brand: product.brand as any,
      variants: product.variants,
      totalStock: product.totalStock,
      isInStock: (product as any).isInStock || product.totalStock > 0,
      tags: product.tags,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      weight: product.weight,
      dimensions: product.dimensions,
      material: product.material,
      careInstructions: product.careInstructions,
      averageRating: product.averageRating,
      reviewsCount: product.reviewsCount,
      viewsCount: product.viewsCount,
      salesCount: product.salesCount,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };
  }
}
