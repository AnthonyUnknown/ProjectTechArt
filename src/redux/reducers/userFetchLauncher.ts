import { ICard } from "@/interfaces";

export const SET_GAMES = "SET_GAMES";

interface IDefaultState {
  cardsLauncherGames: ICard[];
}

export interface ISetGameAction {
  type: typeof SET_GAMES;
  payload: ICard[];
}

const defaultState: IDefaultState = {
  cardsLauncherGames: [],
};

export type IActionLauncher = ISetGameAction;

const userFetchLauncher = (stateLauncher = defaultState, action: IActionLauncher): IDefaultState => {
  switch (action.type) {
    case SET_GAMES:
      return { ...stateLauncher, cardsLauncherGames: action.payload };
    default:
      return stateLauncher;
  }
};

export default userFetchLauncher;
