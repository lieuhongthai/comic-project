import React, { ReactNode, createContext } from 'react';
import { GanttTaskDataItem } from '../grantt-task';

type GanttTaskContextType = {
  handleUpdateTaskCallback?: (rowIndex: number, taskItem: GanttTaskDataItem) => void;
};
const defaultProvider: GanttTaskContextType = {
  handleUpdateTaskCallback(rowIndex, taskItem) {},
};
const GanttTaskContext = createContext(defaultProvider);
const GanttTaskProvidrer = ({
  children,
}: {
  children: ReactNode;
  handleUpdateTaskCallback?: (rowIndex: number, taskItem: GanttTaskDataItem) => void;
}) => {
  return <GanttTaskContext.Provider value={{}}>{children}</GanttTaskContext.Provider>;
};

export { GanttTaskContext, GanttTaskProvidrer };
