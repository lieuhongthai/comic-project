// ** React Imports
import { useState, useEffect, useCallback, useMemo } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// ** Icon Imports

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux';

// ** Custom Components Imports

// ** Utils Import

// ** Actions Imports
import { fetchData } from 'src/store/apps/user';

// ** Third Party Components

// ** Types Imports
import { RootState, AppDispatch } from 'src/store';

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/TableHeader';
import AddUserDrawer from 'src/views/apps/user/AddUserDrawer';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

type UserType = {
  fullName: string;
  email: string;

  role: string;

  currentPlan: string;
  status: string;
  actions: any;
};

const UserList = () => {
  // ** State
  const [role, setRole] = useState<string>('');
  const [plan, setPlan] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false);

  // ** Hook
  const theme = useTheme();

  console.log(12005, 'Re-render component: UserList');

  const userColumns = useMemo<MRT_ColumnDef<UserType>[]>(
    () => [
      {
        accessorKey: 'fullName',
        header: 'Full Name'
      },
      {
        accessorKey: 'email',
        header: 'Email'
      },

      {
        accessorKey: 'role',
        header: 'Role'
      },

      {
        accessorKey: 'currentPlan',
        header: 'Plan'
      },
      {
        accessorKey: 'status',
        header: 'Status'
      },
      {
        accessorKey: 'actions',
        header: 'Actions'
      }
    ],
    []
  );

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan
      })
    );
  }, [dispatch, plan, role, status, value]);

  const handleFilter = useCallback((val: string) => {
    setValue(val);
  }, []);

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value);
  }, []);

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value);
  }, []);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontal.map((item: CardStatsHorizontalProps, index: number) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatisticsHorizontal {...item} icon={<Icon icon={item.icon as string} />} />
                </Grid>
              )
            })}
          </Grid>
        )} */}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='author'>Author</MenuItem>
                    <MenuItem value='editor'>Editor</MenuItem>
                    <MenuItem value='maintainer'>Maintainer</MenuItem>
                    <MenuItem value='subscriber'>Subscriber</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Plan</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value=''>Select Plan</MenuItem>
                    <MenuItem value='basic'>Basic</MenuItem>
                    <MenuItem value='company'>Company</MenuItem>
                    <MenuItem value='enterprise'>Enterprise</MenuItem>
                    <MenuItem value='team'>Team</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <MaterialReactTable
            columns={userColumns}
            data={store.data}
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={false}
            enableSorting={false}
            enableBottomToolbar={false}
            enableTopToolbar={false}
            muiTableBodyRowProps={{ hover: false }}
            muiTableProps={{
              sx: {
                border: '1px solid rgba(81, 81, 81, 1)'
              }
            }}
            muiTableHeadCellProps={{
              align: 'center',
              sx: {
                // border: '1px solid rgba(81, 81, 81, 1)'
                background: theme.palette.primary.main
              },
              size: 'small',
              padding: 'none'
            }}
            muiTableBodyCellProps={{
              sx: {
                border: '1px solid rgba(81, 81, 81, 1)'
              }
            }}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  );
};

export default UserList;
