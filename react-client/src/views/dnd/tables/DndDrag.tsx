// ** React Dnd import

import { useDrag } from 'react-dnd';
import { dndType } from './type';
import { CSSProperties } from 'react';

export interface DndDragProps {
  id: any;
  x: number;
  y: number;
  isHideSourceOnDrag?: boolean;
}

const style: CSSProperties = {
  position: 'absolute',
  border: '1px dashed gray',

  // backgroundColor: 'white',
  // padding: '0.5rem 1rem',
  cursor: 'move',
};
const DndDrag = (props: DndDragProps) => {
  // ** Props
  const { id, x, y } = props;

  // ** Hook
  const [{ isDragging }, drag, _dragPreview] = useDrag(
    () => ({
      type: dndType,
      item: { id, x, y },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, x, y],
  );

  return (
    <div
      ref={drag}
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
        fontWeight: 'bold',
        width: 150,
        height: 50,
        backgroundColor: isDragging ? '#BED9EE' : '#9EB5C6',

        // display: 'flex',
      }}
    >
      <div>♘aaaaaa</div>
    </div>
  );
};

export default DndDrag;
