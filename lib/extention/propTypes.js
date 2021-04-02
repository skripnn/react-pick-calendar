"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = exports.propTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var propTypes = {
  get: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  edit: _propTypes["default"].bool,
  maxPick: _propTypes["default"].number,
  onError: _propTypes["default"].func,
  noOffset: _propTypes["default"].bool,
  content: _propTypes["default"].object,
  setContent: _propTypes["default"].func,
  onDay: _propTypes["default"].shape({
    onTouchHold: _propTypes["default"].func,
    onMouseOver: _propTypes["default"].func,
    onContextMenu: _propTypes["default"].func
  }),
  triggerGet: _propTypes["default"].any,
  triggerNew: _propTypes["default"].any,
  startDate: function startDate(props, propName, componentName) {
    return checkDateFormat(props, propName, componentName);
  },
  endDate: function endDate(props, propName, componentName) {
    return checkDateFormat(props, propName, componentName);
  }
};
exports.propTypes = propTypes;
var defaultProps = {
  onChange: function onChange() {},
  onDay: {},
  edit: false,
  noOffset: false,
  content: {},
  maxPick: 366
};
exports.defaultProps = defaultProps;

function checkDateFormat(props, propName, componentName) {
  if (props[propName]) {
    var m = props[propName].match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

    if (m && Date.parse(props[propName])) {
      return;
    }

    return new Error(componentName + ': Wrong date format "' + propName + '". Please use YYYY-MM-DD');
  }
}