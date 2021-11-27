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
      dispatch({ type: "RENAME_USERPAGE", payload: data.username });
      dispatch({ type: "REPHONE_USERPAGE", payload: data.phone });
      dispatch({ type: "REPIC_USERPAGE", payload: data.background });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (errorUser) {
      dispatch({ type: "ERROR_USERPAGE", payload: "Error" });
      toast("Error. Try again!");
    }
  };
