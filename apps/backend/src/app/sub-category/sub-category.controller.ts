import { Controller, Get, Query } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { MainCategory } from '@beije/shared';

@Controller('sub-categories')
export class SubCategoryController {
    constructor(private readonly subCategoryService: SubCategoryService) { }

    @Get()
    findAll(@Query('mainCategory') mainCategory?: MainCategory) {
        if (mainCategory) return this.subCategoryService.findByMainCategory(mainCategory);
        return this.subCategoryService.findAll();
    }
}
