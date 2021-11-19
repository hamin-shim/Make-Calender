import React from "react";
import {HashRouter as Router, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Month from "../routes/Month";
import Navbar from "../routes/Navbar";
import Search from "../routes/Search";

export default ({isLoggedIn, userObject, events}) => {
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
        <Month userObject={userObject} events={events} isLoggedIn={isLoggedIn} />
      </Route>
      <Route path="/search">
        <Search userObject={userObject} events={events} isLoggedIn={isLoggedIn}/>
      </Route>
      <Route path="/auth">
        <Auth/>
      </Route>
      </>
    );
};  