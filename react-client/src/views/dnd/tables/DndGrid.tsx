import React from 'react';

interface Props {
  width: number;
  height: number;
  content: string;
}
const DndGrid = (props: Props) => {
  const { content } = props;

  return <div style={{ ...props }}>{content}</div>;
};

export default DndGrid;
