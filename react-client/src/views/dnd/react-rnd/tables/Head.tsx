// ** React Import
import { CSSProperties, ReactNode } from 'react';

// ** Mui Import
import Grid from '@mui/material/Grid';

interface DndKitGridProps {
  width: number;
  content: string | number;
  height?: number | undefined;
  style?: CSSProperties;
  children?: ReactNode;
}

const DndKitGrid = (props: DndKitGridProps) => {
  const { width, height, content, style, children } = props;

  if (children) return <div style={{ width, height, ...style }}>{children}</div>;

  return (
    <div style={{ width, height, ...style }}>
      <p>{content}</p>
    </div>
  );
};

interface Props {
  date: string[];
  months: string[];
  days: number[];
  monthWidths: number[];
  totalWidth: number;
  height: number;
  width: number;
}

const RndReactHeader = (props: Props) => {
  const { months, days, monthWidths, totalWidth, height, width } = props;

  return (
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
            key={`rnd-month-head-table-${month}`}
          />
        ))}
        <div style={{ minWidth: totalWidth, width: totalWidth, backgroundColor: '#11B1C1', height: height }}>
          {days.map((day, i) => (
            <DndKitGrid
              width={width}
              content={day}
              style={{ display: 'inline-block', textAlign: 'center', borderRight: '1px solid', borderBottom: '1px solid', margin: 'auto' }}
              height={height}
              key={`rnd-day-head-table-key-${i}-${day}`}
            />
          ))}
        </div>
      </div>
    </Grid>
  );
};

export default RndReactHeader;
