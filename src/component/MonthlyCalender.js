import { useState } from "react";
import moment from 'moment'
import "../style/monthlyCalender.scss"
import { useHistory } from "react-router";
const MonthlyCalender = ()=>{
    const [getMoment, setMoment] = useState(moment());
    const [modal, setModal] = useState([]);
    const history = useHistory();
    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    const onClickHandler = (e)=>{
        const {target:{className : dayId}} = e;
        const dayNum = parseInt(dayId.substr(0,3))
        history.push(`/day/${dayNum}`)
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
                            <div onClick={onClickHandler} className = {`${week}${index} ${wrongNum} day`} key={index}>{(wrongNum) ? null : days.format('D')}</div>
                            {modal[0] ? <h1>hi</h1>:null }
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
                        <button className="btn btn-primary" onClick={()=>{setMoment(getMoment.clone().subtract(1,'month'))}}>◁◁</button>
                        <span>{today.format('YYYY-MM')}</span>
                        <button className="btn btn-primary" onClick={()=>{setMoment(getMoment.clone().add(1,'month'))}}>▷▷</button>
                    </div>
                    <div className="monthTotal">
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
                </main>
            </div>
        </div>
    )
}
export default MonthlyCalender;
