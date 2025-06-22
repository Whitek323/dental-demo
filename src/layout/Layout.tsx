import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const Layout = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Layout;
