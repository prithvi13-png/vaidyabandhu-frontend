import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';

export function getAppRoutes(auth) {
  const routes = [
    ...PublicRoute(),
  ];
  if (auth?.checkISAuthenticated()) {
    routes.push(PrivateRoutes()); // NOT spread
  }
  return routes;
}
