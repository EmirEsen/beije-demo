import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, min: 0 })
    price!: number;

    @Prop({ required: true, min: 1 })
    packageSize!: number; // Sale quantity in package

    @Prop({ type: Types.ObjectId, ref: 'SubCategory', required: true })
    subcategoryId!: Types.ObjectId;

    @Prop()
    description?: string;

    @Prop({ default: true })
    isActive!: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
