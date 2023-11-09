/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Mui Import
import Grid from '@mui/material/Grid';

// ** Component import
import DndDrop from './DndDrop';
import DndGrid from './DndGrid';
import DndDrag, { DndDragProps } from './DndDrag';
import { useState } from 'react';

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

  // ** State
  const [dataSources, setDataSource] = useState<DndDragProps[]>([
    { id: 1, x: 1, y: 1 },
    { id: 2, x: 7, y: 2 }
  ]);

  const [position, setPosition] = useState<DndDragProps>({ id: 1, x: 2, y: 1 });

  // ** Hook

  // ** Vars
  const dataList = [{}];

  // ** Functional
  const handle = (x: number, y: number, id: any) => {
    setPosition({ ...position, x, y });

    const copyDataSources = [...dataSources];

    const indexDataSource = copyDataSources.findIndex(f => f.id === id);

    if (indexDataSource > -1) {
      copyDataSources[indexDataSource].x = x;
      copyDataSources[indexDataSource].y = y;
      console.log(12005, 'handle: ', { x, y, id, copyDataSources });

      setDataSource([...copyDataSources]);
    }
  };

  // ** Render

  // const dragRender = (props: DndDragProps) => DndDrag;

  // const RenderItem = dataSources.map(data => {
  //   const Item = dragRender(data);
  //   console.log(12005, 'data: ', data);

  //   return <Item {...data} />;
  // });

  // console.log(12005, { position, dataSources });

  return (
    <>
      {dataSources.map((dataSource, key) => (
        <Grid item xs={12} style={{ paddingTop: 0 }} key={key}>
          <div style={{ minWidth: totalWidth, width: totalWidth }}>
            {days.map((_, index) => (
              <DndDrop x={index} y={key + 1} id={dataSource.id} width={width} height={height} handle={handle}>
                {`x:${index}-y:${key + 1}`}
                <>{console.log(12005, dataSource.x === index && dataSource.y === key + 1, dataSource.x, index, dataSource.y, key + 1)}</>
                {position.x === index && position.y === key + 1 ? <DndDrag id={position.id} x={position.x} y={position.y} /> : null}
              </DndDrop>
            ))}
          </div>
        </Grid>
      ))}
      {/* <>{RenderItem}</> */}
      {/* {`x:${index}-y:${key + 1}`} */}

      {/* {dataSource.map(data => dragRender(data))} */}
    </>
  );
};

export default DndBody;
