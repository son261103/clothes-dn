import { Router } from 'express';
import { AIController } from './ai.controller';

const router = Router();
const aiController = new AIController();

// AI Chat route (public or protected based on requirement, making it public for now)
router.post('/chat', aiController.chat);

export default router;
