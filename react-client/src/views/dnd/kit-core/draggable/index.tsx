/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef } from 'react';

// ** Dnd-kit-core Imports
import type { Transform } from '@dnd-kit/utilities';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';

// ** Style Dnd-kit-core Imports
import styles from './draggable.module.scss';

// ** classnames
import classNames from 'classnames';

import { Axis } from 'src/types/dnd/dndKitCoreTypes';
import Handle from '../Handle';
import { draggable, draggableHorizontal, draggableVertical } from './draggable-svg';

interface Props {
  axis?: Axis;
  dragOverlay?: boolean;
  dragging?: boolean;
  handle?: boolean;
  label?: string;
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  transform?: Transform | null;
}

// ** Draggable of the React-dnd-kit-core
const Draggable = forwardRef<HTMLButtonElement, Props>(
  ({ axis, dragOverlay, dragging, handle, label, listeners, transform, style, buttonStyle, ...props }, ref) => {
    // ** Render
    return (
      <div
        className={classNames(styles.Draggable, dragOverlay && styles.dragOverlay, dragging && styles.dragging, handle && styles.handle)}
        style={
          {
            ...style,
            '--translate-x': `${transform?.x ?? 0}px`,
            '--translate-y': `${transform?.y ?? 0}px`,
          } as React.CSSProperties
        }
      >
        <button
          {...props}
          aria-label='Draggable'
          data-cypress='draggable-item'
          {...(handle ? {} : listeners)}
          tabIndex={handle ? -1 : undefined}
          ref={ref}
          style={buttonStyle}
        >
          aaaaa
        </button>
      </div>
    );
  },
);

export default Draggable;
