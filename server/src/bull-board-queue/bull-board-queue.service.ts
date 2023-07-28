import { BaseAdapter } from '@bull-board/api/dist/src/queueAdapters/base';
import { Injectable } from '@nestjs/common';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { Queue } from 'bull';

@Injectable()
export class BullBoardQueueService {}

export const queuePool: Set<Queue> = new Set();

export const getBullBoardQueues = (): BaseAdapter[] => {
  const bullBoardQueues: any = [...queuePool].reduce(
    (acc: BaseAdapter[], val) => {
      acc.push(new BullMQAdapter(val));
      return acc;
    },
    [],
  );

  return bullBoardQueues;
};
