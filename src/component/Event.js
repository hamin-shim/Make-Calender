import React, { useEffect } from "react"
import EventData from "../data/Event"
export default ()=>{
    EventData.map((data)=>console.log(data))
    return(
        <div>
            <div className="title">빼빼로데이</div>
            <div className="start_time">9시</div>
            <div className="end_time">23시</div>
            <div className="description">롯데 상업 데이</div>
        </div>
    )
}