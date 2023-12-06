/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import { useEffect, useMemo, useState } from 'react';

// ** Dayjs Import
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isoWeek from 'dayjs/plugin/isoWeek';

// ** Mui Import
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import GranttContent from './GranttContent';
import SidebarLeft from './SidebarLeft';
import { GanttTaskProvidrer } from '../context/GanttTaskContext';

// Sử dụng generic type
export type UniqueId<T extends Record<keyof T, any>> = T extends T
  ? keyof T extends infer K
    ? K extends keyof T
      ? Record<K, T[K]> extends Record<keyof T, T[keyof T]>
        ? never
        : T
      : never
    : never
  : never;
export type GanttTaskDataItem = {
  id?: number | string;
  ganttIdNumber?: number;
  startDate: string;
  endDate: string;
  type: GanttType;
  label?: string;
};

export type GanttType = 'code' | 'design' | 'all';

export type GanttTaskData = {
  [x: string]: any;
  id: string | number;
  start?: string;
  end?: string;
  label?: string;
  name?: string;
  priority?: string;
  childrens: GanttTaskDataItem[];
};

type GranttTaskType = {
  startDate?: string | Date;
  endDate?: string | Date;
  formatDate?: string | 'YYYY/M' | 'YYYY/MM';
  height?: number;
  width?: number;
  dataSources: GanttTaskData[];
  handleAddTaskCallback?: (dataChange: GanttTaskDataItem, index: number) => void;
  handleUpdateTaskCallback?: (taskItem: GanttTaskDataItem, rowIndex: number) => void;
};
const GranttTask = ({
  startDate = dayjs().format('YYYY/M'),
  endDate = dayjs().add(1, 'month').format('YYYY/M'),
  formatDate = 'YYYY/M/D',
  height = 50,
  width = 50,
  dataSources: ganttTaskDataList,
  handleUpdateTaskCallback, // dataSources,
}: GranttTaskType) => {
  // ** State
  const [dataSources, setDataSource] = useState<GanttTaskData[]>([]);

  // ** Hooks
  const theme = useTheme();

  // ** Var
  dayjs.extend(relativeTime);
  dayjs.extend(isoWeek);

  const start = dayjs(startDate, ['YYYY/M']);
  const end = dayjs(endDate, ['YYYY/M']);

  const diff = end.diff(start, 'month');
  const columns = useMemo<{
    date: string[];
    months: string[];
    days: number[];
    monthWidths: number[];
    totalWidth: number;
    isWeekend: boolean[];
  }>(() => {
    const date: string[] = [];
    const months: string[] = [];
    const days: number[] = [];
    const monthWidths: number[] = [];
    const isWeekend: boolean[] = [];

    let totalWidth: number = 0;

    let month = Number(start.format('M')) - 1;
    let year = Number(start.format('YYYY'));

    for (let i = 0; i <= diff; i++) {
      month = month + 1;
      if (month >= 13) {
        month = 1;
        year = year + 1;
      }

      const dayList: number[] = [];
      const dayNum = dayjs(`${year}/${month}`).daysInMonth();
      for (let day = 1; day <= dayNum; day++) {
        dayList.push(day);
        date.push(`${year}/${month}/${day}`);
        isWeekend.push([0, 6].includes(dayjs(`${year}/${month}/${day}`).day()));
      }
      months.push(`${year}/${month}`);
      days.push(...dayList);
      monthWidths.push(dayList.length * width);
      totalWidth = totalWidth + dayList.length * width;
    }

    return {
      date,
      months,
      days,
      monthWidths,
      totalWidth,
      isWeekend,
    };
  }, []);

  useEffect(() => {
    if (ganttTaskDataList.length > 0) {
      setDataSource([
        ...ganttTaskDataList.map((gantt, index) => ({
          ...gantt,
          childrens: gantt.childrens.map((children, j) => ({
            ...children,
            ganttIdNumber: Number(`${index}${j}`),
          })),
        })),
      ]);
    }
  }, [ganttTaskDataList]);

  const handleUpdateTask = (dataUpdate: GanttTaskDataItem, rowIndex: number) => {
    const dataSourceCoppies = [...dataSources];
    const dataSource = dataSourceCoppies[rowIndex];

    const indexChildren = dataSource.childrens.findIndex(f => f.ganttIdNumber === dataUpdate.ganttIdNumber);

    if (indexChildren > -1) {
      dataSource.childrens[indexChildren] = { ...dataSource.childrens[indexChildren], ...dataUpdate };
    }

    handleUpdateTaskCallback && handleUpdateTaskCallback(dataUpdate, rowIndex);
  };

  const handleAddTask = (granttData: GanttTaskDataItem, index: number) => {
    const dataSourceCoppies = [...dataSources];
    const dataSource = dataSourceCoppies[index];
    dataSource.childrens.push(granttData);
  };
  const handleOnTransformTask = (ganttTaskDataItem: GanttTaskDataItem, rowIndex: number) => {
    const dataSourceCoppies = [...dataSources];
    const dataSource = dataSourceCoppies[rowIndex];

    const indexChildren = dataSource.childrens.findIndex(f => f.ganttIdNumber === ganttTaskDataItem.ganttIdNumber);

    if (indexChildren > -1) {
      dataSource.childrens[indexChildren] = { ...dataSource.childrens[indexChildren], ...ganttTaskDataItem };
    }
  };
  const columnProps = { ...columns, height, width, dataSources, formatDate };

  return (
    <GanttTaskProvidrer handleAddTask={handleAddTask} handleOnTransformTask={handleOnTransformTask} handleUpdateTask={handleUpdateTask}>
      <Box
        className='app-grantt'
        sx={{
          width: '100%',
          display: 'flex',
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'background.paper',
          boxShadow: 0,
          border: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <SidebarLeft {...columnProps} columnLeft={['name', 'label', 'priority', 'start', 'end']} />
        <GranttContent {...columnProps} />
      </Box>
    </GanttTaskProvidrer>
  );
};

export default GranttTask;
