import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainCategoryEntity, MainCategoryDocument } from './main-category.schema';

@Injectable()
export class MainCategoryService {
    constructor(
        @InjectModel(MainCategoryEntity.name)
        private mainCategoryModel: Model<MainCategoryDocument>,
    ) { }

    async findAll(): Promise<MainCategoryEntity[]> {
        return this.mainCategoryModel.find().lean();
    }

    async findByName(name: string): Promise<MainCategoryEntity | null> {
        return this.mainCategoryModel.findOne({ name }).lean();
    }

    async create(mainCategoryData: any): Promise<MainCategoryEntity> {
        const mainCategory = new this.mainCategoryModel(mainCategoryData);
        return mainCategory.save();
    }
}
