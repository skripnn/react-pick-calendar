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
    
    const calendarObject = {
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
| `noOffset` | bool | *false* | *true* cancel displaying the calendar from the first date in `daysPick`, if exist|
| `init` | obj |  | `Calendar object`. Allows you to initialize or update the content. When the property is updated, it replaces the existing one inside the component. Cancel `content` and `setContent` props|
| `content` | obj |  | [external Store](#external-store). Doesn't work with `init` prop|
| `setContent` | func |  | [external Dispatch](#external-store). Doesn't work with `init` prop|
| `get` | func |  | Lazy loading async function that to receives a content from the backend. It gets the Date objects - start and end. Should return a `Calendar object`|
| `onChange` | func | () => {} | A function that receives a changed `daysPick` and the Date object which was change|
| `onDay` | obj | {} | An object with functions that provide to each Day: onMouseOver, onContextMenu, onTouchHold. Each function receives Day's information and the Date object.|
| `startDate` | str |  | `fDate`, the calendar first date. Otherwise infinite scrolling to past|
| `endDate` | str |  | `fDate`, the calendar last date. Otherwise infinite scrolling to future|

## external Store

You can convert this component to uncontrolled and use any external store.
For that add props `content` and `setContent` and don't use the `init` prop.

`content` - store with `Calendar object` where each Array replaced by Set:

    const content = {
        days: {
            fDate: Any,
            fDate: Any,
            ...
        },
        daysOff: new Set([fDate, fDate, ...]),
        daysPick: new Set([fDate, fDate, ...])
    };

`setContent` - dispatch, that receives a function that convert previous `content` to new `content`.
It is working like setState(prevState => {}) from React.useState hook.

Example with React.useState hook:

    import React from "react";

    function MyComponent() {
        const [state, setState] = React.useState({
            days: {},
            daysOff: new Set(),
            daysPick: new Set()
        });

        return (<Calendar content={state} setContent={setState} />);
    }

Example with MobX:

    import React from "react";
    import ReactDOM from "react-dom";
    import { makeAutoObservable } from "mobx";
    import { observer } from "mobx-react-lite";

    class Store {
        state = {
            days: {},
            daysOff: new Set(),
            daysPick: new Set()
        }
    
        constructor() {
            makeAutoObservable(this)
        }
    
        setState(func) {
            this.state = func(this.state)
        }
    }

    const calendarStore = new Store();
    const CalendarView = observer(({ store }) => <Calendar content={store.state} setContent={store.setState} />);

    ReactDOM.render(<CalendarView store={calendarStore} />, document.body);
