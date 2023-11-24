import { useState } from 'react';
import GranttTask, { GranttTaskData } from 'src/views/dnd/react-rnd/grantt-task';

const DndPage = () => {
  const [dataSources, setDataSource] = useState<GranttTaskData[]>([
    {
      id: 1,
      start: '2023/11/1',
      end: '2023/11/1',
      label: 'task 1',
      chilrends: [
        {
          startDate: '2023/11/1',
          endDate: '2023/11/1',
        },
        {
          startDate: '2023/11/5',
          endDate: '2023/11/6',
        },
      ],
    },
    {
      id: 2,
      start: '2023/11/5',
      end: '2023/11/6',
      label: 'task 1',
      chilrends: [
        {
          startDate: '2023/11/5',
          endDate: '2023/11/6',
        },
      ],
    },
  ]);

  return (
    <>
      <GranttTask dataSources={dataSources} />
    </>
  );
};

export default DndPage;
