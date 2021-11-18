import MonthlyCalender from "./MonthlyCalender"
import "../style/month.scss"
import { useParams } from "react-router"
import React, { useEffect, useState } from "react";
import { firestore } from "./fbase";
import Events from "./Events"

const Month = ({ userObject }) => {
    // console.log(userObject);
    const {id} = useParams();
    

    const [date, setDate] = useState("");
    const [time_start, setTime_start] = useState("");
    const [time_end, setTime_end] = useState("");
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");

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
            const eventArray = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data()
            }));
            // setEvents(eventArray)
        });
    }, []);


    const onSubmit = (event) => {
        event.preventDefault();
        firestore.collection("events").add({
            date,
            time_start,
            time_end,
            title,
            tag,
            description,
            createdAt: Date.now(),
            creatorId: userObject.uid,
        });
        setDate("");
        setTime_start("");
        setTime_end("");
        setTitle("");
        setTag("");
        setDescription("");
    };
    const onChangeDate = (event) => {
        const{
            target: { value },
        } = event;
        setDate(value);
    };
    const onChangeTime_start = (event) => {
        const{
            target: { value },
        } = event;
        setTime_start(value);
    };    
    const onChangeTime_end = (event) => {
        const{
            target: { value },
        } = event;
        setTime_end(value);
    }; 
    const onChangeTitle = (event) => {
        const{
            target: { value },
        } = event;
        setTitle(value);
    };
    const onChangeTag = (event) => {
        const{
            target: { value },
        } = event;
        setTag(value);
    };
    const onChangeDescription = (event) => {
        const{
            target: { value },
        } = event;
        setDescription(value);
    };
    useEffect(()=>{

        // console.log(date)
        // console.log(start_time)
        // console.log(end_time)
        // console.log(title)
        // console.log(tag)
        // console.log(description)
    })

    // console.log("hi");
    // console.log(events);
    // console.log("end");

    return(
        <div className="container monthScreen">
            <div className="row">
        <MonthlyCalender date={id} userObject={userObject}/>
        <div className="col-lg-3 col-md-6 col-8 make">
            <form onSubmit = {onSubmit}>
                <label for = "date">일자</label>
                <input value={date} onChange={onChangeDate} name = "date" type="date" placeholder="2000-00-00"/>
                <label for = "time_start">시작 시간</label>
                <input value={time_start} onChange={onChangeTime_start} name = "time_start" type="time" placeholder="00:00"/>
                <label for = "time_end">종료 시간</label>
                <input value={time_end} onChange={onChangeTime_end} name = "time_end" type="time" placeholder="00:00"/>
                <label for = "title">제목</label>
                <input value={title} onChange={onChangeTitle} name = "title" type="text" placeholder="제목을 입력하세요"/>
                <label for = "tag">태그</label>
                <input value={tag} onChange={onChangeTag} name = "tag" type="text" placeholder="#insert #study"/>
                <label for = "description">설명</label>
                <textarea value={description} onChange={onChangeDescription} name = "description" className="description" placeholder="어떤 일정인가요?" cols="50" rows="5"/>
                <input type="submit" value="Register" />
            </form>
            <div>
                {events.map((event) => (
                    <Events key={event.id} EventObject={event} isOwner={true} />//이부분 ture를 event.creatorId === userObject.uid로 바꿔야됨... 고민중
                    ))}
            </div>
        </div>
        </div>
        </div>
        )
}


export default Month;
