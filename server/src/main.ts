import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configuration: ConfigService = app.get(ConfigService);

  const port = configuration.get('port');

  app.setGlobalPrefix('/api');

  await app.listen(port);
}
bootstrap();
