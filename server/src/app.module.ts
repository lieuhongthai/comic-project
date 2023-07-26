import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './startUp.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';

// ** Config custom
import configuration from './configs/configuration';
import { Log4jsModule } from '@nestx-log4js/core';
import { LOG4JS_DEFAULT_CONFIG } from './logger/layout.logger';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/httpException.filter';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UserModule,
    LoggerModule,
    Log4jsModule.forRoot({ config: LOG4JS_DEFAULT_CONFIG }),
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
