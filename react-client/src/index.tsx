import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// ** Helmet Imports
import { Helmet as Head } from 'react-helmet'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'

const emotionCache: EmotionCache = createEmotionCache()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
          />
          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
