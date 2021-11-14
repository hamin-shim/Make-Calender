import React from "react"
import { useParams } from "react-router";
import Event from "./Event"
import EventData from "../data/eventlist"

export default ()=>{
    const {id:pathDate} = useParams();
    const dateData = pathDate.split("-");
    let correctEvent = []
    EventData.map((data)=>{
        if(data.date ===pathDate){
            correctEvent.push(data)
        }
    })
    return(
        <div className="wholeEvent">
            <h1>{dateData[2]}</h1>
            <hr/>
            {correctEvent.map(data=>
            <Event data={data}/>)}
        </div>
    )
}