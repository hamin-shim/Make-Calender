import { useState } from "react";
import "../style/search.scss";
function Search(){
    const [searchWhat, setSearchWhat] = useState(null);
    return(
        <div className="search">
        <h1>검색 기능</h1>
        <form>
            <div className="searchBar">
            <input className="form-control" type="text" value={searchWhat} onChange={(e)=>{
                setSearchWhat(e.target.value);
            }} placeholder="검색어를 입력하세요 (태그, 제목, 설명 등..)"/>
            <input type="submit" value="Search"/>
            </div>
        </form>
        </div>
    )
}
export default Search;