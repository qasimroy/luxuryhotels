import DefaultLayout from '@component/components/dashLayout/DefaultLayout';
import LiveChat from '@component/components/LiveChat';
import AuthMiddleware from '@component/helper/AuthProtectedRoute';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <AuthMiddleware>
      <DefaultLayout>
        {children}
      <LiveChat />
      </DefaultLayout>
    </AuthMiddleware>
  );
};

export default Layout;
