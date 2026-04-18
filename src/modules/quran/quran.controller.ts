import { Context } from 'hono';
import sendResponse from '../../utils/sendResponse';
import { quranServices } from './quran.service';
import httpStatus from 'http-status';

const getAllSurahs = async (c: Context) => {
    try {
        const query = {
            searchTerm: c.req.query('searchTerm'),
            page: c.req.query('page') ? parseInt(c.req.query('page')!) : undefined,
            limit: c.req.query('limit') ? parseInt(c.req.query('limit')!) : undefined,
            sort: c.req.query('sort'),
            fields: c.req.query('fields'),
        };

        const result = await quranServices.getAllSurahs(query);

        return sendResponse(c, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Surahs retrieved successfully',
            meta: result.meta,
            data: result.surahs,
        });
    } catch (err) {
        return sendResponse(c, {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: 'Failed to fetch surahs',
            data: null,
        });
    }
};

const getSingleSurah = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const result = await quranServices.getSingleSurah(id);

        if (!result) {
            return sendResponse(c, {
                statusCode: httpStatus.NOT_FOUND,
                success: false,
                message: 'Surah not found',
                data: null,
            });
        }

        return sendResponse(c, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Surah retrieved successfully',
            data: result,
        });
    } catch (err) {
        return sendResponse(c, {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: 'Failed to fetch surah',
            data: null,
        });
    }
};

const getSurahAyahs = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const result = await quranServices.getAyahsBySurahId(id);

        return sendResponse(c, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Ayahs retrieved successfully',
            data: result,
        });
    } catch (err) {
        return sendResponse(c, {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: 'Failed to fetch ayahs',
            data: null,
        });
    }
};

const searchAyahs = async (c: Context) => {
    try {
        const query = {
            searchTerm: c.req.query('q'),
            page: c.req.query('page') ? parseInt(c.req.query('page')!) : undefined,
            limit: c.req.query('limit') ? parseInt(c.req.query('limit')!) : undefined,
            sort: c.req.query('sort'),
            fields: c.req.query('fields'),
        };

        const result = await quranServices.searchInTranslation(query);

        return sendResponse(c, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Search completed successfully',
            meta: result.meta,
            data: result.ayahs,
        });
    } catch (err) {
        return sendResponse(c, {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: 'Failed to search ayahs',
            data: null,
        });
    }
};

const getSingleAyah = async (c: Context) => {
    try {
        const { surahId, verseId } = c.req.param();
        const result = await quranServices.getSingleAyah(surahId, verseId);

        if (!result) {
            return sendResponse(c, {
                statusCode: httpStatus.NOT_FOUND,
                success: false,
                message: 'Ayah not found',
                data: null,
            });
        }

        return sendResponse(c, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Ayah retrieved successfully',
            data: result,
        });
    } catch (err) {
        return sendResponse(c, {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: 'Failed to fetch ayah',
            data: null,
        });
    }
};

export const quranControllers = {
    getAllSurahs,
    getSingleSurah,
    getSurahAyahs,
    searchAyahs,
    getSingleAyah,
};