import { useState } from "react";

function Search(){
    const [searchWhat, setSearchWhat] = useState(null);
    return(
        <div>
        <h1>검색 기능</h1>
        <form>
            <input className="form-control" type="text" value={searchWhat} onChange={(e)=>{
                setSearchWhat(e.target.value);
            }} placeholder="What do you want to find for?"/>
            <input type="submit" value="Search"/>
        </form>
        </div>
    )
}
export default Search;