import React, {useEffect, useRef, useState} from "react";

import {propTypes, defaultProps} from '../extention/propTypes'
import '../extention/Calendar.css'
import "../extention/date"
import {getMonth, newDate} from "../extention/date";
import sortSet from "../extention/sortSet";
import weeksCounter from "../extention/weeksCounter";
import { DeltaTouchX } from "../extention/deltaTouch";

import ButtonScroll from "./ButtonScroll";
import DaysNames from "./DaysNames";
import TextLine from "./TextLine";
import YearText from "./YearText";
import MonthText from "./MonthText";
import Days from "./Days";
import Day from "./Day";


let getTimeOut
let loading = true
const weekWidth = (n=1) => n * 24
const weeksOffset = 15
const scrollOffset = weekWidth(weeksOffset)

function Calendar (props) {
  // React.component - Календарь
  const ref = useRef()

  const [startOffset, setStartOffset] = useState(props.offset)
  const [init, setInit] = useState(props.init)
  const [content, setContent] = useState({
    days: props.init? props.init.days || {} : {},
    daysOff: props.init? sortSet(props.init.daysOff): new Set(),
    daysPick: props.init? sortSet(props.init.daysPick): new Set()
  })
  const [weeks, setWeeks] = useState([<span style={{width: window.innerWidth + scrollOffset}} key={'temp'}/>])
  const [texts, setTexts] = useState({})

  useEffect(firstRender, [])
  useEffect(refresh, [content])
  useEffect(get, [weeks])
  useEffect(fromPropsToInit, [props])

  function firstRender() {
    ref.current.addEventListener('wheel', e => wheelScroll(e), {passive: false})
    ref.current.addEventListener('touchstart', e => DeltaTouchX.start(e))
    ref.current.addEventListener('touchmove', e => DeltaTouchX.move(e, touchScroll))
    ref.current.addEventListener('touchend', e => DeltaTouchX.end(e, touchScroll))

    window.onresize = () => refresh()

    const newWeeks = getWeeks()
    setTexts(getTexts(newWeeks))
    setWeeks(newWeeks)
    loading = false
  }

  function fromPropsToInit() {
    // запись props.init в init
    if (props.init !== init) {
      setInit(props.init)
      setContent({
        days: props.init.days || content.days,
        daysOff: props.init.daysOff? sortSet(props.init.daysOff) : content.daysOff,
        daysPick: props.init.daysPick? sortSet(props.init.daysPick) : content.daysPick
      })
    }
  }

  function getWeeks(prevWeeks) {
    // получение новых недель
    let weeksCount = weeksCounter(ref.current.getBoundingClientRect().width)  // сколько недель влезает в блок
    const startDate = props.startDate? newDate(props.startDate).monday() : null  // левая граница
    const endDate = props.endDate? newDate(props.endDate).monday().offsetDays(7) : null  // правая граница

    // 1 - получаем стартовую дату
    let start = newDate().monday()
    if (startOffset && content.daysPick.size > 0) start = newDate([...content.daysPick][0]).monday()
    if (prevWeeks) start = newDate(prevWeeks[0].key)

    // 2 - сдвигаем стартовую дату
    let leftDate = newDate(start)
    if (ref.current.scrollLeft === 0) leftDate.offsetWeeks(-weeksOffset)  // влево
    else if (ref.current.scrollLeft >= scrollOffset * 2) leftDate.offsetWeeks(weeksCount)  // или вправо

    // 3 - обрабатывыаем новую стартовую дату
    if (startDate && leftDate < startDate) leftDate = newDate(startDate)  // если стартовая дата раньше левой границы - сдвигаем стартовую дату до границы
    let scrollLeft = weekWidth(start.getDiffWeeks(leftDate))  // вычисляем значение скролла
    if (start < leftDate) scrollLeft = 0
    weeksCount += weeksOffset * 2 // увеличиваем длину каленадря

    // 4 - обработчик наличия правой границы
    if (endDate) {
      let rightDate = newDate(leftDate).offsetWeeks(weeksCount)  // вычисляем конечную дату
      if (endDate < rightDate) {  // если она дальше границы
        weeksCount = endDate.getDiffWeeks(leftDate)  // считаем новую длину календаря
        // 4.5 - проверка на наличие стартовой даты
        if (startDate) {
          let leftDateFromEnd = newDate(endDate).offsetWeeks(-weeksCount)  // вычисляем стартовую дату от конечной
          if (leftDateFromEnd < startDate) {  // если она раньше левой границы
            leftDateFromEnd = newDate(startDate)  // меняем её
            const offset = leftDate.getDiffWeeks(startDate)
            scrollLeft += offset  // сдвигаем скролл
            weeksCount -= offset  // уменьшаем длину календаря
          }
          leftDate = leftDateFromEnd  // обновляем стартовую дату
        }
      }
    }

    // 5 - формируем недели
    let weeks = []
    for (let i = 0; i < weeksCount; i++) {
      let date = newDate(leftDate).offsetWeeks(i)
      weeks.push(week(date))
    }

    // 6 - скроллим блок и возвращаем новые недели
    ref.current.scrollLeft = scrollLeft
    return weeks
  }

  function getTexts(newWeeks=weeks) {
    // получение новых текстовых компонентов
    let years = []
    let months = []
    let tempYear = {}
    let tempMonth = {}
    let textWidth = 0

    let mainWidth = ref.current.getBoundingClientRect().width
    let scrollLeft = ref.current.scrollLeft
    let wCount = weeksCounter(mainWidth)
    if (newWeeks && weekWidth(newWeeks.length) < mainWidth) mainWidth = weekWidth(newWeeks.length)
    let startIndex = weeksCounter(scrollLeft)
    let offset = scrollLeft % weekWidth()
    if (offset) {
      startIndex -= 1
      wCount += 1
    }
    let start = newDate(newWeeks[startIndex].key)


    for (let i = 0; i < wCount; i++) {
      let date = newDate(start).offsetWeeks(i)
      if (textWidth < mainWidth) {
        let width = 24
        if (i === 0) {
          width -= offset
        }

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
    }
    // добавление последних текстовых компонентов
    const width = textWidth - mainWidth

    // месяц
    tempMonth.width -= width
    months.push(<MonthText key={tempYear.year + '-' + getMonth(tempMonth.month)} {...tempMonth}/>)

    // год
    tempYear.width -= width
    years.push(<YearText key={tempYear.year} {...tempYear}/>)

    return {
      years: years,
      months: months
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
      if ((props.startDate && fDate < props.startDate) || (props.endDate && fDate > props.endDate)) daysList.push(<div className={'calendar-day hidden'} key={fDate}/>)
      else daysList.push(<Day date={date} key={fDate} {...day} onClick={onDayClick} onMouseOver={props.dayOver}/>)
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

  function get() {
    // GET
    if (props.get) {
      clearTimeout(getTimeOut)
      const start = newDate(weeks[0].key)
      const end = newDate(start).offsetWeeks(weeks.length).offsetDays(-1)
      getTimeOut = setTimeout(() => {
        props.get(start, end).then(r => r.json()).then(result => {
          setContent({
            days: result.days ? {...content.days, ...result.days} : content.days,
            daysOff: result.daysOff ? sortSet([...content.daysOff, ...result.daysOff]) : content.daysOff,
            daysPick: result.daysPick ? sortSet([...content.daysPick, ...result.daysPick]) : content.daysPick
          })
        })
      }, 1000)
    }
  }

  function reset() {
    // reset state
    setWeeks(getWeeks())
    if (props.offset) setStartOffset(!startOffset)
  }

  function refresh() {
    // обновление недель
    setWeeks(prevWeeks => setWeeks(prevWeeks))
  }

  function wheelScroll(e) {
    // обработчик прокрутки колёсиком мыши
    e.preventDefault()
    let delta = e.deltaX + e.deltaY
    ref.current.scrollLeft += delta
  }

  function touchScroll(delta) {
    // обработчик прокрутки пррикосновением
    ref.current.scrollLeft += delta
  }

  function onScroll() {
    // реакция на скролл
    setTexts(getTexts())
    if (ref.current.scrollLeft === 0 || ref.current.scrollLeft >= scrollOffset * 2) {
      const newWeeks = getWeeks(weeks)
      setWeeks(newWeeks)
    }
  }


  return (
    <div className={"calendar-block" + (loading? " hidden": "")}>
      <div className="calendar-left">
        <ButtonScroll onClick={reset}/>
        <DaysNames/>
      </div>
      <div className="calendar-right">
        <TextLine children={texts.years}/>
        <TextLine children={texts.months}/>
        <div className="calendar-scroll"
             onScroll={onScroll}
             ref={ref}>
          <Days children={weeks}/>
        </div>
      </div>
    </div>
    )
  }


Calendar.propTypes = propTypes
Calendar.defaultProps = defaultProps
export default Calendar