import {NextFunction, Request, Response} from 'express';
import {RedisService} from '../services/redis.service';

export class SessionController {
    private redisService: RedisService;

    constructor(redis: RedisService){
        this.redisService = redis;
        this.getSessionInfo = this.getSessionInfo.bind(this);
    }

    async getSessionInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        const outsideToken: string = req.headers['x-mgaauth'] as string;

        if (!outsideToken) {
            res.locals.response = {
                status: 400,
                data: null,
                message: 'Outside token not found in headers'
            };
            return next();
        }

        try {
            const sessionData = await this.redisService.readKey(outsideToken);
            if (sessionData) {
                res.locals.response = {
                    status: 200,
                    data: JSON.parse(sessionData),
                    message: 'Session data found'
                }
            } else {
                res.locals.response = {
                    status: 404,
                    data: null,
                    message: 'Session data not found'
                }
            }
        } catch (e: any) {
            console.error(e);
            res.locals.response = {
                status: 500,
                data: e.message,
                message: 'Internal server error'
            };
        }
        next();
    }
}
