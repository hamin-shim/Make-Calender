import React, { useState, useEffect } from "react";
import { authService } from "./fbase";
import { firestore } from "./fbase";
import AppRouter from "./Router";
import "../style/App.scss"
function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObject, setUserObject] = useState(null)
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true)
        setUserObject(user)
      }else{
        setIsLoggedIn(false)
        setUserObject(null)
      }
      setInit(true)
    })
  },[])
  return (
    <div className="App">
      {init ? (
      <AppRouter isLoggedIn={isLoggedIn} userObject={userObject}/>
      ) : (
        "initializing..."
      )}
    </div>
  );
}

export default App;
