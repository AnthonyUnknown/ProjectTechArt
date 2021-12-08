import { FaPlaystation, FaXbox } from "react-icons/fa";
import { AiFillWindows } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ICard, ICardCard } from "@/interfaces";
import { SET_GAME } from "@/redux/reducers/userCartReducer";
import { useState } from "react";
import classes from "./elementStyles/card.module.css";
import ModalEdit from "./modalEdit";
import ModalConfirm from "./modalConfirm";

const platformIconMapping: { [key: string]: React.ReactElement } = {
  pc: <AiFillWindows />,
  playstation: <FaPlaystation />,
  xbox: <FaXbox />,
};

const Card: React.FC<ICardCard> = ({ card }) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const dispatch = useDispatch();
  const localStorageAdmin = localStorage.getItem("admin");

  function addToCart(cartGame: ICard): void {
    dispatch({ type: SET_GAME, payload: cartGame });
  }

  function openEdit() {
    setIsOpenEdit(true);
  }

  function closeEdit() {
    setIsOpenEdit(false);
  }

  function openConfirm() {
    setIsOpenConfirm(true);
  }

  function closeConfirm() {
    setIsOpenConfirm(false);
  }

  function admin() {
    if (localStorageAdmin) {
      return (
        <div>
          <button type="button" className={classes.backCardButton} onClick={openEdit}>
            Edit
          </button>
        </div>
      );
    }
    return null;
  }

  function adminDelete() {
    if (localStorageAdmin) {
      return (
        <div>
          <button type="button" className={classes.backCardButton} onClick={openConfirm}>
            Delete card
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <div className={classes.cardWrapper}>
      <div className={classes.card}>
        <div className={classes.cardPlace}>
          <div className={classes.frontCard}>
            <div className={classes.topCard}>
              <div className={classes.iconsGames}>
                <div className={classes.iconsGamesFlex}>
                  {card.gameLaunch.map((item) => (
                    <div key={Math.random()}>{platformIconMapping[item]}</div>
                  ))}
                </div>
              </div>
              <img className={classes.img} src={card.background} alt="" />
            </div>
            <div className={classes.bottomCard}>
              <div className={classes.priceAndName}>
                <span>{card.game}</span>
                <span className={classes.price}>{card.price}$</span>
              </div>
              <div className={classes.rating}>
                {card.stars.map(() => (
                  <span key={Math.random()} className={classes.active} />
                ))}
              </div>
            </div>
          </div>
          <div className={classes.backCard}>
            <p className={classes.backCardText}>{card.text}</p>
            <div className={classes.buttonsBack}>
              <div>
                <button type="button" className={classes.backCardButton} onClick={() => addToCart(card)}>
                  Add to cart
                </button>
              </div>
              {admin()}
            </div>
            {adminDelete()}
          </div>
        </div>
      </div>
      <ModalEdit isOpenEdit={isOpenEdit} closeEdit={closeEdit} card={card} />
      <ModalConfirm isOpenConfirm={isOpenConfirm} closeConfirm={closeConfirm} card={card} />
    </div>
  );
};

export default Card;
