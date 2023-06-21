import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

// ** Config custom
import configuration from './configs/configuration';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
