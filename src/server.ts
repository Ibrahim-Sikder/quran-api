import { serve } from 'bun';
import app from './app';

const PORT = process.env.PORT || 8000;

serve({
    fetch: app.fetch,
    port: PORT,
});

console.log(`🚀 Quran API is ss running on http://localhost:${PORT}`);
console.log(`📖 API Docs: http://localhost:${PORT}/api/quran/surahs`);