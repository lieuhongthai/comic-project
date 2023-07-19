import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RepositoriesModule } from './repositories/repositories.module';

// ** Config custom
import configuration from './configs/configuration';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UserModule,
    RepositoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
