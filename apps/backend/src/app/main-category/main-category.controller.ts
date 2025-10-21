import { Controller, Get } from '@nestjs/common';
import { MainCategoryService } from './main-category.service';

@Controller('main-categories')
export class MainCategoryController {
    constructor(private readonly mainCategoryService: MainCategoryService) { }

    @Get()
    findAll() {
        return this.mainCategoryService.findAll();
    }
}
