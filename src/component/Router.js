import React, { useState } from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
import Month from "./Month";
import Navbar from "./Navbar";
import Search from "./Search";

export default ({isLoggedIn}) => {
    return(
        <>
        <Navbar isLoggedIn={isLoggedIn}/>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/year">
        <Home/>
      </Route>
      <Route path="/month/:id">
        <Month/>
      </Route>
      <Route path="/search">
        <Search/>
      </Route>
      <Route path="/auth">
        <Auth/>
      </Route>
      </>
    );
};