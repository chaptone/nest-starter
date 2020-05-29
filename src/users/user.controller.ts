import { Controller, Get } from "@nestjs/common";
import { UsersService, User } from "./users.service";

@Controller('users')
export class UserController {
    constructor(private userService: UsersService) {}

    @Get()
    async getUserInformation(): Promise<User[]> {
        return this.userService.find()
    }
}