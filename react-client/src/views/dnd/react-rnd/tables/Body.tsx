/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import React, { createElement, memo, useRef, useState } from 'react';

// ** Dayjs Import
import dayjs from 'dayjs';

// ** Mui Import
import Grid from '@mui/material/Grid';
import RndDraggable from '../core/Draggable';
import { Rnd } from 'react-rnd';
import { GanttTaskData, GanttType, GranttTaskDataItem } from '../grantt-task';
import RndDialog from '../dialog';
export interface RndReactBodyProps {
  date: string[];
  months: string[];
  days: number[];
  monthWidths: number[];
  totalWidth: number;
  height: number;
  width: number;
  dataSources: GanttTaskData[];
  handleAddTask: (granttData: GanttTaskData, index: number) => void;
  isWeekend: boolean[];
}
const RndReactBody = (props: RndReactBodyProps) => {
  // ** Props
  const { months, days, date, monthWidths, totalWidth, height, width, dataSources, handleAddTask, isWeekend } = props;

  // ** Ref
  const rndRefs = useRef<Rnd[]>([]);
  const rowRefs = useRef<HTMLDivElement[]>([]);

  // ** State
  const [isOpen, setOpen] = useState<boolean>(false);

  // ** Functional

  const handleToggle = () => setOpen(!isOpen);

  // ** Rnd
  const RndRender = (index: number, id: number, itemChilren?: GranttTaskDataItem) => {
    const { type, endDate, startDate } = itemChilren as GranttTaskDataItem;

    const start = dayjs(startDate, ['YYYY/M']);
    const end = dayjs(endDate, ['YYYY/M']);

    const diff = end.diff(start, 'day') + 1;

    const widthTask = diff * width;

    return (
      <RndDraggable
        row={index}
        id={id}
        rndRefs={rndRefs}
        rowRefs={rowRefs}
        key={`rnd-body-table-item-${index}-${id}`}
        height={height}
        width={widthTask}
        type={type}
      />
    );
  };

  // ** Render // id='rnd-body-table-container'
  return (
    <div style={{ marginLeft: '1.5rem' }} id='rnd-body-table-container' className='rnd-body-table-container'>
      {dataSources.map((dataSource, rowIndex) => (
        <Grid
          item
          xs={12}
          style={{ paddingTop: 0, display: 'flex', height, position: 'relative' }}
          key={`rnd-body-table-row-${rowIndex}`}
          component={'div'}
          ref={(r: HTMLDivElement) => {
            rowRefs.current.push(r);
          }}
          className='rnd-body-table-container'
          id={`rnd-bounds-id-${rowIndex}`}
        >
          {days.map((_, index) => (
            <div
              style={{
                width,
                minWidth: width,

                flexBasis: totalWidth,

                borderRight: '1px solid',
                borderBottom: '1px solid',
                backgroundColor: isWeekend[index] ? '#D9D9D9' : '',
              }}
              key={`rnd-body-table-row-${rowIndex}-${index}`}
              className={`${date[index]}`}
              onClick={e => {
                const className = (e.target as any as { className: string }).className;
                if (!className.includes('react-draggable')) {
                  handleToggle();
                  console.log(12005, 'onclick', className);
                }
              }}
            >
              {dataSource.chilrends.some(s => s.startDate === date[index])
                ? RndRender(
                    rowIndex,
                    index,
                    dataSource.chilrends.find(f => f.startDate === date[index]),
                  )
                : null}
            </div>
          ))}
        </Grid>
      ))}

      <RndDialog isOpen={isOpen} handleToggle={handleToggle} />
    </div>
  );
};

export default memo(RndReactBody, (pre, next) => pre.dataSources.length === next.dataSources.length);

// export default RndReactBody;
