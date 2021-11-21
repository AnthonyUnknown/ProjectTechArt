import endpoints from "@/endpoints";
import axios from "axios";
import { ICard, IUser } from "@/interfaces";

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
