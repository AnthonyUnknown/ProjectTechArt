import { Route, BrowserRouter, Routes } from "react-router-dom";
import { register, login } from "@/products/apiHomePage";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IUserUser } from "@/interfaces";
import HomePage from "./products/homePage";
import AboutPage from "./products/aboutPage";
import UserPage from "./users/userPage";
import GameLauncher from "./components/gameLauncher/gameLauncher";
import Header from "./components/header/header";
import Footer from "./products/footer";
import ProtectedRoute from "./components/protectedRoute";
import "react-toastify/dist/ReactToastify.css";

const Routerr: React.FC = () => {
  const [isOpenSignIn, setIsOpenSignIn] = useState<boolean>(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState<boolean>(false);

  function onClickSign(): void {
    setIsOpenSignIn(true);
  }

  function onCloseSign(): void {
    setIsOpenSignIn(false);
  }

  function onClickSignUp(): void {
    setIsOpenSignUp(true);
  }

  function onCloseSignUp(): void {
    setIsOpenSignUp(false);
  }

  const [user, setUser] = useState<IUserUser | null>(null);

  async function onSubmitReg(name: string, password: string) {
    try {
      await register(name, password);
    } catch (error) {
      toast("Error");
    }
  }

  async function onSubmitLog(name: string, password: string) {
    try {
      const data = await login(name, password);
      setUser(data.user);
    } catch (error) {
      toast("Error");
    }
  }

  return (
    <div>
      <ToastContainer />;
      <BrowserRouter>
        <div className="page">
          <Header
            onReg={onSubmitReg}
            onLog={onSubmitLog}
            user={user}
            onClickSign={onClickSign}
            isOpenSignIn={isOpenSignIn}
            onCloseSign={onCloseSign}
            isOpenSignUp={isOpenSignUp}
            onClickSignUp={onClickSignUp}
            onCloseSignUp={onCloseSignUp}
          />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/about"
            element={
              <ProtectedRoute name={user} onClickSign={onClickSign}>
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="*" element={<HomePage />} />
          <Route
            path="/games/:title"
            element={
              <ProtectedRoute name={user} onClickSign={onClickSign}>
                <GameLauncher />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
export default Routerr;
