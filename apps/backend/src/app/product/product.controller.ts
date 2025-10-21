import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    findAll(@Query('subcategoryId') subcategoryId?: string, @Query('active') active?: boolean) {
        if (subcategoryId) return this.productService.findBySubcategory(subcategoryId);
        if (active === true) return this.productService.findActive();
        return this.productService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.productService.findById(id);
    }
}
