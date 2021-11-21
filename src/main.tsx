import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { AppProps, AppState } from "@/interfaces";
import Routerr from "./routerr";

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
        <Routerr />
      </StrictMode>
    );
  }
}
ReactDom.render(<AppContainer />, document.getElementById("app"));
