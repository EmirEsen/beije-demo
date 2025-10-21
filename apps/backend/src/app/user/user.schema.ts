import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ required: true })
    username!: string;

    @Prop({ required: true })
    email!: string;

    @Prop({ default: false })
    isVerified!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Create unique indexes
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
