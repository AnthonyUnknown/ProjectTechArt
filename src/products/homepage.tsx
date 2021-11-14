import InputBig from "@/elements/inputBig";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { AiFillWindows } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Card from "@/elements/card";
import { ICard } from "@/interfaces";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import classes from "./productsStyles/homePage.module.css";

const HomePage: React.FC = () => {
  const [getCards, setGetCards] = useState<ICard[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchGames, setSearchGames] = useState<ICard[]>([]);

  function searchChanger(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  async function searchCards() {
    try {
      const resp = await axios.get<ICard[]>(`http://localhost:3000/cards?game_like=${search}`);
      setSearchGames(resp.data);
    } catch (e) {
      alert(e);
    }
  }

  async function fetchTopCards() {
    try {
      const response = await axios.get<ICard[]>("http://localhost:3000/cards?_start=0&_end=3,sort=date&_order=desc");
      setGetCards(response.data);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    searchCards();
  }, [search]);

  useEffect(() => {
    fetchTopCards();
  }, []);

  return (
    <div className={classes.wrapperHomePage}>
      <div className={classes.placeHolderBlock}>
        <InputBig placeholder="Search" Changer={searchChanger} />
      </div>
      <div className={classes.searchPage}>
        {searchGames.map((searchgame) => (
          <div className={classes.searcher} key={searchgame.id}>
            {searchgame.game}
          </div>
        ))}
      </div>
      <div className={classes.categories}>
        <p className={classes.categoriesName}>Categories</p>
        <div className={classes.gameIcons}>
          <NavLink className={classes.iconBlock} to="/games/:pc">
            <AiFillWindows className={classes.icon} />
            <p style={{ fontWeight: "bold" }}>PC</p>
          </NavLink>
          <NavLink className={classes.iconBlock} to="/games/:playstation">
            <FaPlaystation className={classes.icon} />
            <p style={{ fontWeight: "bold" }}>Playstation 5</p>
          </NavLink>
          <NavLink className={classes.iconBlock} to="/games/:xbox">
            <FaXbox className={classes.icon} />
            <p style={{ fontWeight: "bold" }}>XBox One</p>
          </NavLink>
        </div>
      </div>
      <div className={classes.topGamesBlock}>
        <p className={classes.title}>New Games</p>
        <div className={classes.threeTopGames}>
          {getCards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
