// ** React Imports
import React, { ReactNode } from 'react';

// ** Dnd-kit Imports
import { useDroppable } from '@dnd-kit/core';

const KitDroppable = ({ children }: { children: ReactNode }) => {
  // ** Hook
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  // ** Vars
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default KitDroppable;
