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

interface IUserUser {
  email: string;
  id: number;
}

export interface IUser {
  accesToken: string;
  user: IUserUser;
}
