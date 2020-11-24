import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css";

import Home from "./Home";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import Footer from "./Footer";

import Search from "./Search";
import Upload from "./Upload";
import Settings from "./Settings";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        {/* prettier-ignore */}
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/search"><Search /></Route>
          <Route exact path="/upload"><Upload /></Route>
          <Route exact path="/settings"><Settings /></Route>
          <Route path="*"><NotFound /></Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}
