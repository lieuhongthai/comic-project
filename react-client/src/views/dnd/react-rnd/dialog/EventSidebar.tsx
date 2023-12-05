// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

// ** Third Party Imports
import DatePicker from 'react-datepicker';
import isBetween from 'dayjs/plugin/isBetween';
import { useForm, Controller } from 'react-hook-form';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

// ** Types
import { EventDateType } from 'src/types/apps/calendarTypes';
import { GanttTaskData, GanttType, GanttTaskDataItem } from '../grantt-task';

// ** Third Party Imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import dayjs from 'dayjs';
interface PickerProps {
  label?: string;
  error?: boolean;
  registername?: string;
}

type EventSidebarType = {
  reducerState: {
    [x: string]: any;
    index: number;
    dataSource: GanttTaskData;
    currentDate: Date;
    label?: string;
    type?: GanttType;
    endDate?: Date;
    isEdit?: boolean;
  };
  drawerWidth: number;
  isSidebarOpen: boolean;
  handleEventSidebarToggle: () => void;
  handleAddTask: (granttData: GanttTaskDataItem, index: number) => void;
  handleUpdateTask: (rowIndex: number, taskItem: GanttTaskDataItem) => void;
};
type IFormInput = { label: string; type: GanttType; startDate: string | Date | null; endDate: string | Date | null | undefined };
type RangeDateType = { minDate: EventDateType; maxDate: EventDateType };
const defaultValues: IFormInput = {
  label: '',
  type: 'all',
  startDate: null,
  endDate: null,
};

// ** Yup schema
const schema: yup.ObjectSchema<IFormInput> = yup.object().shape({
  label: yup.string().required(t(`Label is required`)).max(100),
  type: yup.string<GanttType>().nullable().min(1).required(),
  startDate: yup.date().optional().required(),
  endDate: yup.date().optional().required(),
});

dayjs.extend(isBetween);

const EventSidebar = (props: EventSidebarType) => {
  // ** Props
  const {
    reducerState: { index, isEdit, ...reducerState },
    drawerWidth,
    isSidebarOpen,
    handleEventSidebarToggle,
    handleAddTask,
    handleUpdateTask,
  } = props;

  // ** States
  const [values, setValues] = useState<IFormInput>(defaultValues);

  const [rangeDate, setRangeDate] = useState<RangeDateType>({ minDate: null, maxDate: null });

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues: { ...defaultValues }, resolver: yupResolver(schema) });

  useEffect(() => {
    if (isSidebarOpen) {
      const { dataSource, currentDate, label, type, endDate } = reducerState;
      if (currentDate) {
        const d = !isEdit
          ? (dataSource?.chilrends as GanttTaskDataItem[])
          : (dataSource?.chilrends as GanttTaskDataItem[]).filter(f => f.startDate !== dayjs(currentDate).format('YYYY/M/D'));

        if (d) {
          const s = d.sort((a, b) => {
            if (new Date(a.startDate) < new Date(b.startDate)) return 1;
            if (new Date(a.startDate) > new Date(b.startDate)) return -1;

            return 0;
          });

          const minDate = s.find(f => new Date(f.startDate) <= new Date(currentDate))?.endDate;

          const maxDate = s.find(f => new Date(f.startDate) >= new Date(currentDate))?.startDate;

          // console.log(12005, { minDate, maxDate, dataSource, d });

          setRangeDate({
            minDate: minDate ? dayjs(minDate, ['YYYY/M/D']).add(1, 'day').toDate() : null,
            maxDate: maxDate ? dayjs(maxDate, ['YYYY/M/D']).subtract(1, 'day').toDate() : null,
          });
        }

        setValue('startDate', currentDate);
        setValue('label', label || '');
        setValue('type', type || 'all');

        setValue('startDate', currentDate);

        setValue('endDate', endDate);

        setValues({ ...values, startDate: currentDate });
      }
    }
  }, [isSidebarOpen]);

  const handleSidebarClose = async () => {
    setValues(defaultValues);
    clearErrors();
    handleEventSidebarToggle();

    resetFields();
  };

  const resetFields = () => {
    resetField('label');
    resetField('type');
    resetField('startDate');
    resetField('endDate');
  };

  const onSubmit = (data: IFormInput) => {
    console.log(12005, data);
    const granttData: GanttTaskDataItem = {
      id: Math.floor(Math.random() * 100),
      label: data.label,
      type: data.type,
      startDate: dayjs(data.startDate).format('YYYY/M/D'),
      endDate: dayjs(data.endDate).format('YYYY/M/D'),
    };
    handleSidebarClose();

    isEdit ? handleUpdateTask(index, granttData) : handleAddTask(granttData, index);
  };

  const handleStartDate = (date: Date) => {
    if (values.endDate && date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) });
    }
  };

  const resetToEmptyValues = useCallback(() => {
    setValue('label', '');
  }, [setValue]);

  const PickersComponent = forwardRef(({ ...props }: PickerProps, ref) => {
    return <TextField inputRef={ref} fullWidth {...props} label={props.label || ''} sx={{ width: '100%' }} error={props.error} />;
  });

  const RenderSidebarFooter = () => {
    if (!isEdit) {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Update
          </Button>
          <Button size='large' variant='outlined' color='secondary'>
            Reset
          </Button>
        </Fragment>
      );
    }
  };

  // console.log(12005, 'EventSidebar: re-render');

  return (
    <Drawer
      anchor='right'
      open={isSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    >
      <Box
        className='sidebar-header'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'background.default',
          p: theme => theme.spacing(3, 3.255, 3, 5.255),
        }}
      >
        <Typography variant='h6'>{true ? 'Update Event' : 'Add Event'}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size='small' onClick={handleSidebarClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(5, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='label'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField label='Title' value={value} onChange={onChange} error={Boolean(errors.label)} />
                )}
              />
              {errors.label && (
                <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
                  {errors.label.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='type'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <InputLabel id='label-select-type-event-sidebar'>Type</InputLabel>
                    <Select
                      id='select-type-event-sidebar'
                      label='Type'
                      value={value}
                      labelId='label-select-type-event-sidebar'
                      onChange={onChange}
                      placeholder='Type ...'
                      error={Boolean(errors.type)}
                    >
                      <MenuItem value='all'>all</MenuItem>
                      <MenuItem value='code'>code</MenuItem>
                      <MenuItem value='design'>design</MenuItem>
                    </Select>
                  </>
                )}
              />

              {errors.type && (
                <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
                  {errors.type.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='startDate'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <DatePicker
                      selectsStart
                      id='date-picker-start-date-event-sidebar'
                      endDate={value as EventDateType}
                      selected={value as EventDateType}
                      startDate={value as EventDateType}
                      minDate={rangeDate.minDate as EventDateType}
                      maxDate={(values.endDate as EventDateType) || (rangeDate.maxDate as EventDateType)}
                      dateFormat={'yyyy/M/d'}
                      customInput={<PickersComponent label='Start Date' registername='startDate' error={Boolean(errors.startDate)} />}
                      onChange={(date: Date) => {
                        onChange(date);

                        setValues({ ...values, startDate: new Date(date) });
                      }}
                      onSelect={handleStartDate}
                    />
                  );
                }}
              />
              {errors.startDate && (
                <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
                  {errors.startDate.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='endDate'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selectsEnd
                    id='date-picker-end-date-event-sidebar'
                    endDate={value as EventDateType}
                    selected={value as EventDateType}
                    startDate={values.startDate as EventDateType}
                    minDate={(values.startDate as EventDateType) || (rangeDate.minDate as EventDateType)}
                    maxDate={rangeDate.maxDate as EventDateType}
                    dateFormat={'yyyy/M/d'}
                    customInput={<PickersComponent label='End Date' registername='endDate' error={Boolean(errors.endDate)} />}
                    onChange={(date: Date) => {
                      onChange(date);
                      setValues({ ...values, endDate: new Date(date) });
                    }}
                  />
                )}
              />
              {errors.endDate && (
                <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
                  {errors.endDate.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderSidebarFooter />
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </Drawer>
  );
};

export default EventSidebar;
