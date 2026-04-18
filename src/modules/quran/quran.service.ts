import arabicData from '../../data/arabic.json';
import translationData from '../../data/translation.json';
import transliterationData from '../../data/transliteration.json';
import surahsData from '../../data/surahs.json';
import { QueryBuilder } from '../../utils/queryBuilder';

// Use any type for JSON data to avoid TypeScript errors
const arabic: any = arabicData;
const translation: any = translationData;
const transliteration: any = transliterationData;

export const quranServices = {
    getAllSurahs: async (query: any) => {
        let surahs = surahsData.surahs;

        const queryBuilder = new QueryBuilder(surahs, query)
            .search(['name', 'englishName', 'englishNameTranslation'])
            .filter()
            .sort()
            .paginate()
            .fields();

        const meta = await queryBuilder.countTotal();
        const result = queryBuilder.getResults(); // Use getter method

        return { meta, surahs: result };
    },

    getSingleSurah: async (id: string) => {
        const surah = surahsData.surahs.find((s: any) => s.id === parseInt(id));
        return surah;
    },

    getAyahsBySurahId: async (chapterId: string) => {
        const arabicAyahs = arabic[chapterId] || [];
        const translationAyahs = translation[chapterId] || [];
        const transliterationAyahs = transliteration[chapterId] || [];

        const ayahs = arabicAyahs.map((ayah: any, index: number) => ({
            chapter: ayah.chapter,
            verse: ayah.verse,
            arabic: ayah.text,
            translation: translationAyahs[index]?.text || '',
            transliteration: transliterationAyahs[index]?.text || ''
        }));

        return ayahs;
    },

    searchInTranslation: async (query: any) => {
        const searchTerm = query.searchTerm || '';
        const results: any[] = [];

        if (!searchTerm) {
            return {
                meta: { page: 1, limit: 10, total: 0, totalPage: 0 },
                ayahs: [],
            };
        }

        for (const [chapter, ayahs] of Object.entries(translation)) {
            (ayahs as any[]).forEach((ayah: any) => {
                if (ayah.text.toLowerCase().includes(searchTerm.toLowerCase())) {
                    const arabicAyah = arabic[chapter]?.find((a: any) => a.verse === ayah.verse);
                    const transliterationAyah = transliteration[chapter]?.find((a: any) => a.verse === ayah.verse);

                    results.push({
                        chapter: parseInt(chapter),
                        verse: ayah.verse,
                        arabic: arabicAyah?.text || '',
                        translation: ayah.text,
                        transliteration: transliterationAyah?.text || ''
                    });
                }
            });
        }

        const queryBuilder = new QueryBuilder(results, query)
            .sort()
            .paginate()
            .fields();

        const meta = await queryBuilder.countTotal();
        const ayahs = queryBuilder.getResults();

        return { meta, ayahs };
    },

    getSingleAyah: async (chapterId: string, verseNumber: string) => {
        const verse = parseInt(verseNumber);

        const arabicAyah = arabic[chapterId]?.find((a: any) => a.verse === verse);
        const translationAyah = translation[chapterId]?.find((a: any) => a.verse === verse);
        const transliterationAyah = transliteration[chapterId]?.find((a: any) => a.verse === verse);

        if (!arabicAyah) return null;

        return {
            chapter: arabicAyah.chapter,
            verse: arabicAyah.verse,
            arabic: arabicAyah.text,
            translation: translationAyah?.text || '',
            transliteration: transliterationAyah?.text || ''
        };
    },
};