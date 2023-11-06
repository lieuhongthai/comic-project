import Grid from '@mui/material/Grid';
import React, { useMemo, useState } from 'react';
import DndGrid from './DndGrid';

// ** Dayjs Import
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
const DndHead = () => {
  // ** State
  // ** Var
  const height = 50;
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

  const { months, days, monthWidths, totalWidth } = columns;

  console.log(12005, columns);

  return (
    <>
      <Grid item xs={12} style={{ overflowX: 'scroll' }}>
        <div style={{ minWidth: totalWidth, width: totalWidth }}>
          {months.map((month, index) => (
            <DndGrid
              width={monthWidths[index]}
              height={height}
              content={month}
              style={{
                display: 'inline-block',
                textAlign: 'center',
                borderRight: '1px solid',
                borderBottom: '1px solid',
                backgroundColor: '#BED9EE'
              }}
            />
          ))}
          {days.map(day => (
            <DndGrid
              width={width}
              height={height}
              content={day}
              style={{ display: 'inline-block', textAlign: 'center', borderRight: '1px solid', borderBottom: '1px solid' }}
            />
          ))}
        </div>
      </Grid>
    </>
  );
};

export default DndHead;
