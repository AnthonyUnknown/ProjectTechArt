import { login } from "@/products/apiHomePage";
import { Dispatch } from "react";
import { toast } from "react-toastify";
import { IAction } from "./reducers/userLogReducer";

const funcUserLog = (logObjEmail: string, logObjPass: string) =>
  async function disp(dispatch: Dispatch<IAction>): Promise<void> {
    try {
      const data = await login(logObjEmail, logObjPass);
      const dataUser = data.user;
      dispatch({ type: "GET_USER", payload: dataUser });
    } catch (errorUser) {
      dispatch({ type: "ERROR_USER", payload: "Error" });
      toast("Log Error. Try again!");
    }
  };
export default funcUserLog;
