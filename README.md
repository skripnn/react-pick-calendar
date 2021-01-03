[![npm](https://img.shields.io/npm/v/react-pick-calendar.svg)](https://www.npmjs.com/package/react-pick-calendar)

# react-pick-calendar

A scrollable calendar with no division into months for React App.

Allows you to select dates and view information about dates

## install and import

Install by executing `npm i react-pick-calendar`

Import by adding `import Calendar from 'react-pick-calendar';` 

Use by adding `<Calendar/>`
    

## terms

**`fDate`** - date string in YYYY-MM-DD format

**`busy`** - busy day color *(red)*

**`pick`** - picked day color *(green)*

**`days`** - Object containing properties `fDate` and `Any` values
###### *day becomes `busy`*

**`daysOff`** - Array containing `fDate`
###### *day becomes `busy`*

**`daysPick`** - Array containing `fDate`
###### *day becomes `pick`*

**`Calendar object`** - Object, the expected properties: `days`, `daysOff`, `daysPick`
    
    CalendarObject = {
        days: {
            fDate: Any,
            fDate: Any,
            ...
        },
        daysOff: [fDate, fDate, ...],
        daysPick: [fDate, fDate, ...]
    };

## props

| name | type | default | description |
| ------------- | ----------- | ----------- | ----------- |
| `edit` | bool | *false* | *true* allow to edit `daysPick`|
| `noOffset` | bool | *false* | *true* cancel displays the calendar from the first date in `daysPick`, if exist|
| `init` | obj |  | `Calendar object`. Allows you to initialize or update the content. When the property is updated, it replaces the existing one inside the component|
| `get` | func |  | Lazy loading async function that to receives a content from the backend. It gets the Date objects - start and end. Should return a `Calendar object`|
| `onChange` | func | () => {} | A function that receives a changed `daysPick` and the Date object which was change|
| `onDay` | obj | {} | An object with functions that provide to each Day: onMouseOver, onContextMenu, onTouchHold. Each function receives Day's information and the Date object.|
| `startDate` | str |  | `fDate`, the calendar first date. Otherwise infinite scrolling to past|
| `endDate` | str |  | `fDate`, the calendar last date. Otherwise infinite scrolling to future|


