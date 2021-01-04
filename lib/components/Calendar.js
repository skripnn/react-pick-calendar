"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("../extention/propTypes");

require("../extention/Calendar.css");

var _date = require("../extention/date");

var _sortSet = _interopRequireDefault(require("../extention/sortSet"));

var _weeksCounter = _interopRequireDefault(require("../extention/weeksCounter"));

var _weekWidth = _interopRequireDefault(require("../extention/weekWidth"));

var _deltaTouch = _interopRequireDefault(require("../extention/deltaTouch"));

var _ButtonScroll = _interopRequireDefault(require("./ButtonScroll"));

var _DaysNames = _interopRequireDefault(require("./DaysNames"));

var _TextLine = _interopRequireDefault(require("./TextLine"));

var _YearText = _interopRequireDefault(require("./YearText"));

var _MonthText = _interopRequireDefault(require("./MonthText"));

var _Days = _interopRequireDefault(require("./Days"));

var _Day = _interopRequireDefault(require("./Day"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getTimeOut;
var DeltaTouchX;

function Calendar(props) {
  var ref = (0, _react.useRef)(null);
  var weeksOffset = 15;
  var scrollOffset = (0, _weekWidth["default"])(weeksOffset);

  var _useState = (0, _react.useState)({
    weeks: _react["default"].createElement("span", {
      style: {
        width: window.innerWidth + scrollOffset
      },
      key: 'temp'
    }),
    texts: {},
    offset: !props.noOffset,
    loading: true,
    check: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _useState3 = (0, _react.useState)({
    days: props.init ? props.init.days || {} : {},
    daysOff: (0, _sortSet["default"])(props.init ? props.init.daysOff : []),
    daysPick: (0, _sortSet["default"])(props.init ? props.init.daysPick : [])
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      content = _useState4[0],
      setContent = _useState4[1];

  (0, _react.useEffect)(firstRender, []);
  (0, _react.useEffect)(refreshWeeks, [content.days, content.daysOff, content.daysPick, state.check, props.edit, props.onDay]);
  (0, _react.useEffect)(fromPropsInit, [props.init]);
  (0, _react.useEffect)(fromPropsOffset, [props.noOffset]);

  function firstRender() {
    DeltaTouchX = new _deltaTouch["default"]('x');
    ref.current.addEventListener('wheel', function (e) {
      return wheelScroll(e);
    }, {
      passive: false
    });
    ref.current.addEventListener('touchstart', function (e) {
      return DeltaTouchX.start(e);
    });
    ref.current.addEventListener('touchmove', function (e) {
      return DeltaTouchX.move(e, touchScroll);
    });
    ref.current.addEventListener('touchend', function (e) {
      return DeltaTouchX.end(e, touchScroll);
    });
    window.addEventListener('resize', function () {
      return updateState({
        check: new Date().getTime()
      });
    });
    newWeeks(undefined, true, 0);
    updateState({
      loading: false
    });
  }

  function updateState(obj) {
    setState(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), obj);
    });
  }

  function fromPropsInit() {
    if (props.init) {
      var init = {};
      if (props.init.days) init.days = props.init.days;
      if (props.init.daysOff) init.daysOff = (0, _sortSet["default"])(props.init.daysOff);
      if (props.init.daysPick) init.daysPick = (0, _sortSet["default"])(props.init.daysPick);
      setContent(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), init);
      });
    }
  }

  function fromPropsOffset() {
    updateState({
      offset: !props.noOffset
    });
  }

  function getWeeks(prevWeeks) {
    var weeksCount = (0, _weeksCounter["default"])(ref.current.clientWidth);
    var startDate = props.startDate ? (0, _date.newDate)(props.startDate).monday() : null;
    var endDate = props.endDate ? (0, _date.newDate)(props.endDate).monday().offsetDays(7) : null;
    var start = (0, _date.newDate)().monday();
    if (state.offset && content.daysPick.size > 0) start = (0, _date.newDate)(_toConsumableArray(content.daysPick)[0]).monday();
    if (prevWeeks) start = (0, _date.newDate)(prevWeeks[0].key);
    var leftDate = (0, _date.newDate)(start);
    if (!prevWeeks) leftDate.offsetWeeks(-weeksOffset);else if (ref.current.scrollLeft === 0) leftDate.offsetWeeks(-weeksOffset);else if (ref.current.scrollLeft === ref.current.scrollWidth - ref.current.clientWidth) leftDate.offsetWeeks(weeksOffset);
    if (startDate && leftDate < startDate) leftDate = (0, _date.newDate)(startDate);
    var scrollLeft = (0, _weekWidth["default"])(start.getDiffWeeks(leftDate));
    if (!prevWeeks && start < leftDate) scrollLeft = 0;
    weeksCount += weeksOffset * 2;

    if (endDate) {
      var rightDate = (0, _date.newDate)(leftDate).offsetWeeks(weeksCount);

      if (endDate < rightDate) {
        weeksCount = endDate.getDiffWeeks(leftDate);

        if (startDate) {
          var leftDateFromEnd = (0, _date.newDate)(endDate).offsetWeeks(-weeksCount);

          if (leftDateFromEnd < startDate) {
            leftDateFromEnd = (0, _date.newDate)(startDate);
            var offset = leftDate.getDiffWeeks(startDate);
            scrollLeft += offset;
            weeksCount -= offset;
          }

          leftDate = leftDateFromEnd;
        }
      }
    }

    var weeks = [];

    for (var i = 0; i < weeksCount; i++) {
      var date = (0, _date.newDate)(leftDate).offsetWeeks(i);
      weeks.push(week(date));
    }

    if (prevWeeks) scrollLeft += ref.current.scrollLeft;
    ref.current.scrollLeft = scrollLeft;
    return weeks;
  }

  function getTexts() {
    var newWeeks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : state.weeks;
    var years = [];
    var months = [];
    var tempYear = {};
    var tempMonth = {};
    var textWidth = 0;
    var mainWidth = ref.current.clientWidth;
    var scrollLeft = ref.current.scrollLeft;
    var wCount = (0, _weeksCounter["default"])(mainWidth);
    if (newWeeks && (0, _weekWidth["default"])(newWeeks.length) < mainWidth) mainWidth = (0, _weekWidth["default"])(newWeeks.length);
    var startIndex = (0, _weeksCounter["default"])(scrollLeft);
    var offset = scrollLeft % (0, _weekWidth["default"])();

    if (offset) {
      startIndex -= 1;
      wCount += 1;
    }

    var start = (0, _date.newDate)(newWeeks[startIndex].key);

    for (var i = 0; i < wCount; i++) {
      var date = (0, _date.newDate)(start).offsetWeeks(i);

      if (textWidth < mainWidth) {
        var _width = 24;

        if (i === 0) {
          _width -= offset;
        }

        var month = date.getMonth();

        if (month !== tempMonth.month) {
          if (tempMonth.width) {
            months.push(_react["default"].createElement(_MonthText["default"], _extends({
              key: tempYear.year + '-' + (0, _date.getMonth)(tempMonth.month)
            }, tempMonth)));
          }

          tempMonth = {
            month: month,
            width: 0
          };
        }

        tempMonth.width += _width;
        var year = date.getFullYear();

        if (year !== tempYear.year) {
          if (tempYear.width) {
            years.push(_react["default"].createElement(_YearText["default"], _extends({
              key: tempYear.year
            }, tempYear)));
          }

          tempYear = {
            year: year,
            width: 0
          };
        }

        tempYear.width += _width;
        textWidth += _width;
      }
    }

    var width = textWidth - mainWidth;
    tempMonth.width -= width;
    months.push(_react["default"].createElement(_MonthText["default"], _extends({
      key: tempYear.year + '-' + (0, _date.getMonth)(tempMonth.month)
    }, tempMonth)));
    tempYear.width -= width;
    years.push(_react["default"].createElement(_YearText["default"], _extends({
      key: tempYear.year
    }, tempYear)));
    return {
      years: years,
      months: months
    };
  }

  function week(start) {
    var daysList = [];

    for (var i = 0; i < 7; i++) {
      var date = (0, _date.newDate)(start).offsetDays(i);
      var fDate = date.format();
      var day = {
        info: content.days[fDate] || null,
        off: content.daysOff.has(fDate),
        pick: content.daysPick.has(fDate)
      };
      if (props.startDate && fDate < props.startDate || props.endDate && fDate > props.endDate) daysList.push(_react["default"].createElement("div", {
        className: 'calendar-day hidden',
        key: fDate
      }));else daysList.push(_react["default"].createElement(_Day["default"], _extends({
        date: date,
        key: fDate
      }, day, {
        onClick: onDayClick
      }, props.onDay)));
    }

    return _react["default"].createElement("div", {
      className: "calendar-week",
      key: start.format()
    }, daysList);
  }

  function onDayClick(date) {
    if (!props.edit) return;
    var fDate = date.format();
    var set = new Set(content.daysPick);
    set.has(fDate) ? set["delete"](fDate) : set.add(fDate);
    set = (0, _sortSet["default"])(set);
    setContent(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        daysPick: set
      });
    });
    props.onChange(_toConsumableArray(set), date);
  }

  function get(weeks) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    clearTimeout(getTimeOut);
    var start = (0, _date.newDate)(weeks[0].key);
    var end = (0, _date.newDate)(start).offsetWeeks(weeks.length).offsetDays(-1);
    getTimeOut = setTimeout(function () {
      props.get(start, end).then(function (result) {
        return setContent(function (prevState) {
          return _objectSpread(_objectSpread({}, prevState), {}, {
            days: result.days ? _objectSpread(_objectSpread({}, prevState.days), result.days) : prevState.days,
            daysOff: result.daysOff ? (0, _sortSet["default"])([].concat(_toConsumableArray(prevState.daysOff), _toConsumableArray(result.daysOff))) : prevState.daysOff,
            daysPick: result.daysPick ? (0, _sortSet["default"])([].concat(_toConsumableArray(prevState.daysPick), _toConsumableArray(result.daysPick))) : prevState.daysPick
          });
        });
      });
    }, timeout);
  }

  function reset() {
    newWeeks(undefined, true);
    if (!props.noOffset) setState(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        offset: !prevState.offset
      });
    });
  }

  function refreshWeeks() {
    setState(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        weeks: getWeeks(prevState.weeks)
      });
    });
  }

  function wheelScroll(e) {
    e.preventDefault();
    var delta = e.deltaX + e.deltaY;
    ref.current.scrollLeft += delta;
  }

  function touchScroll(delta) {
    if (!ref.current) return;
    ref.current.scrollLeft += delta;
  }

  function onScroll() {
    if (ref.current.scrollLeft === 0 || ref.current.scrollLeft === ref.current.scrollWidth - ref.current.clientWidth) {
      newWeeks(state.weeks, true);
    } else {
      updateState({
        texts: getTexts()
      });
    }
  }

  function newWeeks(weeks) {
    var download = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var timeout = arguments.length > 2 ? arguments[2] : undefined;
    var newWeeks = getWeeks(weeks);
    if (download && props.get) get(newWeeks, timeout);
    updateState({
      texts: getTexts(newWeeks),
      weeks: newWeeks
    });
  }

  return _react["default"].createElement("div", {
    className: "calendar-block" + (state.loading ? " hidden" : "")
  }, _react["default"].createElement("div", {
    className: "calendar-left"
  }, _react["default"].createElement(_ButtonScroll["default"], {
    onClick: reset
  }), _react["default"].createElement(_DaysNames["default"], null)), _react["default"].createElement("div", {
    className: "calendar-right"
  }, _react["default"].createElement(_TextLine["default"], {
    children: state.texts.years
  }), _react["default"].createElement(_TextLine["default"], {
    children: state.texts.months
  }), _react["default"].createElement("div", {
    className: "calendar-scroll",
    onScroll: onScroll,
    ref: ref
  }, _react["default"].createElement(_Days["default"], {
    children: state.weeks
  }))));
}

Calendar.propTypes = _propTypes.propTypes;
Calendar.defaultProps = _propTypes.defaultProps;
var _default = Calendar;
exports["default"] = _default;