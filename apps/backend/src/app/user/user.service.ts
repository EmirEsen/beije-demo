import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async register(username: string, email: string) {
        try {
            const verificationToken = crypto.randomBytes(16).toString('hex');
            const user = await this.userModel.create({ username, email, verificationToken });
            await this.sendVerificationEmail(email, username, verificationToken);
            return user;
        } catch (error: any) {
            if (error.code === 11000) { //this is the unique index error from mongoose
                throw new BadRequestException('Username or email already exists');
            }
            throw error;
        }
    }

    async sendVerificationEmail(email: string, username: string, token: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const link = `http://localhost:3333/api/user/verify-email/${username}/${token}`;
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Verify your email',
            text: `Click here to verify: ${link}`,
        });
    }

}
