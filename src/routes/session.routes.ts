import {RedisService} from '../services/redis.service';
import {Router} from 'express';
import {SessionController} from '../controllers/session.controller';
import {responseWrapperMiddleware} from '../middleware/response-wrapper.middleware';

export function createSessionRouters(redisService: RedisService): Router {
    const sessionController: SessionController = new SessionController(redisService);
    const router = Router();

    router.get('/info', sessionController.getSessionInfo, responseWrapperMiddleware);

    return router;
}
