import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VerificationToken } from './verificationToken.schema';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class VerificationService {
    private userClient: ClientProxy;

    constructor(@InjectModel(VerificationToken.name) private model: Model<VerificationToken>) {
        this.userClient = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                queue: 'user_queue',
                queueOptions: { durable: true }
            },
        });
    }

    async createToken(userId: string, email: string) {
        const token = crypto.randomBytes(32).toString('hex');
        await this.model.create({ userId, token });

        const link = `${process.env.APP_URL || 'http://localhost:3334'}/api/verify?token=${token}`;
        console.log(`🔗 Verification link: ${link}`);

        //sending verification email
        if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
            });
            await transporter.sendMail({
                from: process.env.GMAIL_USER,
                to: email,
                subject: 'Verify your email',
                html: `<p>Click <a href="${link}">here</a> to verify your account.</p>`,
            });
        }
    }

    async verifyToken(token: string) {
        const record = await this.model.findOne({ token });
        if (!record) throw new BadRequestException('Invalid token');
        if (record.expiresAt < new Date()) throw new BadRequestException('Token expired');

        // ✅ Emit event to user service (no DB access)
        this.userClient.emit('user.verified', { userId: record.userId });

        await this.model.deleteOne({ token });
        return { message: '✅ Email verified successfully' };
    }
}
