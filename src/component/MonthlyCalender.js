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
                            <div onClick={onClickHandler} className = {`${parseInt(days.format('D'))} ${wrongNum} day`} key={index}>{(wrongNum) ? null : days.format('D')}</div>
                            </>
                        )
                    })}
            </div>)
        }
        return(result)
    }
    return(
        <div className="wrap">
            <div className="container">
                <main>
                    <h1>월간캘린더입니다</h1>
                    <div className="control">
                        <button className="btn btn-primary" onClick={onMonthSubtracter}>◁◁</button>
                        <span>{specific.format('YYYY-MM')}</span>
                        <button className="btn btn-primary" onClick={onMonthAdder}>▷▷</button>
                    </div>
                    <div className={`monthTotal ${toggle ? "hidden" : null}`}>
                        <div className="week dayName">
                            <div className="day sun">Sun</div>
                            <div className="day">Mon</div>
                            <div className="day">Tue</div>
                            <div className="day">Wed</div>
                            <div className="day">Thu</div>
                            <div className="day">Fri</div>
                            <div className="day sat">Sat</div>
                        </div>
                        {calendarArr()}
                    </div>

                    <div className=
                    {`specific ${toggle ? null : "hidden"}`}>
                    <button onClick={onToggleClick} >되돌아가기</button>
                    <Modal />
                    </div>
                </main>
            </div>
        </div>
    )
}
export default MonthlyCalender;
