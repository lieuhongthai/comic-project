// ** React Imports
import { ForwardedRef, forwardRef, useState } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';

// ** Icon Imports
import Icon from 'src/@core/components/icon';
import Box from '@mui/material/Box';

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

import Grid from '@mui/material/Grid';

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

// ** Third Party Imports
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes';
import TextField from '@mui/material/TextField';
import PickersRange from 'src/views/forms/form-elements/pickers/PickersRange';

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
}

const defaultValues = {
  password: 'admin',
  email: 'admin@materialize.com',
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  startDate: yup.date().required(),
});

interface PickerProps {
  label?: string;
}

interface PickerProps2 {
  label?: string;
  end: Date | number;
  start: Date | number;
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      {...props}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
    />
  );
});

const CustomInput2 = forwardRef((props: PickerProps2, ref) => {
  const startDate = format(props.start, 'MM/dd/yyyy');
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;

  const value = `${startDate}${endDate !== null ? endDate : ''}`;

  return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} />;
});

const RndDialog = ({ isOpen, handleToggle }: Props) => {
  //   const daySelected = '2023/11/20';

  const [minDate, setMinDate] = useState<DateType>(new Date());
  const [maxDate, setMaxDate] = useState<DateType>(new Date());

  const [startDate, setStartDate] = useState<DateType>(new Date());
  const [endDate, setEndDate] = useState<DateType>(addDays(new Date(), 15));
  const [startDateRange, setStartDateRange] = useState<DateType>(new Date());
  const [endDateRange, setEndDateRange] = useState<DateType>(addDays(new Date(), 45));

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates;
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <Dialog
        onClose={handleToggle}
        aria-labelledby='customized-dialog-title'
        open={isOpen}
        maxWidth={'sm'}
        fullWidth
        sx={{
          height: 500,
          zIndex: 500,
        }}
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <Typography variant='h6' component='span'>
            Modal title
          </Typography>
          <IconButton aria-label='close' onClick={handleToggle} sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}>
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 4, height: 500 }}>
          <DatePickerWrapper>
            <form noValidate autoComplete='off'>
              <Grid container spacing={6}>
                {/* DatePicker */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='startDate'
                      rules={{ required: true }}
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <DatePicker
                          selectsRange
                          monthsShown={2}
                          endDate={endDateRange}
                          selected={startDateRange}
                          startDate={startDateRange}
                          onChange={onChange}

                          //   shouldCloseOnSelect={false}

                          //   customInput={
                          //     <CustomInput2 label='Multiple Months' end={endDateRange as Date | number} start={startDateRange as Date | number} />
                          //   }
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <DatePicker
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    popperPlacement={'bottom-end'}
                    customInput={<CustomInput2 label='Multiple Months' end={endDateRange as Date | number} start={startDateRange as Date | number} />}
                  />
                  <PickersRange popperPlacement={'bottom-end'} />
                </Grid>
              </Grid>
            </form>
          </DatePickerWrapper>
        </DialogContent>
        <DialogActions sx={{ p: theme => `${theme.spacing(3)} !important` }}>
          <Button onClick={handleToggle}>Save changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RndDialog;
