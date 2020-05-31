import { Controller, Post, UseGuards, Query, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SendMailDto } from './dto/send-mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private mailService: MailService) {}

    @UseGuards(JwtAuthGuard)
    @Post('send')
    async sendEmail(@Query() sendMailDto: SendMailDto) {
        try {
            await this.mailService.send(sendMailDto);
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
              }
            throw new HttpException('Send mail error!', 404)
        }
        return { response: 'ok' }
    }
}

