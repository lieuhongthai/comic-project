// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** React Router Imports
import { useLocation, useNavigate } from 'react-router-dom'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname

  useEffect(
    () => {
      if (auth.user === null && !window.localStorage.getItem('userData')) {
        if (pathname !== '/') {
          navigate('/login', { replace: true, state: { returnUrl: pathname } })
        } else {
          navigate('/login', { replace: true })
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  )

  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
