import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css";

import Home from "./Home";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import Footer from "./Footer";

import Search from "./Search";
import Upload from "./Upload";
import Settings from "./Settings";
import Login from "./Login";
import MediaPage from "./MediaPage";
import gsap from "gsap";

export default function App() {
  useEffect(() => {
    let tl = gsap.timeline();
    tl.from(".anim", { rotation: 360 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="anim">
      <Router>
        <div className="App">
          <Navbar />

          {/* prettier-ignore */}
          <Switch>
            <Route exact path="/search"><Search /></Route>
            <Route exact path="/upload"><Upload /></Route>
            <Route exact path="/edit/:name"><Upload /></Route>
            <Route exact path="/settings"><Settings /></Route>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/media/:name"><MediaPage /></Route>
            <Route path="/"><Home /></Route>
          </Switch>

          <Footer />
        </div>
      </Router>
    </div>
  );
}
