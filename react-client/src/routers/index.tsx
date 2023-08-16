import { Outlet, createBrowserRouter } from 'react-router-dom'

// export default () => {
//   const routers = []

//   return
// }

function Test() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

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

    Component: Test,
    children: [
      {
        index: true,
        Component: Test2
      }
    ]
  }
])
