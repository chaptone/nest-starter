import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfigService } from './config/app/app.config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService : AppConfigService = app.get('AppConfigService');

  const options = new DocumentBuilder()
    .setTitle('Contract List App')
    .setDescription('Contract List App API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfigService.port);
  console.log('Server running at port: ' + appConfigService.port)
}
bootstrap();
