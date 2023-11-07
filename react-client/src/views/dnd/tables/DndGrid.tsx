import React, { CSSProperties, ReactNode } from 'react';

interface Props {
  width: number;
  content: string | number;
  height?: number | undefined;
  style?: CSSProperties;
  children?: ReactNode;
}
const DndGrid = (props: Props) => {
  const { width, height, content, style, children } = props;

  if (children) return <div style={{ width, height, ...style }}>{children}</div>;

  return (
    <div style={{ width, height, ...style }}>
      <p>{content}</p>
    </div>
  );
};

export default DndGrid;
