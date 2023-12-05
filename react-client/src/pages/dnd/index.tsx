import { useState } from 'react';
import GranttTask, { GanttTaskData, GanttTaskDataItem } from 'src/views/dnd/react-rnd/grantt-task';

const DndPage = () => {
  // const [dataSources, setDataSource] = useState<GanttTaskData[]>([
  //   {
  //     id: 1,
  //     start: '2023/12/1',
  //     end: '2023/12/1',
  //     name: 'Lieu HongThai',
  //     label: 'task 1',
  //     priority: 'Super Hight',
  //     type: '',
  //     chilrends: [
  //       {
  //         id: 1,
  //         startDate: '2023/12/1',
  //         endDate: '2023/12/1',
  //         type: 'code',
  //         label: 'task 111111111',
  //       },
  //       {
  //         id: 2,

  //         startDate: '2023/12/5',
  //         endDate: '2023/12/6',
  //         type: 'design',
  //         label: 'task 22222222',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     start: '2023/11/5',
  //     end: '2023/12/31',
  //     name: 'Nguyễn Thị Ngọc Oanh',
  //     priority: 'Super Hight',
  //     label: 'task 2',
  //     chilrends: [
  //       {
  //         id: 3,
  //         startDate: '2023/12/5',
  //         endDate: '2023/12/6',
  //         type: 'all',
  //         label: 'task 3333333333',
  //       },
  //     ],
  //   },
  // ]);

  // const handleAddTask = (granttData: GanttTaskDataItem, index: number) => {
  //   const dataSourceCoppies = [...dataSources];
  //   const dataSource = dataSourceCoppies[index];
  //   dataSource.chilrends.push(granttData);

  //   // console.log(12005, dataSourceCoppies, dataSource, dataSources);

  //   // setDataSource(dataSource);
  // };

  return (
    <>
      <GranttTask />
      {/* dataSources={dataSources} handleAddTask={handleAddTask}  */}
    </>
  );
};

export default DndPage;
