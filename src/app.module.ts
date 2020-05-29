import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import configuration from './config'
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
