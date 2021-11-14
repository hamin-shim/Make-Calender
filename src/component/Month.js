import MonthlyCalender from "./MonthlyCalender"
import "../style/month.scss"
import { useParams } from "react-router"
import React, { useState } from "react";
import { firestore } from "./fbase";

const Month = ()=>{
    const {id} = useParams();
    
    const [date, setDate] = useState("");
    const [start_time, setStart_time] = useState("");
    const [end_time, setEnd_time] = useState("");
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        firestore.collection("events").add({
            date,
            start_time,
            end_time,
            title,
            tag,
            description,
            createdAt: Date.now()

        });
        setDate("");
        setStart_time("");
        setEnd_time("");
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
    const onChangeStart_time = (event) => {
        const{
            target: { value },
        } = event;
        setStart_time(value);
    };    
    const onChangeEnd_time = (event) => {
        const{
            target: { value },
        } = event;
        setEnd_time(value);
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
        <MonthlyCalender date={id}/>
        <div className="col-lg-3 col-md-6 col-8 make">
            <form onSubmit = {onSubmit}>
                <label for = "date">일자</label>
                <input value={date} onChange={onChangeDate} name = "date" type="date" placeholder="2000-00-00"/>
                <label for = "start_time">시작 시간</label>
                <input value={start_time} onChange={onChangeStart_time} name = "start_time" type="time" placeholder="00:00"/>
                <label for = "end_time">종료 시간</label>
                <input value={end_time} onChange={onChangeEnd_time} name = "end_time" type="time" placeholder="00:00"/>
                <label for = "title">제목</label>
                <input value={title} onChange={onChangeTitle} name = "title" type="text" placeholder="제목을 입력하세요"/>
                <label for = "tag">태그</label>
                <input value={tag} onChange={onChangeTag} name = "tag" type="text" placeholder="#insert #study"/>
                <label for = "description">설명</label>
                <textarea value={description} onChange={onChangeDescription} name = "description" className="description" placeholder="어떤 일정인가요?" cols="50" rows="5"/>
                <input type="submit" value="Register" />
            </form>
        </div>
        </div>
        </div>
        )
}
export default Month;