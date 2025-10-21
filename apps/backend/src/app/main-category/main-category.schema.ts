import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MainCategory } from '@beije/shared';

export type MainCategoryDocument = MainCategoryEntity & Document;

@Schema({ timestamps: true })
export class MainCategoryEntity {

    @Prop({ required: true, type: String, enum: Object.values(MainCategory), unique: true })
    name!: MainCategory;

    @Prop()
    description?: string;
}

export const MainCategorySchema = SchemaFactory.createForClass(MainCategoryEntity);
