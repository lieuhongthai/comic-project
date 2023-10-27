import Grid from '@mui/material/Grid';
import React, { useMemo } from 'react';
import DndGrid from './DndGrid';

// ** Dayjs Import
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
const DndHead = () => {
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

  const columns = useMemo<any[]>(() => {
    const arr: any[] = [];

    let month = Number(start.format('M')) - 1;
    let year = Number(start.format('YYYY'));

    for (let i = 0; i < diff; i++) {
      month = month + 1;
      if (month >= 13) {
        month = 1;
        year = year + 1;
      }

      const dayList = [];
      const dayNum = dayjs(`${year}/${month}`).daysInMonth();
      for (let day = 1; day <= dayNum; day++) {
        dayList.push(day);
      }
      arr.push({ [`${year}/${month}`]: dayList });
    }

    const returnData = arr.map((v, i) => {
      return {
        accessorKey: `${Object.keys(v)[0]}`,
        header: `${Object.keys(v)[0]}`,

        columns: (Object.values(v)[0] as any[]).map(day => ({
          header: day,
          accessorKey: `${Object.keys(v)[0]}-${day}-${i}-key`,

          size: 50,
          minSize: 50
        }))
      };
    });

    return returnData;
  }, []);

  return (
    <>
      <Grid item xs={12}></Grid>
    </>
  );
};

export default DndHead;
