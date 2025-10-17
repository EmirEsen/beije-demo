import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationService } from './verification/verification.service';
import { VerificationController } from './verification/verification.controller';
import { VerificationToken, VerificationTokenSchema } from './verification/verificationToken.schema';
import { VerificationListener } from './verification/verification.listener';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.MONGO_URI!, {
      autoIndex: true,
    }),
    MongooseModule.forFeature([{ name: VerificationToken.name, schema: VerificationTokenSchema }]),
  ],
  controllers: [VerificationController, VerificationListener],
  providers: [VerificationService],
})
export class AppModule { }
