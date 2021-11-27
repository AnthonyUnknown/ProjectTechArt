export const RENAME_USERPAGE = "RENAME_USERPAGE";
export const REPHONE_USERPAGE = "REPHONE_USERPAGE";
export const REPIC_USERPAGE = "REPIC_USERPAGE";
export const ERROR_USERPAGE = "ERROR_USERPAGE";

interface IUserPage {
  userName: string;
  userPhone: string;
  userPic: string;
  error: null | string;
}

export interface IRename {
  type: typeof RENAME_USERPAGE;
  payload: string;
}

export interface IRephone {
  type: typeof REPHONE_USERPAGE;
  payload: string;
}

export interface IRepic {
  type: typeof REPIC_USERPAGE;
  payload: string;
}

export interface IError {
  type: typeof ERROR_USERPAGE;
  payload: string | null;
}

const defaultStateUserPage: IUserPage = {
  userName: "UserName",
  userPhone: "Phone",
  userPic:
    "url(https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg)",
  error: null,
};

export type IActionUserPage = IRename | IRephone | IRepic | IError;

const userPageReducer = (stateUserPage = defaultStateUserPage, action: IActionUserPage): IUserPage => {
  switch (action.type) {
    case RENAME_USERPAGE:
      return { ...stateUserPage, userName: action.payload };
    case REPHONE_USERPAGE:
      return { ...stateUserPage, userPhone: action.payload };
    case REPIC_USERPAGE:
      return { ...stateUserPage, userPic: action.payload };
    case ERROR_USERPAGE:
      return { ...stateUserPage, error: action.payload };
    default:
      return stateUserPage;
  }
};

export default userPageReducer;
