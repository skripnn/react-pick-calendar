"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function DaysNames() {
  // React.component - Названия дней недели
  var Days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "calendar-days-names"
  }, Days.map(function (day) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: day
    }, day);
  }));
}

var _default = DaysNames;
exports["default"] = _default;