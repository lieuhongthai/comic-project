// ** React Dnd import

import { useDrag } from 'react-dnd';
import { dndType } from './type';

const DndDrag = () => {
  // ** Hook
  const [{ isDragging }, drag, _dragPreview] = useDrag(() => ({
    type: dndType,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  console.log(12005, 'Drag: ', isDragging);

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        display: 'flex',
        fontWeight: 'bold',
        cursor: 'move',
        position: 'absolute'
      }}
    >
      ♘
    </div>
  );
};

export default DndDrag;
