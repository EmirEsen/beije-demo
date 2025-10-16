import { Body, Controller, Post } from '@nestjs/common';
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

}
