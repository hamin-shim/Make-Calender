import {useHistory} from 'react-router-dom'
import "../style/navbar.scss"
function Navbar(){
    const history = useHistory();
    const today = new Date();
    const today_year = today.getFullYear();
    const today_month = today.getMonth()+1;
    return(
        <div>
            <div className="container menuBar">
                <div className="row center">
                    <div className="col-4 logo"><h3>Calender</h3></div>
                    <div class="btn-group col-4 " role="group" aria-label="Basic outlined example">
                        <button type="button" className="ymd btn btn-outline-primary" onClick={()=>history.push('/year')}>Y</button>
                        <button type="button" className="ymd btn btn-outline-primary" onClick={()=>history.push(`/month/${today_year}-${today_month}`)}>M</button>
                        <button type="button" className="ymd btn btn-outline-primary" onClick={()=>history.push('/search')}>🔍</button>
                    </div>
                    <div className="login col-4"><button type="button" className="btn btn-outline-primary">Log in</button></div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;