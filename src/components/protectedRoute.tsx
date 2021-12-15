import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface IRoute {
  onClickSign: () => void;
}

const ProtectedRoute: React.FC<IRoute> = ({ children, onClickSign }) => {
  const history = useNavigate();
  const location = useLocation();
  const localStorageSetUser = localStorage.getItem("user");
  function onClicker() {
    useEffect(() => {
      onClickSign();
      history("/", { state: { from: location.pathname } });
    }, []);
  }

  return <>{!localStorageSetUser ? onClicker() : children}</>;
};
export default ProtectedRoute;
