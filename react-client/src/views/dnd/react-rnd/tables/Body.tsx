/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import React, { useRef } from 'react';

// ** Mui Import
import Grid from '@mui/material/Grid';
import RndDraggable from '../core/Draggable';
import { Rnd } from 'react-rnd';
interface Props {
  date: string[];
  months: string[];
  days: number[];
  monthWidths: number[];
  totalWidth: number;
  height: number;
  width: number;
}
const RndReactBody = (props: Props) => {
  // ** Props
  const { months, days, monthWidths, totalWidth, height, width } = props;

  // ** Ref
  const rndRefs = useRef<Rnd[]>([]);

  // ** State
  const dataSources = [
    { id: 1, x: 1, y: 1 },
    { id: 2, x: 7, y: 2 },
  ];

  // ** Rnd
  const RndRender = (index: number) => <RndDraggable index={index} rndRefs={rndRefs} />;

  // ** Render
  return (
    <div style={{ marginLeft: '1.5rem', position: 'relative' }} id='rnd-body-table-container' className='rnd-body-table-container'>
      {dataSources.map((_, key) => (
        <Grid item xs={12} style={{ paddingTop: 0, display: 'flex' }} key={key}>
          {/* <div style={{ minWidth: totalWidth, width: totalWidth, height }}> */}
          {days.map((_, index) => (
            <div
              style={{
                width,
                minWidth: 50,

                height,

                flexBasis: totalWidth,

                borderRight: '1px solid',
                borderBottom: '1px solid',
              }}
            >
              {/* {Basic(index)} */}
              {key === 0 && (index === 1 || index === 6) ? RndRender(index) : null}
            </div>
          ))}
          {/* </div> */}
        </Grid>
      ))}
    </div>
  );
};

export default RndReactBody;
