import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function ProtectedRoutes({ children }) {

  const { userToken } = useContext(authContext);

  const isloggedIn = !!userToken;

  return isloggedIn ? children : <Navigate to={"/signin"} />;
}
