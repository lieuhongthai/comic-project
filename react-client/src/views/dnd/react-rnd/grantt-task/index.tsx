/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import { useMemo, useState } from 'react';

// ** Dayjs Import
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isoWeek from 'dayjs/plugin/isoWeek';

// ** Mui Import
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import GranttContent from './GranttContent';
import SidebarLeft from './SidebarLeft';

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
  chilrends: GanttTaskDataItem[];
};

type GranttTaskType = {
  startDate?: string | Date;
  endDate?: string | Date;
  formatDate?: string | 'YYYY/M' | 'YYYY/MM';
  height?: number;
  width?: number;
  dataSources?: GanttTaskData[];
  handleAddTask?: (granttData: GanttTaskDataItem, index: number) => void;
  handleUpdateTaskCallback?: (rowIndex: number, taskItem: GanttTaskDataItem) => void;
};
const GranttTask = ({
  startDate = dayjs().format('YYYY/M'),
  endDate = dayjs().add(1, 'month').format('YYYY/M'),
  formatDate = 'YYYY/M/D',
  height = 50,
  width = 50,
  handleUpdateTaskCallback, // dataSources,
} // handleAddTask,
: GranttTaskType) => {
  // ** State
  const [dataSources, setDataSource] = useState<GanttTaskData[]>([
    {
      id: 1,
      start: '2023/12/1',
      end: '2023/12/1',
      name: 'Lieu HongThai',
      label: 'task 1',
      priority: 'Super Hight',
      type: '',
      chilrends: [
        {
          id: 1,
          startDate: '2023/12/1',
          endDate: '2023/12/1',
          type: 'code',
          label: 'task 111111111',
        },
        {
          id: 2,

          startDate: '2023/12/5',
          endDate: '2023/12/6',
          type: 'design',
          label: 'task 22222222',
        },
      ],
    },
    {
      id: 2,
      start: '2023/11/5',
      end: '2023/12/31',
      name: 'Nguyễn Thị Ngọc Oanh',
      priority: 'Super Hight',
      label: 'task 2',
      chilrends: [
        {
          id: 3,
          startDate: '2023/12/5',
          endDate: '2023/12/6',
          type: 'all',
          label: 'task 3333333333',
        },
      ],
    },
  ]);

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

  const handleUpdateTask = (rowIndex: number, taskItem: GanttTaskDataItem) => {
    const dataSourceCoppies = [...dataSources];
    const dataSource = dataSourceCoppies[rowIndex];

    console.log(12005, 'handleUpdateTask: ', dataSource);

    handleUpdateTaskCallback && handleUpdateTaskCallback(rowIndex, taskItem);
  };

  const handleAddTask = (granttData: GanttTaskDataItem, index: number) => {
    const dataSourceCoppies = [...dataSources];
    const dataSource = dataSourceCoppies[index];
    dataSource.chilrends.push(granttData);

    // console.log(12005, dataSourceCoppies, dataSource, dataSources);

    // setDataSource(dataSource);
  };
  const columnProps = { ...columns, height, width, dataSources, handleAddTask, formatDate, handleUpdateTask };

  return (
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
  );
};

export default GranttTask;
