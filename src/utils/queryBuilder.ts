export class QueryBuilder {
    private query: any[];
    private queryParams: Record<string, unknown>;

    constructor(query: any[], queryParams: Record<string, unknown>) {
        this.query = [...query];
        this.queryParams = queryParams;
    }

    search(searchableFields: string[]) {
        const searchTerm = this.queryParams?.searchTerm as string;
        if (searchTerm) {
            this.query = this.query.filter((item: any) => {
                return searchableFields.some((field) => {
                    const value = this.getNestedValue(item, field);
                    return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
                });
            });
        }
        return this;
    }

    filter() {
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        const filterObj: Record<string, unknown> = { ...this.queryParams };
        excludeFields.forEach((field) => delete filterObj[field]);

        if (Object.keys(filterObj).length > 0) {
            this.query = this.query.filter((item: any) => {
                return Object.keys(filterObj).every((key) => {
                    const itemValue = this.getNestedValue(item, key);
                    const filterValue = filterObj[key];
                    return itemValue?.toString() === filterValue?.toString();
                });
            });
        }
        return this;
    }

    sort() {
        const sortBy = this.queryParams?.sort as string;
        if (sortBy) {
            const [field, order] = sortBy.split(',');
            this.query = [...this.query].sort((a: any, b: any) => {
                const aVal = this.getNestedValue(a, field);
                const bVal = this.getNestedValue(b, field);
                if (order === 'desc') {
                    return bVal > aVal ? 1 : -1;
                }
                return aVal > bVal ? 1 : -1;
            });
        }
        return this;
    }

    paginate() {
        const page = Number(this.queryParams?.page) || 1;
        const limit = Number(this.queryParams?.limit) || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.slice(skip, skip + limit);
        return this;
    }

    fields() {
        const fields = this.queryParams?.fields as string;
        if (fields) {
            const fieldsArray = fields.split(',');
            this.query = this.query.map((item: any) => {
                const newItem: any = {};
                fieldsArray.forEach((field) => {
                    newItem[field] = this.getNestedValue(item, field);
                });
                return newItem;
            });
        }
        return this;
    }

    async countTotal() {
        const total = this.query.length;
        const page = Number(this.queryParams?.page) || 1;
        const limit = Number(this.queryParams?.limit) || 10;
        const totalPage = Math.ceil(total / limit);

        return {
            page,
            limit,
            total,
            totalPage,
        };
    }

    // Getter method to access private query
    getResults() {
        return this.query;
    }

    private getNestedValue(obj: any, path: string) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
}