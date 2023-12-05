// ** MUI Imports
import Drawer from '@mui/material/Drawer';
import { GanttTaskData } from '.';
import Grid from '@mui/material/Grid';
import { useMemo } from 'react';

type ColumnLeftProps = 'start' | 'end' | 'label' | 'name' | 'priority';
interface Props {
  date: string[];
  months: string[];
  days: number[];
  monthWidths: number[];
  totalWidth: number;
  height: number;
  width: number;
  dataSources: GanttTaskData[];
  columnLeft: ColumnLeftProps[];
}
const SidebarLeft = ({ width = 50, height = 50, dataSources, columnLeft }: Props) => {
  const { totalWidth, columnWidthObj } = useMemo<{ totalWidth: number; columnWidthObj: any }>(() => {
    // const totalWidth = columnLeft.length * width;
    let totalWidth = 0;

    const columnWidthObj: any = {};

    if (columnLeft.includes('name')) {
      columnWidthObj.name = 150;
      totalWidth = totalWidth + 150;
    }
    if (columnLeft.includes('label')) {
      columnWidthObj.label = 50;

      totalWidth = totalWidth + 50;
    }
    if (columnLeft.includes('start')) {
      columnWidthObj.start = 75;
      totalWidth = totalWidth + 75;
    }
    if (columnLeft.includes('end')) {
      columnWidthObj.end = 75;
      totalWidth = totalWidth + 75;
    }
    if (columnLeft.includes('priority')) {
      columnWidthObj.priority = 50;
      totalWidth = totalWidth + 50;
    }

    return { totalWidth, columnWidthObj };
  }, []);

  return (
    <Drawer
      open={true}
      variant={'permanent'}
      ModalProps={{
        disablePortal: true,
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        zIndex: 9,
        display: 'block',
        position: 'static',
        '& .MuiDrawer-paper': {
          boxShadow: 'none',
          width: totalWidth + 1,
          marginRight: 0,
          zIndex: 2,
          position: 'static',
        },
        '& .MuiBackdrop-root': {
          position: 'absolute',
        },
      }}
    >
      <Grid item xs={12} style={{ paddingTop: 0, display: 'flex', height: height * 2, background: '#BED9EE' }}>
        {columnLeft.map((column, i) => (
          <div
            style={{
              width: columnWidthObj[column],
              minWidth: columnWidthObj[column],
              height: height * 2,
              flexBasis: columnWidthObj[column],
              borderRight: '1px solid',
              borderBottom: '1px solid',
              textAlign: 'center',
              display: 'flex',
            }}
            key={`rnd-head-table-left-key-${i}`}
          >
            <p style={{ margin: 'auto' }}>{column}</p>
          </div>
        ))}
      </Grid>

      {dataSources.map((dataSource, i) => (
        <Grid item xs={12} style={{ paddingTop: 0, display: 'flex', height }} key={`rnd-body-parent-table-left-key-${i}`}>
          {columnLeft.map((column, j) => (
            <div
              style={{
                width: columnWidthObj[column],
                minWidth: columnWidthObj[column],
                height: height,
                flexBasis: columnWidthObj[column],
                borderRight: '1px solid',
                borderBottom: '1px solid',
                textAlign: 'center',
                display: 'flex',
              }}
              key={`rnd-body-chilren-table-left-key-${i}-${j}`}
            >
              <p style={{ margin: 'auto' }}>{dataSource[column] || ''}</p>
            </div>
          ))}
        </Grid>
      ))}
    </Drawer>
  );
};

export default SidebarLeft;
