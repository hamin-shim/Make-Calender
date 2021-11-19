import { useEffect, useState } from "react";
import eventlist from "../data/eventlist";
import Event from "../data/eventlist";
import "../style/search.scss";
import Result from "./Result";
function Search({userObject, events}){
    const [searchWhat, setSearchWhat] = useState(null);
    const [keyWord, setKeyWord] = useState(null)
    const [result, setResult] = useState([]);
    const onSubmit = (e)=>{
        e.preventDefault();
        setKeyWord(searchWhat)
    }
    const searchResult = (keyWord)=>{
        let includedData = []
        events.map((eve)=>{
        if(eve.creatorId===userObject.uid){
            if((eve.title.includes(keyWord))|| //title에 포함되거나
            eve.description.includes(keyWord)|| //description에 포함되거나
            (eve.date.includes(keyWord)|| //date에 포함되어 있거나
            (eve.tag.includes(keyWord)))){ //tag array에 포함되어 있거나
                console.log(eve.title+"는 갖고 있어요"+keyWord)
                includedData.push(eve)
            }
        }
        })
        setResult(includedData)
    }
    useEffect(()=>{
        searchResult(keyWord)
    },[keyWord])
    return(
        <div className="search mt-5" >
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