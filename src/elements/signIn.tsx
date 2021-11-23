import Modal from "@/elements/modal";
import CrossButton from "@/elements/crossButton";
import InputSign from "@/elements/inputSign";
import Submit from "@/elements/submit";
import { ChangeEvent, SyntheticEvent } from "react";
import classes from "./elementStyles/signIn.module.css";

interface ISignIn {
  logObjEmail: string;
  logObjPass: string;
  onChangeLogLog: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeLogPass: (event: ChangeEvent<HTMLInputElement>) => void;
  isOpenSignIn: boolean;
  onCloseSigned: () => void;
  onSubmitLog: (e: SyntheticEvent<Element, Event>) => void;
}

const SignIn: React.FC<ISignIn> = ({
  logObjEmail,
  logObjPass,
  onChangeLogLog,
  onChangeLogPass,
  onSubmitLog,
  isOpenSignIn,
  onCloseSigned,
}) => (
  <div>
    <Modal signIn={isOpenSignIn}>
      <form onSubmit={onSubmitLog}>
        <div className={classes.signInWrapper}>
          <div className={classes.authAndBut}>
            <p>Authorization</p>
            <CrossButton onClick={onCloseSigned} />
          </div>
          <div className={classes.input}>
            <InputSign labelname="Login" value={logObjEmail} name="email" onChange={onChangeLogLog} />
          </div>
          <div className={classes.input}>
            <InputSign labelname="Password" value={logObjPass} name="password" onChange={onChangeLogPass} />
          </div>
          <Submit />
        </div>
      </form>
    </Modal>
  </div>
);

export default SignIn;
