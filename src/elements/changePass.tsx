import Modal from "@/elements/modal";
import CrossButton from "@/elements/crossButton";
import InputSign from "@/elements/inputSign";
import Submit from "@/elements/submit";
import { ChangeEvent, SyntheticEvent } from "react";
import classes from "./elementStyles/changePass.module.css";

interface IChangePass {
  changePass: string;
  changeRepeatPass: string;
  onChangePass: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeRepeatPass: (event: ChangeEvent<HTMLInputElement>) => void;
  isOpenChangePass: boolean;
  onCloseChangePass: () => void;
  onSubmitChangePass: (e: SyntheticEvent<Element, Event>) => void;
  onBlurChanger: (event: React.FocusEvent<HTMLInputElement>) => void;
  passError: string;
  changeObjPassDirty: boolean;
  changeObjRepeatPassDirty: boolean;
  passRepeatError: string;
  formValid: boolean;
}

const ChangePass: React.FC<IChangePass> = ({
  changePass,
  changeRepeatPass,
  onChangePass,
  onChangeRepeatPass,
  onSubmitChangePass,
  isOpenChangePass,
  onCloseChangePass,
  onBlurChanger,
  passError,
  changeObjPassDirty,
  changeObjRepeatPassDirty,
  passRepeatError,
  formValid,
}) => (
  <div>
    <Modal signIn={isOpenChangePass}>
      <form onSubmit={onSubmitChangePass}>
        <div className={classes.changePassWrapper}>
          <div className={classes.authAndBut}>
            <p>Change password</p>
            <CrossButton onClick={onCloseChangePass} />
          </div>
          {changeObjPassDirty && passError && <div className={classes.logBlurError}>{passError}</div>}
          <div className={classes.input}>
            <InputSign
              labelname="Password"
              value={changePass}
              name="password"
              type="password"
              onChange={onChangePass}
              onBlur={onBlurChanger}
            />
          </div>
          {changeObjRepeatPassDirty && passRepeatError && (
            <div className={classes.logBlurRepeatError}>{passRepeatError}</div>
          )}
          <div className={classes.input}>
            <InputSign
              labelname="Repeat password"
              value={changeRepeatPass}
              type="password"
              name="repeatPassword"
              onChange={onChangeRepeatPass}
              onBlur={onBlurChanger}
            />
          </div>
          <Submit disabled={!formValid} buttonname="Submit" />
        </div>
      </form>
    </Modal>
  </div>
);

export default ChangePass;
