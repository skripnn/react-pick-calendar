"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function YearText(props) {
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: "calendar-text",
    style: {
      minWidth: props.width
    },
    children: props.width >= 48 ? props.year : undefined
  });
}

var _default = YearText;
exports["default"] = _default;