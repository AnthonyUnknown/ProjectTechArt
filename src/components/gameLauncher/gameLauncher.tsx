import { useParams } from "react-router-dom";

const GameLauncher: React.FC = () => {
  const { title } = useParams();
  return <div>Params!!!{title}</div>;
};

export default GameLauncher;
