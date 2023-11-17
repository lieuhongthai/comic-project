import type { Modifier } from '@dnd-kit/core';
import { restrictToBoundingRect } from './utilities/restrictToBoundingRect';

export const restrictToWindowEdges: Modifier = ({ transform, draggingNodeRect, windowRect }) => {
  if (!draggingNodeRect || !windowRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, windowRect);
};
