import InputBig from "@/elements/inputBig";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { AiFillWindows } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Card from "@/elements/card";
import { ICard } from "@/interfaces";
import { useState, useEffect, ChangeEvent } from "react";
import { debounce } from "lodash";
import classes from "./productsStyles/homePage.module.css";
import { apiGetTopCards, apiSearchGames } from "./apiHomePage";

const HomePage: React.FC = () => {
  const [getCards, setGetCards] = useState<ICard[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchGames, setSearchGames] = useState<ICard[]>([]);
  async function searchChanger(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);

    if (event.target.value === "") {
      return setSearchGames([]);
    }
    try {
      const data = await apiSearchGames(event.target.value);
      setSearchGames(data);
      return null;
    } catch (e) {
      alert(e);
    }
    return null;
  }

  const debounceSearchChanger = debounce(searchChanger, 300);

  async function fetchTopCards() {
    try {
      const data = await apiGetTopCards();
      setGetCards(data);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    fetchTopCards();
  }, []);

  return (
    <div className={classes.wrapperHomePage}>
      <div className={classes.placeHolderBlock}>
        <InputBig value={search} placeholder="Search" onChange={debounceSearchChanger} />
      </div>
      <div className={classes.searchPage}>
        {searchGames.map((searchgame) => (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => alert("Got item!")}
            onClick={() => alert("Got item!")}
            className={classes.searcher}
            key={Math.random()}
          >
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
            <Card card={card} key={Math.random()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
