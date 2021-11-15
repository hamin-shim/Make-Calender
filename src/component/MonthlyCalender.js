import { useEffect, useState } from "react";
import moment from 'moment'
import "../style/monthlyCalender.scss"
import { useHistory } from "react-router";
import Modal from "./Modal";
import EventData from "../data/eventlist"

const MonthlyCalender = ({date})=>{
    let split = date.split("-")
    let year = split[0];
    let month = split[1];
    month = month.padStart(2,0);
    const [specific,setSpecific] = useState(moment(date));
    const [getMoment, setMoment] = useState(moment());
    const [toggle, setToggle] = useState(false);
    const [isEventExist, setIsEventExist] = useState(false);

    const checkEvent = (checkDate)=>{
        let cnt=0;
        EventData.map((day)=>{
            if(day.date===checkDate){
                cnt++;
            }
        })
        return(cnt)
    }
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
            history.push(`/month/${year}-${month}-${String(day).padStart(2,0)}`)
            setToggle(true)
        }
    }
    const onMonthSubtracter = ()=>{
        setSpecific(specific.clone().subtract(1,'month'))
        if(parseInt(month)===1){
            history.push(`/month/${parseInt(year)-1}-12`)
        }else{
            history.push(`/month/${year}-${String(parseInt(month)-1).padStart(2,0)}`)
        }
    }
    const onMonthAdder = ()=>{
        setSpecific(specific.clone().add(1,'month'))
        if(parseInt(month)===12){
            history.push(`/month/${parseInt(year)+1}-1`)
        }else{
            history.push(`/month/${year}-${String(parseInt(month)+1).padStart(2,0)}`)
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
                        let days = specific.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                        if((week === firstWeek && parseInt(days.format('D'))>8)||(week===lastWeek && parseInt(days.format('D'))<8)){
                            wrongNum = true;
                        }
                        return (<>
                            <div onClick={onClickHandler} className = {`${parseInt(days.format('D'))} ${wrongNum} day`} key={index}>{(wrongNum) ? null : days.format('D')}
                            {checkEvent(`${year}-${month}-${parseInt(days.format('D'))}`)&&!wrongNum ? <span className="eventExist">˚</span> : null}
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
