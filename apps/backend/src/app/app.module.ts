import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MainCategoryModule } from './main-category/main-category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SeederService } from '../seeder/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.MONGO_URI!, {
      autoIndex: true,
    }),

    UserModule,
    MainCategoryModule,
    SubCategoryModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule { }