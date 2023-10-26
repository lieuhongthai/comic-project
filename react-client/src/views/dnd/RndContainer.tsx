// ** React import
import React, { CSSProperties, ComponentProps, useRef } from 'react';

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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
  zIndex: 0
} as const;

const RndContainer = ({
  isRender,
  title,
  childrens,
  startDate,
  endDate,
  rndRefs,
  index
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
      //   console.log(12005, rndRef.current as any, position, delta);
    }
  };
  const onResizeStop: RndResizeCallback = (e, dir, refToElement, delta, position) => {
    const { width } = delta;

    // if(widthRef && widthRef.current)
    widthRef.current = widthRef.current + width;
    console.log(12005, { e, dir, refToElement, delta, position }, widthRef, rndRefs);
  };

  const _onDragStop: DraggableEventHandler = () => {};

  const hadnler = { onResizeStart, onResize, onResizeStop };

  return (
    <>
      {isRender ? (
        <Rnd
          ref={r => {
            // @ts-ignore

            rndRef.current = r;
            if (r) rndRefs?.current.push(r);
          }}
          style={style}
          bounds={'tbody'}
          //   cancel='tbody'
          className='ggggggggggggggggggg'
          enableUserSelectHack
          default={{
            x: 0,
            y: 0,
            width: 200,
            height: 30
          }}
          enableResizing={{
            left: true,
            right: true
          }}
          dragGrid={[50, 30]}
          resizeGrid={[50, 1]}
          resizeHandleStyles={{
            left: {
              borderRadius: 20,
              border: '1px solid rgba(81, 81, 81, 1)'
            },
            right: {
              borderRadius: 20,
              border: '1px solid rgba(81, 81, 81, 1)'
            }
          }}
          allowAnyClick
          onMouseDown={e => console.log(12005, e)}
          {...hadnler}

          //   maxHeight={30}
          //   minHeight={30}
        >
          {title || 'Rnd'}
        </Rnd>
      ) : null}
    </>
  );
};

export default RndContainer;
