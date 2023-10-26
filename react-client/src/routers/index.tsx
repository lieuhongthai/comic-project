import { useEffect } from 'react';
import { createBrowserRouter, useLocation } from 'react-router-dom';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import Error404 from 'src/pages/404';
import LoginPage from 'src/pages/login';

// ** Loader Import
import NProgress from 'nprogress';
import CustomLayout from 'src/layouts/CustomLayout';
import UserList from 'src/pages/apps/user';
import Accordion from 'src/pages/components/accordion';
import Alerts from 'src/pages/components/alerts';
import Avatars from 'src/pages/components/avatars';
import Badges from 'src/pages/components/badges';
import Buttons from 'src/pages/components/buttons';
import ButtonGroup from 'src/pages/components/button-group';
import Chips from 'src/pages/components/chips';
import Dialogs from 'src/pages/components/dialogs';
import Lists from 'src/pages/components/list';
import Menus from 'src/pages/components/menu';
import Pagination from 'src/pages/components/pagination';
import Ratings from 'src/pages/components/ratings';
import Snackbar from 'src/pages/components/snackbar';
import Swiper from 'src/pages/components/swiper';
import Tabs from 'src/pages/components/tabs';
import Timelines from 'src/pages/components/timeline';
import ReactHotToasts from 'src/pages/components/toast';
import Misc from 'src/pages/components/more';
import TreeView from 'src/pages/components/tree-view';
import TextFields from 'src/pages/forms/form-elements/text-field';
import Selects from 'src/pages/forms/form-elements/select';
import Checkboxes from 'src/pages/forms/form-elements/checkbox';
import Radios from 'src/pages/forms/form-elements/radio';
import CustomInputs from 'src/pages/forms/form-elements/custom-inputs';
import Textareas from 'src/pages/forms/form-elements/textarea';
import Autocompletes from 'src/pages/forms/form-elements/autocomplete';
import ReactDatePickers from 'src/pages/forms/form-elements/pickers';
import Switches from 'src/pages/forms/form-elements/switch';
import FileUploaders from 'src/pages/forms/form-elements/file-uploader';
import Editors from 'src/pages/forms/form-elements/editor';
import Sliders from 'src/pages/forms/form-elements/slider';
import InputMasks from 'src/pages/forms/form-elements/input-mask';
import FormLayouts from 'src/pages/forms/form-layouts';
import FormValidations from 'src/pages/forms/form-validation';
import FormWizards from 'src/pages/forms/form-wizard';
import MUITable from 'src/pages/tables/mui';
import MaterialReactTables from 'src/pages/tables/material-react-table';
import Icons from 'src/pages/ui/icons';
import TypographyPage from 'src/pages/ui/typography';
import DndPage from 'src/pages/dnd';

export function Test2() {
  return <div>aaaaaaaaaaaaaaaaaaaaaaaaa</div>;
}

export function NprogressLoading() {
  const location = useLocation();
  useEffect(() => {
    NProgress.start();

    console.log(12005, 1);

    return () => {
      console.log(12005, 2);

      NProgress.done();
    };
  }, [location.pathname]);

  return <></>;
}

export function Component() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

export const routers = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader() {
      return { userD: 1 };
    },

    element: <CustomLayout />,
    children: [
      {
        index: true,
        element: <>aaaaaaaaaaaaaaaaaaaaaaaaaaa</>
      },
      {
        path: 'apps/',
        id: 'adminGuard',
        loader() {
          return true;
        },
        children: [
          { index: true, element: <>111111111111111111</> },
          {
            path: 'email',
            element: <>2222222222222222222222222</>
          },
          {
            path: 'calendar',
            async loader() {
              await new Promise(r => setTimeout(r, 1000));

              return true;
            },
            async lazy() {
              await new Promise(r => setTimeout(r, 500));
              const { default: AppCalendar } = await import('../pages/apps/calendar');

              return {
                Component: AppCalendar
              };
            }
          },
          {
            path: 'user/list',
            element: <UserList />
          }
        ]
      },

      {
        path: 'components/',
        children: [
          {
            path: 'accordion',
            element: <Accordion />
          },
          {
            path: 'alerts',
            element: <Alerts />
          },
          {
            path: 'avatars',
            element: <Avatars />
          },

          {
            path: 'badges',
            element: <Badges />
          },
          {
            path: 'buttons',
            element: <Buttons />
          },
          {
            path: 'button-group',
            element: <ButtonGroup />
          },

          {
            path: 'chips',
            element: <Chips />
          },
          {
            path: 'dialogs',
            element: <Dialogs />
          },
          {
            path: 'lists',
            element: <Lists />
          },

          {
            path: 'menu',
            element: <Menus />
          },
          {
            path: 'pagination',
            element: <Pagination />
          },
          {
            path: 'ratings',
            element: <Ratings />
          },

          {
            path: 'snackbar',
            element: <Snackbar />
          },
          {
            path: 'swiper',
            element: <Swiper />
          },
          {
            path: 'tabs',
            element: <Tabs />
          },

          {
            path: 'timeline',
            element: <Timelines />
          },
          {
            path: 'toast',
            element: <ReactHotToasts />
          },
          {
            path: 'tree-view',
            element: <TreeView />
          },
          {
            path: 'more',
            element: <Misc />
          }
        ]
      },

      {
        path: 'forms/',
        children: [
          {
            path: 'form-elements/text-field',
            element: <TextFields />
          },
          {
            path: 'form-elements/select',
            element: <Selects />
          },
          {
            path: 'form-elements/checkbox',
            element: <Checkboxes />
          },
          {
            path: 'form-elements/radio',
            element: <Radios />
          },
          {
            path: 'form-elements/custom-inputs',
            element: <CustomInputs />
          },
          {
            path: 'form-elements/textarea',
            element: <Textareas />
          },
          {
            path: 'form-elements/autocomplete',
            element: <Autocompletes />
          },
          {
            path: 'form-elements/pickers',
            element: <ReactDatePickers />
          },
          {
            path: 'form-elements/switch',
            element: <Switches />
          },
          {
            path: 'form-elements/file-uploader',
            element: <FileUploaders />
          },
          {
            path: 'form-elements/editor',
            element: <Editors />
          },
          {
            path: 'form-elements/slider',
            element: <Sliders />
          },
          {
            path: 'form-elements/input-mask',
            element: <InputMasks />
          },
          {
            path: 'form-layouts',
            element: <FormLayouts />
          },
          {
            path: 'form-validation',
            element: <FormValidations />
          },
          {
            path: 'form-wizard',
            element: <FormWizards />
          }
        ]
      },
      {
        path: 'tables/',
        children: [
          {
            path: 'mui',
            element: <MUITable />
          },
          {
            path: 'material-react-table',
            element: <MaterialReactTables />
          }
        ]
      },
      {
        path: 'ui/',
        children: [
          {
            path: 'icons',
            element: <Icons />
          },
          {
            path: 'typography',
            element: <TypographyPage />
          },
          {
            path: 'dnd',
            element: <DndPage />
          }
        ]
      }
    ],

    errorElement: (
      <BlankLayout>
        <Error404 />
      </BlankLayout>
    )
  },
  {
    id: 'guestGuard',
    loader() {
      return { guestGuard: true };
    },
    path: '/login',
    element: (
      <BlankLayout>
        <LoginPage />
      </BlankLayout>
    )
  }

  // {
  //   path: 'ui/',
  //   children: [
  //     {
  //       path: 'cards/basic',
  //       element: <CardBasic />
  //     },
  //     {
  //       path: 'cards/advanced',
  //       element: <CardsAdvanced />
  //     },
  //     {
  //       path: 'cards/statistics',
  //       async loader() {
  //         const res = await axios.get('/cards/statistics');
  //         const apiData: CardStatsType = res.data;
  //         await new Promise(r => setTimeout(r, 1000));

  //         return { apiData };
  //       },
  //       element: <CardStatistics />
  //     },
  //     {
  //       path: 'cards/widgets',

  //       element: <CardWidgets />
  //     }
  //   ]
  // },
  // {
  //   path: '*',
  //   element: (
  //     <BlankLayout>
  //       <Error404 />
  //     </BlankLayout>
  //   )
  // }
]);
