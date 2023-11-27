// ** Mui Import
import Grid from '@mui/material/Grid';

import RndReactBody from '../tables/Body';
import RndReactHeader from '../tables/Head';
import { RndReactBodyProps } from '../tables/Body';

const GranttContent = (props: RndReactBodyProps) => {
  return (
    <Grid container style={{ overflowX: 'scroll', display: 'flex', scrollSnapType: 'y' }} spacing={6}>
      <RndReactHeader {...props} />
      <RndReactBody {...props} />
    </Grid>
  );
};

export default GranttContent;
