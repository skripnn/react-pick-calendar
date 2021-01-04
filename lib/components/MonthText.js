"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function MonthText(props) {
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return _react["default"].createElement("span", {
    className: "calendar-text",
    style: {
      minWidth: props.width
    },
    children: props.width >= 48 ? monthNames[props.month] : undefined
  });
}

var _default = MonthText;
exports["default"] = _default;