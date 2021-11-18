import { useEffect, useState } from "react";
import eventlist from "../data/eventlist";
import Event from "../data/eventlist";
import "../style/search.scss";
import Result from "./Result";
function Search(){
    const [searchWhat, setSearchWhat] = useState(null);
    const [result, setResult] = useState(null);
    const onSubmit = (e)=>{
        e.preventDefault();
        setResult(searchWhat)
    }
    const searchResult = ()=>{
        Event.map((event)=>{
        console.log(event)
    })}
    useEffect(()=>{
        searchResult()
    })
    return(
        <div className="search">
        <h1>검색 기능</h1>
        <form onSubmit={onSubmit}>
            <div className="searchBar">
            <input className="form-control" type="text" value={searchWhat} onChange={(e)=>{
                setSearchWhat(e.target.value);
            }} placeholder="검색어를 입력하세요 (태그, 제목, 설명 등..)"/>
            <input type="submit" value="Search"/>
            </div>
        </form>
        {

        }
        <Result data = {result}/>
        </div>
    )
}
export default Search;