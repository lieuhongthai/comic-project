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
        loader() {
          return { guestGuard: true }
        },
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'home/',
        id: 'adminGuard',
        loader() {
          return true
        },
        Component: Test2,
        children: [{ index: true, Component: Test2 }]
      }
    ]
  }
])
