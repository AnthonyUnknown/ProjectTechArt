export interface ICard {
  id: number;
  background: string;
  game: string;
  price: number;
  text: string;
  stars: Array<string>;
  gameLaunch: Array<string>;
  date: string;
  genre: Array<string>;
  age: Array<string>;
}

export interface IUserUser {
  email: string;
  id: number;
  userName?: string;
  userPhone?: string;
  userImg?: string;
}

export interface IUser {
  accesToken: string;
  user: IUserUser;
}

export interface AppState {
  hasError: boolean;
}

export interface AppProps {
  nothing?: boolean;
}

export interface Ilinks {
  home: string;
  about: string;
  pc?: string;
  xbox?: string;
  playstation?: string;
}

export interface INavHeader {
  onReg: (name: string, password: string) => Promise<void>;
  user?: IUserUser | null;
  onLog?: (name: string, password: string) => Promise<void>;
  onClickSign: () => void;
  isOpenSignIn: boolean;
  onCloseSign: () => void;
  isOpenSignUp: boolean;
  onClickSignUp: () => void;
  onCloseSignUp: () => void;
}

export interface IContext {
  user: IUserUser | null;
  onLog: ((name: string, password: string) => Promise<void>) | null;
}

export interface IChangePass {
  password: string;
  id: number | undefined;
}

export interface IData {
  username: string;
  phone: string;
  background: string;
}

export interface ICardCard {
  card: ICard;
  fetchTopCards?: () => void;
  fetchCards?: () => void;
}
