import { ICard } from "@/interfaces";
import { useParams } from "react-router-dom";

interface IGameLauncher {
  cards: ICard[];
}

const GameLauncher: React.FC<IGameLauncher> = ({ cards }) => {
  const { title } = useParams();
  return (
    <div>
      Params!!!{title}
      {cards[0].gameLaunch}
    </div>
  );
};

export default GameLauncher;
