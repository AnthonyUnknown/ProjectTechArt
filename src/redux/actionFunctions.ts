import { IUserUser } from "@/interfaces";
import { ERROR_USER, GET_USER } from "./reducers/userLogReducer";

interface obj1 {
  type: string;
  payload: IUserUser;
}

interface obj2 {
  type: string;
  payload: string;
}

export type getUser = (payload: IUserUser) => obj1;
export type getError = (payload: string) => obj2;

export const getUserAction: getUser = (payload: IUserUser): obj1 => ({
  type: GET_USER,
  payload,
});

export const errorUserAction: getError = (payload: string): obj2 => ({
  type: ERROR_USER,
  payload,
});
