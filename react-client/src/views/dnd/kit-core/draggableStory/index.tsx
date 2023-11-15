import { DndContext, KeyboardSensor, Modifiers, MouseSensor, PointerActivationConstraint, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/core/dist/types';
import React, { useState } from 'react';
import { Axis } from 'src/types/dnd/dndKitCoreTypes';
import Wrapper from '../wrapper';
import DraggableItem from '../draggableItem';

interface Props {
  activationConstraint?: PointerActivationConstraint;
  axis?: Axis;
  handle?: boolean;
  modifiers?: Modifiers;
  buttonStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  label?: string;
}

const defaultCoordinates = {
  x: 0,
  y: 0,
};

const DraggableStory = ({ activationConstraint, axis, handle, label = 'Go ahead, drag me.', modifiers, style, buttonStyle }: Props) => {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }}
      modifiers={modifiers}
    >
      <Wrapper>
        <DraggableItem axis={axis} label={label} handle={handle} top={y} left={x} style={style} buttonStyle={buttonStyle} />
      </Wrapper>
    </DndContext>
  );
};

export default DraggableStory;
