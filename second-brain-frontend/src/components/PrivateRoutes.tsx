// PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useEffect } from "react";


export function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");



  useEffect(() => {
    if (!token && location.pathname.startsWith("/dashboard")) {
      toast.error("User not signed in");
    }
  }, [token, location.pathname]);


  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
