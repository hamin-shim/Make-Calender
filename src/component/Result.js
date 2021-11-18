import eventlist from "../data/eventlist";

export default ({data})=>{
    return(
        <div>{data.map((each)=>{
            if(each){
                return(
                    <div>
                        <h1>{each.title}</h1>
                        <h2>{each.date}</h2>
                        <h3>{each.description}</h3>
                        <hr/>
                    </div>
                )
            }
        })}</div>
    )
}