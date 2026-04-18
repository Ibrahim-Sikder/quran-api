export interface Ayah {
    chapter: number;
    verse: number;
    text: string;
}

export interface Translation extends Ayah {
    translation: string;
}

export interface Transliteration extends Ayah {
    transliteration: string;
}

export interface Surah {
    id: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

export interface CompleteAyah {
    chapter: number;
    verse: number;
    arabic: string;
    translation: string;
    transliteration: string;
}

export interface TDonation {
    name: string;
    email: string;
    amount: number;
    tran_id: string;
    payment_status?: 'pending' | 'completed' | 'failed';
}

export interface TAyah {
    chapter: number;
    verse: number;
    arabic: string;
    translation: string;
    transliteration: string;
}

export interface TSurah {
    id: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

export interface TSearchQuery {
    searchTerm?: string;
    page?: number;
    limit?: number;
    sort?: string;
    fields?: string;
}

// Type for JSON data
export type QuranData = {
    [key: string]: Array<{
        chapter: number;
        verse: number;
        text: string;
    }>;
};