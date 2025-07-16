
// PrivateRoutes.js
import React, { lazy } from 'react'
import { Route } from 'react-router-dom';
import PageMetaData from '../common/PageMetaData';
import { allAdminRoutes } from './allAdminRoutes';
const VerticalLayout = lazy(() => import('../authLayout/VerticalLayout'))

const PrivateRoutes = () => {
  return [
    <Route>
				{allAdminRoutes.map((route, idx) => (
					<Route
						path={route.path}
						element={(
								<>
									<PageMetaData title={route.name} />
									<VerticalLayout>{route.element}</VerticalLayout>
								</>
							)
						}
						key={idx}
					/>
				))}
			</Route>
    // Add more private routes here as needed
  ];
}

export default PrivateRoutes;