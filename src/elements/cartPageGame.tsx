import { ICard } from "@/interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import classes from "./elementStyles/cartPageGame.module.css";

interface ICardItem {
  card: ICard;
  costChanger: (cost: number) => void;
  onGamesRemove: (gameCardId: number) => void;
  onGamesRemoveCheck: (gameCardId: number) => void;
}

const CartPageGame: React.FC<ICardItem> = ({ card, costChanger, onGamesRemove, onGamesRemoveCheck }) => {
  const [amount, setAmount] = useState(1);
  const [checked, setChecked] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  function onChangeAmount(event: ChangeEvent<HTMLInputElement>) {
    setAmount(Number(event.target.value));
  }
  function onChangeChecked(e: ChangeEvent<HTMLInputElement>) {
    setChecked(!checked);
    if (e.target.checked === true) {
      onGamesRemove(card.id);
    } else if (e.target.checked === false) {
      onGamesRemoveCheck(card.id);
    }
  }
  useEffect(() => {
    costChanger(amount);
  }, [amount]);
  return (
    <div className={classes.tableTitle}>
      <div className={classes.tableTitleItem}>{card.game}</div>
      <div className={classes.tableTitleItem}>
        <select className={classes.selectCP}>
          {card.gameLaunch.map((launcher) => (
            <option key={Math.random()}>{launcher}</option>
          ))}
        </select>
      </div>
      <div className={classes.tableTitleItem}>{today}</div>
      <div className={classes.tableTitleItem}>
        <input className={classes.inputCP} type="number" value={amount} onChange={onChangeAmount} min="1" />
      </div>
      <div className={classes.tableTitleItem}>{card.price}</div>
      <div className={classes.tableTitleItem}>
        <input
          className={classes.checkboxCP}
          type="checkbox"
          checked={checked}
          onChange={onChangeChecked}
          name={card.game}
        />
      </div>
    </div>
  );
};

export default CartPageGame;
