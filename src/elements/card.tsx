import { ICard } from "@/interfaces";
import classes from "./elementStyles/card.module.css";

interface ICardCard {
  card: ICard;
}

const Card: React.FC<ICardCard> = ({ card }) => (
  <div className={classes.card}>
    <div className={classes.cardPlace}>
      <div className={classes.frontCard}>
        <div className={classes.topCard}>
          <img className={classes.img} src={card.background} alt="" />
        </div>
        <div className={classes.bottomCard}>
          <div className={classes.priceAndName}>
            <span>{card.game}</span>
            <span className={classes.price}>{card.price}</span>
          </div>
          <div className={classes.rating}>
            {card.stars.map(() => (
              <span key={card.id} className={classes.active} />
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
