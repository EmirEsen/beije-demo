import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainCategoryEntity, MainCategorySchema } from './main-category.schema';
import { MainCategoryService } from './main-category.service';
import { MainCategoryController } from './main-category.controller';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MainCategoryEntity.name, schema: MainCategorySchema },
        ]),
    ],
    providers: [MainCategoryService],
    controllers: [MainCategoryController],
    exports: [MainCategoryService],
})
export class MainCategoryModule { }
