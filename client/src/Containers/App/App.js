import React, { Component } from "react";
import Header from "../../Components/Layout/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <AppRouter />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
