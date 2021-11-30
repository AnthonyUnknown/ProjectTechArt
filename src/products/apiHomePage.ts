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
  const resp = await axios.patch(`http://localhost:3000/users/${id}`, {
    password,
  });
  return resp.data;
}

export async function changeData(name: string, phone: string, img: string, id: number | undefined): Promise<IUserUser> {
  const resp = await axios.patch(`http://localhost:3000/users/${id}`, {
    userName: name,
    userPhone: phone,
    userImg: img,
  });
  return resp.data;
}
