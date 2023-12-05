/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import React, { createElement, memo, useCallback, useReducer, useRef, useState } from 'react';

// ** Dayjs Import
import dayjs from 'dayjs';

// ** Mui Import
import Grid from '@mui/material/Grid';
import RndDraggable from '../core/Draggable';
import { Rnd } from 'react-rnd';
import { GanttTaskData, GanttType, GanttTaskDataItem } from '../grantt-task';
import RndDialog from '../dialog';
import EventSidebar from '../dialog/EventSidebar';
import { EventDateType } from 'src/types/apps/calendarTypes';
export interface RndReactBodyProps {
  date: string[];
  months: string[];
  days: number[];
  monthWidths: number[];
  totalWidth: number;
  height: number;
  width: number;
  dataSources: GanttTaskData[];
  isWeekend: boolean[];
  handleAddTask: (granttData: GanttTaskDataItem, index: number) => void;
  handleUpdateTask: (rowIndex: number, taskItem: GanttTaskDataItem) => void;
}

interface ReducerType {
  [x: string]: any;
  dataSource: any;
  index: number;
  currentDate: Date;
  isEdit?: boolean;
}

interface ActionType {
  type: string;
  data: ReducerType;

  // dataSource: any;
  // index: number;
}

function reducer(state: ReducerType, action: ActionType) {
  const { type, data } = action;
  const { dataSource, index } = data;

  switch (type) {
    case 'INDEX':
      return {
        ...state,
        index,
      };

    case 'DATA_SOURCE':
      return {
        ...state,
        dataSource,
      };
    case 'ALL':
      return {
        ...data,
      };
    default:
      return state;
  }
}
const initialState: ReducerType = {
  index: 0,
  dataSource: {
    id: '',
    chilrends: [],
  },
  currentDate: new Date(),
};
const RndReactBody = (props: RndReactBodyProps) => {
  // ** Props
  const { months, days, date, monthWidths, totalWidth, height, width, dataSources, isWeekend, handleAddTask, handleUpdateTask } = props;

  // ** Ref
  const rndRefs = useRef<Rnd[]>([]);
  const rowRefs = useRef<HTMLDivElement[]>([]);

  // ** Reducer
  const [reducerState, dispatch] = useReducer(reducer, initialState);

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // ** Functional

  const handleToggle = () => setSidebarOpen(!isSidebarOpen);

  // ** Rnd
  const RndRender = (rowIndex: number, id: number, itemChilren: GanttTaskDataItem | undefined, dataSource: GanttTaskData) => {
    const { type, endDate, startDate, label } = itemChilren as GanttTaskDataItem;

    const start = dayjs(startDate, ['YYYY/M/D']);
    const end = dayjs(endDate, ['YYYY/M/D']);

    const diff = end.diff(start, 'day') + 1;

    const widthTask = diff * width;

    const handle = (xPosition: number) => {
      const startDateIndex = xPosition / width;
      const endDateIndex = startDateIndex + diff - 1;
      const startDate = date[startDateIndex];
      const endDate = date[endDateIndex];

      dispatch({
        type: 'ALL',
        data: {
          index: rowIndex,
          dataSource: dataSource,
          isEdit: true,
          currentDate: dayjs(startDate, ['YYYY/M/D']).toDate(),
          label,
          type,
          endDate: dayjs(endDate, ['YYYY/M/D']).toDate(),
        },
      });
      handleToggle();

      // handleUpdateTaskCallback && handleUpdateTaskCallback(rowIndex, itemChilren as GanttTaskDataItem);
    };

    return (
      <RndDraggable
        row={rowIndex}
        id={id}
        rndRefs={rndRefs}
        key={`rnd-body-table-item-${rowIndex}-${id}`}
        height={height}
        width={widthTask}
        type={type}
        label={label}
        onClickHandler={handle}
      />
    );
  };

  // console.log(12005, 'RndReactBody: re-render');

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

                if (!className.includes('react-draggable') && className !== '') {
                  handleToggle();
                  const current = dayjs(date[index], 'YYYY/M/D').toDate();
                  dispatch({
                    type: 'ALL',
                    data: { index: rowIndex, dataSource, currentDate: current },
                  });
                }
              }}
              onDoubleClick={() => {}}
            >
              {dataSource.chilrends.some(s => s.startDate === date[index])
                ? RndRender(
                    rowIndex,
                    index,
                    dataSource.chilrends.find(f => f.startDate === date[index]),
                    dataSource,
                  )
                : null}
            </div>
          ))}
        </Grid>
      ))}

      <EventSidebar
        isSidebarOpen={isSidebarOpen}
        drawerWidth={400}
        handleEventSidebarToggle={handleToggle}
        handleAddTask={handleAddTask}
        handleUpdateTask={handleUpdateTask}
        reducerState={reducerState}
      />
    </div>
  );
};

export default memo(RndReactBody, (pre, next) => pre.dataSources.length === next.dataSources.length);

// export default RndReactBody;
