import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import {Link, Route, Switch} from 'react-router-dom'
import Home from './Home';
import Month from './Month';
import MonthlyCalender from './MonthlyCalender';
import Navbar from './Navbar';
import { authService } from "./fbase";
import { firestore } from "./fbase";
import Search from "./Search";
import AppRouter from "./Router";

function App() {
  return (
    <div className="App">
      <Navbar/>
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
    </div>
  );
}

export default App;
