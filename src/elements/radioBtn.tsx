/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent } from "react";
import classes from "./elementStyles/radioBtn.module.css";

interface IRadioBtnCard {
  idNumber?: number;
  type: string;
  id: string;
  name: string;
  value: string;
  labelname: string;
}

interface IRadioBtn {
  radioBtn: IRadioBtnCard;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioBtn: React.FC<IRadioBtn> = ({ radioBtn, onChange, checked }) => (
  <div className={classes.genresRadio}>
    <input
      className={classes.genresRadioBtn}
      type={radioBtn.type}
      id={radioBtn.id}
      name={radioBtn.name}
      value={radioBtn.value}
      onChange={onChange}
      checked={checked}
    />
    <label htmlFor="radio">{radioBtn.labelname}</label>
  </div>
);

export default RadioBtn;
