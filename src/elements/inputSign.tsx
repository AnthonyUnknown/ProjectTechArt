import { ChangeEvent } from "react";
import classes from "./elementStyles/inputSign.module.css";

interface IInput {
  labelname: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
}
/* eslint-disable jsx-a11y/label-has-associated-control */
const InputSign: React.FC<IInput> = (props) => (
  <div className={classes.inputAndLabel}>
    <div>
      <label htmlFor={props.name}>{props.labelname}</label>
    </div>
    <div>
      <input {...props} className={classes.inputSign} id={props.name} />
    </div>
  </div>
);

export default InputSign;
