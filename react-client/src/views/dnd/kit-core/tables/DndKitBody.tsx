/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useMemo, useState } from 'react';

// ** Mui Import
import Grid from '@mui/material/Grid';
import DndKitGrid from './DndKitGrid';

// ** Dnd-kit Imports
import { Modifier } from '@dnd-kit/core';
import DraggableStory from '../draggableStory';
import { restrictToParentElement } from '../modifiers/restrictToParentElement';
import Wrapper from '../wrapper';
import { snapCenterToCursor } from '../modifiers/snapCenterToCursor';

function createSnapModifier(gridSize: number): Modifier {
  return ({ transform }) => ({
    ...transform,
    x: Math.ceil(transform.x / gridSize) * gridSize,
    y: Math.ceil(transform.y / gridSize) * gridSize,
  });
}

interface Props {
  date: string[];
  months: string[];
  days: number[];
  monthWidths: number[];
  totalWidth: number;
  height: number;
  width: number;
}
const DndKitBody = (props: Props) => {
  // ** Props
  const { months, days, monthWidths, totalWidth, height, width } = props;

  // ** State
  const dataSources = [
    { id: 1, x: 1, y: 1 },
    { id: 2, x: 7, y: 2 },
  ];

  // ** Memo
  const snapToGrid = useMemo(() => createSnapModifier(50), []);

  const Basic = (index: any) => (
    <DraggableStory
      modifiers={[snapToGrid, restrictToParentElement]}
      index={index}
      key={index}
      activationConstraint={{
        distance: 3,
        tolerance: 50,
      }}
    />
  );

  return (
    <>
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

                //   display: 'inline-block',
                borderRight: '1px solid',
                borderBottom: '1px solid',

                //   position: 'relative',

                //   margin: 'auto',
              }}
            >
              {/* {Basic(index)} */}
              {key === 0 && index === 0 ? Basic(index) : null}
            </div>
          ))}
          {/* </div> */}
        </Grid>
      ))}
    </>
  );
};

export default DndKitBody;
