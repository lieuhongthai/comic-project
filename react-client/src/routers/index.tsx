import { useEffect } from 'react';
import { createBrowserRouter, useLocation } from 'react-router-dom';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import Error404 from 'src/pages/404';
import LoginPage from 'src/pages/login';

// ** Loader Import
import NProgress from 'nprogress';
import CustomLayout from 'src/layouts/CustomLayout';
import UserList from 'src/pages/apps/user';
import CardBasic from 'src/pages/ui/cards/basic';
import CardStatistics from 'src/pages/ui/cards/statistics';
import { CardStatsType } from 'src/@fake-db/types';
import axios from 'axios';
import CardsAdvanced from 'src/pages/ui/cards/advanced';
import CardWidgets from 'src/pages/ui/cards/widgets';

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
              await new Promise(r => setTimeout(r, 11500));

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
        path: 'ui/',
        children: [
          {
            path: 'cards/basic',
            element: <CardBasic />
          },
          {
            path: 'cards/advanced',
            element: <CardsAdvanced />
          },
          {
            path: 'cards/statistics',
            async loader() {
              const res = await axios.get('/cards/statistics');
              const apiData: CardStatsType = res.data;

              return { apiData };
            },
            element: <CardStatistics />
          },
          {
            path: 'cards/widgets',

            element: <CardWidgets />
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
  //   path: '*',
  //   element: (
  //     <BlankLayout>
  //       <Error404 />
  //     </BlankLayout>
  //   )
  // }
]);
