import React, {useState, useEffect} from "react"
import { useParams } from "react-router";
import Event from "./Event"
import EventData from "../data/eventlist"
import {firestore} from "./fbase"
import {userObject} from "./App"


export default ({userObject})=>{
    const {id:pathDate} = useParams();
    const dateData = pathDate.split("-");
    let correctEvent = []


    const [events, setEvents] = useState([]);

    // const getEvents = async () => {
    //     const dbEvents = await firestore.collection("events").get();
    //     dbEvents.forEach((document) => {
    //         const EventObject = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         setEvents((prev) => [EventObject, ...prev]);
    //     });
    // }

    useEffect(() => {
        // getEvents();
        firestore.collection("events").onSnapshot(snapshot => {
            const eventArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }));
            setEvents(eventArray);
        });
    }, []);

    
    //이 부분 수정해야할듯 EventData를 Events(firestore 데이터)로 바꿔야할듯
    events.map((data)=>{
        if(data.date ===pathDate){
            correctEvent.push(data)
        }
    })
    return(
        <div className="wholeEvent">
            <h1>{dateData[2]}</h1>
            <hr/>
            {correctEvent.map(data=>
            <Event data={data} userObject={userObject}/>)}
        </div>
    )
}