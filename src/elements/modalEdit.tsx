/* eslint-disable jsx-a11y/label-has-associated-control */
import { ICard } from "@/interfaces";
import { ChangeEvent, useState } from "react";
import { changeEdit } from "@/products/apiHomePage";
import { toast } from "react-toastify";
import Modal from "./modal";
import classes from "./elementStyles/modalEdit.module.css";
import CrossButton from "./crossButton";
import InputSign from "./inputSign";
import Submit from "./submit";

interface IModalEdit {
  isOpenEdit: boolean;
  closeEdit: () => void;
  card: ICard;
}

const ModalEdit: React.FC<IModalEdit> = ({ isOpenEdit, closeEdit, card }) => {
  const [cardGame, setCardGame] = useState(card.game);
  const [categoryGame, setCategoryGame] = useState(card.genre[1]);
  const [priceGame, setPriceGame] = useState(card.price);
  const [imgGame, setImgGame] = useState(card.background);
  const [descGame, setDescGame] = useState(card.text);
  const [ageGame, setAgeGame] = useState(card.age[1]);
  const [checkPC, setCheckPC] = useState(card.gameLaunch.includes("pc"));
  const [checkPS, setCheckPS] = useState(card.gameLaunch.includes("playstation"));
  const [checkXB, setCheckXB] = useState(card.gameLaunch.includes("xbox"));
  const [newGameLaunch, setNewGameLaunch] = useState<string[]>([]);

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
    console.log(newGameLaunch);
  }

  function onChangeCheckPS(e: ChangeEvent<HTMLInputElement>) {
    setCheckPS(!checkPS);
    if (e.target.checked === true) {
      setNewGameLaunch([...newGameLaunch, "playstation"]);
    } else if (e.target.checked === false) {
      setNewGameLaunch(newGameLaunch.filter((newGameLauncher) => newGameLauncher !== "playstation"));
    }
    console.log(newGameLaunch);
  }

  function onChangeCheckXB(e: ChangeEvent<HTMLInputElement>) {
    setCheckXB(!checkXB);
    if (e.target.checked === true) {
      setNewGameLaunch([...newGameLaunch, "xbox"]);
    } else if (e.target.checked === false) {
      setNewGameLaunch(newGameLaunch.filter((newGameLauncher) => newGameLauncher !== "xbox"));
    }
    console.log(newGameLaunch);
  }
  async function submitEdit() {
    try {
      await changeEdit(cardGame, priceGame, imgGame, descGame, categoryGame, ageGame, card.id, newGameLaunch);
    } catch (error) {
      toast("Error!");
    }
    closeEdit();
  }

  return (
    <Modal signIn={isOpenEdit}>
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
              <InputSign labelname="Price" value={priceGame} type="text" name="cardPrice" onChange={onChangePrice} />
            </div>
            <div>
              <InputSign labelname="Image" value={imgGame} type="text" name="cardImg" onChange={onChangeImg} />
            </div>
            <div>
              <InputSign labelname="Description" value={descGame} type="text" name="cardDesc" onChange={onChangeDesc} />
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
          <Submit buttonname="Submit" onClick={submitEdit} />
          <Submit buttonname="Delete" />
        </div>
      </div>
    </Modal>
  );
};

export default ModalEdit;
