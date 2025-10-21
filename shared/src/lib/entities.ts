// Frontend-friendly entity interfaces
export interface MainCategoryEntity {
    _id: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SubCategoryEntity {
    _id: string;
    name: string;
    mainCategoryId: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductEntity {
    _id: string;
    name: string;
    price: number;
    packageSize: number;
    isActive: boolean;
    subcategoryId: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}
