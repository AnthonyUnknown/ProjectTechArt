import endpoints from "@/endpoints";
import axios from "axios";
import { ICard } from "@/interfaces";

export default async function apiGetTopCards(): Promise<ICard[]> {
  const response = await axios.get<ICard[]>(`${endpoints.localCards}`);
  return response.data;
}
