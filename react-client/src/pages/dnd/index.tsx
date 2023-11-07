// ** Mui import
import Grid from '@mui/material/Grid';

// ** React Dnd import
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// ** Component Import
import DndTable from 'src/views/dnd/tables';

// import DndTable from 'src/views/dnd/DndTable';

// ** Component Import
// import RndTable from 'src/views/dnd/RndTable';

const DndPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <Grid container spacing={6}> */}
      <DndTable />
      {/* </Grid> */}
    </DndProvider>
  );
};

export default DndPage;
