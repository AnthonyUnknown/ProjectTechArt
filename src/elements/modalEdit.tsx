/* eslint-disable jsx-a11y/label-has-associated-control */
import { ICard } from "@/interfaces";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { addCard, changeEdit } from "@/products/apiHomePage";
import { toast } from "react-toastify";
import Modal from "./modal";
import classes from "./elementStyles/modalEdit.module.css";
import CrossButton from "./crossButton";
import InputSign from "./inputSign";
import Submit from "./submit";

interface IModalEdit {
  isOpenEdit: boolean;
  closeEdit: () => void;
  card?: ICard;
  fetchCards?: () => void;
  fetchTopCards?: () => void;
}

const ModalEdit: React.FC<IModalEdit> = ({ isOpenEdit, closeEdit, card, fetchCards, fetchTopCards }) => {
  const [cardGame, setCardGame] = useState(card ? card.game : "");
  const [categoryGame, setCategoryGame] = useState(card ? card.genre[1] : "");
  const [priceGame, setPriceGame] = useState<string | number>(card ? card.price : "");
  const [imgGame, setImgGame] = useState(
    card ? card.background : "https://static.thenounproject.com/png/104062-200.png"
  );
  const [descGame, setDescGame] = useState(card ? card.text : "");
  const [ageGame, setAgeGame] = useState(card ? card.age[1] : "");
  const [checkPC, setCheckPC] = useState(card ? card.gameLaunch.includes("pc") : false);
  const [checkPS, setCheckPS] = useState(card ? card.gameLaunch.includes("playstation") : false);
  const [checkXB, setCheckXB] = useState(card ? card.gameLaunch.includes("xbox") : false);
  const [newGameLaunch, setNewGameLaunch] = useState<string[]>([]);
  const today = new Date().toISOString().slice(0, 10);

  function onChangeCardName(e: ChangeEvent<HTMLInputElement>) {
    setCardGame(e.target.value);
  }

  function onChangeCategory(e: ChangeEvent<HTMLInputElement>) {
    setCategoryGame(e.target.value);
  }

  function onChangePrice(e: ChangeEvent<HTMLInputElement>) {
    setPriceGame(e.target.value);
  }

  function onChangeImg(e: ChangeEvent<HTMLInputElement>) {
    setImgGame(e.target.value);
  }

  function onChangeDesc(e: ChangeEvent<HTMLInputElement>) {
    setDescGame(e.target.value);
  }

  function onChangeAge(e: ChangeEvent<HTMLSelectElement>) {
    setAgeGame(e.target.value);
  }

  function onChangeCheckPC(e: ChangeEvent<HTMLInputElement>) {
    setCheckPC(!checkPC);
    if (e.target.checked === true) {
      setNewGameLaunch([...newGameLaunch, "pc"]);
    } else if (e.target.checked === false) {
      setNewGameLaunch(newGameLaunch.filter((newGameLauncher) => newGameLauncher !== "pc"));
    }
  }

  function onChangeCheckPS(e: ChangeEvent<HTMLInputElement>) {
    setCheckPS(!checkPS);
    if (e.target.checked === true) {
      setNewGameLaunch([...newGameLaunch, "playstation"]);
    } else if (e.target.checked === false) {
      setNewGameLaunch(newGameLaunch.filter((newGameLauncher) => newGameLauncher !== "playstation"));
    }
  }

  function onChangeCheckXB(e: ChangeEvent<HTMLInputElement>) {
    setCheckXB(!checkXB);
    if (e.target.checked === true) {
      setNewGameLaunch([...newGameLaunch, "xbox"]);
    } else if (e.target.checked === false) {
      setNewGameLaunch(newGameLaunch.filter((newGameLauncher) => newGameLauncher !== "xbox"));
    }
  }

  async function onSubmitNewCard(e: SyntheticEvent) {
    e.preventDefault();
    try {
      if (card) {
        await changeEdit(cardGame, priceGame, imgGame, descGame, categoryGame, ageGame, card.id, newGameLaunch);
      } else {
        await addCard(cardGame, priceGame, imgGame, descGame, categoryGame, ageGame, newGameLaunch, today);
      }
      if (fetchTopCards) {
        fetchTopCards();
      }
      if (fetchCards) {
        fetchCards();
      }
    } catch (error) {
      toast("Error!");
    }
    closeEdit();
  }

  return (
    <Modal signIn={isOpenEdit}>
      <form onSubmit={onSubmitNewCard}>
        <div className={classes.modalEditWrapper}>
          <div className={classes.editAndBut}>
            <p className={classes.editTitle}>Edit Card</p>
            <div className={classes.crossBtn}>
              <CrossButton onClick={closeEdit} />
            </div>
          </div>
          <div className={classes.imgAndInf}>
            <p>Card image</p>
            <p>Information</p>
          </div>
          <div className={classes.cardInf}>
            <div
              className={classes.cardPageImg}
              style={{
                backgroundImage: `url(${imgGame})`,
              }}
            />
            <div className={classes.inf}>
              <div>
                <InputSign labelname="Name" value={cardGame} type="text" name="cardName" onChange={onChangeCardName} />
              </div>
              <div>
                <InputSign
                  labelname="Category"
                  value={categoryGame}
                  type="text"
                  name="cardCategory"
                  onChange={onChangeCategory}
                />
              </div>
              <div>
                <InputSign
                  labelname="Price"
                  value={String(priceGame)}
                  type="text"
                  name="cardPrice"
                  onChange={onChangePrice}
                />
              </div>
              <div>
                <InputSign labelname="Image" value={imgGame} type="text" name="cardImg" onChange={onChangeImg} />
              </div>
              <div>
                <InputSign
                  labelname="Description"
                  value={descGame}
                  type="text"
                  name="cardDesc"
                  onChange={onChangeDesc}
                />
              </div>
              <div className={classes.selectAge}>
                <div>Age</div>
                <select className={classes.selectModalEdit} onChange={onChangeAge}>
                  <option value="six">6+</option>
                  <option value="twelve">12+</option>
                  <option value="eighteen">18+</option>
                </select>
              </div>
              <p className={classes.platform}>Platform</p>
              <div className={classes.checkboxBlock}>
                <label htmlFor="pc">PC</label>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="pc"
                  checked={checkPC}
                  onChange={onChangeCheckPC}
                />
              </div>
              <div className={classes.checkboxBlock}>
                <label htmlFor="pc">Playstation</label>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="playstation"
                  checked={checkPS}
                  onChange={onChangeCheckPS}
                />
              </div>
              <div className={classes.checkboxBlock}>
                <label htmlFor="pc">Xbox One</label>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="xbox"
                  checked={checkXB}
                  onChange={onChangeCheckXB}
                />
              </div>
            </div>
          </div>
          <div className={classes.buttons}>
            {card ? <Submit buttonname="Submit" /> : <Submit buttonname="Add card" />}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEdit;
