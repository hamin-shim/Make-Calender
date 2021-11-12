import React, { useState } from "react";
import { authService, firebaseInstance } from "./fbase"
import "../style/auth.scss"
import { useHistory } from "react-router";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const history = useHistory();
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: { name, value },
        }=event;
        if(name === "email"){
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {target:{name},
        } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
        history.push("/")
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
            history.push("/")
        } catch (error){
            setError(error.message);
        }
    };
    
    return(
        <div className="auth">
        <div className="container">
            <span onClick={toggleAccount}>{newAccount ? "Log in" : "Create Account"}</span>
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange}
                    />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required                     
                    value={password}
                    onChange={onChange}
                    />
                <input type="submit" value={newAccount ? "Create new Account":"Log In" } />
                {error}
            </form>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
            </div>
        </div>
    </div>
    );
};

export default Auth;