import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoryEntity, SubCategorySchema } from './sub-category.schema';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SubCategoryEntity.name, schema: SubCategorySchema },
        ]),
    ],
    providers: [SubCategoryService],
    controllers: [SubCategoryController],
    exports: [SubCategoryService],
})
export class SubCategoryModule { }
