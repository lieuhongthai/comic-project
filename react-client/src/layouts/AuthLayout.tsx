import React, { ReactNode } from 'react'

import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Component Imports
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'
import GuestGuard from 'src/@core/components/auth/GuestGuard'

import AclGuard from 'src/@core/components/auth/AclGuard'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Helmet Imports
import { Helmet } from 'react-helmet-async'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

import { Outlet } from 'react-router-dom'
import { AuthProvider } from 'src/context/AuthContext'

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const AuthLayout = () => {
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
    <AuthProvider>
      <Helmet>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Helmet>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <ThemeComponent settings={settings}>
                <WindowWrapper>
                  <Guard authGuard={false} guestGuard={false}>
                    <AclGuard guestGuard={false}>
                      <Outlet />
                    </AclGuard>
                  </Guard>
                </WindowWrapper>
                <ReactHotToast>
                  <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                </ReactHotToast>
              </ThemeComponent>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </AuthProvider>
  )
}

export default AuthLayout
