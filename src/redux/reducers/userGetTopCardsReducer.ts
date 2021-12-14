import { ICard } from "@/interfaces";

export const SET_GAMES = "SET_GAMES";

interface IDefaultState {
  cardsTopGames: ICard[];
}

export interface ISetGameAction {
  type: typeof SET_GAMES;
  payload: ICard[];
}

const defaultState: IDefaultState = {
  cardsTopGames: [],
};

export type IActionTopCards = ISetGameAction;

const userGetTopCardsReducer = (stateTop = defaultState, action: IActionTopCards): IDefaultState => {
  switch (action.type) {
    case SET_GAMES:
      return { ...stateTop, cardsTopGames: action.payload };
    default:
      return stateTop;
  }
};

export default userGetTopCardsReducer;
