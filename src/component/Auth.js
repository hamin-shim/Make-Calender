import React, { useState } from "react";
import { authService, firebaseInstance } from "./fbase"
import "../style/auth.scss"
import { useHistory } from "react-router";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [preview, setPreview] = useState(false)
    const history = useHistory();
    const [error, setError] = useState();

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
    const onPreview = (e)=>{
        setPreview(prev=>!prev)
    }
    const onSocialClick = async (event) => {
        const {target:{name},
        } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        await authService.signInWithPopup(provider);
        history.push("/")
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
            history.push("/")
        } catch (error){
            setError(error.message);
            alert(error.message)
        }finally{
            setError(null)
        }
    };
    
    return(
        <div className="auth">
        <div className="container">
            <h1>Calender: 
                <h2>Make your own Calender</h2>
            </h1>
            <form onSubmit={onSubmit}>
                <input className="email"
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange}
                    />
                <input className="password"
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required                     
                    value={password}
                    onChange={onChange}
                    />
                <input className="btn btn-outline-primary btn-sm submit" type="submit" value={newAccount ? "Sign in":"Log In" } />
                <div className = "btn btn-outline-primary change btn-small" onClick={toggleAccount} onMouseEnter={onPreview} onMouseLeave={onPreview}>Change to 
                {newAccount ? " Log in" : " Create Account"}? </div>
            </form>
            <div>
                <button onClick={onSocialClick} name="google" className="btn btn-outline-primary btn-small google" >or Continue with Google</button>
            </div>
        </div>
    </div>
    );
};

export default Auth;