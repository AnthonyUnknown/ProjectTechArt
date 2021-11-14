import { ChangeEvent } from "react";
import classes from "./elementStyles/inputBig.module.css";

interface InputPropsTypes {
  placeholder: string;
  Changer: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBig: React.FC<InputPropsTypes> = ({ placeholder, Changer }) => (
  <input className={classes.placeholder} type="text" placeholder={placeholder} onChange={Changer} />
);

export default InputBig;
