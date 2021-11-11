import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./products/homepage";
import AboutPage from "./products/aboutpage";
import SignUp from "./users/signup";
import SignIn from "./users/signin";
import Footer from "./products/footer";

class AppContainer extends Component {
  render() {
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
          </Routes>
          <Footer />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
