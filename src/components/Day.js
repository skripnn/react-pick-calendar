import {newDate} from "../extention/date";
import React from "react";

function Day(props) {
  // React.component - день
  function getDayCSS() {
    // Формирование css-класса дня из даты
    let result = "calendar-day"
    result += props.date.getMonth() % 2 === 0 ? " color0" : " color1"
    if (props.date < newDate()) result += " past"
    if (props.info) result += " busy"
    else if (props.off) result += " busy"
    if (props.pick) result += " pick"
    return result
  }

  function onClick() {
    props.onClick(props.date.format())
  }

  function onMouseOver() {
    props.onMouseOver(props.info, props.date)
  }

  return (
    <div className={getDayCSS()} onClick={onClick} onMouseOver={onMouseOver}>
      {props.date.getDate().toString()}
    </div>
  )
}

export default Day