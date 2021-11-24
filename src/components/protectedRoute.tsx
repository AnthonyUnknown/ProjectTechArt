import { useNavigate, useLocation } from "react-router-dom";

interface IName {
  email: string;
  id: number;
}

interface IRoute {
  name: IName | null;
  onClickSign: () => void;
}

const ProtectedRoute: React.FC<IRoute> = ({ children, name, onClickSign }) => {
  const history = useNavigate();
  const location = useLocation();
  function onClicker() {
    onClickSign();
    history("/", { state: { from: location.pathname } });
  }
  return <>{!name ? onClicker() : children}</>;
};
export default ProtectedRoute;
