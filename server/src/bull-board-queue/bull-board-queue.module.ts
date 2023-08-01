import { Module } from '@nestjs/common';
import { BullBoardQueueService } from './bull-board-queue.service';
import { BullBoardQueueController } from './bull-board-queue.controller';
import { BullBoardModule } from 'nestjs-bull-board';
import { ExpressAdapter } from '@bull-board/express';

@Module({
  controllers: [BullBoardQueueController],
  providers: [BullBoardQueueService],
  exports: [BullBoardQueueService],
  imports: [
    BullBoardModule.forRoot({
      route: '/admin/queues-bull-board',
      adapter: ExpressAdapter,
    }),
  ],
})
export class BullBoardQueueModule {}
