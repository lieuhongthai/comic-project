import React, { ReactNode, createContext, useContext } from 'react';
import { GanttTaskDataItem } from '../grantt-task';
import GranttContent from '../grantt-task/GranttContent';

type GanttTaskContextType = {
  handleAddTask: (granttData: GanttTaskDataItem, index: number) => void;
  handleUpdateTask: (dataUpdate: GanttTaskDataItem, rowIndex: number) => void;

  handleOnTransformTask: (ganttTaskDataItem: GanttTaskDataItem, rowIndex: number) => void;
};
const defaultProvider: GanttTaskContextType = {
  handleUpdateTask: function (dataUpdate: GanttTaskDataItem, rowIndex: number): void {
    throw new Error('Function not implemented.');
  },
  handleAddTask: function (granttData: GanttTaskDataItem, index: number): void {
    throw new Error('Function not implemented.');
  },
  handleOnTransformTask: function (ganttTaskDataItem: GanttTaskDataItem, rowIndex: number): void {
    throw new Error('Function not implemented.');
  },
};
type GanttTaskProvidrerType = GanttTaskContextType & { children: ReactNode };
const GanttTaskContext = createContext<GanttTaskContextType>(defaultProvider);
const useGanttTask = () => useContext(GanttTaskContext);
const GanttTaskProvidrer = ({ children, ...props }: GanttTaskProvidrerType) => {
  return <GanttTaskContext.Provider value={{ ...props }}>{children}</GanttTaskContext.Provider>;
};

export { GanttTaskContext, GanttTaskProvidrer, useGanttTask };
