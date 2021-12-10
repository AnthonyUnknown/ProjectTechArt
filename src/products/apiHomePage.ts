import endpoints from "@/endpoints";
import axios from "axios";
import { ICard, IChangePass, IUser, IUserUser } from "@/interfaces";

export async function apiGetTopCards(): Promise<ICard[]> {
  const response = await axios.get<ICard[]>(`${endpoints.localCards}`);
  return response.data;
}

export async function apiSearchGames(value: string): Promise<ICard[]> {
  const resp = await axios.get<ICard[]>(endpoints.searchGames(value));
  return resp.data;
}

export async function apiGamesTypes(
  newTitle: string | undefined,
  criteriaState: string,
  typeState: string,
  genresBtn: string,
  agesBtn: string
): Promise<ICard[]> {
  const response = await axios.get<ICard[]>(
    `http://localhost:3000/cards?gameLaunch_like=${newTitle}&_sort=${criteriaState}&_order=${typeState}&genre_like=${genresBtn}&age_like=${agesBtn}`
  );
  return response.data;
}

export async function register(mail: string, pass: string): Promise<IUser> {
  const resp = await axios.post(`${endpoints.registerApi}`, {
    email: mail,
    password: pass,
    userName: "Default",
    userPhone: "Default",
    userImg: "Default",
  });
  return resp.data;
}

export async function login(mail: string, pass: string): Promise<IUser> {
  const resp = await axios.post(
    `${endpoints.loginApi}`,
    {
      email: mail,
      password: pass,
    },
    { withCredentials: true, headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } }
  );
  return resp.data;
}

export async function changePassUserApi(password: string, id: number | undefined): Promise<IChangePass> {
  const resp = await axios.patch(endpoints.apiIdUsers(id), {
    password,
  });
  return resp.data;
}

export async function changeData(name: string, phone: string, img: string, id: number | undefined): Promise<IUserUser> {
  const resp = await axios.patch(endpoints.apiIdUsers(id), {
    userName: name,
    userPhone: phone,
    userImg: img,
  });
  return resp.data;
}

export async function changeEdit(
  cardGame: string,
  priceGame: number | string,
  imgGame: string,
  descGame: string,
  categoryGame: string,
  ageGame: string,
  id: number,
  newGameLaunch: string[]
): Promise<void> {
  await axios.patch(endpoints.apiIdCards(id), {
    game: cardGame,
    price: priceGame,
    background: imgGame,
    text: descGame,
    genre: ["all", categoryGame],
    age: ["all", ageGame],
    gameLaunch: newGameLaunch,
  });
}

export async function addCard(
  cardGame: string,
  priceGame: number | string,
  imgGame: string,
  descGame: string,
  categoryGame: string,
  ageGame: string,
  newGameLaunch: string[],
  today: string
): Promise<void> {
  await axios.post(endpoints.apiCards, {
    game: cardGame,
    price: priceGame,
    background: imgGame,
    text: descGame,
    genre: ["all", categoryGame],
    age: ["all", ageGame],
    gameLaunch: newGameLaunch,
    stars: ["1", "2", "3", "4", "5"],
    date: today,
  });
}

export async function deleteCardYes(id: number): Promise<void> {
  await axios.delete(endpoints.apiIdCards(id));
}
