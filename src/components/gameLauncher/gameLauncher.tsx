/* eslint-disable jsx-a11y/label-has-associated-control */
import { useParams } from "react-router-dom";
import { RiLoaderLine } from "react-icons/ri";
import { ChangeEvent, useEffect, useState } from "react";
import { ICard } from "@/interfaces";
import { toast } from "react-toastify";
import Card from "@/elements/card";
import InputBig from "@/elements/inputBig";
import { apiGamesTypes, apiSearchGames } from "@/products/apiHomePage";
import RadioBtn from "@/elements/radioBtn";
import classes from "./gameLauncherStyles/gameLauncher.module.css";

interface IRadioBtn {
  idNumber: number;
  type: string;
  id: string;
  name: string;
  value: string;
  labelname: string;
}

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
  const [loader, setLoader] = useState(true);

  const radioBtnsGenres: Array<IRadioBtn> = [
    { idNumber: 1, id: "radio", type: "radio", name: "radio-btn", value: "all", labelname: "All genres" },
    { idNumber: 2, id: "radio", type: "radio", name: "radio-btn", value: "shooter", labelname: "Shooter" },
    { idNumber: 3, id: "radio", type: "radio", name: "radio-btn", value: "arcade", labelname: "Arcade" },
    { idNumber: 4, id: "radio", type: "radio", name: "radio-btn", value: "survive", labelname: "Survive" },
  ];

  const radioBtnsAges: Array<IRadioBtn> = [
    { idNumber: 1, id: "radioAge", type: "radio", name: "radio-btn-age", value: "all", labelname: "All" },
    { idNumber: 2, id: "radioAge", type: "radio", name: "radio-btn-age", value: "six", labelname: "6+" },
    { idNumber: 3, id: "radioAge", type: "radio", name: "radio-btn-age", value: "twelve", labelname: "12+" },
    { idNumber: 4, id: "radioAge", type: "radio", name: "radio-btn-age", value: "eighteen", labelname: "18+" },
  ];

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
      setLoader(false);
      setGetCards(data);
    } catch (e) {
      toast("Error!");
      setLoader(false);
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
          <div className={classes.titleGL}>Sort</div>
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
          <div className={classes.genresRadioBtns}>
            {radioBtnsGenres.map((radioBtn) => (
              <RadioBtn
                radioBtn={radioBtn}
                key={radioBtn.idNumber}
                onChange={onChange}
                checked={isRadioSelected(radioBtn.value)}
              />
            ))}
          </div>
          <div className={classes.titleGL}>Age</div>
          <div className={classes.ageRadioBtns}>
            {radioBtnsAges.map((radioBtn) => (
              <RadioBtn
                radioBtn={radioBtn}
                key={radioBtn.idNumber}
                onChange={onChangeAge}
                checked={isRadioSelectedAge(radioBtn.value)}
              />
            ))}
          </div>
        </div>
        <div className={classes.GamesBlock}>
          <p className={classes.title}>Products</p>
          <div className={classes.games}>
            {loader ? (
              <div>
                Loading games. Wait a bit...
                <div>
                  <RiLoaderLine className={classes} />
                </div>
              </div>
            ) : (
              getCards.map((card) => <Card card={card} key={card.id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLauncher;
