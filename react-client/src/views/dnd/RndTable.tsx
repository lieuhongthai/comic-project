// ** React import
import React, { useMemo, useRef } from 'react';

// ** Material React Table import
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

// ** Component Import
import EmptyRowTable from 'src/@core/components/table/empty-row';
import RndContainer from './RndContainer';

// ** Dayjs Import
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Rnd } from 'react-rnd';

interface RowType {
  [x: string]: {
    key: string;

    [y: string]: string;
  };
}

interface DataProps {
  name: string;
  childrens: {
    startDate: string;
    endDate: string;
    title: string;
    numDay: string;
  }[];
}

const RndTable = () => {
  // ** Ref
  const rndRefs = useRef<Rnd[]>([]);

  // ** Var
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

    console.log(12005, { arr });

    const returnData = arr.map((v, i) => {
      return {
        accessorKey: `${Object.keys(v)[0]}`,
        header: `${Object.keys(v)[0]}`,

        columns: (Object.values(v)[0] as any[]).map(day => ({
          header: day,
          accessorKey: `${Object.keys(v)[0]}-${day}-${i}-key`,

          size: 50,
          minSize: 50,
          Cell(props: any) {
            const { childrens } = props.row.original as DataProps;
            const date = `${Object.keys(v)[0]}/${day}`;

            const item = childrens.find(f => f.startDate === date);

            // if (item) {
            //   console.log(12005, item, props.row);
            // }

            return <RndContainer {...item} isRender={Boolean(item)} rndRefs={rndRefs} index={props.row.id} />;
          }
        }))
      };
    });

    return returnData;
  }, []);

  const dataList = [
    { name: '1', childrens: [{ startDate: '2023/10/1', endDate: '2023/10/2', title: '111111111111', numDay: '' }] },
    { name: '1', childrens: [{ startDate: '2023/10/2', endDate: '2023/10/2' }] },
    { name: '1', childrens: [{ startDate: '2023/10/1', endDate: '2023/10/2' }] },
    { name: '1', childrens: [{ startDate: '2023/10/1', endDate: '2023/10/2' }] }
  ];

  return (
    <MaterialReactTable
      columns={columns as any[]}
      data={dataList}
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
    />
  );
};

export default RndTable;
