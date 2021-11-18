import React, {useState, useEffect} from "react"
import { useParams } from "react-router";
import Event from "./Event"
import EventData from "../data/eventlist"
import {firestore} from "./fbase"


export default ({userObject, events})=>{
    const {id:pathDate} = useParams();
    const dateData = pathDate.split("-");
    let correctEvent = []
    
    //이 부분 수정해야할듯 EventData를 Events(firestore 데이터)로 바꿔야할듯
    events.map((data)=>{
        if(data.date === pathDate&& data.creatorId===userObject.uid){
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