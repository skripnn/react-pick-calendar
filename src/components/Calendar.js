import React, {useEffect, useState} from "react";

import {propTypes, defaultProps} from '../extention/propTypes'
import '../extention/Calendar.css'
import "../extention/date"
import {getMonth, newDate} from "../extention/date";
import sortSet from "../extention/sortSet";
import weeksCounter from "../extention/weeksCounter";

import ButtonScroll from "./ButtonScroll";
import DaysNames from "./DaysNames";
import TextLine from "./TextLine";
import YearText from "./YearText";
import MonthText from "./MonthText";
import Days from "./Days";
import Day from "./Day";


let getTimeOut = {
  lastStart: null,
  lastEnd: null,
  timeout: null
}
let tch = {
  x: undefined,
  mov: 0,
  startTime: 0,
  element: undefined,
  movSum: undefined,
  tailInterval: undefined,
  timeOut: undefined
}
let loading = true


function Calendar (props) {
  // React.component - Календарь
  const ref = React.createRef()

  let startDate = props.startDate? newDate(props.startDate).monday() : undefined
  let endDate = props.endDate? newDate(props.endDate).monday().offsetDays(7) : undefined

  const [startOffset, setStartOffset] = useState(props.offset)
  const [init, setInit] = useState(props.init)
  const [content, setContent] = useState({
    days: props.init? props.init.days || {} : {},
    daysOff: props.init? sortSet(props.init.daysOff): new Set(),
    daysPick: props.init? sortSet(props.init.daysPick): new Set()
  })
  const [state, setState] = useState({
    weeks: [],
    years: [],
    months: [],
    marginLeft: 0
  })

  useEffect(() => {
    ref.current.addEventListener('wheel', e => e.preventDefault(), { passive: false });
    setState(render())
    loading = false
    document.addEventListener("touchstart", start, true);
    document.addEventListener("touchmove", move, true);
    document.addEventListener("touchend", stop, true);
    document.addEventListener("touchleave", stop, true);
    document.addEventListener("touchcancel", stop, true);
    window.onresize = () => refresh()
  }, [])

  useEffect(refresh, [content])

  useEffect(() => {
    if (props.init !== init) {
      setInit(props.init)
      setContent({
        days: props.init.days || content.days,
        daysOff: props.init.daysOff? sortSet(props.init.daysOff) : content.daysOff,
        daysPick: props.init.daysPick? sortSet(props.init.daysPick) : content.daysPick
      })
    }
  }, [props])

  function render(scroll=0, prevState) {
    /* рендер нового state */

    // 1 - получение ширины блока
    const element = ref.current? ref.current : document.querySelector('.calendar-right')
    let mainWidth = element? element.getBoundingClientRect().width : 52 * 24


    // 2 - получение стартовой даты
    // случай без условий
    let start = newDate().monday()
    let marginLeft = 0

    // если offset = True - старт на первый отмеченный день
    if (startOffset && content.daysPick.size > 0) start = newDate([...content.daysPick][0].monday())

    // если старт раньше левой границы календаря
    if (startDate && start < startDate) start = startDate

    // если есть предыдущее состояние
    if (prevState) {
      start = newDate(prevState.weeks[0].key)
      marginLeft = prevState.marginLeft - scroll
      if (scroll !== 0) {
        let weeksOffset = weeksCounter(marginLeft)
        start.offsetWeeks(-weeksOffset)

        // если старт раньше левой границы календаря
        if (startDate && start < startDate) {
          start = startDate
          if (marginLeft > 0) marginLeft = 0
        }

        if (marginLeft > 0) marginLeft = marginLeft % 24 - 24
        else if (marginLeft < 23) marginLeft = marginLeft % 24
      }
    }

    let weeksCount = weeksCounter(mainWidth) + (marginLeft? 1 : 0)


    // 3 - получение конечной даты
    let stop = newDate(start).offsetWeeks(weeksCount)
    // если конец дальше правой границы календаря
    if (endDate && endDate < stop) {
      start = newDate(endDate).offsetWeeks(-weeksCounter(mainWidth))
      // если старт раньше левой границы календаря
      if (startDate && start < startDate) {
        start = startDate
        mainWidth = endDate.getDiffWeeks(start) * 24
      }
      weeksCount = weeksCounter(mainWidth)
      if (scroll > 0) marginLeft = - (weeksCount * 24 - mainWidth)
    }


    // 4 - объявление переменных
    let weeks = []
    let years = []
    let months = []
    let tempYear = {}
    let tempMonth = {}
    let textWidth = 0


    // 5 - итерация по неделям
    for (let i = 0; i < weeksCount; i++) {
      let date = newDate(start).offsetWeeks(i)

      // ограничение на добавление текста дальше правой границы календаря
      if (textWidth < mainWidth) {
        let width = 24
        if (i === 0) width += marginLeft

        // месяц
        const month = date.getMonth()
        if (month !== tempMonth.month) {
          if (tempMonth.width) {
            months.push(<MonthText key={tempYear.year + '-' + getMonth(tempMonth.month)} {...tempMonth}/>)
          }
          tempMonth = {
            month: month,
            width: 0
          }
        }
        tempMonth.width += width

        // год
        const year = date.getFullYear()
        if (year !== tempYear.year) {
          if (tempYear.width) {
            years.push(<YearText key={tempYear.year} {...tempYear}/>)
          }
          tempYear = {
            year: year,
            width: 0
          }
        }
        tempYear.width += width

        // счетчик ширины блока с текстом
        textWidth += width
      }

      // добавление дней
      weeks.push(week(date))
    }

    // 6 - обработка и добавление последних текстовых компонентов
    if (weeksCount > 0) {
      let width = 0
      if (textWidth > mainWidth) {
        width -= textWidth - mainWidth
      }

      // месяц
      tempMonth.width += width
      months.push(<MonthText key={tempYear.year + '-' + getMonth(tempMonth.month)} {...tempMonth}/>)
      tempMonth = null

      // год
      tempYear.width += width
      years.push(<YearText key={tempYear.year} {...tempYear}/>)
      tempYear = null
    }

    // 7 - ленивая загрузка через GET
    if (props.get) {
      clearTimeout(getTimeOut.timeout)
      let end = newDate(start).offsetWeeks(weeksCount).offsetDays(-1)
      getTimeOut.timeout = setTimeout(() => get(start.format(), end.format()), 300)
    }

    return {
      weeks: weeks,
      years: years,
      months: months,
      marginLeft: marginLeft
    }
  }

  function week(start) {
    // неделя, начиная со start
    let daysList = []
    for (let i = 0; i < 7; i++) {
      let date = newDate(start).offsetDays(i)
      const fDate = date.format()
      const day = {
        info: content.days[fDate] || null,
        off: content.daysOff.has(fDate),
        pick: content.daysPick.has(fDate)
      }
      daysList.push(<Day date={date} key={fDate} {...day} onClick={onDayClick} onMouseOver={props.dayOver}/>)
    }

    return (
      <div className="calendar-week"
           key={start.format()}>
        {daysList}
      </div>
    )
  }

  function onDayClick(dateStr) {
    // Нажатие на день
    if (!props.edit) return
    let set = new Set(content.daysPick)
    set.has(dateStr)? set.delete(dateStr) : set.add(dateStr)
    set = sortSet(set)
    setContent(
      {
        days: content.days,
        daysOff: content.daysOff,
        daysPick: set
      }
    )
    props.onChange([...set])
  }

  function get(start, end) {
    // GET
    if (start === getTimeOut.lastStart && end === getTimeOut.lastEnd) return
    props.get(start, end).then(r => r.json()).then(result => {
      setContent({
        days: result.days? {...content.days, ...result.days} : content.days,
        daysOff: result.daysOff? sortSet([...content.daysOff, ...result.daysOff]) : content.daysOff,
        daysPick: result.daysPick? sortSet([...content.daysPick, ...result.daysPick]) : content.daysPick
      })
      getTimeOut.lastStart = start
      getTimeOut.lastEnd = end
    })
  }

  function onWheel(e) {
    // обработчик прокрутки колёсика мыши
    let delta = e.deltaX + e.deltaY
    refresh(delta)
  }

  function refresh(scroll=0) {
    // обновление state
    setState(prevState => render(scroll, prevState))
    if (props.offset) setStartOffset(props.offset)
  }

  function reset() {
    // reset state
    setState(render())
    if (props.offset) setStartOffset(!startOffset)
  }

  function prevent(e){
    // touch - отмена действия по умолчанию
    e.preventDefault();
  }

  function start(e) {
    // touch - start
    tch.element = e.target.closest('.calendar-right')
    if (tch.element) {
      tch.startTime = new Date().getTime()
      document.addEventListener("touchmove", prevent, {passive: false});
      tch.x = e.touches[0].clientX
      tch.movSum = 0
    }
  }

  function move(e) {
    // touch - move
    if (tch.element) {
      tch.mov += tch.x - e.touches[0].clientX;
      tch.x = e.touches[0].clientX;
      if (Math.abs(tch.mov) > 4) {
        let delta = tch.mov
        tch.movSum += delta
        tch.mov = 0
        refresh(delta)
      }
      clearTimeout(tch.timeOut)
      tch.timeOut = setTimeout(stop, 50)
    }
  }

  function stop() {
    // touch - end
    clearTimeout(tch.timeOut)
    let time = new Date().getTime() - tch.startTime
    if (time < 200) {
      for (let i = 0; i <= 3; i++) {
        let x = tch.movSum * (3 - i) * ((200 - time) / 33)
        // eslint-disable-next-line no-loop-func
        setTimeout(() => {
          clearInterval(tch.tailInterval)
          if (i < 3) tch.tailInterval = setInterval(() => refresh(x / time), x / time)
        }, time * i)
      }
    }
    document.removeEventListener("touchmove", prevent);
  }


  return (
    <div className={"calendar-block" + (loading? " shadow" : "")}>
      <div className="calendar-left">
        <ButtonScroll onClick={reset}/>
        <DaysNames/>
      </div>
      <div className="calendar-right"
           onWheel={onWheel}
           ref={ref}
      >
        <TextLine children={state.years}/>
        <TextLine children={state.months}/>
        <Days children={state.weeks} marginLeft={state.marginLeft}/>
      </div>
    </div>
    )
  }


Calendar.propTypes = propTypes
Calendar.defaultProps = defaultProps
export default Calendar