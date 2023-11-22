import Grid from '@mui/material/Grid';

import DndKitGrid from './DndKitGrid';

interface Props {
  date: string[];
  months: string[];
  days: number[];
  monthWidths: number[];
  totalWidth: number;
  height: number;
  width: number;
}

const DndKitHead = (props: Props) => {
  const { months, days, monthWidths, totalWidth, height, width } = props;

  return (
    <>
      <Grid item xs={12}>
        <div style={{ minWidth: totalWidth, width: totalWidth }}>
          {months.map((month, index) => (
            <DndKitGrid
              width={monthWidths[index]}
              height={height}
              content={month}
              style={{
                display: 'inline-block',
                textAlign: 'center',
                borderRight: '1px solid',
                borderBottom: '1px solid',
                backgroundColor: '#BED9EE',
              }}
            />
          ))}
          <div style={{ minWidth: totalWidth, width: totalWidth, backgroundColor: '#11B1C1', height: height }}>
            {days.map(day => (
              <DndKitGrid
                width={width}
                content={day}
                style={{ display: 'inline-block', textAlign: 'center', borderRight: '1px solid', borderBottom: '1px solid', margin: 'auto' }}
                height={height}
              />
            ))}
          </div>
        </div>
      </Grid>
    </>
  );
};

export default DndKitHead;
