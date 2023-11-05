import Grid from '@mui/material/Grid';
import React, { useMemo, useState } from 'react';
import DndGrid from './DndGrid';

// ** Dayjs Import
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
const DndHead = () => {
  // ** State
  // ** Var
  const height = 15;
  const width = 30;
  const arr: any[] = [{}, {}];
  const render = () => {
    return arr.map(v => <DndGrid width={v} height={0} content={''} />);
  };

  dayjs.extend(relativeTime);
  const startDate = '2023/10';
  const endDate = '2023/12';

  const start = dayjs(startDate, ['YYYY/M']);
  const end = dayjs(endDate, ['YYYY/M']);

  const diff = end.diff(start, 'month');

  // ** Memo
  const columns = useMemo<{ months: string[]; days: number[]; widths: number[]; totalWidth: number }>(() => {
    const arr: any[] = [];
    const months: string[] = [];
    const days: number[] = [];
    const widths: number[] = [];

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
      }
      arr.push({ [`${year}/${month}`]: dayList });
      months.push(`${year}/${month}`);
      days.push(...dayList);
      widths.push(dayList.length * width);
      totalWidth = totalWidth + dayList.length * width;
    }

    return {
      months,
      days,
      widths,
      totalWidth
    };
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <div style={{}}></div>
      </Grid>
    </>
  );
};

export default DndHead;
