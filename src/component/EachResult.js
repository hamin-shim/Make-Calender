import { useHistory } from "react-router"

const EachResult =  ({data})=>{
    const history = useHistory();
    return(
        <div onClick={()=>{
            history.push(`/month/${data.date}`)//클릭시 그 달 달력으로 이동. 
        }} className="eachResult">
            <h3>{data.title}</h3>
            <h4>{data.date}</h4>
            <h5>{data.description}</h5>
        </div>
    )
}
export default EachResult;