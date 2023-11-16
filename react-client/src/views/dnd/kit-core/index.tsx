/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Dnd-kit Imports
import { useMemo, useState } from 'react';
import DraggableStory from './draggableStory';
import { Modifier } from '@dnd-kit/core';

function createSnapModifier(gridSize: number): Modifier {
  return ({ transform }) => ({
    ...transform,
    x: Math.ceil(transform.x / gridSize) * gridSize,
    y: Math.ceil(transform.y / gridSize) * gridSize,
  });
}

const DndKit = () => {
  const dataSources = [{}, {}];
  const gridSize = 50;
  const style = {
    alignItems: 'flex-start',
  };
  const buttonStyle = {
    marginLeft: gridSize - 20 + 1,
    marginTop: gridSize - 20 + 1,
    width: gridSize * 8 - 1,
    height: gridSize * 2 - 1,
  };

  // ** Memo
  const snapToGrid = useMemo(() => createSnapModifier(50), []);
  const Basic = (index: any) => <DraggableStory modifiers={[snapToGrid]} index={index} />;

  return <>{dataSources.map((_, i) => Basic(i))}</>;
};

export default DndKit;
