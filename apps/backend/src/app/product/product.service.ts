import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().lean();
    }

    async findById(id: string): Promise<Product | null> {
        return this.productModel.findById(id).lean();
    }

    async findBySubcategory(subcategoryId: string): Promise<Product[]> {
        return this.productModel.find({
            subcategoryId: new Types.ObjectId(subcategoryId),
            isActive: true
        }).lean();
    }

    async findActive(): Promise<Product[]> {
        return this.productModel.find({ isActive: true }).lean();
    }

    async create(productData: any): Promise<Product> {
        const product = new this.productModel(productData);
        return product.save();
    }
}
