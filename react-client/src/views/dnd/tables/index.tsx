// ** React Import
import { useMemo } from 'react';

// ** Dayjs Import
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// ** Mui Import
import Grid from '@mui/material/Grid';

// ** Component Import
import DndHead from './DndHead';
import DndBody from './DndBody';
const DndTable = () => {
  // ** Var
  const height = 50;
  const width = 30;
  dayjs.extend(relativeTime);
  const startDate = '2023/10';
  const endDate = '2023/12';

  const start = dayjs(startDate, ['YYYY/M']);
  const end = dayjs(endDate, ['YYYY/M']);

  const diff = end.diff(start, 'month');

  // ** Memo
  const columns = useMemo<{ date: string[]; months: string[]; days: number[]; monthWidths: number[]; totalWidth: number }>(() => {
    const date: string[] = [];
    const months: string[] = [];
    const days: number[] = [];
    const monthWidths: number[] = [];

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
      totalWidth
    };
  }, []);

  const props = { ...columns, height, width };

  console.log(12005, columns);

  return (
    <Grid container style={{ overflowX: 'scroll' }} spacing={6}>
      <DndHead {...props} />
      <DndBody {...props} />
    </Grid>
  );
};

export default DndTable;
