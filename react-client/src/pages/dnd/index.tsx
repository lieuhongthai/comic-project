import { useState } from 'react';
import GranttTask, { GanttTaskData } from 'src/views/dnd/react-rnd/grantt-task';

const DndPage = () => {
  const [dataSources, setDataSource] = useState<GanttTaskData[]>([
    {
      id: 1,
      start: '2023/12/1',
      end: '2023/12/1',
      name: 'Lieu HongThai',
      label: 'task 1',
      priority: 'Super Hight',
      type: '',
      chilrends: [
        {
          startDate: '2023/12/1',
          endDate: '2023/12/1',
          type: 'code',
        },
        {
          startDate: '2023/12/5',
          endDate: '2023/12/6',
          type: 'design',
        },
      ],
    },
    {
      id: 2,
      start: '2023/11/5',
      end: '2023/12/31',
      name: 'Nguyễn Thị Ngọc Oanh',
      priority: 'Super Hight',
      label: 'task 2',
      chilrends: [
        {
          startDate: '2023/12/5',
          endDate: '2023/12/6',
          type: 'all',
        },
      ],
    },
  ]);

  const handleAddTask = (granttData: GanttTaskData, index: number) => {
    const dataSourceCoppies = [...dataSources];
    const dataSource = dataSourceCoppies[index];
    setDataSource(dataState => [...dataState, granttData]);
  };

  return (
    <>
      <GranttTask dataSources={dataSources} handleAddTask={handleAddTask} />
    </>
  );
};

export default DndPage;
