import moment from "moment"
import { useState } from "react"

const MonthlyCalender =  () =>{
    const [getMoment, setMoment] = useState(moment());
    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week();
    console.log(firstWeek)
    console.log(lastWeek)
    const makeCal = ()=>{
        let calenderArray = [];
        for ( let i=0 ; i <=lastWeek-firstWeek;i++){
            calenderArray.concat(
            <div className={`week${i}`} key={i}>i</div>)
        }
        console.log(calenderArray)
    }
    return(<div>
        hi
        {makeCal}
        </div>)
}
export default MonthlyCalender;