import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from 'src/layouts/AuthLayout'
import LoginPage from 'src/pages/login'
function Test2() {
  return <div>aaaaaaaaaaaaaaaaaaaaaaaaa</div>
}

export const routers = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader() {
      return { userD: 1 }
    },

    element: <AuthLayout />,
    children: [
      {
        index: true,
        Component: Test2
      },
      {
        id: 'guestGuard',

        path: 'login',
        loader() {
          return { guestGuard: true }
        },
        element: <LoginPage />
      },

      {
        id: 'register',
        path: 'register',
        loader() {
          return { guestGuard: true }
        },
        element: <LoginPage />
      }
    ]
  }
])
