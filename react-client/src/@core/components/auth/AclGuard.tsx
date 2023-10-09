// ** React Imports
import { ReactNode } from 'react'

// ** React Router Imports
import { useLocation, useRouteLoaderData } from 'react-router-dom'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

interface AclGuardProps {
  children: ReactNode
  guestGuard: boolean
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { children, guestGuard } = props

  // ** Hooks
  const location = useLocation()
  const pathname = location.pathname

  const loaderGuestGuard = useRouteLoaderData('guestGuard')
  const adminGuard = useRouteLoaderData('adminGuard')

  if (loaderGuestGuard) return <BlankLayout>{children}</BlankLayout>

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || pathname === '/404' || pathname === '/500' || pathname === '/') {
    return <>{children}</>
  }

  if (adminGuard) return <>{children}</>

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
