import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';

const EmptyRowTable = () => {
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Typography>{t('Empty row table')}</Typography>
    </Grid>
  );
};

export default EmptyRowTable;
