/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Dnd-kit Imports
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  Modifiers,
  MouseSensor,
  PointerActivationConstraint,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';

import KitDraggable from './KitDraggable';
import KitDroppable from './KitDroppable';
import { Axis } from './draggable';
import Wrapper from './wrapper';
import DraggableItem from './DraggableItem';

interface Props {
  activationConstraint?: PointerActivationConstraint;
  axis?: Axis;
  handle?: boolean;
  modifiers?: Modifiers;
  buttonStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  label?: string;
}

type Coordinates = {
  x: number;
  y: number;
};

const defaultCoordinates = {
  x: 0,
  y: 0,
};

const DndKit = ({ activationConstraint, axis, handle, label = 'Go ahead, drag me.', modifiers, style, buttonStyle }: Props) => {
  // ** State
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);

  const [isDropped, setIsDropped] = useState<boolean>(false);
  const draggableMarkup = <KitDraggable>Drag me</KitDraggable>;

  // ** Sensor
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  // ** Functional
  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event;
    if (delta) {
      setCoordinates(({ x, y }) => {
        return {
          x: x + delta.x,
          y: y + delta.y,
        };
      });
    }

    // if (event.over && event.over.id === 'droppable') {
    //   setIsDropped(true);
    // }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={modifiers}>
      <Wrapper>
        <DraggableItem axis={axis} label={label} handle={handle} top={y} left={x} style={style} buttonStyle={buttonStyle} />
      </Wrapper>
    </DndContext>
  );
};

export default DndKit;
