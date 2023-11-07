/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Mui Import
import Grid from '@mui/material/Grid';

// ** Component import
import DndDrop from './DndDrop';
import DndGrid from './DndGrid';
import DndDrag from './DndDrag';

interface Props {
  date: string[];
  months: string[];
  days: number[];
  monthWidths: number[];
  totalWidth: number;
  height: number;
  width: number;
}
const DndBody = (props: Props) => {
  // ** Props
  const { months, days, monthWidths, totalWidth, height, width } = props;

  // ** Hook

  // ** Vars
  const dataList = [{}];

  // ** Render

  const dragRender = () => <DndDrag />;

  return (
    <DndDrop>
      {dataList.map(_ => (
        <Grid item xs={12}>
          <div style={{ minWidth: totalWidth, width: totalWidth }}>
            {days.map((day, index) => (
              <DndGrid
                width={width}
                content={''}
                style={{ display: 'inline-block', textAlign: 'center', borderRight: '1px solid', borderBottom: '1px solid', margin: 'auto' }}
                height={height}
                children={index === 0 && dragRender()}
              />
            ))}
          </div>
        </Grid>
      ))}
    </DndDrop>
  );
};

export default DndBody;
