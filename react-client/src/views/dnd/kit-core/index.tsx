/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import { useMemo } from 'react';

// ** Dnd-kit Imports

// ** Dayjs Import
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// ** Mui Import
import Grid from '@mui/material/Grid';
import DndKitHead from './tables/DndKitHead';
import DndKitBody from './tables/DndKitBody';

const DndKit = () => {
  // ** Var
  const height = 50;
  const width = 50;
  dayjs.extend(relativeTime);
  const startDate = '2023/10';
  const endDate = '2023/12';

  const start = dayjs(startDate, ['YYYY/M']);
  const end = dayjs(endDate, ['YYYY/M']);

  const diff = end.diff(start, 'month');

  // ** Memo

  const dataSources = [{}, {}];
  const gridSize = 50;
  const style = {
    alignItems: 'flex-start',
  };
  const buttonStyle = {
    marginLeft: gridSize - 20 + 1,
    marginTop: gridSize - 20 + 1,
    width: gridSize * 8 - 1,
    height: gridSize * 2 - 1,
  };

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
      totalWidth,
    };
  }, []);

  const props = { ...columns, height, width };

  return (
    <Grid container style={{ overflowX: 'scroll', display: 'flex' }} spacing={6}>
      <DndKitHead {...props} />

      <DndKitBody {...props} />
    </Grid>
  );
};

export default DndKit;