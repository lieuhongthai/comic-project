// ** Mui import
import Grid from '@mui/material/Grid';
import DndHead from 'src/views/dnd/tables/DndHead';

// import DndTable from 'src/views/dnd/DndTable';

// ** Component Import
// import RndTable from 'src/views/dnd/RndTable';

const DndPage = () => {
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <RndTable />
      </Grid>
      <Grid item xs={12}>
        <DndTable />
      </Grid> */}

      <DndHead />
    </Grid>
  );
};

export default DndPage;
