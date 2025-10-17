import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import type { IUserRegister } from '@beije/shared';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class UserService {

    private verificationClient: ClientProxy;

    constructor(@InjectModel(User.name) private userModel: Model<User>) {
        this.verificationClient = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                queue: 'verification_queue',
                queueOptions: { durable: false },
            },
        });
    }

    async register(userRegister: IUserRegister) {
        try {
            const user = await this.userModel.create({
                username: userRegister.username,
                email: userRegister.email,
                isVerified: false,
            });

            // Emit event to verification-service
            this.verificationClient.emit('user.created', {
                userId: user._id,
                email: user.email,
            });

            return { message: 'User registered, verification email sent.' };
        } catch (error: any) {
            if (error.code === 11000) {
                throw new BadRequestException('Username or email already exists');
            }
            throw error;
        }
    }

    async checkVerification(username: string) {
        const user = await this.userModel.findOne({ username });
        if (!user) throw new NotFoundException('User not found');
        return user.isVerified
            ? { message: 'User is verified' }
            : { message: 'User is not verified' };
    }

    async markUserVerified(userId: string) {
        await this.userModel.findByIdAndUpdate(userId, { isVerified: true });
    }

}
