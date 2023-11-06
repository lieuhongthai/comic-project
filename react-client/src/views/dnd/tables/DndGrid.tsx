import React, { CSSProperties } from 'react';

interface Props {
  width: number;
  height: number;
  content: string | number;
  style?: CSSProperties;
}
const DndGrid = (props: Props) => {
  const { width, height, content, style } = props;

  return (
    <div style={{ width, height, ...style }}>
      <p>{content}</p>
    </div>
  );
};

export default DndGrid;
