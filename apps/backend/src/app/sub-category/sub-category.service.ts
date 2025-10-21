import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategoryEntity, SubCategoryDocument } from './sub-category.schema';
import { MainCategory } from '@beije/shared';

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectModel(SubCategoryEntity.name)
        private subCategoryModel: Model<SubCategoryDocument>,
    ) { }

    async findAll(): Promise<SubCategoryEntity[]> {
        return this.subCategoryModel.find().lean();
    }

    async findByMainCategory(mainCategory: MainCategory): Promise<SubCategoryEntity[]> {
        return this.subCategoryModel.find({ mainCategoryId: mainCategory }).lean();
    }

    async findByName(name: string): Promise<SubCategoryEntity | null> {
        return this.subCategoryModel.findOne({ name }).lean();
    }

    async create(subCategoryData: SubCategoryEntity): Promise<SubCategoryEntity> {
        const subCategory = new this.subCategoryModel(subCategoryData);
        return subCategory.save();
    }
}
