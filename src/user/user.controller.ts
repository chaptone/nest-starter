import { Controller, Get } from "@nestjs/common";
import { UserService, User } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    public getUserInformation(): User {
        return this.userService.getUser()
    }
}