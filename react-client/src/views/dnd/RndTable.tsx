// ** React import
import React, { useMemo } from 'react';

// ** Mui import
import Grid from '@mui/material/Grid';

// ** Material React Table import
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

// ** Component Import
import EmptyRowTable from 'src/@core/components/table/empty-row';
import RndContainer from './RndContainer';

// ** Dayjs Import
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface RowType {
  [x: string]: {
    key: string;

    [y: string]: string;
  };
}
const RndTable = () => {
  dayjs.extend(relativeTime);
  const startDate = '2023/10';
  const endDate = '2023/12';

  const start = dayjs(startDate, ['YYYY/M']);
  const end = dayjs(endDate, ['YYYY/M']);

  const diff = end.diff(start, 'month');

  const columns = useMemo<MRT_ColumnDef<RowType>[]>(() => {
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
          minSize: 50,
          Cell() {
            return <RndContainer isRender={day === 1 && i === 0} />;
          }
        }))
      };
    });

    return returnData;
  }, []);

  return (
    <Grid item xs={12}>
      <MaterialReactTable
        columns={columns as any[]}
        data={[{}, {}, {}, {}]}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        renderEmptyRowsFallback={() => <EmptyRowTable />}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
            border: '1px solid rgba(81, 81, 81, 1)'
          }
        }}
        muiTableHeadCellProps={{
          align: 'center',
          sx: {
            backgroundColor: 'rgba(52, 210, 235, 0.1)',
            border: '1px solid rgba(81, 81, 81, 1)'
          }
        }}
        muiTableBodyCellProps={{
          sx: {
            p: '2px 16px',
            borderRight: '1px solid rgba(81, 81, 81, 1)'
          }
        }}
        muiTableBodyRowProps={{
          hover: false,
          sx: {
            height: '30px'
          }
        }}

        // muiTableBodyProps={{
        //   children: <>{bodyTable()}</>
        // }}
      />
    </Grid>
  );
};

export default RndTable;
