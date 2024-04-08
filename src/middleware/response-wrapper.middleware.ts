import {Request, Response, NextFunction} from 'express';

export const responseWrapperMiddleware = (req: Request, res: Response, next: NextFunction) => {
       if (!res.locals?.response) {
            // note: [SHR]: possible there new routes that not return locals.response
            return next();
        }

        const {status, data, message} = res.locals.response;
        res.status(status).json({status, data, status_message: message});
}
