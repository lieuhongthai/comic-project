import type { Modifier } from '@dnd-kit/core';
import { RectType } from 'src/types/dnd/dndKitCoreTypes';

export const restrictToParentElement: Modifier = ({ transform, draggingNodeRect: rect, windowRect }) => {
  const restrictMoveRect: RectType = { top: 0, left: 0, right: 1000, bottom: 500 };

  const value = {
    ...transform,
  };
  if (rect) {
    if (rect.top + transform.y <= restrictMoveRect.top) value.y = restrictMoveRect.top - rect.top;
    else if (rect.bottom + transform.y >= restrictMoveRect.bottom) value.y = restrictMoveRect.bottom - rect.bottom;

    if (rect.left + transform.x < restrictMoveRect.left) value.x = restrictMoveRect.left - rect.left;
    else if (rect.right + transform.x >= restrictMoveRect.right) value.x = restrictMoveRect.right - rect.right;
  }

  return {
    ...value,
  };
};
