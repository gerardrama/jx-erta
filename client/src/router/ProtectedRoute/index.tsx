import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    isLoggedIn: boolean;
    children: React.ReactNode;
}

const ProtectedRoute = ({ isLoggedIn, children }:ProtectedRouteProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;