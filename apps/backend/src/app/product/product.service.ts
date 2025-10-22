import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { IProduct } from '@beije/shared';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async findAll(): Promise<IProduct[]> {
        const products = await this.productModel.find().lean();
        return products.map(product => ({
            id: product._id.toString(),
            name: product.name,
            price: product.price,
            packageSize: product.packageSize,
            isActive: product.isActive,
            subcategoryId: product.subcategoryId.toString()
        }));
    }

    async findById(id: string): Promise<IProduct | null> {
        const product = await this.productModel.findById(id).lean();
        if (!product) return null;
        return {
            id: product._id.toString(),
            name: product.name,
            price: product.price,
            packageSize: product.packageSize,
            isActive: product.isActive,
            subcategoryId: product.subcategoryId.toString()
        };
    }

    async findBySubcategory(subcategoryId: string): Promise<IProduct[]> {
        const products = await this.productModel.find({
            subcategoryId: new Types.ObjectId(subcategoryId),
            isActive: true
        }).lean();
        return products.map(product => ({
            id: product._id.toString(),
            name: product.name,
            price: product.price,
            packageSize: product.packageSize,
            isActive: product.isActive,
            subcategoryId: product.subcategoryId.toString()
        }));
    }

    async findActive(): Promise<IProduct[]> {
        const products = await this.productModel.find({ isActive: true }).lean();
        return products.map(product => ({
            id: product._id.toString(),
            name: product.name,
            price: product.price,
            packageSize: product.packageSize,
            isActive: product.isActive,
            subcategoryId: product.subcategoryId.toString()
        }));
    }

    async create(productData: any): Promise<Product> {
        const product = new this.productModel(productData);
        return product.save();
    }
}
