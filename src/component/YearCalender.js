import moment from "moment";
import { useState } from "react";
import { useHistory } from "react-router";
import "../style/year.scss";
export default () => {
  const [year, setYear] = useState(moment());
  const thisYear = year;
  const history = useHistory();
  let firstMonth = thisYear.clone().startOf("year");
  // let lastMonth = thisYear.clone().endOf('year');
  let monthArray = [];
  for (let i = 0; i < 12; i++) {
    monthArray.push(firstMonth.clone().add(i, "month"));
  }
  const onClick = (e) => {
    const {
      nativeEvent: {
        path: { length },
      },
    } = e;
    const datePath = e.nativeEvent.path[length - 12].className.substring(6, 13);
    history.push(`/month/${datePath}`);
  };
  const calendarArr = (month) => {
    let result = [];
    let firstWeek = month.clone().startOf("month").week();
    let lastWeek =
      month.clone().endOf("month").week() === 1
        ? 53
        : month.clone().endOf("month").week();
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <div className={`${week} week`} key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let wrongNum = false;
              let days = firstMonth
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");
              if (
                (week === firstWeek && parseInt(days.format("D")) > 8) ||
                (week === lastWeek && parseInt(days.format("D")) < 8)
              ) {
                wrongNum = true;
              }
              return (
                <div className={`day ${wrongNum} ${week} ${index}`} key={index}>
                  {wrongNum ? null : days.format("D")}
                </div>
              );
            })}
        </div>
      );
    }
    return result;
  };
  return (
    <div className="home">
      <div className="control">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setYear(year.clone().subtract(1, "year"));
          }}
        >
          ◁◁
        </button>
        <span>{year.format("YYYY년")}</span>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setYear(year.clone().add(1, "year"));
          }}
        >
          ▷▷
        </button>
      </div>
      <div className="monthLab container">
        <div className="row">
          {monthArray.map((month, i) => (
            <div className="oneMonthLab col-xl-3 col-lg-4 col-6">
              <div
                onClick={onClick}
                className={`month ${year.format("YYYY")}-${String(
                  i + 1
                ).padStart(2, 0)}`}
              >
                <h1>{i + 1}월</h1>
                <div className="week dayName">
                  <div className="day sun">S</div>
                  <div className="day">M</div>
                  <div className="day">T</div>
                  <div className="day">W</div>
                  <div className="day">T</div>
                  <div className="day">F</div>
                  <div className="day sat">S</div>
                </div>
                {calendarArr(month)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
