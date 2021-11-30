import { IUserUser } from "@/interfaces";

export const ERROR_USER = "ERROR_USER";
export const GET_USER = "GET_USER";
export const USER_STORAGE = "USER_STORAGE";

export interface IDefaultState {
  user: IUserUser | null;
  error: string | null;
  userStorage: string | null;
}

const defaultState: IDefaultState = {
  user: null,
  error: null,
  userStorage: null,
};

export interface IGetUserAction {
  type: typeof GET_USER;
  payload: IUserUser;
}

export interface IErrorUserAction {
  type: typeof ERROR_USER;
  payload: string;
}

export interface IUserStorageAction {
  type: typeof USER_STORAGE;
  payload: string;
}

export type IAction = IGetUserAction | IErrorUserAction | IUserStorageAction;

const userLogReducer = (stateUser = defaultState, action: IAction): IDefaultState => {
  switch (action.type) {
    case GET_USER:
      return { ...stateUser, user: action.payload, error: null };
    case USER_STORAGE:
      return { ...stateUser, userStorage: action.payload };
    case ERROR_USER:
      return { ...stateUser, user: null, error: action.payload };
    default:
      return stateUser;
  }
};

export default userLogReducer;
