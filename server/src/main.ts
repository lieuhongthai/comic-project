import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(12005, process.env.DB_URI);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
