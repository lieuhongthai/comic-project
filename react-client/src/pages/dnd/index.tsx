// ** Mui import
import Grid from '@mui/material/Grid';
import DndTable from 'src/views/dnd/DndTable';

// ** Component Import
import RndTable from 'src/views/dnd/RndTable';

const DndPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <RndTable />
      </Grid>
      <Grid item xs={12}>
        <DndTable />
      </Grid>
    </Grid>
  );
};

export default DndPage;
