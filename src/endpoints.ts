const base = "http://localhost:3000";
const localCards = `${base}/cards?_start=0&_end=3,sort=date&_order=desc`;
const searchGames = (search: string): string => `${base}/cards?game_like=${search}`;
const registerApi = `${base}/register`;
const loginApi = `${base}/login`;
export default { localCards, searchGames, registerApi, loginApi };
