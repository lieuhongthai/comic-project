// ** React Imports
import { ReactNode } from 'react';

// ** Dnd-kit Imports
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const KitDraggable = ({ children }: { children: ReactNode }) => {
  // ** Hook
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });

  //   const style = transform
  //     ? {
  //         transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //       }
  //     : undefined;

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
};

export default KitDraggable;
