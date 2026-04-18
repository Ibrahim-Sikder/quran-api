// src/app.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import sendResponse from './utils/sendResponse';
import httpStatus from 'http-status';
import { quranRoutes } from './modules/quran/quran.route';

const app = new Hono();

app.use('*', cors({
    origin: ['http://localhost:3001'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
}));

app.use('*', async (c, next) => {
    try {
        await next();
    } catch (err) {
        console.error('Global error:', err);
        return sendResponse(c, {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: 'Internal server error',
            data: null,
        });
    }
});

app.get('/', (c) => {
    return sendResponse(c, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Quran API is running',
        data: {
            version: '1.0.0',
        },
    });
});

app.route('/api/quran', quranRoutes);

app.all('*', (c) => {
    return sendResponse(c, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Route not found',
        data: null,
    });
});

export default app;