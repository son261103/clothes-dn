import { Request, Response } from 'express';
import { AIService } from './ai.service';

const aiService = new AIService();

export class AIController {
    /**
     * Chat with AI Assistant
     */
    async chat(req: Request, res: Response) {
        try {
            const { messages, image } = req.body;

            if (!messages || !Array.isArray(messages)) {
                return res.status(400).json({
                    success: false,
                    error: 'Messages are required and must be an array'
                });
            }

            const response = await aiService.generateChatResponse(messages, image);

            return res.status(200).json({
                success: true,
                data: response
            });
        } catch (error: any) {
            console.error('AI Controller Error:', error);
            const status = error.status || 500;
            return res.status(status).json({
                success: false,
                error: error.message || 'Internal server error'
            });
        }
    }
}
