import { quranRoutes } from '@/modules/quran/quran.route';
import { Hono } from 'hono';
import { cors } from 'hono/cors';


const app = new Hono();

// CORS middleware
app.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
}));

// Root endpoint
app.get('/', (c) => {
    return c.json({
        success: true,
        message: 'Quran API is running on Vercel',
        data: {
            version: '1.0.0',
            endpoints: [
                'GET /api/quran/surahs',
                'GET /api/quran/surah/:id',
                'GET /api/quran/surah/:id/ayahs',
                'GET /api/quran/search?q=keyword',
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

// Vercel serverless function handler
export default async function handler(request: Request) {
    return app.fetch(request);
}