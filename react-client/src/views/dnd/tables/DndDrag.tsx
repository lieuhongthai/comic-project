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
  cursor: 'move'
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
        isDragging: monitor.isDragging()
      })
    }),
    [id, x, y]
  );

  console.log(12005, '♘aaaaaa: ', isDragging);

  return (
    <div
      ref={drag}
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
        fontWeight: 'bold',
        width: '100%'

        // display: 'flex',
      }}
    >
      <span>♘aaaaaa</span>
    </div>
  );
};

export default DndDrag;
