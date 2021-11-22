export interface ICard {
  id: number;
  background: string;
  game: string;
  price: string;
  text: string;
  stars: Array<string>;
  gameLaunch: Array<string>;
  date: string;
}

export interface IUserUser {
  email: string;
  id: number;
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
