import React, { useState } from "react"
import "../style/modal.scss"
import { firestore } from "../fbase"
const Event = ({data, userObject})=>{
    let screenWidth = window.screen.width;
    console.log(screenWidth<800);
    String.format = function() { 
        let args = arguments;
        return args[0].replace(/{(\d+)}/g, function(match, num) { 
            num = Number(num) + 1;
            return typeof(args[num]) != undefined ? args[num] : match;
        });
    }

    let isOwner = false;
    if(userObject){
        isOwner = data.creatorId === userObject.uid
    }

    const [toggle, setToggle] = useState(false)

    const [newTime_start, setNewTime_start] = useState(data.time_start);
    const [newTime_end, setNewTime_end] = useState(data.time_end);
    const [newTitle, setNewTitle] = useState(data.title);
    const [newTag, setNewTag] = useState(data.tag);
    const [newDescription, setNewDescription] = useState(data.description);

    const onChangeTime_start = (event) => {
        const{
            target: { value },
        } = event;
        setNewTime_start(value);
    };    
    const onChangeTime_end = (event) => {
        const{
            target: { value },
        } = event;
        setNewTime_end(value);
    }; 
    const onChangeTitle = (event) => {
        const{
            target: { value },
        } = event;
        setNewTitle(value);
    };
    const onChangeTag = (event) => {
        const{
            target: { value },
        } = event;
        setNewTag(value);
    };
    const onChangeDescription = (event) => {
        const{
            target: { value },
        } = event;
        setNewDescription(value);
    };

    const onEditClick = ()=>{
        setToggle(prev=>!prev)
    }
    const onSubmit = async (event)=>{
        event.preventDefault();

      
        if(!newTime_start && !newTime_end){
            await firestore.doc(String.format("events/{0}",data.id)).update({
                title: newTitle,
                tag: newTag,
                description: newDescription,
            });
            setToggle(false);
        }
        else if(!newTime_start || !newTime_end){
            alert("시작시간과 끝시간을 모두 정해주세요");
        }
        else if(newTime_start >= newTime_end){
            alert("시작시간과 끝시간을 확인해주세요");
        }
        else{
            await firestore.doc(String.format("events/{0}",data.id)).update({
                time_start: newTime_start,
                time_end: newTime_end,
                title: newTitle,
                tag: newTag,
                description: newDescription,
            });
            setToggle(false);
        }

    }


    const onCancelClick = ()=>{
        setToggle(false)
    }
    const onDeleteClick = async ()=>{
        const ok = window.confirm("정말 삭제하시겠습니까?")
        if(ok){
            await firestore.doc(String.format("events/{0}",data.id)).delete();
            alert("일정이 삭제되었습니다")
        }
        else{
        }
    }

    return(
        <div className="event">
            {isOwner && (
            <>
                <div className="title">{data.title}</div>
                <div className="time">{data.time_start}~{data.time_end}시까지</div>
                <div className="tag">{data.tag}</div>
                <div className="description">{data.description}</div>
                {toggle ? null :<div className="editAndDelete">
                    <button onClick={onEditClick} className="btn btn-secondary btn-sm">수정하기</button>
                    <button onClick={onDeleteClick} className="btn btn-secondary btn-sm">삭제하기</button>  
                </div>}
            </>
            )}

            <form className={`editEvent ${ toggle ? null : "hidden"}`} onSubmit={onSubmit}>
                <div className="input-group input-group-sm mb-1">
                    <span className="input-group-text" id="inputGroup-sizing-sm">제목</span>
                    <input className="form-control" type="text"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="수정할 제목" value={newTitle} onChange={onChangeTitle}/>
                </div>
                {/* <div className="input-group input-group-sm mb-1">
                    <span className="input-group-text">시작/종료</span>
                    <input value={newTime_start} type="time" aria-label="start_time" className="form-control" onChange={onChangeTime_start}/>
                    <input value={newTime_end} type="time" aria-label="end_time" className="form-control" onChange={onChangeTime_end}/>
                </div> */}
                {screenWidth<800 ? <>
                    <div className="input-group input-group-sm mb-1">
                        <span className="input-group-text">시작</span>
                        <input value={newTime_start} type="time" aria-label="start_time" className="form-control" onChange={onChangeTime_start}/>
                    </div>
                    <div className="input-group input-group-sm mb-1">
                        <span className="input-group-text">종료</span>
                        <input value={newTime_end} type="time" aria-label="end_time" className="form-control" onChange={onChangeTime_end}/>
                    </div>
                </> : 
                    <div className="input-group input-group-sm mb-1">
                        <span className="input-group-text">시작/종료</span>
                        <input value={newTime_start} type="time" aria-label="start_time" className="form-control" onChange={onChangeTime_start}/>
                        <input value={newTime_end} type="time" aria-label="end_time" className="form-control" onChange={onChangeTime_end}/>
                    </div>
                }
                <div className="input-group input-group-sm mb-1">
                    <span className="input-group-text" id="inputGroup-sizing-sm">태그</span>
                    <input value={newTag} className="form-control"type="text"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="#insert #study" onChange={onChangeTag}/>
                </div>
                <div className="input-group input-group-sm  mb-1">
                    <span className="input-group-text" id="inputGroup-sizing-sm">설명</span>
                    <textarea value={newDescription} className="form-control" name = "title"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="어떤 일정으로 수정하실건가요?"  cols="50" rows="5" onChange={onChangeDescription}/>
                </div>
                <div>
                    <input className="btn btn-light btn-sm" type="submit" value="수정하기"/>
                    <input type="button" className="btn btn-light btn-sm" onClick={onCancelClick} value="취소하기"/>
                </div>
            </form>
        </div>
    )
}
export default Event;