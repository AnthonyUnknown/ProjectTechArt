import { ImCross } from "react-icons/im";
import classes from "./elementStyles/crossButton.module.css";

interface ICross {
  onClick: () => void;
}

const CrossButton: React.FC<ICross> = (props) => (
  <button {...props} className={classes.crossButton} type="button">
    <ImCross />
  </button>
);

export default CrossButton;
