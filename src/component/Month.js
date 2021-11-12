import MonthlyCalender from "./MonthlyCalender"
import "../style/month.scss"
import { useParams } from "react-router"
const Month = ()=>{
    const {id} = useParams();
    return(
        <div className="container">
            <div className="row">
        <MonthlyCalender date={id}/>
        <div className="col-lg-3 col-md-4 col-6 make">
            <form>
                <label for = "date">일자</label>
                <input name = "date" type="date" placeholder="2000-00-00"/>
                <label for = "start_time">시작 시간</label>
                <input name = "start_time" type="time" placeholder="00:00"/>
                <label for = "end_time">종료 시간</label>
                <input name = "end_time" type="time" placeholder="00:00"/>
                <label for = "title">제목</label>
                <input name = "title" type="text" placeholder="제목을 입력하세요"/>
                <label for = "tag">태그</label>
                <input name = "tag" type="text" placeholder="#insert #study"/>
                <label for = "description">설명</label>
                <textarea name = "description" className="description" placeholder="어떤 일정인가요?" cols="50" rows="5"/>
            </form>
        </div>
        </div>
        </div>
        )
}
export default Month;