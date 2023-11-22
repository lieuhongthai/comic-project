/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import Box from '@mui/material/Box';
import { CSSProperties, useMemo, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

const style: CSSProperties = {
  display: 'inline-block',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
  zIndex: 0,
};

interface Props {
  index?: number;
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
const RndDraggable = ({ index, rndRefs }: Props) => {
  // ** State
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 200, height: 50 });
  const [right, setRight] = useState<CSSProperties['pointerEvents']>('auto');

  // ** Ref
  const rndRef = useRef<Rnd>(null);

  // ** Memo

  // ** Functional
  const onResize = (e: MouseEvent | TouchEvent, dir: ResizeDirection, ref: HTMLElement, delta: ResizableDelta, position: Position) => {
    //@ts-ignore
    const rndFilters = rndRefs.current.filter(f => {
      return f.resizableElement.current?.className !== ref.className;
    });
    let width = 0;
    if (dir === 'right')
      if (rndFilters) {
        const r = rndFilters[0].getSelfElement()?.getBoundingClientRect();
        console.log(12005, ref.getBoundingClientRect().x + delta.width, r && r.x - r.width);

        const collision = rndFilters.some(rnd => {
          const rect1 = rnd.getSelfElement()?.getBoundingClientRect();
          const rect2 = ref.getBoundingClientRect();

          // if(rect1)

          const isInHoriztonalBounds = rect1 && rect1.x - rect1.width <= rect2.x + delta.width;
          width = rect1 ? rect1.x - rect1.width : 0;

          return isInHoriztonalBounds;
        });

        console.log(12005, { collision }, rndRef.current);

        if (collision) {
          //@ts-ignore
          // rndRef.current?.refResizable(c => {
          //   console.log(12005, { c });
          // });
          setSize({ height: ref.offsetHeight, width: width });

          setRight('none');

          // .props.resizeHandleStyles = {
          //   right: {
          //     borderColor: 'red',
          //   },
          // };
        }
      }

    // else setSize({ height: ref.offsetHeight, width: ref.offsetWidth });
  };

  const onResizeEnd = () => {};

  const handler = { onResize, onResizeEnd };

  // ** Render
  return (
    <Box>
      <Rnd
        key={`rnd-item-${index}`}
        ref={ref => {
          if (ref && rndRef.current === null) {
            rndRefs.current.push(ref);

            //@ts-ignore
            rndRef.current = ref;
          }
        }}
        onResize={onResize}
        bounds={'div[class="rnd-body-table-container"]'}
        className={`rnd-body-table-container-${index}`}
        size={{ ...size }}
        style={style}
        default={{
          x: 0,
          y: 0,
          width: 200,
          height: 30,
        }}
        enableResizing={
          right === 'none'
            ? false
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
        disableDragging

        // position={{ ...position }}
      >
        001 {index}
      </Rnd>
    </Box>
  );
};

export default RndDraggable;
