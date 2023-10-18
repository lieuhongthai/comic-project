// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react';

// ** React Router Imports
import { useLocation, useNavigate } from 'react-router-dom';

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth';

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  useEffect(() => {
    // if (!router.isReady) {
    //   return
    // }

    if (window.localStorage.getItem('userData')) {
      navigate('/', { replace: true });
    }
  }, [pathname]);

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
