# react-pick-calendar

React календарь для наглядного отображения и редактирования занятых дней независимо от месяцев

## terms

**`fDate`** - строковое представление даты формата YYYY-MM-DD

**`busy`** - цвет занятого дня *(красный)*

**`pick`** - цвет выделенного дня *(зеленый)*

**`days`** - `занятые дни с информацией` - объект, со свойствами формата `fDate`: `Any`
* ###### *каждое свойство меняет цвет дня на `busy`*

**`daysOff`** - `занятые дни` - список с `fDate`
* ###### *меняет цвет дня на `busy`*

**`daysPick`** - `отмеченные дни` - список с `fDate`
* ###### *меняет цвет дня на `pick`*

**`PickCalendar object`** - Объект, в котором ожидаются свойства: `days`, `daysOff`, `daysPick`
    
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
| `edit` | bool | *false* | *true* позволяет редактировать `daysPick`|
| `offset` | bool | *true* | *true* отображает календарь с первой даты в `daysPick`, при наличии|
| `init` | obj |  | `PickCalendar object`. Позволяет предустановить или обновить контент. При обновлении каждое свойство заменяет уже существующее внутри компонента|
| `get` | func |  | Асинхронная функция для получения контента с бэкенда. Должна возвращать `PickCalendar object` в JSON|
| `onChange` | func |  | Функция, получающая `daysPick` при изменении|
| `dayOver` | func |  | Функция, получающая информацию из дня при наведении на него|
| `startDate` | str |  | `fDate`, левая граница календаря|
| `endDate` | str |  | `fDate`, правая граница календаря|

## API

    import PickCalendar from 'react-pick-calendar';

