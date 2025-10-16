import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';


//user authentication and authorization endpoints
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    //register a new user
    @Post('register')
    register(@Body() body: { username: string; email: string }) {
        return this.userService.register(body.username, body.email);
    }

}
