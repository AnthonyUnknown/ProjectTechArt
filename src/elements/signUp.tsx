import Modal from "@/elements/modal";
import CrossButton from "@/elements/crossButton";
import InputSign from "@/elements/inputSign";
import Submit from "@/elements/submit";
import { ChangeEvent, SyntheticEvent } from "react";
import classes from "./elementStyles/signUp.module.css";

interface ISignUp {
  regObjEmail: string;
  regObjPass: string;
  onChangeRegLog: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeRegPass: (event: ChangeEvent<HTMLInputElement>) => void;
  isOpenSignUp: boolean;
  onCloseSignedUp: () => void;
  onSubmitReg: (e: SyntheticEvent<Element, Event>) => Promise<void>;
  onChangeRepeatPassObj: (event: ChangeEvent<HTMLInputElement>) => void;
  repeatPassObj: string;
  regObjEmailDirty: boolean;
  regObjPassDirty: boolean;
  logError: string;
  passError: string;
  onBlurChanger: (event: React.FocusEvent<HTMLInputElement>) => void;
  formValid: boolean;
}

const SignUp: React.FC<ISignUp> = ({
  isOpenSignUp,
  onSubmitReg,
  onCloseSignedUp,
  repeatPassObj,
  onChangeRepeatPassObj,
  regObjEmail,
  regObjPass,
  onChangeRegLog,
  onChangeRegPass,
  regObjEmailDirty,
  regObjPassDirty,
  logError,
  passError,
  onBlurChanger,
  formValid,
}) => (
  <>
    <Modal signIn={isOpenSignUp}>
      <form onSubmit={onSubmitReg}>
        <div className={classes.signUpWrapperReg}>
          <div className={classes.authAndBut}>
            <p>Registation</p>
            <CrossButton onClick={onCloseSignedUp} />
          </div>
          {regObjEmailDirty && logError && <div className={classes.logBlurError}>{logError}</div>}
          <div className={classes.input}>
            <InputSign
              labelname="Login"
              value={regObjEmail}
              name="email"
              onChange={onChangeRegLog}
              onBlur={onBlurChanger}
              type="text"
            />
          </div>
          {regObjPassDirty && passError && <div className={classes.passBlurError}>{passError}</div>}
          <div className={classes.input}>
            <InputSign
              labelname="Password"
              value={regObjPass}
              name="password"
              onChange={onChangeRegPass}
              onBlur={onBlurChanger}
              type="password"
            />
          </div>
          <div
            className={classes.errorPass}
            style={{
              opacity: repeatPassObj === regObjPass ? "0" : "1",
            }}
          >
            Pass does not match
          </div>
          <div className={classes.input}>
            <InputSign
              labelname="Repeat password"
              value={repeatPassObj}
              name="repeatpassword"
              onChange={onChangeRepeatPassObj}
              type="password"
            />
          </div>
          <Submit disabled={!formValid} buttonname="Submit" />
        </div>
      </form>
    </Modal>
  </>
);

export default SignUp;
