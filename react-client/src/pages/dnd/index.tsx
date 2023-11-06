// ** Mui import
import Grid from '@mui/material/Grid';

import DndHead from 'src/views/dnd/tables/DndHead';

// ** React Dnd import
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// import DndTable from 'src/views/dnd/DndTable';

// ** Component Import
// import RndTable from 'src/views/dnd/RndTable';

const DndPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={6}>
        {/* <Grid item xs={12}>
        <RndTable />
      </Grid>
      <Grid item xs={12}>
        <DndTable />
      </Grid> */}

        <DndHead />
      </Grid>
    </DndProvider>
  );
};

export default DndPage;
