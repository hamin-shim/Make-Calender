import React from "react"
import { useParams } from "react-router";
import Event from "./Event"

export default ()=>{
    const {id:pathDate} = useParams();
    const dateData = pathDate.split("-");
    return(
        <div>
            <h1>{dateData[2]}</h1>
            <Event pathDate={pathDate}/>
        </div>
    )
}