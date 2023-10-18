import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ** Helmet Imports
import { HelmetProvider } from 'react-helmet-async';

// ** Store Imports
import { store } from 'src/store';
import { Provider } from 'react-redux';

// ** Emotion Imports
import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';

// ** Cookie Imports
import { CookiesProvider } from 'react-cookie';

const emotionCache: EmotionCache = createEmotionCache();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const helmetContext = {};

root.render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <CookiesProvider>
        <Provider store={store}>
          <CacheProvider value={emotionCache}>
            <App />
          </CacheProvider>
        </Provider>
      </CookiesProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
