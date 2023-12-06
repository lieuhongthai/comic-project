/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Import
import Box from '@mui/material/Box';
import { CSSProperties, FC, useRef } from 'react';
import { DraggableData, Rnd, RndResizeCallback, RndResizeStartCallback } from 'react-rnd';
import { GanttType } from '../grantt-task';

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
  type: GanttType;

  rndRefs: React.MutableRefObject<Rnd[]>;
  label?: string;
  onClickHandler?: (xPosition: number, width: number) => void;
  handleTransform?: (xPosition: number, width?: number) => void;

  // rowRefs: React.MutableRefObject<HTMLDivElement[]>;
  width?: number;
  height?: number;
}
type Direction = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
type ResizeDirection = Direction;

type DraggableEvent = React.MouseEvent<HTMLElement | SVGElement> | React.TouchEvent<HTMLElement | SVGElement> | MouseEvent | TouchEvent;

type DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => void | false;

const ganttType = {
  code: '#CFE2F3',
  design: '#D9EAD3',
  all: '#FFF2CC',
};
const RndDraggable: FC<Props> = ({ id, row: indexRow, rndRefs, width = 50, height = 50, type, label, onClickHandler, handleTransform }) => {
  // ** State

  // ** Ref
  const rndRef = useRef<Rnd>(null);

  // ** Memo

  // ** Functional
  const onResizeStop: RndResizeCallback = (_e, _dir, element, _delta, position) => {
    rndRef.current?.setState(dataState => ({ ...dataState, maxWidth: 10000000 }));
    const width = element.getBoundingClientRect().width;
    const xPosition = position.x;
    handleTransform && handleTransform(xPosition, width);
  };

  const onResizeStart: RndResizeStartCallback = (_, dir: ResizeDirection, ref: HTMLElement) => {
    const xRef = ref.getBoundingClientRect().x;
    const wRef = ref.getBoundingClientRect().width;
    const rndFilters = rndRefs.current.filter(f => {
      return (
        f.resizableElement.current?.className !== ref.className &&
        f.resizableElement.current?.className.includes(`rnd-body-table-container-${indexRow}`)
      );
    });

    if (dir === 'left') {
      const xLefts = rndFilters
        .map(v => (v.getSelfElement()?.getBoundingClientRect().x || 0) + (v.getSelfElement()?.getBoundingClientRect().width || 0))
        .filter(f => f !== undefined) as number[];
      const first = xLefts.sort((a, b) => b - a).find(f => f <= xRef);

      if (first) {
        rndRef.current?.setState(dataState => ({ ...dataState, maxWidth: Math.abs(xRef - first + wRef) }));
      }
    }
    if (dir === 'right') {
      const xRights = (rndFilters.map(v => v.getSelfElement()?.getBoundingClientRect().x).filter(f => f !== undefined) as number[]).sort(
        (a, b) => b - a,
      );
      const last = xRights.sort((a, b) => a - b).find(f => f >= xRef);

      if (last) rndRef.current?.setState(dataState => ({ ...dataState, maxWidth: Math.abs(xRef - last) }));
    }
  };

  const onDragStart: DraggableEventHandler = (e, data) => {
    handleOverlap(data);
  };

  const onDrag: DraggableEventHandler = _ => {};

  const handleOverlap = (data: DraggableData) => {
    const nodeRoot = document.getElementById(`rnd-bounds-id-${indexRow}`) as HTMLDivElement;
    const rectRoot = nodeRoot.getBoundingClientRect();
    const ref = data.node;
    const xRef = ref.getBoundingClientRect().x;
    const wRef = ref.getBoundingClientRect().width;

    const bounds: any = {};
    const rndFilters = rndRefs.current.filter(f => {
      return (
        f.resizableElement.current?.className !== ref.className &&
        f.resizableElement.current?.className.includes(`rnd-body-table-container-${indexRow}`)
      );
    });

    if (rndFilters) {
      const leftElement = rndFilters.map(
        v => (v.getSelfElement()?.getBoundingClientRect().x || 0) + (v.getSelfElement()?.getBoundingClientRect().width || 0),
      ) as number[];
      const left = leftElement.sort((a, b) => b - a).find(f => f <= xRef);

      if (left) bounds.left = left - rectRoot.x;

      const rightElement = rndFilters.map(v => v.getSelfElement()?.getBoundingClientRect().x) as number[];
      const right = rightElement.sort((a, b) => a - b).find(f => f >= xRef);

      if (right) bounds.right = Math.abs(right - rectRoot.x - wRef);
    }
    setTimeout(() => {
      rndRef.current?.setState(dataState => ({
        ...dataState,
        bounds: { ...dataState.bounds, ...bounds },
      }));
    }, 1);
    console.log(12005, bounds);
  };

  const onDragStop: DraggableEventHandler = (e, data) => {
    rndRef.current?.updatePosition({ y: 0, x: data.lastX });
    const { lastX, node } = data;
    const xWidth = node.getBoundingClientRect().width;
    handleTransform && handleTransform(lastX, xWidth);

    console.log(12005, rndRef, rndRefs.current.length);
  };

  const handler = { onResizeStop, onDragStop, onResizeStart, onDragStart, onDrag };

  // ** Render
  return (
    <Box
      component={'div'}
      id={`id_${indexRow}_${id}`}
      onDoubleClick={e => {
        // ** !isDragg.current &&
        if (rndRef.current && onClickHandler) {
          const xPosition = rndRef.current.getDraggablePosition().x;
          const xWidth = (rndRef.current.getSelfElement() as HTMLElement).getBoundingClientRect().width;

          onClickHandler(xPosition, xWidth);
        }
      }}
    >
      <Rnd
        minWidth={50}
        key={`rnd-item-${indexRow}`}
        className={`rnd-body-table-container-${indexRow} id-${id}`}
        ref={ref => {
          if (ref && rndRef.current === null) {
            rndRefs.current.push(ref);

            //@ts-ignore
            rndRef.current = ref;
          }
        }}
        bounds={`div[id="rnd-bounds-id-${indexRow}"]`}
        style={{ ...style, backgroundColor: ganttType[type] }}
        enableResizing={{
          left: true,
          right: true,
        }}
        resizeGrid={[50, 1]}
        dragGrid={[50, 50]}
        resizeHandleClasses={{
          right: 'rize-handle-right-stop',
          left: 'rize-handle-left-stop',
        }}
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
        dragAxis='x'
        default={{
          x: 0,
          y: 0,
          width: width,
          height: height,
        }}
        {...handler}
      >
        <span style={{ padding: 5 }}>{label}</span>
      </Rnd>
    </Box>
  );
};

export default RndDraggable;
