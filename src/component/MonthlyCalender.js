import { useState } from "react";
import moment from 'moment'
import "../style/monthlyCalender.scss"
import { useHistory } from "react-router";
import Modal from "./Modal";
const MonthlyCalender = ({date})=>{
    let year = parseInt(date.substr(0,4));
    let month = parseInt(date.slice(5));
    const [specific,setSpecific] = useState(moment(date,'YYYY-MM'));
    const [getMoment, setMoment] = useState(moment());
    const [toggle, setToggle] = useState(false);
    const history = useHistory();
    const today = getMoment;
    const firstWeek = specific.clone().startOf('month').week();
    const lastWeek = specific.clone().endOf('month').week() === 1 ? 53 : specific.clone().endOf('month').week();
    const onClickHandler = (e)=>{
        const {target:{className : dayId}} = e;
        const dayData = dayId.split(" ");
        const day = dayData[0];
        const isItDate = dayData[1];
        console.log(day, isItDate)
        if(isItDate==="false"){
            history.push(`/month/${year}-${month}-${day}`)
            setToggle(true)
        }
    }
    const onMonthSubtracter = ()=>{
        setSpecific(specific.clone().subtract(1,'month'))
        if(month===1){
            history.push(`/month/${year-1}-12`)
        }else{
            history.push(`/month/${year}-${month-1}`)
        }
    }
    const onMonthAdder = ()=>{
        setSpecific(specific.clone().add(1,'month'))
        if(month===12){
            history.push(`/month/${year+1}-1`)
        }else{
            history.push(`/month/${year}-${month+1}`)
        }
    }
    const onToggleClick = ()=>{
        setToggle(prev=>!prev)
    }
    const calendarArr = ()=>{
        let result = [];
        let week = firstWeek;
        for (week ; week <= lastWeek ; week++){
            result = result.concat(<div className={`week week${week} `} key={week}>
                {
                    Array(7).fill(0).map((data, index)=>{
                        let wrongNum = false;
                        let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                        if((week === firstWeek && parseInt(days.format('D'))>8)||(week===lastWeek && parseInt(days.format('D'))<24)){
                            wrongNum = true;
                        }
                        return (<>
                            <div onClick={onClickHandler} className = {`${parseInt(days.format('D'))} ${wrongNum} day`} key={index}>{(wrongNum) ? null : days.format('D')}
                            {wrongNum ? null : <span className="eventExist">˚</span>}
                            </div>
                            </>
                        )
                    })}
            </div>)
        }
        return(result)
    }
    return(
        <div className="col-lg-6 col-md-8 col-sm-10">
                <main>
                    <div className="control">
                        <button className="btn btn-outline-secondary" onClick={onMonthSubtracter}>◁◁</button>
                        <span>{specific.format('YYYY년 MM월')}</span>
                        <button className="btn btn-outline-secondary" onClick={onMonthAdder}>▷▷</button>
                    </div>
                    <div className={`monthTotal ${toggle ? "hidden" : null}`}>
                        {toggle ?<span onClick={onToggleClick}>달력 펼치기</span> : null}
                        <div className="week dayName">
                            <div className="day sun  word ">Sun</div>
                            <div className="day word ">Mon</div>
                            <div className="day word ">Tue</div>
                            <div className="day word ">Wed</div>
                            <div className="day word ">Thu</div>
                            <div className="day word ">Fri</div>
                            <div className="day word  sat">Sat</div>
                        </div>
                        {calendarArr()}
                    </div>

                    <div className=
                    {`specific ${toggle ? null : "hiddenSpecific"}`}>
                    <Modal />
                    </div>
                </main>
        </div>
    )
}
export default MonthlyCalender;
