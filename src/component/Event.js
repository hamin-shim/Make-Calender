import React, { useEffect } from "react"
import EventData from "../data/eventlist"
import "../style/modal.scss"
export default ({pathDate})=>{
    let correctEvent = []
    EventData.map((data)=>{
        if(data.date === pathDate){
            correctEvent.push(data)
        }
    })
    return(
        <div>
            {correctEvent.map(data=>{
                return(<div className="event">
                    <div className="title">{data.title}</div>
                    <div className="time">{data.time_start}~{data.time_end}</div>
                    <div className="description">{data.description}</div>
                    <button className="btn btn-primary">수정하기</button>
                    <button className="btn btn-primary">삭제하기</button>
                </div>)
            })}
        </div>
    )
}