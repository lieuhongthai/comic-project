// ** MUI Imports
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { type MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import PageHeader from 'src/@core/components/page-header';
import MRTable from 'src/@core/components/table';
import { rows } from 'src/@fake-db/table/static-data';

type RowType = {
  id: number;
  avatar: string;
  full_name: string;
  post: string;
  email: string;
  city: string;
  start_date: string;
  salary: number;
  age: string;
  experience: string;
  status: number;
};
const MaterialReactTables = () => {
  const columns = useMemo<MRT_ColumnDef<RowType>[]>(
    () => [
      { accessorKey: 'id', header: 'Id' },
      { accessorKey: 'full_name', header: 'Full name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'start_date', header: 'Date' },
      { accessorKey: 'experience', header: 'Experience' },
      { accessorKey: 'age', header: 'Age' }
    ],
    []
  );

  return (
    <Grid container spacing={6}>
      <PageHeader title={<Typography variant='h5'>MUI Tables</Typography>} />

      <Grid item xs={12}>
        <MRTable columns={columns} data={rows} />
      </Grid>
    </Grid>
  );
};

export default MaterialReactTables;
