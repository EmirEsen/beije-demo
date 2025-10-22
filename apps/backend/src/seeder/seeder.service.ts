import { Injectable, OnModuleInit } from '@nestjs/common';
import { MainCategoryService } from '../app/main-category/main-category.service';
import { SubCategoryService } from '../app/sub-category/sub-category.service';
import { ProductService } from '../app/product/product.service';
import { MainCategory, MenstrualSubCategory, SupportiveSubCategory, ISubCategory, IMainCategory } from '@beije/shared';
import { Types } from 'mongoose';

@Injectable()
export class SeederService implements OnModuleInit {
    constructor(
        private readonly mainCategoryService: MainCategoryService,
        private readonly subCategoryService: SubCategoryService,
        private readonly productService: ProductService
    ) { }

    async onModuleInit() {
        await this.seedMainCategories();
        await this.seedSubCategories();
        await this.seedProducts();
    }

    private async seedMainCategories() {
        try {
            // Check if main categories already exist
            const existingMainCategories = await this.mainCategoryService.findAll();
            if (existingMainCategories.length > 0) {
                console.log('Main categories already exist, skipping seed...');
                return;
            }

            const mainCategories = [
                {
                    name: MainCategory.MENSTRUAL,
                    description: 'Menstrual hygiene products'
                },
                {
                    name: MainCategory.SUPPORTIVE,
                    description: 'Supportive health and wellness products'
                }
            ];

            for (const mainCategory of mainCategories) {
                await this.mainCategoryService.create(mainCategory);
                console.log(`-- Created main category: ${mainCategory.name}`);
            }

            console.log('Main categories added to database successfully!');
        } catch (error) {
            console.error('Error seeding main categories:', error);
        }
    }

    private async seedSubCategories() {
        try {
            // Check if sub categories already exist (we expect 6 total)
            const existingSubCategories = await this.subCategoryService.findAll();
            if (existingSubCategories.length >= 6) {
                console.log('Sub categories already exist, skipping seed...');
                return;
            }

            if (existingSubCategories.length > 0) {
                console.log(`Found ${existingSubCategories.length} subcategories, creating missing ones...`);
            }

            // Get main categories to get their IDs
            const mainCategories = await this.mainCategoryService.findAll() as IMainCategory[];
            const menstrualId = mainCategories.find(c => c.name === MainCategory.MENSTRUAL)?.id;
            const supportiveId = mainCategories.find(c => c.name === MainCategory.SUPPORTIVE)?.id;

            if (!menstrualId || !supportiveId) {
                console.error('Main categories not found. Please seed main categories first.');
                return;
            }

            const subCategories: any[] = [
                {
                    name: MenstrualSubCategory.PAD,
                    mainCategoryId: new Types.ObjectId(menstrualId),
                    description: 'Çoğu beije kullanıcısı normal yoğunlukta bir regl dönemi için abonelik paketinde 20 Standart, 20 Süper Ped tercih ediyor.',
                },
                {
                    name: MenstrualSubCategory.PANTY_LINER,
                    mainCategoryId: new Types.ObjectId(menstrualId),
                },
                {
                    name: MenstrualSubCategory.TAMPON,
                    mainCategoryId: new Types.ObjectId(menstrualId),
                },
                {
                    name: SupportiveSubCategory.HEATING_PAD,
                    mainCategoryId: new Types.ObjectId(supportiveId),
                    description: "Isı Bandı'nı hem kas ağrıların hem de regl ağrıların için kullanabilirsin!",
                },
                {
                    name: SupportiveSubCategory.CYCLE_ESSENTIALS,
                    mainCategoryId: new Types.ObjectId(supportiveId),
                    description: "Cycle Essentials'ın bir şişesi, iki aylık döngüne yetecek miktarda, 32 kapsül içerir.",
                },
                {
                    name: SupportiveSubCategory.CRANBERRY_ESSENTIALS,
                    mainCategoryId: new Types.ObjectId(supportiveId),
                    description: "Cranberry Essentials'ın bir şişesi, tamamı vegan bileşenlerden oluşan 30 kapsül içerir.",
                },
            ];

            for (const subCategory of subCategories) {
                if (subCategory.mainCategoryId) {
                    // Check if this specific subcategory already exists
                    const existing = await this.subCategoryService.findByName(subCategory.name);
                    if (!existing) {
                        try {
                            await this.subCategoryService.create(subCategory);
                            console.log(`---- Created subcategory: ${subCategory.name}`);
                        } catch (error) {
                            console.error(`Failed to create subcategory ${subCategory.name}:`, error);
                        }
                    } else {
                        console.log(`Subcategory already exists: ${subCategory.name}`);
                    }
                }
            }

            console.log('Sub categories added to database successfully!');
        } catch (error) {
            console.error('Error adding sub categories to database:', error);
        }
    }

    private async seedProducts() {
        try {
            // Check if products already exist
            const existingProducts = await this.productService.findAll();
            if (existingProducts.length > 0) {
                console.log('Products already exist, skipping seed...');
                return;
            }

            // Get all subcategories to map products to subcategoryIds
            const subCategories = await this.subCategoryService.findAll() as ISubCategory[];

            const products = [
                // MENSTRUAL Products - PAD
                {
                    name: 'Standart Ped',
                    price: 9.5,
                    packageSize: 10,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === MenstrualSubCategory.PAD)?.id),
                },
                {
                    name: 'beije Süper Ped',
                    price: 10.6,
                    packageSize: 10,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === MenstrualSubCategory.PAD)?.id),
                },
                {
                    name: 'Süper+ Ped',
                    price: 11.5,
                    packageSize: 10,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === MenstrualSubCategory.PAD)?.id),
                },
                // MENSTRUAL Products - PANTY_LINER
                {
                    name: 'Günlük Ped',
                    price: 5.5,
                    packageSize: 10,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === MenstrualSubCategory.PANTY_LINER)?.id),
                },
                {
                    name: 'Süper Günlük Ped',
                    price: 4.1,
                    packageSize: 10,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === MenstrualSubCategory.PANTY_LINER)?.id),
                },
                {
                    name: 'Tanga Günlük Ped',
                    price: 1.25,
                    packageSize: 10,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === MenstrualSubCategory.PANTY_LINER)?.id),
                },
                // MENSTRUAL Products - TAMPON
                {
                    name: 'Mini Tampon',
                    price: 9.9,
                    packageSize: 10,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === MenstrualSubCategory.TAMPON)?.id),
                },
                {
                    name: 'Standart Tampon',
                    price: 10.5,
                    packageSize: 10,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === MenstrualSubCategory.TAMPON)?.id),
                },
                {
                    name: 'Süper Tampon',
                    price: 11.3,
                    packageSize: 10,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === MenstrualSubCategory.TAMPON)?.id),
                },
                // SUPPORTIVE Products - HEATING_PAD
                {
                    name: "2'li Paket Isı Bandı",
                    price: 99.5,
                    packageSize: 1,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === SupportiveSubCategory.HEATING_PAD)?.id),
                },
                {
                    name: "4'li Paket Isı Bandı",
                    price: 187.55,
                    packageSize: 1,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === SupportiveSubCategory.HEATING_PAD)?.id),
                },
                // SUPPORTIVE Products - CYCLE_ESSENTIALS
                {
                    name: 'beije Cycle Essentials',
                    price: 440,
                    packageSize: 1,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === SupportiveSubCategory.CYCLE_ESSENTIALS)?.id),
                },
                // SUPPORTIVE Products - CRANBERRY_ESSENTIALS
                {
                    name: 'beije Cranberry Essentials',
                    price: 345,
                    packageSize: 1,
                    subcategoryId: new Types.ObjectId(subCategories.find(c => c.name === SupportiveSubCategory.CRANBERRY_ESSENTIALS)?.id),
                },
            ];

            for (const product of products) {
                if (product.subcategoryId) {
                    try {
                        await this.productService.create(product);
                        console.log(`------ Created product: ${product.name}`);
                    } catch (error) {
                        console.error(`Failed to create product ${product.name}:`, error);
                    }
                } else {
                    console.log(`Skipping product ${product.name} - subcategory not found`);
                }
            }

            console.log('Products added to database successfully!');
        } catch (error) {
            console.error('Error adding products to database:', error);
        }
    }
}

