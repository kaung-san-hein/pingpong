import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store/index";
import { Provider } from "react-redux";
import axios from "axios";
import cookie from "js-cookie";
import jwt from "jsonwebtoken";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

const jwt_secret =
  "CfYakBYjv7GdIdeo3RQw2JVN8kxFzlLwt6KcBvbXOuPs8zxii49FlPjFJmvpqkfO";
let token = cookie.get("token");

if (token) {
  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      cookie.remove("token");
      token = null;
    } else {
      if (
        decoded.iss !==
        "http://localhost:8080/pingpong-api/public/api/auth/login"
      ) {
        cookie.remove("token");
        token = null;
      }
    }
  });
}

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios
    .post("http://localhost:8080/pingpong-api/public/api/auth/me")
    .then(res => {
      store.dispatch({ type: "SET_LOGIN", payload: res.data });
      render();
    });
} else {
  render();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
