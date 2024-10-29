import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProtectedRouteWrapper({
  requiresAuth,
}: {
  requiresAuth: boolean;
}) {
  // unauthenticated user attempting to access protected route
  // if (requiresAuth && isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  // logged in user attempting to go back to auth page
  // else if (!requiresAuth && isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }
  // logged in user on a protected route
  if (requiresAuth) {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }

  return <Outlet />;
}
