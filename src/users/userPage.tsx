import InputSign from "@/elements/inputSign";
import { ChangeEvent, useState, useEffect, SyntheticEvent } from "react";
import Submit from "@/elements/submit";
import ChangePass from "@/elements/changePass";
import useTypedSelector from "@/redux/hookSelector/useTypedSelector";
import { changePassUserApi } from "@/products/apiHomePage";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userData } from "@/redux/actionFunctions";
import classes from "./userPage.module.css";

const UserPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pic, setPic] = useState("");
  const [isOpenChangePass, setIsOpenChangePass] = useState<boolean>(false);
  const [changePass, setChangePass] = useState("");
  const [changeRepeatPass, setChangeRepeatPass] = useState("");
  const [changeObjPassDirty, setChangeRegObjPassDirty] = useState(false);
  const [changeObjRepeatPassDirty, setChangeRegObjRepeatPassDirty] = useState(false);
  const [passError, setPassError] = useState("Password can not be empty");
  const [passRepeatError, setRepeatPassError] = useState("Password can not be empty");
  const [formValid, setFormValid] = useState(false);
  const [validFormUserPage, setValidFormUserPage] = useState({ userName: false, userPhone: false, userPic: false });
  const [validMessage, setValidMessage] = useState({
    userName: "",
    userPhone: "",
    userPic: "",
  });
  const [formValidUserPage, setFormValidUserPage] = useState(false);

  useEffect(() => {
    if (passError || passRepeatError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passError, passRepeatError]);

  function onBlur(event: React.FocusEvent<HTMLInputElement>) {
    switch (event.target.name) {
      case "userName":
        setValidFormUserPage({ ...validFormUserPage, userName: true });
        break;
      case "phoneNumber":
        setValidFormUserPage({ ...validFormUserPage, userPhone: true });
        break;
      case "userPic":
        setValidFormUserPage({ ...validFormUserPage, userPic: true });
        break;
      default:
    }
  }

  useEffect(() => {
    if (validMessage.userName || validMessage.userPhone || validMessage.userPic) {
      setFormValidUserPage(false);
    } else {
      setFormValidUserPage(true);
    }
  }, [validMessage.userName, validMessage.userPhone, validMessage.userPic]);

  function onBlurChanger(event: React.FocusEvent<HTMLInputElement>) {
    switch (event.target.name) {
      case "password":
        setChangeRegObjPassDirty(true);
        break;
      case "repeatPassword":
        setChangeRegObjRepeatPassDirty(true);
        break;
      default:
    }
  }

  function onClickChangePass(): void {
    setIsOpenChangePass(true);
  }

  function onCloseChangePass(): void {
    setIsOpenChangePass(false);
  }

  function onChangeUserName(e: ChangeEvent<HTMLInputElement>): void {
    setUserName(e.target.value);
    if (e.target.value.length < 3) {
      setValidMessage({
        ...validMessage,
        userName: "Too short name. Min lenght - 4 letters",
      });
      if (!e.target.value) {
        setValidMessage({
          ...validMessage,
          userName: "Warning! If you wanna change your profile page, field Username can not be empty",
        });
      }
    } else {
      setValidMessage({ ...validMessage, userName: "" });
    }
  }
  function onChangePhoneNumber(e: ChangeEvent<HTMLInputElement>): void {
    setPhoneNumber(e.target.value);
    if (!e.target.value) {
      setValidMessage({
        ...validMessage,
        userPhone: "Warning! If you wanna change your profile page, field Userphone can not be empty",
      });
    } else {
      setValidMessage({ ...validMessage, userPhone: "" });
    }
  }

  function onChangePic(e: ChangeEvent<HTMLInputElement>): void {
    setPic(e.target.value);
    if (!e.target.value) {
      setValidMessage({
        ...validMessage,
        userPic: "Warning! If you wanna change your profile page, field User image can not be empty",
      });
    } else {
      setValidMessage({ ...validMessage, userPic: "" });
    }
  }

  function onChangePass(e: ChangeEvent<HTMLInputElement>): void {
    setChangePass(e.target.value);
    if (e.target.value.length < 7 || e.target.value.length > 14) {
      setPassError("Min pass: 7, max: 14");
      if (!e.target.value) {
        setPassError("Password can not be empty");
      }
    } else {
      setPassError("");
    }
  }

  function onChangeRepeatPass(e: ChangeEvent<HTMLInputElement>): void {
    setChangeRepeatPass(e.target.value);
    if (e.target.value.length < 7 || e.target.value.length > 14) {
      setRepeatPassError("Min pass: 7, max: 14");
      if (!e.target.value) {
        setRepeatPassError("Password can not be empty");
      }
    } else {
      setRepeatPassError("");
    }
  }
  const localStorageUserId = useTypedSelector((stateUser) => stateUser.user.user?.id);
  async function onSubmitChangePass(e: SyntheticEvent) {
    e.preventDefault();
    try {
      await changePassUserApi(changePass, localStorageUserId);
    } catch (error) {
      toast("Error pass. Try again!");
    }
    onCloseChangePass();
  }
  const getUser = useTypedSelector((stateUser) => stateUser.user.user);
  const localStoragePageId = useTypedSelector((stateUser) => stateUser.user.user?.id);
  const dispatcher = useDispatch();
  function onChangeUserPage(e: SyntheticEvent) {
    e.preventDefault();
    dispatcher(userData(userName, phoneNumber, pic, localStoragePageId));
  }

  useEffect(() => {
    const localStorageSetUser = localStorage.getItem("user");
    if (localStorageSetUser) {
      const parseUser = JSON.parse(localStorageSetUser);
      setUserName(parseUser.userName);
      setPhoneNumber(parseUser.userPhone);
      setPic(parseUser.userImg);
    }
  }, []);

  return (
    <div className={classes.userPage}>
      <div className={classes.userPageName}>
        <span>{getUser?.userName} Home Page</span>
      </div>
      <hr />
      <form onSubmit={onChangeUserPage}>
        <div className={classes.userPageContent}>
          <div className={classes.blockLeft}>
            <div
              className={classes.userPageImg}
              style={{
                backgroundImage: `url(${getUser?.userImg})`,
              }}
            />
            <div className={classes.pic}>
              <InputSign
                labelname="Place your img url:"
                value={pic}
                type="text"
                name="userPic"
                onChange={onChangePic}
                onBlur={onBlur}
              />
            </div>
          </div>
          <div className={classes.block}>
            <div>{getUser?.userName}</div>
            <div>
              <InputSign
                labelname="Change your name:"
                value={userName}
                type="text"
                name="userName"
                onChange={onChangeUserName}
                onBlur={onBlur}
              />
            </div>
            <div>{getUser?.userPhone}</div>
            <div>
              <InputSign
                labelname="Change your phone number:"
                value={phoneNumber}
                type="tel"
                name="phoneNumber"
                onChange={onChangePhoneNumber}
                onBlur={onBlur}
              />
            </div>
          </div>
          <div className={classes.block}>
            <div className={classes.saveButton}>
              <Submit disabled={!formValidUserPage} buttonname="Save Changes" />
            </div>
          </div>
        </div>
      </form>
      {validFormUserPage.userName && validMessage.userName && (
        <div className={classes.warning}>{validMessage.userName}</div>
      )}
      {validFormUserPage.userPhone && validMessage.userPhone && (
        <div className={classes.warning}>{validMessage.userPhone}</div>
      )}
      {validFormUserPage.userPic && validMessage.userPic && (
        <div className={classes.warning}>{validMessage.userPic}</div>
      )}
      <div className={classes.bottomBlock}>
        <div className={classes.text}>You can change your password here:</div>
        <div className={classes.changeButton}>
          <Submit buttonname="Change Password" onClick={onClickChangePass} />
        </div>
        <ChangePass
          changePass={changePass}
          changeRepeatPass={changeRepeatPass}
          isOpenChangePass={isOpenChangePass}
          onChangePass={onChangePass}
          onChangeRepeatPass={onChangeRepeatPass}
          onSubmitChangePass={onSubmitChangePass}
          onCloseChangePass={onCloseChangePass}
          onBlurChanger={onBlurChanger}
          passError={passError}
          changeObjPassDirty={changeObjPassDirty}
          changeObjRepeatPassDirty={changeObjRepeatPassDirty}
          passRepeatError={passRepeatError}
          formValid={formValid}
        />
      </div>
    </div>
  );
};

export default UserPage;
