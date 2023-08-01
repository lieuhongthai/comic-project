import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { Log4jsLogger } from '@nestx-log4js/core';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose'],
  });

  const configuration: ConfigService = app.get(ConfigService);

  const port = configuration.get('port');

  app.setGlobalPrefix('api', { exclude: ['/admin/queues-bull-board'] });

  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(app.get(Log4jsLogger)));

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
