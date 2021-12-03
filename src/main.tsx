import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode, Suspense } from "react";
import ReactDom from "react-dom";
import { AppProps, AppState } from "@/interfaces";
import { Provider } from "react-redux";
import Routerr from "./routerr";
import { store } from "./redux/store";

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
        <Provider store={store}>
          <Routerr />
        </Provider>
      </StrictMode>
    );
  }
}
ReactDom.render(
  <Suspense
    fallback={
      <div style={{ color: "red", fontSize: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        Loading...
      </div>
    }
  >
    <AppContainer />
  </Suspense>,
  document.getElementById("app")
);
