import React from "react";
import ReactDOM from "react-dom";
import { App, AuthProvider } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import "./style/index.css";
ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
