"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function TextLine(props) {
  return _react["default"].createElement("div", {
    className: "calendar-text-line",
    children: props.children
  });
}

var _default = TextLine;
exports["default"] = _default;