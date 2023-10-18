import React from 'react';
import { AuthProvider } from 'src/context/AuthContext';

// ** React router dom
import { Outlet } from 'react-router-dom';

const RenderRouterComponent = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default RenderRouterComponent;
