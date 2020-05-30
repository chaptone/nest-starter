import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from './jwt.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().default('secret'),
      }),
    }),
  ],
  providers: [ConfigService, JwtConfigService],
  exports: [ConfigService, JwtConfigService],
})
export class JwtConfigModule {}