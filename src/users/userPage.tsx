import InputSign from "@/elements/inputSign";
import { ChangeEvent, useState, useEffect, SyntheticEvent } from "react";
import Submit from "@/elements/submit";
import ChangePass from "@/elements/changePass";
import useTypedSelector from "@/redux/hookSelector/useTypedSelector";
import { changePassUserApi } from "@/products/apiHomePage";
import { useDispatch } from "react-redux";
import { userData } from "@/redux/actionFunctions";
import { toast } from "react-toastify";
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

  const userPageName = useTypedSelector((stateUserPage) => stateUserPage.userPage.userName);
  const userPagePhone = useTypedSelector((stateUserPage) => stateUserPage.userPage.userPhone);
  const userPagePic = useTypedSelector((stateUserPage) => stateUserPage.userPage.userPic);

  useEffect(() => {
    if (passError || passRepeatError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passError, passRepeatError]);

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
  }

  function onChangePhoneNumber(e: ChangeEvent<HTMLInputElement>): void {
    setPhoneNumber(e.target.value);
  }

  function onChangePic(e: ChangeEvent<HTMLInputElement>): void {
    setPic(e.target.value);
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
  const localStoragePageId = useTypedSelector((stateUser) => stateUser.user.user?.id);
  const dispatcher = useDispatch();
  function onChangeUserPage(e: SyntheticEvent) {
    e.preventDefault();
    dispatcher(userData(userName, phoneNumber, pic, localStoragePageId));
    setUserName("");
    setPhoneNumber("");
    setPic("");
  }

  useEffect(() => {
    const parseUserPageGet = localStorage.getItem("user");
    if (parseUserPageGet) {
      const parseUserPage = JSON.parse(parseUserPageGet);
      console.log(parseUserPage);
      dispatcher({ type: "RENAME_USERPAGE", payload: parseUserPage.userName });
      dispatcher({ type: "REPHONE_USERPAGE", payload: parseUserPage.userPhone });
      dispatcher({ type: "REPIC_USERPAGE", payload: parseUserPage.userImg });
    }
  });

  return (
    <div className={classes.userPage}>
      <div className={classes.userPageName}>
        <span>UserName Home Page</span>
      </div>
      <hr />
      <form onSubmit={onChangeUserPage}>
        <div className={classes.userPageContent}>
          <div className={classes.blockLeft}>
            <div
              className={classes.userPageImg}
              style={{
                backgroundImage: `url(${userPagePic})`,
              }}
            />
            <div className={classes.pic}>
              <InputSign
                labelname="Place your img url:"
                value={pic}
                type="text"
                name="userPic"
                onChange={onChangePic}
              />
            </div>
          </div>
          <div className={classes.block}>
            <div>{userPageName}</div>
            <div>
              <InputSign
                labelname="Change your name:"
                value={userName}
                type="text"
                name="userName"
                onChange={onChangeUserName}
              />
            </div>
            <div>{userPagePhone}</div>
            <div>
              <InputSign
                labelname="Change your phone number:"
                value={phoneNumber}
                type="tel"
                name="phoneNumber"
                onChange={onChangePhoneNumber}
              />
            </div>
          </div>
          <div className={classes.block}>
            <div className={classes.saveButton}>
              <Submit buttonname="Save Changes" />
            </div>
          </div>
        </div>
      </form>
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
  );
};

export default UserPage;
