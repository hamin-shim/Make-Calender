import eventlist from "../data/eventlist";
import EachResult from "./EachResult";
import "../style/result.scss";
export default ({data})=>{
    return(
        <div className="result">
            {data.length===0 ? <h3>검색 결과가 없습니다</h3> : null }
            {data.map((each)=>{
            if(each){
                return(
                        <EachResult data={each} />
                )
            }
        })}</div>
    )
}