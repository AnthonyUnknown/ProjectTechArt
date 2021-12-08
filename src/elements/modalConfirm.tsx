import Modal from "@/elements/modal";
import { ICard } from "@/interfaces";
import { deleteCardYes } from "@/products/apiHomePage";
import { toast } from "react-toastify";
import classes from "./elementStyles/modalConfirm.module.css";
import Submit from "./submit";

interface IConfirm {
  isOpenConfirm: boolean;
  closeConfirm: () => void;
  card: ICard;
}

const ModalConfirm: React.FC<IConfirm> = ({ isOpenConfirm, closeConfirm, card }) => {
  async function deleteCard() {
    try {
      await deleteCardYes(card.id);
    } catch (error) {
      toast("Error");
    }
    closeConfirm();
  }
  return (
    <Modal signIn={isOpenConfirm}>
      <div className={classes.confirmWrapper}>
        <div className={classes.sure}>
          <div>Are you sure to delete {card.game}?</div>
        </div>
        <div className={classes.confirmYesNo}>
          <Submit buttonname="Yes" onClick={deleteCard} />
          <Submit buttonname="No" onClick={closeConfirm} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
