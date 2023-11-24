/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import { useMemo } from 'react';

// ** Dayjs Import
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isoWeek from 'dayjs/plugin/isoWeek';

// ** Mui Import
import Grid from '@mui/material/Grid';
import RndReactHeader from '../tables/Head';
import RndReactBody from '../tables/Body';

export type GranttTaskDataItem = {
  startDate: string | Date;
  endDate: string | Date;
  label?: string;
};

export type GranttTaskData = {
  [x: string]: any;
  id: string | number;
  start?: string;
  end?: string;
  label: string;

  chilrends: GranttTaskDataItem[];
};

type GranttTaskType = {
  startDate?: string | Date;
  endDate?: string | Date;
  formatDate?: string | 'YYYY/M' | 'YYYY/MM';
  heightRow?: number;
  widthCell?: number;
  dataSources: GranttTaskData[];
};
const GranttTask = ({
  startDate = dayjs().format('YYYY/M'),
  endDate = dayjs().add(1, 'month').format('YYYY/M'),
  formatDate,
  heightRow = 50,
  widthCell = 50,
  dataSources,
  ...props
}: GranttTaskType) => {
  // ** Var
  const height = heightRow;
  const width = widthCell;
  dayjs.extend(relativeTime);
  dayjs.extend(isoWeek);

  // const startDate = '2023/10';
  // const endDate = '2023/12';

  const start = dayjs(startDate, ['YYYY/M']);
  const end = dayjs(endDate, ['YYYY/M']);

  const diff = end.diff(start, 'month');
  const columns = useMemo<{ date: string[]; months: string[]; days: number[]; monthWidths: number[]; totalWidth: number }>(() => {
    const date: string[] = [];
    const months: string[] = [];
    const days: number[] = [];
    const monthWidths: number[] = [];
    const isWeekend: boolean[] = [];

    let totalWidth: number = 0;

    let month = Number(start.format('M')) - 1;
    let year = Number(start.format('YYYY'));

    for (let i = 0; i < diff; i++) {
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
    };
  }, []);

  const columnProps = { ...columns, height, width, dataSources };

  return (
    <Grid container style={{ overflowX: 'scroll', display: 'flex' }} spacing={6}>
      <RndReactHeader {...columnProps} />
      <RndReactBody {...columnProps} />
    </Grid>
  );
};

export default GranttTask;
