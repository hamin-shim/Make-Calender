import {useHistory} from 'react-router-dom'
import "../style/style.scss"
function Navbar(){
    const history = useHistory();
    return(
        <div>
            <div className="container menuBar">
                <div className="row center">
                    <div className="col-4 logo"><h3>Calender</h3></div>
                    <div class="btn-group col-4 ymw" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary" onClick={()=>history.push('/year')}>Y</button>
                        <button type="button" class="btn btn-outline-primary" onClick={()=>history.push('/month')}>M</button>
                        <button type="button" class="btn btn-outline-primary" onClick={()=>history.push('/week')}>W</button>
                    </div>
                    <div className="login col-4"><button type="button" className="btn btn-outline-primary">Log in</button></div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;