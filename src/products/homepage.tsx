import InputBig from "@/elements/inputBig";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { AiFillWindows } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Card from "@/elements/card";
import { ICard } from "@/interfaces";
import { useState, useEffect, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getTopThreeCards } from "@/redux/actionFunctions";
import useTypedSelector from "@/redux/hookSelector/useTypedSelector";
import classes from "./productsStyles/homePage.module.css";
import { apiSearchGames } from "./apiHomePage";

const HomePage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchGames, setSearchGames] = useState<ICard[]>([]);
  const searchChanger = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    if (event.target.value === "") {
      return setSearchGames([]);
    }
    try {
      const data = await apiSearchGames(event.target.value);
      setSearchGames(data);
      return null;
    } catch (e) {
      toast("Error");
    }
    return null;
  };

  const dispatch = useDispatch();

  function fetchTopCards(): void {
    dispatch(getTopThreeCards());
  }

  useEffect(() => {
    fetchTopCards();
  }, []);

  const getCards = useTypedSelector((stateTop) => stateTop.topCards.cardsTopGames);

  return (
    <div className={classes.wrapperHomePage}>
      <div className={classes.placeHolderBlock}>
        <InputBig value={search} placeholder="Search" onChange={searchChanger} />
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
          <NavLink className={classes.iconBlock} to="/games/pc">
            <AiFillWindows className={classes.icon} />
            <p style={{ fontWeight: "bold" }}>PC</p>
          </NavLink>
          <NavLink className={classes.iconBlock} to="/games/playstation">
            <FaPlaystation className={classes.icon} />
            <p style={{ fontWeight: "bold" }}>Playstation 5</p>
          </NavLink>
          <NavLink className={classes.iconBlock} to="/games/xbox">
            <FaXbox className={classes.icon} />
            <p style={{ fontWeight: "bold" }}>XBox One</p>
          </NavLink>
        </div>
      </div>
      <div className={classes.topGamesBlock}>
        <p className={classes.title}>New Games</p>
        <div className={classes.threeTopGames}>
          {getCards.map((card) => (
            <Card card={card} key={card.id} fetchTopCards={fetchTopCards} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
