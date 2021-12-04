import CartPageGame from "@/elements/cartPageGame";
import Submit from "@/elements/submit";
import useTypedSelector from "@/redux/hookSelector/useTypedSelector";
import { BUY_GAMES, REMOVE_GAME } from "@/redux/reducers/userCartReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./cartPageStyles/cartPage.module.css";

const CartPage: React.FC = () => {
  const [gamesCost, setGamesCost] = useState(0);
  const [balance, setBalance] = useState(150);
  const [gamesRemove, setGamesRemove] = useState<number[]>([]);
  const games = useTypedSelector((stateCart) => stateCart.game.cartGames);
  const dispatch = useDispatch();
  function onClickBuy() {
    dispatch({ type: BUY_GAMES });
    setGamesCost(0);
    setBalance(balance - gamesCost);
  }
  function costChanger(cost: number) {
    const coster = games.reduce((sum, current) => sum + Number(current.price) * cost, 0);
    setGamesCost(coster);
  }

  function onGamesRemove(gameCardId: number) {
    setGamesRemove([...gamesRemove, gameCardId]);
  }

  function onGamesRemoveCheck(gameCardId: number) {
    setGamesRemove(gamesRemove.filter((gameRemove) => gameRemove !== gameCardId));
  }

  function onRemove() {
    if (gamesRemove.length) {
      gamesRemove.forEach((gameRemove) => {
        dispatch({ type: REMOVE_GAME, payload: gameRemove });
      });
    }
  }
  return (
    <div className={classes.wrapperCP}>
      <div className={classes.cartBlock}>
        <div className={classes.titleCP}>Cart Page</div>
        <div className={classes.tableTitle}>
          <div className={classes.tableTitleItem}>Name</div>
          <div className={classes.tableTitleItem}>Platform</div>
          <div className={classes.tableTitleItem}>Order date</div>
          <div className={classes.tableTitleItem}>Amount</div>
          <div className={classes.tableTitleItem}>Price($)</div>
          <div className={classes.tableTitleItem} />
        </div>
        {games.length === 0 ? (
          <div className={classes.emptyBasket}>
            <p>Basket is empty</p>
          </div>
        ) : (
          games.map((card) => (
            <CartPageGame
              card={card}
              key={card.id}
              costChanger={costChanger}
              onGamesRemove={onGamesRemove}
              onGamesRemoveCheck={onGamesRemoveCheck}
            />
          ))
        )}
        <div className={classes.submitCP}>
          <Submit buttonname="Remove" onClick={onRemove} />
        </div>
        <div className={classes.bottomCP}>
          <div>{gamesCost}$</div>
          <div>Your balance: {balance}$</div>
          <div>
            <Submit buttonname="Buy" onClick={onClickBuy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
