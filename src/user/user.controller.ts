import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService, User } from "./user.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserInformation(): Promise<User[]> {
        return this.userService.find()
    }
}