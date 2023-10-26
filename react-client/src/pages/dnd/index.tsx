// ** Mui import
import Grid from '@mui/material/Grid';

// ** Component Import
import RndTable from 'src/views/dnd/RndTable';

const DndPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <RndTable />
      </Grid>
    </Grid>
  );
};

export default DndPage;
