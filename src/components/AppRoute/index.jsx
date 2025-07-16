// AppRoute.js
import { useAuthContext } from "../context/useAuthContext";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoute from "./PublicRoute";

const AppRoute = () => {
  const auth = useAuthContext();

  return [
    ...PublicRoute(), // Always include public routes
    ...(auth?.isAuthenticated ? PrivateRoutes() : []) // Only include private routes if authenticated
  ];
};

export default AppRoute;