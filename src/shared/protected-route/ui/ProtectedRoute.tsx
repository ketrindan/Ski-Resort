import { FC } from "react";
import { useAppSelector } from "~app/store/hooks";
import { LoginPage } from "~pages/login";

interface IProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return isLoggedIn ? children : <LoginPage />;
};

export default ProtectedRoute;
