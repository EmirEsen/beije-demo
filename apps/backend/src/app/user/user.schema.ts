import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ required: true, unique: true })
    username!: string;

    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true, unique: true })
    verificationToken!: string;

    @Prop({ default: false })
    isVerified!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Ensure unique indexes are created
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ verificationToken: 1 }, { unique: true });
