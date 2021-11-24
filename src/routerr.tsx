import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { register } from "@/products/apiHomePage";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
import HomePage from "./products/homePage";
import AboutPage from "./products/aboutPage";
import UserPage from "./users/userPage";
import GameLauncher from "./components/gameLauncher/gameLauncher";
import Header from "./components/header/header";
import Footer from "./products/footer";
import ProtectedRoute from "./components/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store";

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
  async function onReg(name: string, password: string) {
    try {
      await register(name, password);
    } catch (error) {
      toast("Error");
    }
  }

  return (
    <Provider store={store}>
      <div>
        <ToastContainer />
        <BrowserRouter>
          <div className="page">
            <Header
              onReg={onReg}
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
                <ProtectedRoute onClickSign={onClickSign}>
                  <AboutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="*" element={<HomePage />} />
            <Route
              path="/games/:title"
              element={
                <ProtectedRoute onClickSign={onClickSign}>
                  <GameLauncher />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
};
export default Routerr;
