import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

@Injectable()
export class MailService {
    public constructor(@InjectSendGrid() private readonly client: SendGridService) {}

    async send(mail: any): Promise<any> {
        return this.client.send({
            to: mail.to,
            from: mail.from,
            subject: mail.subject,
            text: mail.message,
        })
    }
}
