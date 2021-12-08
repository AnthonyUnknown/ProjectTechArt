import { useState, lazy, Suspense } from "react";
import { RiLoaderLine } from "react-icons/ri";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { register } from "@/products/apiHomePage";
import { ToastContainer, toast } from "react-toastify";
import HomePage from "./products/homePage";
import Header from "./components/header/header";
import Footer from "./products/footer";
import ProtectedRoute from "./components/protectedRoute";
import "react-toastify/dist/ReactToastify.css";

const CartPage = lazy(() => import("./components/cartPage/cartPage"));
const AboutPage = lazy(() => import("./products/aboutPage"));
const GameLauncher = lazy(() => import("./components/gameLauncher/gameLauncher"));
const UserPage = lazy(() => import("./users/userPage"));

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
            path="/userpage"
            element={
              <ProtectedRoute onClickSign={onClickSign}>
                <Suspense
                  fallback={
                    <div className="loader">
                      <RiLoaderLine className="loaderRi" />
                    </div>
                  }
                >
                  <UserPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute onClickSign={onClickSign}>
                <Suspense
                  fallback={
                    <div className="loader">
                      <RiLoaderLine className="loaderRi" />
                    </div>
                  }
                >
                  <AboutPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<HomePage />} />
          <Route
            path="/games/:title"
            element={
              <ProtectedRoute onClickSign={onClickSign}>
                <Suspense
                  fallback={
                    <div className="loader">
                      <RiLoaderLine className="loaderRi" />
                    </div>
                  }
                >
                  <GameLauncher />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cartpage"
            element={
              <ProtectedRoute onClickSign={onClickSign}>
                <Suspense
                  fallback={
                    <div className="loader">
                      <RiLoaderLine className="loaderRi" />
                    </div>
                  }
                >
                  <CartPage />
                </Suspense>
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
