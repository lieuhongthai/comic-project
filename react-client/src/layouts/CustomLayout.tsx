// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { AuthProvider } from 'src/context/AuthContext'

// ** React router dom
import { Outlet, useLocation } from 'react-router-dom'

// ** Component Imports
import WindowWrapper from 'src/@core/components/window-wrapper'
import GuestGuard from 'src/@core/components/auth/GuestGuard'
import AuthGuard from 'src/@core/components/auth/AuthGuard'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Loader Import
import NProgress from 'nprogress'

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}
const CustomLayout = () => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  // const location = useLocation()

  // useEffect(() => {
  //   NProgress.start()
  //   NProgress.done()
  // }, [location.pathname])

  const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
    if (guestGuard) {
      return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
    } else if (!guestGuard && !authGuard) {
      return <>{children}</>
    } else {
      return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
    }
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems()
          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} toggleNavVisibility={props.toggleNavVisibility} />
          )
        }
      }}
    >
      <AuthProvider>
        <WindowWrapper>
          <Guard authGuard={false} guestGuard={false}>
            <Outlet />
          </Guard>
        </WindowWrapper>
      </AuthProvider>
    </Layout>
  )
}

export default CustomLayout
