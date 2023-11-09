/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import { ReactNode } from 'react';

// ** React Dnd import
import { useDrop } from 'react-dnd';
import { dndType } from './type';

function snapToGrid(x: number, y: number) {
  const snappedX = Math.round(x / 50) * 50;
  const snappedY = Math.round(y / 50) * 50;

  return [snappedX, snappedY];
}
const DndDrop = ({
  x,
  y,
  children,
  width,
  height,
  handle,
  id
}: {
  x: number;
  y: number;
  children: ReactNode;
  width: number;
  height: number;
  handle?: any;
  id: any;
}) => {
  // ** Hook
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: dndType,
    drop(item: { x: number; y: number; id: any }, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      handle && handle(x, y, item.id);

      // if (delta) {
      //   let x = Math.round(item.x + delta.x);
      //   let y = Math.round(item.y + delta.y);
      //   if (false) [x, y] = snapToGrid(x, y);

      //   // console.log(12005, 'Drop: ', item, monitor, x, y);
      // }
    },
    collect(monitor) {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      };
    }
  }));

  // console.log(12005, 'Is over: ', isOver);

  return (
    <div
      ref={drop}
      style={{
        width,
        height,
        position: 'relative',

        // paddingLeft: '1.5rem',
        borderRight: '1px solid',
        borderBottom: '1px solid',
        display: 'inline-block',
        backgroundColor: `${canDrop ? 'yellow' : ''}`
      }}
      data-testid={`(${x},${y})`}
    >
      {children}
    </div>
  );
};

export default DndDrop;
