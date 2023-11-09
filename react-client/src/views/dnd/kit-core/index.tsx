// ** Dnd-kit Imports
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';

import KitDraggable from './KitDraggable';
import KitDroppable from './KitDroppable';

const DndKit = () => {
  // ** State
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const draggableMarkup = <KitDraggable>Drag me</KitDraggable>;

  // ** Functional
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <KitDroppable>{isDropped ? draggableMarkup : 'Drop here'}</KitDroppable>
    </DndContext>
  );
};

export default DndKit;
