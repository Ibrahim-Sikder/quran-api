import { Hono } from 'hono';
import { quranControllers } from './quran.controller';

const router = new Hono();

router.get('/surahs', quranControllers.getAllSurahs);
router.get('/surah/:id', quranControllers.getSingleSurah);
router.get('/surah/:id/ayahs', quranControllers.getSurahAyahs);
router.get('/search', quranControllers.searchAyahs);
router.get('/surah/:surahId/ayah/:verseId', quranControllers.getSingleAyah);


export const quranRoutes = router;