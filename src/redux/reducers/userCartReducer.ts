import { ICard } from "@/interfaces";

export const SET_GAME = "SET_GAME";
export const BUY_GAMES = "BUY_GAMES";
export const REMOVE_GAME = "REMOVE_GAME";
interface IDefaultState {
  cartGames: ICard[];
}

export interface ISetGameAction {
  type: typeof SET_GAME;
  payload: ICard;
}

export interface ISetRemoveAction {
  type: typeof REMOVE_GAME;
  payload: number;
}

export interface ISetBuyAction {
  type: typeof BUY_GAMES;
}

const defaultState: IDefaultState = {
  cartGames: [],
};

export type IAction = ISetGameAction | ISetBuyAction | ISetRemoveAction;

const userCartReducer = (stateCart = defaultState, action: IAction): IDefaultState => {
  switch (action.type) {
    case SET_GAME:
      return { ...stateCart, cartGames: [...stateCart.cartGames, action.payload] };
    case REMOVE_GAME:
      return { ...stateCart, cartGames: stateCart.cartGames.filter((cartGame) => cartGame.id !== action.payload) };
    case BUY_GAMES:
      return { ...stateCart, cartGames: [] };
    default:
      return stateCart;
  }
};

export default userCartReducer;
