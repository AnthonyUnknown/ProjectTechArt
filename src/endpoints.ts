const base = "http://localhost:3000";
const localCards = `${base}/cards?_start=0&_end=3&_sort=date&_order=desc`;
const searchGames = (search: string): string => `${base}/cards?game_like=${search}`;
const registerApi = `${base}/register`;
const loginApi = `${base}/login`;
const apiIdUsers = (id: number | undefined): string => `${base}/users/${id}`;
const apiIdCards = (id: number): string => `${base}/cards/${id}`;
const apiCards = `${base}/cards`;
export default { localCards, searchGames, registerApi, loginApi, base, apiIdUsers, apiIdCards, apiCards };
