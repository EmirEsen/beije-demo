import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class VerificationToken extends Document {

    @Prop({ type: Types.ObjectId, required: true })
    userId!: Types.ObjectId;

    @Prop({ required: true })
    token!: string;

    @Prop({ type: Date, default: () => new Date(Date.now() + 1000 * 60 * 60) }) // expires in 1h
    expiresAt!: Date;
}

export const VerificationTokenSchema = SchemaFactory.createForClass(VerificationToken);
