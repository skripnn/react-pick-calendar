"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function DaysNames() {
  var Days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return _react["default"].createElement("div", {
    className: "calendar-days-names"
  }, Days.map(function (day) {
    return _react["default"].createElement("div", {
      key: day
    }, day);
  }));
}

var _default = DaysNames;
exports["default"] = _default;