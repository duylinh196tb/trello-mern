import React, { Component } from "react";
import Header from "../../Components/Layout/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <AppRouter />
        </div>
      </Router>
    );
  }
}

export default App;
