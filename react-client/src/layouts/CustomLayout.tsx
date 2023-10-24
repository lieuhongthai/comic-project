// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Layout Imports
import Layout from 'src/@core/layouts/Layout';

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical';

// ** Component Import

import VerticalAppBarContent from './components/vertical/AppBarContent';

// ** Hook Import
import { AuthProvider } from 'src/context/AuthContext';

// ** React router dom
import { Outlet, useNavigation } from 'react-router-dom';

// ** Spinner Import
import Spinner from 'src/@core/components/spinner';

// ** Component Imports

// ** Spinner Import

// ** Loader Import

// ** MUI Imports

// ** ThemeConfig Import

// ** Types Import
import { Settings, initialSettings } from 'src/@core/context/settingsContext';
import ScrollTopRouter from 'src/@core/components/scroll-to-top/ScrollTopRouter';

const CustomLayout = () => {
  // ** Hooks
  const navigation = useNavigation();

  // ** Statte
  const [settings, saveSettings] = useState<Settings>({ ...initialSettings });

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical';
  }

  const renderChildren = () => (navigation.state === 'loading' ? <Spinner /> : <Outlet />);

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems()
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} toggleNavVisibility={props.toggleNavVisibility} />
          )
        }
      }}
    >
      <ScrollTopRouter>
        <AuthProvider>{renderChildren()}</AuthProvider>
      </ScrollTopRouter>
    </Layout>
  );
};

export default CustomLayout;
