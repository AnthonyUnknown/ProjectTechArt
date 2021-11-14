import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./products/homePage";
import AboutPage from "./products/aboutPage";
import SignUp from "./users/signup";
import SignIn from "./users/signin";
import Footer from "./products/footer";
import GameLauncher from "./components/gameLauncher/gameLauncher";

interface AppProps {
  nothing?: boolean;
}

interface AppState {
  hasError: boolean;
}

class AppContainer extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-main">
          <p>Just Error!</p>
          <button className="error-button" onClick={() => console.log("This is error")} type="button">
            Show error in console
          </button>
        </div>
      );
    }
    return (
      <StrictMode>
        <BrowserRouter>
          <div className="page">
            <Header />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/games/:title" element={<GameLauncher />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
