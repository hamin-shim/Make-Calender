import moment from "moment";
import { useState } from "react";
import "../style/year.scss"
export default ()=>{
    const [year, setYear] = useState(moment());
    const thisYear = year;
    let firstMonth = thisYear.clone().startOf('year');
    let lastMonth = thisYear.clone().endOf('year');
    let monthArray = [];
    for(let i=0; i<12;i++){
        monthArray.push(firstMonth.clone().add(i,'month'))
    }
    const calendarArr = (month) => {
        let result = [];
        let firstWeek = month.clone().startOf('month').week();
        let lastWeek = month.clone().endOf('month').week() === 1 ? 53 : month.clone().endOf('month').week();
        let week = firstWeek;
        for (week ; week <= lastWeek ; week++){
            result = result.concat(
                <div className={`${week} week`} key={week}>
                    {
                        Array(7).fill(0).map((data, index)=>{
                            let wrongNum = false;
                            let days = firstMonth.clone().startOf('year').week(week).startOf('week').add(index,'day');
                            if((week === firstWeek && parseInt(days.format('D'))>8)||(week===lastWeek && parseInt(days.format('D'))<24)){
                                wrongNum = true;
                            }
                            return(
                                <div className="day" key={index}>{(wrongNum) ? null : days.format('D')}</div>
                            )
                        })
                    }
                </div>
            )
        }
        return(result)
    }
    return(
        <div className="home">
            <div className="control">
                <button className="btn btn-primary" onClick={()=>{setYear(year.clone().subtract(1,'year'))}}>◁◁</button>
                <span>{year.format('YYYY년')}</span>
                <button className="btn btn-primary" onClick={()=>{setYear(year.clone().add(1,'year'))}}>▷▷</button>
            </div>
            <div className="whole">
            {monthArray.map((month,i)=>(
                <div className={`month ${i}month`}>
                    <h1>{i+1}월</h1>
                    {calendarArr(month)}
                </div>
            ))}
            </div>
            
        </div>
    )
}
