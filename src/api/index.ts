// Vercel serverless function এর জন্য প্রয়োজনীয় ইম্পোর্ট
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from '@hono/node-server/vercel';


import httpStatus from 'http-status';
import sendResponse from '@/utils/sendResponse';
import { quranRoutes } from '@/modules/quran/quran.route';



// একটি নতুন Hono app তৈরি করুন (এটা আপনার src/app.ts এর মতোই)
const app = new Hono();

// CORS middleware কনফিগার করুন
app.use('*', cors({
    origin: [
        'http://localhost:3001',  // লোকাল ডেভেলপমেন্ট
        'https://your-domain.vercel.app'  // প্রোডাকশন ডোমেইন (আপনার ডোমেইন দিয়ে replace করুন)
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
}));

// গ্লোবাল এরর হ্যান্ডলার - আপনার src/app.ts থেকে কপি করা
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

// রুট এন্ডপয়েন্ট - আপনার src/app.ts থেকে কপি করা
app.get('/', (c) => {
    return sendResponse(c, {
        statusCode: httpStatus.OK,
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

// quran রাউটস সংযোগ করুন - আপনার src/app.ts থেকে কপি করা
app.route('/api/quran', quranRoutes);

// 404 হ্যান্ডলার - আপনার src/app.ts থেকে কপি করা
app.all('*', (c) => {
    return sendResponse(c, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Route not found',
        data: null,
    });
});

// ⭐ ভেরসেলের জন্য সবচেয়ে গুরুত্বপূর্ণ অংশ ⭐
// Vercel serverless function এর জন্য handler export করতে হবে
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);