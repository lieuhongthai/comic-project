import { useEffect } from 'react'
import { createBrowserRouter, useLocation } from 'react-router-dom'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Error404 from 'src/pages/404'
import LoginPage from 'src/pages/login'

// ** Loader Import
import NProgress from 'nprogress'
import CustomLayout from 'src/layouts/CustomLayout'
import UserList from 'src/pages/apps/user'
import AppCalendar from 'src/pages/apps/calendar'

export function Test2() {
  return <div>aaaaaaaaaaaaaaaaaaaaaaaaa</div>
}

export function NprogressLoading() {
  const location = useLocation()
  useEffect(() => {
    NProgress.start()

    console.log(12005, 1)

    return () => {
      console.log(12005, 2)

      NProgress.done()
    }
  }, [location.pathname])

  return <></>
}
export const routers = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader() {
      return { userD: 1 }
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
          return true
        },
        children: [
          { index: true, element: <>111111111111111111</> },
          {
            path: 'email',
            element: <>2222222222222222222222222</>
          },
          {
            path: 'calendar',
            element: <AppCalendar /> //<AppCalendar />
          },
          {
            path: 'user/list',
            element: <UserList />
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
      return { guestGuard: true }
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
])
