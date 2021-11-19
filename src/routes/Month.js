import MonthlyCalender from "../component/MonthlyCalender"
import "../style/month.scss"
import { useHistory, useParams } from "react-router"
import React, { useState } from "react";
import { firestore } from "../fbase";

const Month = ({ userObject, events, isLoggedIn }) => {
    const {id} = useParams();
    const [date, setDate] = useState("");
    const [time_start, setTime_start] = useState("");
    const [time_end, setTime_end] = useState("");
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    const onSubmit = (event) => {
        event.preventDefault();
        if(isLoggedIn){

            if(!date){
                alert("날짜를 설정해주세요");
            }
            else if(!time_start || !time_end){
                alert("시작시간과 끝시간을 모두 정해주세요");
            }
            else if(time_start >= time_end){
                alert("시작시간과 끝시간을 확인해주세요");
            }
            else{
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
            }
        }else{
            alert("로그인 후 이용해주세요")
            history.push("/auth")
        }
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
    return(
        <div className="container monthScreen">
            <div className="row">
        <MonthlyCalender date={id} userObject={userObject} events={events} isLoggedIn={isLoggedIn}/>
        <div className="col-lg-3 col-md-6 col-8 make">
            <form onSubmit = {onSubmit}>
                <label htmlFor = "date">일자</label>
                <input value={date} onChange={onChangeDate} name = "date" type="date" placeholder="2000-00-00"/>
                <label htmlFor = "time_start">시작 시간</label>
                <input value={time_start} onChange={onChangeTime_start} name = "time_start" type="time" placeholder="00:00"/>
                <label htmlFor = "time_end">종료 시간</label>
                <input value={time_end} onChange={onChangeTime_end} name = "time_end" type="time" placeholder="00:00"/>
                <label htmlFor = "title">제목</label>
                <input value={title} onChange={onChangeTitle} name = "title" type="text" placeholder="제목을 입력하세요"/>
                <label htmlFor = "tag">태그</label>
                <input value={tag} onChange={onChangeTag} name = "tag" type="text" placeholder="#insert #study"/>
                <label htmlFor = "description">설명</label>
                <textarea value={description} onChange={onChangeDescription} name = "description" className="description" placeholder="어떤 일정인가요?" cols="50" rows="5"/>
                <input type="submit" value="Register" />
            </form>
            {/* <div>
                {events.map((event) => (
                    <Event key={event.id} data={event} userObject={userObject} />//이부분 ture를 event.creatorId === userObject.uid로 바꿔야됨... 고민중
                    ))}
            </div> */}
        </div>
        </div>
        </div>
        )
}


export default Month;