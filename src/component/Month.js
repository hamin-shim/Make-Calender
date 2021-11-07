import MonthlyCalender from "./MonthlyCalender"
import "../style/month.scss"
const Month = ()=>{
    return(
        <div className="screen">
        <MonthlyCalender/>
        <div className="make">
            <form>
                <p>날짜:<input type="text" placeholder="2000-00-00"/></p>
                <p>시간:<input type="text" placeholder="00:00~00:00"/></p>
                <p>제목:<input type="text" placeholder="제목을 입력하세요"/></p>
                <p>태그:<input type="text" placeholder="#insert #study"/></p>
                <p>설명:<input className="description" type="text" placeholder="어떤 일정인가요?" size="1000"/></p>
            </form>
        </div>
        </div>
        )
}
export default Month;