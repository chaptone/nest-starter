import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './config';
import { AppConfigService } from './app.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('MyApp'),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_URL: Joi.string().default('http://localhost:8080'),
        APP_PORT: Joi.number().default(8080),
        MAIL_SENDGRID_API_KEY: Joi.string(),
      }),
      isGlobal: true
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}