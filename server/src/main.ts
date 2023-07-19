import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuration: ConfigService = app.get(ConfigService);

  const port = configuration.get('port');

  await app.listen(port);
}
bootstrap();
