import { ChangeEvent } from "react";
import classes from "./elementStyles/inputSign.module.css";

interface IInput {
  labelName: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/* eslint-disable jsx-a11y/label-has-associated-control */
const InputSign: React.FC<IInput> = (props) => (
  <div className={classes.inputAndLabel}>
    <label htmlFor="name">{props.labelName}</label>
    <input {...props} className={classes.inputSign} id="name" type="text" />
  </div>
);

export default InputSign;
