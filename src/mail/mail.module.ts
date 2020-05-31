import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
        useFactory: async (cfg:ConfigService) => ({
          apiKey: cfg.get('app.sendGridMailApi'),
        }),
      inject: [ConfigService],
  })],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
