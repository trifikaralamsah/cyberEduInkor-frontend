import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

interface Props {
  children?: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const [cookies] = useCookies(["user"]);

  // console.log("cookie :", cookies.user);
  if (!cookies.user) {
    console.log("cookie empty");
    return <Navigate to="/login" replace={true} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
