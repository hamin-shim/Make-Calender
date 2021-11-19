import {useHistory} from 'react-router-dom'
import "../style/navbar.scss"
import { authService } from './fbase';

function Navbar({isLoggedIn}){
    const history = useHistory();
    const today = new Date();
    const today_year = today.getFullYear();
    const today_month = today.getMonth()+1;
    const today_day = today.getDate();
    const logClick = ()=>{
        if(isLoggedIn){
            authService.signOut()
            history.push("/")
        }else{
            history.push("/auth")
        }
    }
    const searchClick = ()=>{
        if(isLoggedIn){
            history.push('/search');
        }
        else{
            alert("로그인 해주세요");
        }
    }
    return(
        <div>
            <div className="container menuBar">
                <div className="row center">
                    <div className="col-4 logo"><h3>Calender</h3></div>
                    <div class="btn-group col-4 " role="group" aria-label="Basic outlined example">
                        <button type="button" className="ymd btn btn-outline-primary" onClick={()=>history.push('/year')}>Y</button>
                        <button type="button" className="ymd btn btn-outline-primary" onClick={()=>history.push(`/month/${today_year}-${today_month}-${today_day}`)}>M</button>
                        <button type="button" className="ymd btn btn-outline-primary" onClick={searchClick}>🔍</button>
                    </div>
                    <div className="login col-4"><button type="button" className="btn btn-outline-primary" name="google" onClick={logClick}>{isLoggedIn ? "Log out" : "Log in"}</button></div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;