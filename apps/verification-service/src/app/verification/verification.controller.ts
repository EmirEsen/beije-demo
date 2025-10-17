import { Controller, Get, Query } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('verify')
export class VerificationController {

    constructor(private readonly service: VerificationService) { }

    @Get()
    async verifyToken(@Query('token') token: string) {
        return this.service.verifyToken(token);
    }
}
