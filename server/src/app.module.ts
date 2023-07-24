import { Module } from '@nestjs/common';
import { AppService } from './startUp.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

// ** Config custom
import configuration from './configs/configuration';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
