import React from 'react'

// ** Config Imports
import 'src/configs/i18n'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'
import { RouterProvider } from 'react-router-dom'
import { routers } from './routers'

// ** Global css styles
// import 'src/styles/globals.css'

function App() {
  return <RouterProvider router={routers} fallbackElement={<p>Initial Load...</p>} />
}

export default App
