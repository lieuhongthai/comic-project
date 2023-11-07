// ** React Import
import { ReactNode } from 'react';

// ** React Dnd import
import { useDrop } from 'react-dnd';
import { dndType } from './type';

const DndDrop = ({ children }: { children: ReactNode }) => {
  // ** Hook
  const [{ isOver }, drop] = useDrop(() => ({
    accept: dndType,
    drop(item, monitor) {
      console.log(12005, 'Drop: ', item, monitor);
    },
    collect(monitor) {
      return {
        isOver: !!monitor.isOver()
      };
    }
  }));

  console.log(12005, 'Is over: ', isOver);

  return (
    <div ref={drop} style={{ display: 'flex', paddingLeft: '1.5rem' }}>
      {children}
    </div>
  );
};

export default DndDrop;
