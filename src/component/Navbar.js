import {useHistory} from 'react-router-dom'
import "../style/style.scss"
function Navbar(){
    const history = useHistory();
    return(
        <div>
            <div className="container ">
                <div className="row">
                    <div className="col-1 logo"><h3>Calender</h3></div>
                    <div class="btn-group col-8 ymw" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary" onClick={()=>history.push('/year')}>Y</button>
                        <button type="button" class="btn btn-outline-primary" onClick={()=>history.push('/month')}>M</button>
                        <button type="button" class="btn btn-outline-primary" onClick={()=>history.push('/week')}>W</button>
                    </div>
                    <div className="login col"><button type="button" className="btn btn-outline-primary">Log in</button></div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;