// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Material React Imports
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_JA } from 'material-react-table/locales/ja';

interface Props {
  columns: any[];
  data: any[];
  isLoading?: boolean;
}

const MRTableAction = ({ columns, data, isLoading }: Props) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnActions={false}
      enableColumnFilters={false}
      enablePagination={false}
      enableSorting={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      muiTableProps={{
        sx: {
          border: '1px solid rgba(81, 81, 81, 1)'
        }
      }}
      muiTableHeadCellProps={{
        sx: {
          border: '1px solid rgba(81, 81, 81, 1)'
        }
      }}
      muiTableBodyRowProps={{
        sx: { height: '10px' }
      }}
      muiTableBodyCellProps={{
        sx: {
          p: '2px 16px',
          border: '1px solid rgba(81, 81, 81, 1)'
        }
      }}
      state={{
        isLoading,
        density: 'comfortable'
      }}
      localization={MRT_Localization_JA}
      icons={{
        EditIcon: (props: any) => <Icon icon={'tabler:edit'} {...props} />
      }}
    />
  );
};

export default MRTableAction;
