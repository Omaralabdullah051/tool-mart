import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";

const RequireAuthForAdmin = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user?.email);
  let location = useLocation();

  if (loading || adminLoading) {
    return <p>Loading...</p>;
  }

  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (admin) {
    return children;
  }
};

export default RequireAuthForAdmin;
