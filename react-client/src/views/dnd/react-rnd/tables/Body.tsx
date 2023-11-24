/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import React, { createElement, useRef } from 'react';

// ** Mui Import
import Grid from '@mui/material/Grid';
import RndDraggable from '../core/Draggable';
import { Rnd } from 'react-rnd';
import { GranttTaskData } from '../grantt-task';
interface Props {
  date: string[];
  months: string[];
  days: number[];
  monthWidths: number[];
  totalWidth: number;
  height: number;
  width: number;
  dataSources: GranttTaskData[];
}
const RndReactBody = (props: Props) => {
  // ** Props
  const { months, days, date, monthWidths, totalWidth, height, width, dataSources } = props;

  // ** Ref
  const rndRefs = useRef<Rnd[]>([]);
  const rowRefs = useRef<HTMLDivElement[]>([]);

  // ** State

  // ** Rnd
  const RndRender = (index: number, id: number) => (
    <RndDraggable row={index} id={id} rndRefs={rndRefs} rowRefs={rowRefs} key={`rnd-body-table-item-${index}-${id}`} />
  );

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
        >
          {days.map((_, index) => (
            <div
              style={{
                width,
                minWidth: 50,

                // height,

                flexBasis: totalWidth,

                borderRight: '1px solid',
                borderBottom: '1px solid',
              }}
              key={`rnd-body-table-row-${rowIndex}-${index}`}
            >
              {/* {createElement(RndDraggable, {row={index} id={id} rndRefs={rndRefs} rowRefs={rowRefs} key={`rnd-body-table-item-${index}-${id}`}})} */}
              {dataSource.chilrends.some(s => s.startDate === date[index]) ? RndRender(rowIndex, index) : null}
            </div>
          ))}
        </Grid>
      ))}
    </div>
  );
};

export default RndReactBody;
