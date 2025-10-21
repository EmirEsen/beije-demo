import { Injectable, OnModuleInit } from '@nestjs/common';
import { MainCategoryService } from '../app/main-category/main-category.service';
import { SubCategoryService } from '../app/sub-category/sub-category.service';
import { ProductService } from '../app/product/product.service';
import { MainCategory, MenstrualSubCategory, SupportiveSubCategory } from '@beije/shared';

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
            }

            console.log('✅Main categories seeded successfully!');
        } catch (error) {
            console.error('❌ Error seeding main categories:', error);
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
            const mainCategories = await this.mainCategoryService.findAll() as any[];
            const menstrualId = mainCategories.find(c => c.name === MainCategory.MENSTRUAL)?._id;
            const supportiveId = mainCategories.find(c => c.name === MainCategory.SUPPORTIVE)?._id;

            const subCategories = [
                {
                    name: MenstrualSubCategory.PAD,
                    mainCategoryId: menstrualId,
                    description: 'Çoğu beije kullanıcısı normal yoğunlukta bir regl dönemi için abonelik paketinde 20 Standart, 20 Süper Ped tercih ediyor.',
                },
                {
                    name: MenstrualSubCategory.PANTY_LINER,
                    mainCategoryId: menstrualId,
                },
                {
                    name: MenstrualSubCategory.TAMPON,
                    mainCategoryId: menstrualId,
                },
                {
                    name: SupportiveSubCategory.HEATING_PAD,
                    mainCategoryId: supportiveId,
                    description: "Isı Bandı'nı hem kas ağrıların hem de regl ağrıların için kullanabilirsin!",
                },
                {
                    name: SupportiveSubCategory.CYCLE_ESSENTIALS,
                    mainCategoryId: supportiveId,
                    description: "Cycle Essentials'ın bir şişesi, iki aylık döngüne yetecek miktarda, 32 kapsül içerir.",
                },
                {
                    name: SupportiveSubCategory.CRANBERRY_ESSENTIALS,
                    mainCategoryId: supportiveId,
                    description: "Cranberry Essentials'ın bir şişesi, tamamı vegan bileşenlerden oluşan 30 kapsül içerir.",
                },
            ];

            for (const subCategory of subCategories) {
                if (subCategory.mainCategoryId) {
                    // Check if this specific subcategory already exists
                    const existing = await this.subCategoryService.findByName(subCategory.name);
                    if (!existing) {
                        await this.subCategoryService.create(subCategory);
                    } else {
                        console.log(`⏭️ Subcategory already exists: ${subCategory.name}`);
                    }
                }
            }

            console.log('✅ Sub categories seeded successfully!');
        } catch (error) {
            console.error('❌ Error seeding sub categories:', error);
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
            const subCategories = await this.subCategoryService.findAll() as any[];

            const products = [
                // MENSTRUAL Products - PAD
                {
                    name: 'Standart Ped',
                    price: 9.5,
                    packageSize: 10,
                    subcategoryId: subCategories.find(c => c.name === MenstrualSubCategory.PAD)?._id,
                },
                {
                    name: 'beije Süper Ped',
                    price: 10.6,
                    packageSize: 10,
                    subcategoryId: subCategories.find(c => c.name === MenstrualSubCategory.PAD)?._id,
                },
                {
                    name: 'Süper+ Ped',
                    price: 11.5,
                    packageSize: 10,
                    subcategoryId: subCategories.find(c => c.name === MenstrualSubCategory.PAD)?._id,
                },
                // MENSTRUAL Products - PANTY_LINER
                {
                    name: 'Günlük Ped',
                    price: 5.5,
                    packageSize: 10,
                    subcategoryId: subCategories.find(c => c.name === MenstrualSubCategory.PANTY_LINER)?._id,
                },
                {
                    name: 'Süper Günlük Ped',
                    price: 4.1,
                    packageSize: 10,
                    subcategoryId: subCategories.find(c => c.name === MenstrualSubCategory.PANTY_LINER)?._id,
                },
                {
                    name: 'Tanga Günlük Ped',
                    price: 1.25,
                    packageSize: 10,
                    subcategoryId: subCategories.find(c => c.name === MenstrualSubCategory.PANTY_LINER)?._id,
                },
                // MENSTRUAL Products - TAMPON
                {
                    name: 'Mini Tampon',
                    price: 9.9,
                    packageSize: 10,
                    subcategoryId: subCategories.find(c => c.name === MenstrualSubCategory.TAMPON)?._id,
                },
                {
                    name: 'Standart Tampon',
                    price: 10.5,
                    packageSize: 10,
                    subcategoryId: subCategories.find(c => c.name === MenstrualSubCategory.TAMPON)?._id,
                },
                {
                    name: 'Süper Tampon',
                    price: 11.3,
                    packageSize: 10,
                    subcategoryId: subCategories.find(c => c.name === MenstrualSubCategory.TAMPON)?._id,
                },
                // SUPPORTIVE Products - HEATING_PAD
                {
                    name: "2'li Paket Isı Bandı",
                    price: 99.5,
                    packageSize: 1,
                    subcategoryId: subCategories.find(c => c.name === SupportiveSubCategory.HEATING_PAD)?._id,
                },
                {
                    name: "4'li Paket Isı Bandı",
                    price: 187.55,
                    packageSize: 1,
                    subcategoryId: subCategories.find(c => c.name === SupportiveSubCategory.HEATING_PAD)?._id,
                },
                // SUPPORTIVE Products - CYCLE_ESSENTIALS
                {
                    name: 'beije Cycle Essentials',
                    price: 440,
                    packageSize: 1,
                    subcategoryId: subCategories.find(c => c.name === SupportiveSubCategory.CYCLE_ESSENTIALS)?._id,
                },
                // SUPPORTIVE Products - CRANBERRY_ESSENTIALS
                {
                    name: 'beije Cranberry Essentials',
                    price: 345,
                    packageSize: 1,
                    subcategoryId: subCategories.find(c => c.name === SupportiveSubCategory.CRANBERRY_ESSENTIALS)?._id,
                },
            ];

            for (const product of products) {
                if (product.subcategoryId) {
                    await this.productService.create(product);
                }
            }

            console.log('✅ Products seeded successfully!');
        } catch (error) {
            console.error('❌ Error seeding products:', error);
        }
    }
}

