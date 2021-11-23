import { useNavigate, useLocation } from "react-router-dom";
import useTypedSelector from "@/redux/hookSelector/useTypedSelector";

interface IRoute {
  onClickSign: () => void;
}

const ProtectedRoute: React.FC<IRoute> = ({ children, onClickSign }) => {
  const history = useNavigate();
  const location = useLocation();
  const user = useTypedSelector((stateUser) => stateUser.user.user);
  function onClicker() {
    onClickSign();
    history("/", { state: { from: location.pathname } });
  }
  return <>{!user ? onClicker() : children}</>;
};
export default ProtectedRoute;
