import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { VerificationService } from './verification.service';

@Controller()
export class VerificationListener {
    constructor(private readonly verificationService: VerificationService) { }

    @EventPattern('user.created')
    async handleUserCreated(data: { userId: string; email: string }) {
        await this.verificationService.createToken(data.userId, data.email);
    }
}
