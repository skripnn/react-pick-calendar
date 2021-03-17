"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _date = require("../../extention/date");

require("./Day.css");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Day(props) {
  var touch = false;
  var touchTimer;
  var ref = (0, _react.useRef)();

  function getDayCSS() {
    var result = "calendar-day";
    result += props.date.getMonth() % 2 === 0 ? " color0" : " color1";
    if (props.date < (0, _date.newDate)()) result += " past";
    if (props.info || props.off) result += " busy";
    if (props.pick) result += " pick";
    return result;
  }

  function touchFalse() {
    touch = false;
    clearTimeout(touchTimer);
  }

  function touchEnd(e) {
    if (touch) {
      touchFalse();
      e.preventDefault();
      onClick();
    }
  }

  function touchStart() {
    touch = true;
    clearTimeout(touchTimer);
    touchTimer = setTimeout(function () {
      return onTouchHold();
    }, 500);
  }

  function onClick() {
    if (props.onClick) props.onClick(props.date);
  }

  function onTouchHold() {
    touchFalse();
    if (props.onTouchHold) props.onTouchHold(ref.current, props.info, props.date, props.off);
  }

  function onMouseOver() {
    if (props.onMouseOver) props.onMouseOver(ref.current, props.info, props.date, props.off);
  }

  function onContextMenu(e) {
    e.preventDefault();
    if (props.onContextMenu) props.onContextMenu(ref.current, props.info, props.date, props.off);
  }

  return _react["default"].createElement("div", {
    ref: ref,
    className: getDayCSS(),
    onClick: onClick,
    onContextMenu: onContextMenu,
    onMouseOver: onMouseOver,
    onTouchEnd: touchEnd,
    onTouchStart: touchStart,
    onTouchMove: touchFalse,
    onTouchCancel: touchFalse
  }, props.date.getDate().toString());
}

var _default = Day;
exports["default"] = _default;