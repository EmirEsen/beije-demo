export interface Product {
    id: string;
    name: string;
    price: number;
    packageSize: number; // Sale quantity in package
    subcategoryId: string;
    description?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
