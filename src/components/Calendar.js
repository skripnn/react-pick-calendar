import React, {useEffect, useRef, useState} from "react";

import {propTypes, defaultProps} from '../extention/propTypes'
import '../extention/Calendar.css'
import "../extention/date"
import {getMonth, newDate} from "../extention/date";
import sortSet from "../extention/sortSet";
import weeksCounter from "../extention/weeksCounter";
import weekWidth from "../extention/weekWidth";
import DeltaTouchClass from "../extention/deltaTouch";

import ButtonScroll from "./ButtonScroll";
import DaysNames from "./DaysNames";
import TextLine from "./TextLine";
import YearText from "./YearText";
import MonthText from "./MonthText";
import Days from "./Days";
import Day from "./Day";

let getTimeOut
let DeltaTouchX

function Calendar (props) {
  // React.component - Календарь
  let ref = useRef(null)
  const weeksOffset = 15  // количество недель за пределами видимого блока в каждую сторону
  const scrollOffset = weekWidth(weeksOffset)  // значение scrollLeft, позволяющее скрыть weeksOffset за пределы блока

  const [state, setState] = useState({
    weeks: <span style={{width: window.innerWidth + scrollOffset}} key={'temp'}/>,
    texts: {},

    offset: !props.noOffset,
    loading: true,
    check: 0
  })
  const [content, setContent] = useState({
    days: props.init? props.init.days || {} : {},
    daysOff: sortSet(props.init? props.init.daysOff : []),
    daysPick: sortSet(props.init? props.init.daysPick : []),
  })

  // eslint-disable-next-line
  useEffect(firstRender, [])
  // eslint-disable-next-line
  useEffect(refreshWeeks, [content.days, content.daysOff, content.daysPick, state.check, props.edit, props.onDay])
  useEffect(fromPropsInit, [props.init])
  useEffect(fromPropsOffset, [props.noOffset])

  function firstRender() {
    DeltaTouchX = new DeltaTouchClass('x')
    ref.current.addEventListener('wheel', e => wheelScroll(e), {passive: false})
    ref.current.addEventListener('touchstart', e => DeltaTouchX.start(e))
    ref.current.addEventListener('touchmove', e => DeltaTouchX.move(e, touchScroll))
    ref.current.addEventListener('touchend', e => DeltaTouchX.end(e, touchScroll))
    window.addEventListener('resize', () => updateState({check: new Date().getTime()}))

    newWeeks(undefined, true, 0)
    updateState({loading: false})
  }

  function updateState(obj) {
    // обновление state
    setState(prevState => ({
      ...prevState,
      ...obj
    }))
  }

  function fromPropsInit() {
    // обновление при смене props.init
    if (props.init) {
      let init = {}
      if (props.init.days) init.days = props.init.days
      if (props.init.daysOff) init.daysOff = sortSet(props.init.daysOff)
      if (props.init.daysPick) init.daysPick = sortSet(props.init.daysPick)
      setContent(prevState => ({...prevState, ...init}))
    }
  }

  function fromPropsOffset() {
    // обновление при смене props.noOffset
    updateState({offset: !props.noOffset})
  }

  function getWeeks(prevWeeks) {
    // получение новых недель
    let weeksCount = weeksCounter(ref.current.clientWidth)  // сколько недель влезает в блок
    const startDate = props.startDate? newDate(props.startDate).monday() : null  // левая граница
    const endDate = props.endDate? newDate(props.endDate).monday().offsetDays(7) : null  // правая граница

    // 1 - получаем стартовую дату
    let start = newDate().monday()
    if (state.offset && content.daysPick.size > 0) start = newDate([...content.daysPick][0]).monday()
    if (prevWeeks) start = newDate(prevWeeks[0].key)

    let leftDate = newDate(start)
    if (!prevWeeks) leftDate.offsetWeeks(-weeksOffset)
    else if (ref.current.scrollLeft === 0) leftDate.offsetWeeks(-weeksOffset)  // влево
    else if (ref.current.scrollLeft === ref.current.scrollWidth - ref.current.clientWidth) leftDate.offsetWeeks(weeksOffset)  // или вправо

    // 3 - обрабатывыаем новую стартовую дату
    if (startDate && leftDate < startDate) leftDate = newDate(startDate)  // если стартовая дата раньше левой границы - сдвигаем стартовую дату до границы
    let scrollLeft = weekWidth(start.getDiffWeeks(leftDate))
    if (!prevWeeks && start < leftDate) scrollLeft = 0
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
    if (prevWeeks) scrollLeft += ref.current.scrollLeft
    ref.current.scrollLeft = scrollLeft
    return weeks
  }

  function getTexts(newWeeks=state.weeks) {
    // получение новых текстовых компонентов
    let years = []
    let months = []
    let tempYear = {}
    let tempMonth = {}
    let textWidth = 0

    let mainWidth = ref.current.clientWidth
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
      else daysList.push(<Day date={date} key={fDate} {...day} onClick={onDayClick} {...props.onDay}/>)
    }

    return (
      <div className="calendar-week"
           key={start.format()}>
        {daysList}
      </div>
    )
  }

  function onDayClick(date) {
    // Нажатие на день
    if (!props.edit) return
    const fDate = date.format()
    let set = new Set(content.daysPick)
    set.has(fDate)? set.delete(fDate) : set.add(fDate)
    set = sortSet(set)
    setContent(prevState => ({...prevState, daysPick: set}))
    props.onChange([...set], date)
  }

  function get(weeks, timeout=500) {
    // GET
    clearTimeout(getTimeOut)
    const start = newDate(weeks[0].key)
    const end = newDate(start).offsetWeeks(weeks.length).offsetDays(-1)
    getTimeOut = setTimeout(() => {
      props.get(start, end).then(result => setContent(prevState => ({
        ...prevState,
        days: result.days ? {...prevState.days, ...result.days} : prevState.days,
        daysOff: result.daysOff ? sortSet([...prevState.daysOff, ...result.daysOff]) : prevState.daysOff,
        daysPick: result.daysPick ? sortSet([...prevState.daysPick, ...result.daysPick]) : prevState.daysPick
      })))
    }, timeout)
  }

  function reset() {
    // нажатие на ButtonScroll - reset state
    newWeeks(undefined, true)
    if (!props.noOffset) setState(prevState => ({...prevState, offset: !prevState.offset}))
  }

  function refreshWeeks() {
    // обновление недель
    setState(prevState => ({...prevState, weeks: getWeeks(prevState.weeks)}))
  }


  function wheelScroll(e) {
    // обработчик прокрутки колёсиком мыши
    e.preventDefault()
    let delta = e.deltaX + e.deltaY
    ref.current.scrollLeft += delta
  }

  function touchScroll(delta) {
    // обработчик прокрутки пррикосновением
    if (!ref.current) return
    ref.current.scrollLeft += delta
  }

  function onScroll() {
    // реакция на скролл
    if (ref.current.scrollLeft === 0 || ref.current.scrollLeft === ref.current.scrollWidth - ref.current.clientWidth) {
      newWeeks(state.weeks, true)
    }
    else {
      updateState({
        texts: getTexts()
      })
    }
  }

  function newWeeks(weeks, download=false, timeout) {
    const newWeeks = getWeeks(weeks)
    if (download && props.get) get(newWeeks, timeout)
    updateState({
      texts: getTexts(newWeeks),
      weeks: newWeeks
    })
  }

  return (
    <div className={"calendar-block" + (state.loading? " hidden": "")}>
      <div className="calendar-left">
        <ButtonScroll onClick={reset}/>
        <DaysNames/>
      </div>
      <div className="calendar-right">
        <TextLine children={state.texts.years}/>
        <TextLine children={state.texts.months}/>
        <div className="calendar-scroll"
             onScroll={onScroll}
             ref={ref}>
          <Days children={state.weeks}/>
        </div>
      </div>
    </div>
  )
}


Calendar.propTypes = propTypes
Calendar.defaultProps = defaultProps
export default Calendar