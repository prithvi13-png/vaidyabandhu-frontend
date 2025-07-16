import { lazy } from "react";

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Appointments = lazy(() => import('../pages/Appointments'))
const Slots = lazy(() => import('../pages/Slots'))

const doctorRoutes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		element: <Dashboard />,
	},
	{
		path: '/appointments',
		name: 'Appointments',
		element: <Appointments />,
	},
	{
		path: '/slots',
		name: 'Slots',
		element: <Slots />,
	},
];

const allAdminRoutes = [...doctorRoutes];

export { allAdminRoutes };
