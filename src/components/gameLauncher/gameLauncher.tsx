/* eslint-disable jsx-a11y/label-has-associated-control */
import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { ICard } from "@/interfaces";
import { toast } from "react-toastify";
import Card from "@/elements/card";
import InputBig from "@/elements/inputBig";
import { apiGamesTypes, apiSearchGames } from "@/products/apiHomePage";
import RadioBtn from "@/elements/radioBtn";
import classes from "./gameLauncherStyles/gameLauncher.module.css";

const GameLauncher: React.FC = () => {
  const { title } = useParams();
  const newTitle = title?.slice(1);
  const [getCards, setGetCards] = useState<ICard[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchGames, setSearchGames] = useState<ICard[]>([]);
  const [criteriaState, setCriteriaState] = useState<string>("price");
  const [typeState, setTypeState] = useState<string>("asc");
  const [genresBtn, setGenresBtn] = useState("all");
  const [agesBtn, setAgesBtn] = useState("all");

  const isRadioSelected = (value: string) => genresBtn === value;
  const isRadioSelectedAge = (value: string) => agesBtn === value;

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setGenresBtn(event.currentTarget.value);
  };

  const onChangeAge = (event: ChangeEvent<HTMLInputElement>): void => {
    setAgesBtn(event.currentTarget.value);
  };

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

  async function fetchCards() {
    try {
      const data = await apiGamesTypes(newTitle, criteriaState, typeState, genresBtn, agesBtn);
      setGetCards(data);
    } catch (e) {
      toast("Error!");
    }
  }

  function onChangeCriteria(event: ChangeEvent<HTMLSelectElement>) {
    setCriteriaState(event.target.value);
  }

  function onChangeType(event: ChangeEvent<HTMLSelectElement>) {
    setTypeState(event.target.value);
  }

  useEffect(() => {
    fetchCards();
  }, [newTitle, criteriaState, typeState, genresBtn, agesBtn]);
  return (
    <div className={classes.gameLaunchWrapper}>
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
      <div className={classes.bottomBlockGL}>
        <div className={classes.categories}>
          <div className={classes.titleGL}>{newTitle}</div>
          <hr className={classes.hr} />
          <div className={classes.titleGL}>Sort</div>
          <hr className={classes.hr} />
          <div className={classes.selectNameBlock}>
            <div className={classes.selectNameBlockLabel}>
              <label htmlFor="selectName">Criteria</label>
            </div>
            <div>
              <select id="selectName" className={classes.selectNameBlockSelect} onChange={onChangeCriteria}>
                <option value="game">Name</option>
                <option value="price">Price</option>
                <option value="stars">Rating</option>
              </select>
            </div>
          </div>
          <div className={classes.selectTypeBlock}>
            <div className={classes.selectTypeBlockLabel}>
              <label htmlFor="selectName">Type</label>
            </div>
            <div>
              <select id="selectName" className={classes.selectNameBlockSelect} onChange={onChangeType}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          <div className={classes.titleGL}>Genres</div>
          <hr className={classes.hr} />
          <div className={classes.genresRadioBtns}>
            <RadioBtn
              type="radio"
              id="radio"
              name="radio-btn"
              value="all"
              labelname="All genres"
              checked={isRadioSelected("all")}
              onChange={onChange}
            />
            <RadioBtn
              type="radio"
              id="radio"
              name="radio-btn"
              value="shooter"
              labelname="Shooter"
              checked={isRadioSelected("shooter")}
              onChange={onChange}
            />
            <RadioBtn
              type="radio"
              id="radio"
              name="radio-btn"
              value="arcade"
              labelname="Arcade"
              checked={isRadioSelected("arcade")}
              onChange={onChange}
            />
            <RadioBtn
              type="radio"
              id="radio"
              name="radio-btn"
              value="survive"
              labelname="Survive"
              checked={isRadioSelected("survive")}
              onChange={onChange}
            />
          </div>
          <div className={classes.titleGL}>Age</div>
          <hr className={classes.hr} />
          <div className={classes.ageRadioBtns}>
            <RadioBtn
              type="radio"
              id="radioAge"
              name="radio-btn-age"
              value="all"
              labelname="All"
              checked={isRadioSelectedAge("all")}
              onChange={onChangeAge}
            />
            <RadioBtn
              type="radio"
              id="radioAge"
              name="radio-btn-age"
              value="six"
              labelname="6+"
              checked={isRadioSelectedAge("six")}
              onChange={onChangeAge}
            />
            <RadioBtn
              type="radio"
              id="radioAge"
              name="radio-btn-age"
              value="twelve"
              labelname="12+"
              checked={isRadioSelectedAge("twelve")}
              onChange={onChangeAge}
            />
            <RadioBtn
              type="radio"
              id="radioAge"
              name="radio-btn-age"
              value="eighteen"
              labelname="18+"
              checked={isRadioSelectedAge("eighteen")}
              onChange={onChangeAge}
            />
          </div>
        </div>
        <div className={classes.GamesBlock}>
          <p className={classes.title}>Products</p>
          <div className={classes.games}>
            {getCards.map((card) => (
              <Card card={card} key={card.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLauncher;
