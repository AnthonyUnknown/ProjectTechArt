import { login, changeData } from "@/products/apiHomePage";
import { Dispatch } from "react";
import { toast } from "react-toastify";
import { IAction } from "./reducers/userLogReducer";

const funcUserLog = (logObjEmail: string, logObjPass: string) =>
  async function disp(dispatch: Dispatch<IAction>): Promise<void> {
    try {
      const data = await login(logObjEmail, logObjPass);
      const dataUser = data.user;
      if (logObjEmail === "admin@mail.ru" && logObjPass === "adminpage") {
        localStorage.setItem("admin", "true");
      }
      localStorage.setItem("user", JSON.stringify(dataUser));
      dispatch({ type: "GET_USER", payload: dataUser });
    } catch (errorUser) {
      dispatch({ type: "ERROR_USER", payload: "Error" });
      toast("Log Error. Try again!");
    }
  };
export default funcUserLog;

export const userData = (name: string, phone: string, img: string, id: number | undefined) =>
  async function disp(dispatch: Dispatch<IAction>): Promise<void> {
    try {
      const data = await changeData(name, phone, img, id);
      const dataUser = data;
      localStorage.setItem("user", JSON.stringify(dataUser));
      dispatch({ type: "GET_USER", payload: dataUser });
    } catch (errorUser) {
      dispatch({ type: "ERROR_USER", payload: "Error" });
      toast("Error. Try again!");
    }
  };
