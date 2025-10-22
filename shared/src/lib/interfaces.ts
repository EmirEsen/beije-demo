// Frontend-friendly entity interfaces
export interface IMainCategory {
    id: string;
    name: string;
    description?: string;
}

export interface ISubCategory {
    id: string;
    name: string;
    mainCategoryId: string;
    description?: string;
}

export interface IProduct {
    id: string;
    name: string;
    price: number;
    packageSize: number;
    isActive: boolean;
    subcategoryId: string;
}
