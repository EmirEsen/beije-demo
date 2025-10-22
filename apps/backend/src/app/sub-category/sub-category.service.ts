import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategoryEntity, SubCategoryDocument } from './sub-category.schema';
import { MainCategory, ISubCategory } from '@beije/shared';

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectModel(SubCategoryEntity.name)
        private subCategoryModel: Model<SubCategoryDocument>,
    ) { }

    async findAll(): Promise<ISubCategory[]> {
        const subCategories = await this.subCategoryModel.find().lean();
        return subCategories.map(subCategory => ({
            id: subCategory._id.toString(),
            name: subCategory.name,
            mainCategoryId: subCategory.mainCategoryId.toString(),
            description: subCategory.description
        }));
    }

    async findByMainCategory(mainCategory: MainCategory): Promise<ISubCategory[]> {
        const subCategories = await this.subCategoryModel.find({ mainCategoryId: mainCategory }).lean();
        return subCategories.map(subCategory => ({
            id: subCategory._id.toString(),
            name: subCategory.name,
            mainCategoryId: subCategory.mainCategoryId.toString(),
            description: subCategory.description
        }));
    }

    async findByName(name: string): Promise<ISubCategory | null> {
        const subCategory = await this.subCategoryModel.findOne({ name }).lean();
        if (!subCategory) return null;
        return {
            id: subCategory._id.toString(),
            name: subCategory.name,
            mainCategoryId: subCategory.mainCategoryId.toString(),
            description: subCategory.description
        };
    }

    async create(subCategoryData: SubCategoryEntity): Promise<SubCategoryEntity> {
        const subCategory = new this.subCategoryModel(subCategoryData);
        return subCategory.save();
    }
}
