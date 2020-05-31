import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppConfigModule } from './config/app/app.config.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule {}
