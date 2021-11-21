import { ICard } from "@/interfaces";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { AiFillWindows } from "react-icons/ai";
import classes from "./elementStyles/card.module.css";

interface ICardCard {
  card: ICard;
}

const platformIconMapping: { [key: string]: React.ReactElement } = {
  pc: <AiFillWindows />,
  playstation: <FaPlaystation />,
  xbox: <FaXbox />,
};

const Card: React.FC<ICardCard> = ({ card }) => (
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
            <span className={classes.price}>{card.price}</span>
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
        <div style={{ marginTop: "50px" }}>
          <button type="button" className={classes.backCardButton}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
