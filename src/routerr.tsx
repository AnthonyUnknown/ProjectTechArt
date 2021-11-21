import { Route, BrowserRouter, Routes } from "react-router-dom";
import { register, login } from "@/products/apiHomePage";
import { useState } from "react";
import HomePage from "./products/homePage";
import AboutPage from "./products/aboutPage";
import UserPage from "./users/userPage";
import GameLauncher from "./components/gameLauncher/gameLauncher";
import Header from "./components/header/header";
import Footer from "./products/footer";

interface IUser {
  email: string;
  id: number;
}

const Routerr: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  async function onSubmitReg(name: string, password: string) {
    try {
      await register(name, password);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmitLog(name: string, password: string) {
    try {
      const data = await login(name, password);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <BrowserRouter>
        <div className="page">
          <Header onReg={onSubmitReg} onLog={onSubmitLog} user={user} />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/games/:title" element={<GameLauncher />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
export default Routerr;
