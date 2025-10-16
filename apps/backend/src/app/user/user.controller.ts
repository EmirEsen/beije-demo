import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import type { IUserRegister } from '@beije/shared';


//user authentication and authorization endpoints
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    //register a new user
    @Post('register')
    register(@Body() body: IUserRegister) {
        return this.userService.register(body);
    }

    //verify a user's email
    @Get('verify-email/:username/:token')
    verify(@Param('username') username: string, @Param('token') token: string) {
        return this.userService.verifyEmail(username, token);
    }

}
