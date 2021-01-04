"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _date = require("../extention/date");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Day(props) {
  var touch = false;
  var touchTimer;

  function getDayCSS() {
    var result = "calendar-day";
    result += props.date.getMonth() % 2 === 0 ? " color0" : " color1";
    if (props.date < (0, _date.newDate)()) result += " past";
    if (props.info) result += " busy";else if (props.off) result += " busy";
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
    touchTimer = setTimeout(onTouchHold, 500);
  }

  function onClick() {
    if (props.onClick) props.onClick(props.date);
  }

  function onTouchHold() {
    touchFalse();
    if (props.onTouchHold) props.onTouchHold(props.info, props.date);
  }

  function onMouseOver() {
    if (props.onMouseOver) props.onMouseOver(props.info, props.date);
  }

  function onContextMenu(e) {
    e.preventDefault();
    if (props.onContextMenu) props.onContextMenu(props.info, props.date);
  }

  return _react["default"].createElement("div", {
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