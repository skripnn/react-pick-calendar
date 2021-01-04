"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Days(props) {
  return _react["default"].createElement("div", {
    className: "calendar-days",
    children: props.children,
    ref: props.ref
  });
}

var _default = Days;
exports["default"] = _default;