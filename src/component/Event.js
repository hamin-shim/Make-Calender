import React, { useEffect, useState } from "react"
import "../style/modal.scss"
export default ({data})=>{
    const [toggle, setToggle] = useState(false)
    const onEditClick = ()=>{
        console.log("clicked")
        setToggle(prev=>!prev)
    }
    const onSubmit = (event)=>{
        event.preventDefault();
        setToggle(false)
    }
    const onCancelClick = ()=>{
        setToggle(false)
    }
    const onDeleteClick = ()=>{
        const ok = window.confirm("정말 삭제하시겠습니까?")
        if(ok){
            //delete
            alert("일정이 삭제되었습니다")
        }
        else{
            console.log("취소하셨습니다")
        }
    }
    return(
        <div className="event">
            <div className="title">{data.title}</div>
            <div className="time">{data.time_start}~{data.time_end}시까지</div>
            <div className="description">{data.description}</div>
            {toggle ? null :<div className="editAndDelete">
                <button onClick={onEditClick} className="btn btn-secondary btn-sm">수정하기</button>
                <button onClick={onDeleteClick} className="btn btn-secondary btn-sm">삭제하기</button>  
            </div>}
            <form className={`editEvent ${ toggle ? null : "hidden"}`} onSubmit={onSubmit}>
                <div className="input-group input-group-sm mb-1">
                    <span className="input-group-text" id="inputGroup-sizing-sm">제목</span>
                    <input className="form-control" type="text"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="수정할 제목"/>
                </div>
                <div class="input-group input-group-sm mb-1">
                    <span class="input-group-text">시작 시간과 종료 시간</span>
                    <input type="time" aria-label="start_time" className="form-control"/>
                    <input type="time" aria-label="end_time" className="form-control"/>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <span className="input-group-text" id="inputGroup-sizing-sm">태그</span>
                    <input className="form-control"type="text"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="#insert #study"/>
                </div>
                <div className="input-group input-group-sm  mb-1">
                    <span className="input-group-text" id="inputGroup-sizing-sm">설명</span>
                    <textarea className="form-control" name = "title"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="어떤 일정으로 수정하실건가요?"  cols="50" rows="5"/>
                </div>
                <div>
                    <input className="btn btn-light btn-sm" type="submit" value="수정하기"/>
                    <input type="button" className="btn btn-light btn-sm" onClick={onCancelClick} value="취소하기"/>
                </div>
            </form>
        </div>
    )
}