import { useState } from "react";
import moment from 'moment'

function Month(){
    const [getMoment, setMoment] = useState(moment());
    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    const calendarArr = ()=>{
        let result = [];
        let week = firstWeek;
        for (week ; week <= lastWeek ; week++){
            result = result.concat(<tr key={week}>
                {
                    Array(7).fill(0).map((data, index)=>{
                        let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                        return (
                            <td key={index}><span>{days.format('D')}</span></td>
                        )
                    })}
            </tr>)
        }
        return (result);
    }
    return(
        <div>
            <h1>월간캘린더입니다</h1>
            <div className="control">
                <button onClick={()=>{setMoment(getMoment.clone().subtract(1,'month'))}}>◁◁</button>
                <span>{today.format('YYYY-MM')}</span>
                <button onClick={()=>{setMoment(getMoment.clone().add(1,'month'))}}>▷▷</button>
            </div>
            <table>
                <tbody>
                    {calendarArr()}
                </tbody>
            </table>
        </div>

    )
}
export default Month;
