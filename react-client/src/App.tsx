import React from 'react'

// ** Config Imports
import 'src/configs/i18n'

// ** Fake-DB Import
import 'src/@fake-db'

import { SettingsProvider, initialSettings } from 'src/@core/context/settingsContext'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

import { RouterProvider } from 'react-router-dom'

// ** Component Imports
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Helmet Imports
import { Helmet } from 'react-helmet-async'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

import { routers } from './routers'

function App() {
  return (
    <>
      <Helmet>
        <title>{`${themeConfig.templateName} - GEO System solution Vietnam`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – “Change as Chance” has been our corporate motto since GEO's inception`}
        />
        <meta name='keywords' content='GEO System solution Vietnam' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Helmet>
      <ThemeComponent>
        <RouterProvider router={routers} fallbackElement={<Spinner />} />
        <ReactHotToast>
          <Toaster position={initialSettings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
        </ReactHotToast>
      </ThemeComponent>
    </>
  )
}

export default App
