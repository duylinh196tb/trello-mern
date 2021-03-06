import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { library } from "@fortawesome/fontawesome-svg-core";
// import "./scss/style.scss";
import {
  faSearch,
  faPlus,
  faBell,
  faEnvelope,
  faKey,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import App from "./Containers/App/App";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./redux";
library.add(faSearch, faPlus, faBell, faEnvelope, faKey, faUser);

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
