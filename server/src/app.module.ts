import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './startUp.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggerModule } from './loggers/logger.module';

// ** Config custom
import configuration from './configs/configuration';
import { Log4jsModule } from '@nestx-log4js/core';
import { LOG4JS_DEFAULT_CONFIG } from './loggers/layout.logger';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { BullBoardQueueModule } from './bull-board-queue/bull-board-queue.module';
import { BullBoardModule } from 'nestjs-bull-board';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    Log4jsModule.forRoot({ config: LOG4JS_DEFAULT_CONFIG }),
    // ** Start Queue Bull
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redisHost'),
          port: configService.get('redisPort'),
        },
      }),
      inject: [ConfigService],
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),

    DatabaseModule,
    UserModule,
    LoggerModule,
    BullBoardQueueModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(@InjectQueue() private readonly testQueue: Queue) {}

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/api');
    createBullBoard({
      queues: [new BullMQAdapter(this.testQueue)],
      serverAdapter,
    });

    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
