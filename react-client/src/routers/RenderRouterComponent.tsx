import React, { useEffect } from 'react'
import { AuthProvider } from 'src/context/AuthContext'

// ** React router dom
import { Outlet, useLocation } from 'react-router-dom'

// ** Loader Import
import NProgress from 'nprogress'
const RenderRouterComponent = () => {
  const location = useLocation()

  useEffect(() => {
    NProgress.start()
    NProgress.done()
  }, [location.pathname])

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export default RenderRouterComponent
