// ** React import
import React, { CSSProperties, ComponentProps, useRef, useState } from 'react';

// ** Rnd Import
import { DraggableData, Rnd, RndResizeCallback, RndResizeStartCallback } from 'react-rnd';

// import { DraggableEventHandler } from "react-draggable";
type DraggableEventHandler = (e: any, data: DraggableData) => void | false;

type Childrens = {
  startDate: string;
  endDate: string;
  title: string;
  numDay: string;
};

const style: CSSProperties = {
  display: 'inline-block',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
  zIndex: 0,
} as const;

const RndContainer = ({
  isRender,
  title,
  childrens,
  startDate,
  endDate,
  rndRefs,
  index,
}: {
  isRender?: boolean;
  title?: string;
  childrens?: Childrens[];
  startDate?: string;
  endDate?: string;
  rndRefs: any;
  index: number;
}) => {
  // ** State
  const [collision, setCollision] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 200, height: 30 });

  // const [width, setW]
  // ** Ref
  const rndRef = useRef<Rnd>();
  const widthRef = useRef<number>(200);

  const onResizeStart: RndResizeStartCallback = (e, dir, ref) => {
    console.log(12005, dir, ref);
    widthRef;
  };

  const onResize: RndResizeCallback = (e, dir, refToElement, delta, position) => {
    if (rndRef && rndRef.current) {
      //   const ref: Rnd = rndRef as any;
      //   setTimeout(() => {
      //     // (rndRef.current as any).updatePosition({ x: 0, y: 0 });
      //   }, 3000);
      //   ref.updatePosition({});
    }
    console.log(12005, e, dir, refToElement, delta, position);
  };
  const onResizeStop: RndResizeCallback = (e, dir, refToElement, delta, position) => {
    const { width } = delta;

    // if(widthRef && widthRef.current)
    widthRef.current = widthRef.current + width;

    // console.log(12005, { e, dir, refToElement, delta, position }, widthRef, rndRefs);
  };

  const onDragStop: DraggableEventHandler = (e, d) => {
    return setCollision(false);
  };

  const onDrag = () => {};

  const hadnler = { onResizeStart, onResize, onResizeStop, onDragStop };

  const overlaps = (d: DraggableData) => {
    console.log(12005, 'overlaps', d);

    const elements = document.getElementsByClassName('react-draggable');
    const element = d.node;

    const draggables = Array.from(elements).filter(f => f.className !== element.className);

    const result = Array.from(draggables).some(draggable => {
      if (draggable === element) return true;
      const rect2 = element.getBoundingClientRect();
      const rect1 = draggable.getBoundingClientRect();
      const isInHoriztonalBounds = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
      const isInVerticalBounds = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;

      return isInHoriztonalBounds && isInVerticalBounds;
    });

    if (!result) {
      setPosition({ x: position.x + d.deltaX, y: position.y + d.deltaY });

      return setCollision(false);

      // rndRef.current?.updatePosition({ ...d });
    }

    return setCollision(true);
  };

  const handleOverlap = (d: DraggableData) => {
    setTimeout(() => overlaps(d), 1);
  };

  return (
    <>
      {isRender ? (
        <Rnd
          ref={r => {
            // @ts-ignore

            rndRef.current = r;
            if (r) rndRefs?.current.push(r);
          }}
          position={{ ...position }}
          size={{ ...size }}
          style={style}
          bounds={'tbody'}
          className='ggggggggggggggggggg'
          enableUserSelectHack
          default={{
            x: 0,
            y: 0,
            width: 200,
            height: 30,
          }}
          enableResizing={{
            left: true,
            right: true,
          }}
          dragGrid={[50, 30]}
          resizeGrid={[50, 1]}
          resizeHandleStyles={{
            left: {
              borderRadius: 20,
              border: '1px solid rgba(81, 81, 81, 1)',
            },
            right: {
              borderRadius: 20,
              border: '1px solid rgba(81, 81, 81, 1)',
            },
          }}
          allowAnyClick
          onDrag={(e, d) => {
            handleOverlap(d);
          }}
          {...hadnler}

          //   cancel='tbody'
          //   maxHeight={30}
          //   minHeight={30}
        >
          <div style={{ width: '100%', zIndex: 10 }}>
            {title || 'Rnd'}

            {collision ? 'Collision' : 'NO collision'}
          </div>
        </Rnd>
      ) : null}
    </>
  );
};

export default RndContainer;
