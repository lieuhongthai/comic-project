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
import { useForm, Controller } from 'react-hook-form';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

// ** Types
import { EventDateType } from 'src/types/apps/calendarTypes';
import { GanttType } from '../grantt-task';

interface PickerProps {
  label?: string;
  error?: boolean;
  registername?: string;
}

type EventSidebarType = {
  currentDate: EventDateType;
  drawerWidth: number;
  isSidebarOpen: boolean;
  handleEventSidebarToggle: () => void;
};
type IFormInput = { label: string; type: GanttType; startDate: string | Date | null; endDate: Date | null };
const defaultValues: IFormInput = {
  label: '',
  type: 'code',
  startDate: null,
  endDate: null,
};
const EventSidebar = (props: EventSidebarType) => {
  // ** Props
  const { currentDate, drawerWidth, isSidebarOpen, handleEventSidebarToggle } = props;

  // ** States
  const [values, setValues] = useState<IFormInput>(defaultValues);

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues: { ...defaultValues, startDate: currentDate } });

  useEffect(() => {
    if (currentDate) {
      setValue('startDate', currentDate);
      setValues({ ...values, startDate: currentDate });
    }
  }, [currentDate]);

  const handleSidebarClose = async () => {
    setValues(defaultValues);
    clearErrors();
    handleEventSidebarToggle();
  };

  const onSubmit = (data: IFormInput) => {
    console.log(12005, data);

    handleSidebarClose();
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
    if (true) {
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
                  This field is required
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
                      labelId='label-type-event-sidebar'
                      onChange={onChange}
                      placeholder='Type ...'
                      error={Boolean(errors.type)}
                    >
                      <MenuItem value='code'>code</MenuItem>
                      <MenuItem value='design'>design</MenuItem>
                      <MenuItem value='all'>all</MenuItem>
                    </Select>
                  </>
                )}
              />

              {errors.type && (
                <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
                  This field is required
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
                      minDate={currentDate as EventDateType}
                      maxDate={values.endDate as EventDateType}
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
                  This field is required
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
                    minDate={values.startDate as EventDateType}
                    startDate={values.startDate as EventDateType}
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
                  This field is required
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
