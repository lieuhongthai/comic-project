import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import Draggable, { Axis } from './draggable';

interface DraggableItemProps {
  label: string;
  handle?: boolean;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  axis?: Axis;
  top?: number;
  left?: number;
}
const DraggableItem = ({ axis, label, style, top, left, handle, buttonStyle }: DraggableItemProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
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
