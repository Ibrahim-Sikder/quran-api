export const errorHandler = async (c: any, next: any) => {
    try {
        await next();
    } catch (err) {
        return c.json(
            { success: false, message: "Internal Server Error" },
            500
        );
    }
};