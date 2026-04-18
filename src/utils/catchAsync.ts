import { Context, Next } from 'hono';

export const catchAsync = (fn: (c: Context, next: Next) => Promise<any>) => {
    return async (c: Context, next: Next) => {
        try {
            await fn(c, next);
        } catch (err) {
            // Pass error to error handler
            return next();
        }
    };
};