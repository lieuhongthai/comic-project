import { useDraggable } from '@dnd-kit/core';
import { CSSProperties } from 'react';
import { Axis } from 'src/types/dnd/dndKitCoreTypes';
import Draggable from '../draggable';

interface DraggableItemProps {
  label: string;
  handle?: boolean;
  style?: CSSProperties;
  buttonStyle?: CSSProperties;
  axis?: Axis;
  top?: number;
  left?: number;
  index?: any;
}

const DraggableItem = (props: DraggableItemProps) => {
  const { axis, label, style, top, left, handle, buttonStyle, index } = props;
  const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable${index}`,
  });

  return (
    <Draggable
      ref={setNodeRef}
      dragging={isDragging}
      handle={handle}
      label={label}
      listeners={listeners}
      style={{ ...style, top, left }}
      buttonStyle={buttonStyle}
      transform={transform}
      axis={axis}
      {...attributes}
    />
  );
};

export default DraggableItem;
