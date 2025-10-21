import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MenstrualSubCategory, SupportiveSubCategory } from '@beije/shared';

export type SubCategoryDocument = SubCategoryEntity & Document;

@Schema({ timestamps: true })
export class SubCategoryEntity {
    @Prop({
        required: true,
        type: String,
        enum: [...Object.values(MenstrualSubCategory), ...Object.values(SupportiveSubCategory)],
        unique: true
    })
    name!: MenstrualSubCategory | SupportiveSubCategory;

    @Prop({ type: Types.ObjectId, ref: 'MainCategoryEntity', required: true })
    mainCategoryId!: Types.ObjectId;

    @Prop()
    description?: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategoryEntity);
