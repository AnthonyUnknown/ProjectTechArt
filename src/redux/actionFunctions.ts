import { changeData, login } from "@/products/apiHomePage";
import { Dispatch } from "react";
import { toast } from "react-toastify";
import { IAction } from "./reducers/userLogReducer";
import { IActionUserPage } from "./reducers/userPageReducer";

const funcUserLog = (logObjEmail: string, logObjPass: string) =>
  async function disp(dispatch: Dispatch<IAction>): Promise<void> {
    try {
      const data = await login(logObjEmail, logObjPass);
      const dataUser = data.user;
      dispatch({ type: "GET_USER", payload: dataUser });
      localStorage.setItem("user", JSON.stringify(data.user));
      const localStorageSetUser = localStorage.getItem("user");
      if (localStorageSetUser) {
        dispatch({ type: "USER_STORAGE", payload: localStorageSetUser });
      }
    } catch (errorUser) {
      dispatch({ type: "ERROR_USER", payload: "Error" });
      toast("Log Error. Try again!");
    }
  };
export default funcUserLog;

export const userData = (name: string, phone: string, img: string, id: number | undefined) =>
  async function disp(dispatch: Dispatch<IActionUserPage>): Promise<void> {
    try {
      const data = await changeData(name, phone, img, id);
      localStorage.setItem("user", JSON.stringify(data));
      const parseUserPageGet = localStorage.getItem("user");
      if (parseUserPageGet) {
        const parseUserPage = JSON.parse(parseUserPageGet);
        console.log(parseUserPage);
        dispatch({ type: "RENAME_USERPAGE", payload: parseUserPage.userName });
        dispatch({ type: "REPHONE_USERPAGE", payload: parseUserPage.userPhone });
        dispatch({ type: "REPIC_USERPAGE", payload: parseUserPage.userImg });
      }
    } catch (errorUser) {
      dispatch({ type: "ERROR_USERPAGE", payload: "Error" });
      toast("Error. Try again!");
    }
  };
