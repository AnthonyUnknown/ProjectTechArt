import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/header/header";
import HomePage from "./products/homePage";
import AboutPage from "./products/aboutPage";
import SignUp from "./users/signup";
import SignIn from "./users/signin";
import Footer from "./products/footer";
import { ICard } from "./interfaces";
import GameLauncher from "./components/gameLauncher/gameLauncher";

interface AppProps {
  nothing?: boolean;
}

interface AppState {
  hasError: boolean;
  cards: ICard[];
}

class AppContainer extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hasError: false,
      cards: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get<ICard[]>("http://localhost:3000/cards");
      const resp = response.data;
      this.setState({ cards: resp });
    } catch (e) {
      alert(e);
    }
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
            <Route path="/" element={<HomePage cards={this.state.cards} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<HomePage cards={this.state.cards} />} />
            <Route path="/games/:title" element={<GameLauncher cards={this.state.cards} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
