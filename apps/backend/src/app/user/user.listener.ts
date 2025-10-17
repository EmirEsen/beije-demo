import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserListener {
    constructor(private readonly userService: UserService) { }

    @EventPattern('user.verified')
    async handleUserVerified(data: { userId: string }) {
        console.log(`✅ User verified: ${data.userId}`);
        await this.userService.markUserVerified(data.userId);
    }


}
