import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import type { IUserRegister } from '@beije/shared';


//user registration endpoints
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    //register a new user
    @Post('register')
    register(@Body() body: IUserRegister) {
        return this.userService.register(body);
    }

    //check if the user is verified
    @Get('check-verification/:username')
    check(@Param('username') username: string) {
        return this.userService.checkVerification(username);
    }

}
