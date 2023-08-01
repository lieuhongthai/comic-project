import { ExpressAdapter } from '@bull-board/express';
import { All, Controller, Next, Request, Response } from '@nestjs/common';
import express from 'express';
import { getBullBoardQueues } from './bull-board-queue.service';
import { createBullBoard } from '@bull-board/api';
import { BaseAdapter } from '@bull-board/api/dist/src/queueAdapters/base';

@Controller('admin/queues-bull-board')
export class BullBoardQueueController {
  @All('*')
  admin(
    @Request() req: express.Request,
    @Response() res: express.Response,
    @Next() next: express.NextFunction,
  ) {
    // ** Setup queues bull board
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues-bull-board');
    const queues = getBullBoardQueues();
    const router = serverAdapter.getRouter() as express.Express;
    const { addQueue } = createBullBoard({
      queues: [],
      serverAdapter,
    });
    queues.forEach((queue: BaseAdapter) => {
      addQueue(queue);
    });

    const entryPointPath = '/admin/queues-bull-board/';
    req.url = req.url.replace(entryPointPath, '/');
    router(req, res, next);
  }
}
