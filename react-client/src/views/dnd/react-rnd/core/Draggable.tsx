/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import Box from '@mui/material/Box';
import { CSSProperties, useMemo, useRef, useState } from 'react';
import { DraggableData, Rnd, RndResizeStartCallback } from 'react-rnd';

const style: CSSProperties = {
  display: 'inline-block',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
  zIndex: 0,
};

interface Props {
  row: number;
  id: number;

  // index: number;
  rndRefs: React.MutableRefObject<Rnd[]>;
}
export type Direction = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
export type ResizeDirection = Direction;

export type ResizableDelta = {
  width: number;
  height: number;
};

export type Position = {
  x: number;
  y: number;
};
export type DraggableEvent = React.MouseEvent<HTMLElement | SVGElement> | React.TouchEvent<HTMLElement | SVGElement> | MouseEvent | TouchEvent;

export type DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => void | false;
const RndDraggable = ({ id, row, rndRefs }: Props) => {
  // ** State
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 200, height: 50 });
  const [right, setRight] = useState<CSSProperties['pointerEvents']>('auto');
  const [indexRow, setIndexRow] = useState<number>(row);

  const [maxWidth, setWidth] = useState<number>();

  // ** Ref
  const rndRef = useRef<Rnd>(null);

  // ** Memo

  // ** Functional
  const onResize = (e: MouseEvent | TouchEvent, dir: ResizeDirection, ref: HTMLElement, delta: ResizableDelta, position: Position) => {
    //@ts-ignore
    const rndFilters = rndRefs.current.filter(f => {
      return (
        f.resizableElement.current?.className !== ref.className &&
        f.resizableElement.current?.className.includes(`rnd-body-table-container-${indexRow}`)
      );
    });
    let xDeltal = 0;
    let trans = 0;
    if (dir === 'right') {
      if (rndFilters) {
        const collision = rndFilters.some(rnd => {
          const rect1 = rnd.getSelfElement()?.getBoundingClientRect();
          const rectIsResize = ref.getBoundingClientRect();
          const isInHoriztonalBounds = rect1 && rect1.x <= rectIsResize.x + rectIsResize.width + delta.width;
          if (xDeltal === 0 && isInHoriztonalBounds) xDeltal = rect1.x - rectIsResize.x;

          return isInHoriztonalBounds;
        });
        if (collision) {
          ref.style.maxWidth = `${Math.abs(xDeltal)}px`;
        }
      }
      setSize({ height: 50, width: ref.offsetWidth });
    }
    if (dir === 'left') {
      if (rndFilters) {
        const collision = rndFilters.some(rnd => {
          const rect1 = rnd.getSelfElement()?.getBoundingClientRect() as DOMRect;
          const rectIsResize = ref.getBoundingClientRect();
          const isInHoriztonalBounds = rectIsResize.x > rect1.x && rect1.x + rect1.width >= rectIsResize.x;
          if (xDeltal === 0 && isInHoriztonalBounds) {
            xDeltal = rectIsResize.width;
            trans = trans === 0 ? rnd.getDraggablePosition().x + rect1.width : 0;
          }

          return isInHoriztonalBounds;
        });

        if (collision) {
          ref.style.maxWidth = `${Math.abs(xDeltal)}px`;
          if (trans !== 0) ref.style.transform = `translate(${trans}px, 0px)`;
        } else {
          ref.style.maxWidth = `1000000px`;
          trans === 0;
        }
        console.log(12005, ref.getBoundingClientRect(), delta.width, { collision, trans, xDeltal });
      }

      setSize({ height: 50, width: ref.offsetWidth });
    }

    // else setSize({ height: ref.offsetHeight, width: ref.offsetWidth });
  };

  const onResizeEnd = (e: MouseEvent | TouchEvent, dir: ResizeDirection, ref: HTMLElement, delta: ResizableDelta, position: Position) => {
    ref.style.maxWidth = `1000000px`;
  };

  const onResizeStart: RndResizeStartCallback = (e, dir: ResizeDirection, ref: HTMLElement) => {
    // rndRef.current?.updateSize({ height: 50, width: 300 });
    // setWidth(250);
  };

  const onDragStop: DraggableEventHandler = (e, data) => {
    console.log(12005, 'onDrag: ', data);

    const { lastY } = data;

    setIndexRow(lastY / 50);
  };
  const handler = { onResize, onResizeEnd, onDragStop, onResizeStart };

  // ** Render
  return (
    <Box>
      <Rnd
        {...handler}
        className={`rnd-body-table-container-${indexRow} id-${id}`}
        maxWidth={maxWidth}
        minWidth={50}
        resizeHandleClasses={{
          right: 'rize-handle-right-stop',
          left: 'rize-handle-left-stop',
        }}
        key={`rnd-item-${row}`}
        ref={ref => {
          if (ref && rndRef.current === null) {
            rndRefs.current.push(ref);

            //@ts-ignore
            rndRef.current = ref;
          }
        }}
        bounds={'div[class="rnd-body-table-container"]'}
        size={{ ...size }}
        style={style}
        default={{
          x: 0,
          y: 0,
          width: 200,
          height: 50,
        }}
        enableResizing={
          right === 'none'
            ? undefined
            : {
                left: true,
                right: true,
              }
        }
        dragGrid={[50, 50]}
        resizeGrid={[50, 1]}
        resizeHandleStyles={{
          left: {
            borderRadius: 20,
            border: '1px solid rgba(81, 81, 81, 1)',
          },
          right: {
            borderRadius: 20,
            border: '1px solid rgba(81, 81, 81, 1)',
            pointerEvents: right,
            display: right,
          },
        }}
        allowAnyClick

        // disableDragging

        // position={{ ...position }}
      >
        001 {row}
      </Rnd>
    </Box>
  );
};

export default RndDraggable;
