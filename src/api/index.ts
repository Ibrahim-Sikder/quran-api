import { quranRoutes } from '@/modules/quran/quran.route';
import { Hono } from 'hono';
import { cors } from 'hono/cors';


const app = new Hono();

// CORS middleware
app.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
}));

// Error handler
app.use('*', async (c, next) => {
    try {
        await next();
    } catch (err) {
        console.error('Global error:', err);
        return c.json({
            success: false,
            message: 'Internal server error',
            data: null
        }, 500);
    }
});

// Root endpoint
app.get('/', (c) => {
    return c.json({
        success: true,
        message: 'Quran API is running',
        data: {
            version: '1.0.0',
            endpoints: [
                'GET /api/quran/surahs',
                'GET /api/quran/surah/:id',
                'GET /api/quran/surah/:id/ayahs',
                'GET /api/quran/search?q=keyword',
                'GET /api/quran/surah/:surahId/ayah/:verseId',
            ],
        },
    });
});

// Quran routes
app.route('/api/quran', quranRoutes);

// 404 handler
app.all('*', (c) => {
    return c.json({
        success: false,
        message: 'Route not found',
        data: null
    }, 404);
});

// Vercel handler - সরাসরি app.fetch ব্যবহার করুন
export default async function handler(request: Request) {
    return app.fetch(request);
}