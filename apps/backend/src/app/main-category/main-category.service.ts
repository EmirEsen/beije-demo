import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainCategoryEntity, MainCategoryDocument } from './main-category.schema';
import { IMainCategory } from '@beije/shared';

@Injectable()
export class MainCategoryService {
    constructor(
        @InjectModel(MainCategoryEntity.name)
        private mainCategoryModel: Model<MainCategoryDocument>,
    ) { }

    async findAll(): Promise<IMainCategory[]> {
        const categories = await this.mainCategoryModel.find().lean();
        return categories.map(category => ({
            id: category._id.toString(),
            name: category.name,
            description: category.description
        }));
    }

    async findByName(name: string): Promise<IMainCategory | null> {
        const category = await this.mainCategoryModel.findOne({ name }).lean();
        if (!category) return null;
        return {
            id: category._id.toString(),
            name: category.name,
            description: category.description
        };
    }

    async create(mainCategoryData: any): Promise<MainCategoryEntity> {
        const mainCategory = new this.mainCategoryModel(mainCategoryData);
        return mainCategory.save();
    }
}
