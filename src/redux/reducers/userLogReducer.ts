import { IUserUser } from "@/interfaces";

export const ERROR_USER = "ERROR_USER";
export const GET_USER = "GET_USER";

export interface IDefaultState {
  user: IUserUser | null;
  error: string | null;
}

const defaultState: IDefaultState = {
  user: null,
  error: null,
};

export interface IGetUserAction {
  type: typeof GET_USER;
  payload: IUserUser;
}

export interface IErrorUserAction {
  type: typeof ERROR_USER;
  payload: string;
}

export type IAction = IGetUserAction | IErrorUserAction;

const userLogReducer = (stateUser = defaultState, action: IAction): IDefaultState => {
  switch (action.type) {
    case GET_USER:
      return { user: action.payload, error: null };
    case ERROR_USER:
      return { user: null, error: action.payload };
    default:
      return stateUser;
  }
};

export default userLogReducer;