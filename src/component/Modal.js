import React, {useState, useEffect} from "react"
import { useParams } from "react-router";
import Event from "./Event"
import EventData from "../data/eventlist"
import {firestore} from "./fbase"


export default ({userObject, events})=>{
    const {id:pathDate} = useParams();
    const dateData = pathDate.split("-");
    let correctEvent = []
    


    events.map((data)=>{
        let isOwner = false;
        if(userObject){
            isOwner = data.creatorId === userObject.uid
        }
        if(data.date === pathDate&& isOwner){
            correctEvent.push(data)
        }
    })
    return(
        <div className="wholeEvent">
            <h1>{dateData[2]}</h1>
            <hr/>
            {correctEvent.length===0 ? <p>등록된 일정이 없습니다. 일정 등록 창을 이용해서 일정을 추가해주세요.</p>: null}
            {correctEvent.map(data=>
            <Event data={data} userObject={userObject}/>)}
        </div>
    )
}