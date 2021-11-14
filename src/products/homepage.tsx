import InputBig from "@/elements/inputBig";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { AiFillWindows } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Card from "@/elements/card";
import { ICard } from "@/interfaces";
import { ChangeEvent, useState } from "react";
import classes from "./productsStyles/homePage.module.css";

interface ICardMap {
  cards: ICard[];
}

interface IGamer {
  game: string;
}

const HomePage: React.FC<ICardMap> = ({ cards }) => {
  const [search, setSearch] = useState<IGamer[]>([]);

  const topGames = cards.filter((topgame) => topgame.id < 3); // 3 топ игры

  function Changer(event: ChangeEvent<HTMLInputElement>) {
    // поиск
    const searchItem = event.target.value;
    const newFilter = cards.filter((searchcard) => searchcard.game.toLowerCase().includes(searchItem.toLowerCase()));

    if (searchItem === "") {
      // поиск
      setSearch([]);
    } else {
      setSearch(newFilter);
    }
  }

  return (
    <div className={classes.wrapperHomePage}>
      <div className={classes.placeHolderBlock}>
        <InputBig placeholder="Search" onChange={Changer} />
      </div>
      <div className={classes.searchPage}>
        {search.length !== 0 && (
          <div className={classes.result}>
            {search.slice(0, 15).map((gamer: IGamer) => (
              <div
                className={classes.resultItem}
                onKeyDown={() => console.log("")}
                role="button"
                tabIndex={0}
                onClick={() => alert("Got game!")}
              >
                <p>{gamer.game}</p>
              </div>
            ))}
          </div>
        )}
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
          {topGames.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
