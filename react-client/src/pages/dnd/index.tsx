// // ** Mui import
// import Grid from '@mui/material/Grid';

import DraggableStory from 'src/views/dnd/kit-core/draggableStory';

// // ** React Dnd import
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import DndKit from 'src/views/dnd/kit-core';

// // ** Component Import
// import DndTable from 'src/views/dnd/tables';

// import DndTable from 'src/views/dnd/DndTable';

// ** Component Import
// import RndTable from 'src/views/dnd/RndTable';

const DndPage = () => {
  const Basic = () => <DraggableStory />;

  return <>{Basic()}</>;
};

export default DndPage;
