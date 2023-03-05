import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";

render(
  <Provider store={configureStore()}>
    {/* no need to pass state here as reducers have default state */}
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
