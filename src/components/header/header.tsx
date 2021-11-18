import Nav from "./nav";
import headers from "./headerStyles/header.module.css";

interface IUser {
  email: string;
  id: number;
}

interface IHeader {
  onReg: (name: string, password: string) => Promise<void>;
  user: IUser | null;
  onLog: (name: string, password: string) => Promise<void>;
}

const Header: React.FC<IHeader> = ({ onReg, user, onLog }) => (
  <header className={headers.header}>
    <div className={headers.pageName}>Games Shop</div>
    <Nav onReg={onReg} onLog={onLog} user={user} />
  </header>
);

export default Header;
