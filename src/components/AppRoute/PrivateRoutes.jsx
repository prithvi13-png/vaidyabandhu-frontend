import React from 'react';
import { Route, Outlet } from 'react-router-dom';
import PageMetaData from '../common/PageMetaData';
import { allAdminRoutes } from './allAdminRoutes';
import VerticalLayout from '../authLayout/VerticalLayout';

export default function PrivateRoutes() {
  return (
    <Route element={<VerticalLayout><Outlet /></VerticalLayout>}>
      {allAdminRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            <>
              <PageMetaData title={route.name} />
              {route.element}
            </>
          }
          key={idx}
        />
      ))}
    </Route>
  );
}
