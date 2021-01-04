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
  noOffset: _propTypes["default"].bool,
  init: _propTypes["default"].object,
  onDay: _propTypes["default"].shape({
    onTouchHold: _propTypes["default"].func,
    onMouseOver: _propTypes["default"].func,
    onContextMenu: _propTypes["default"].func
  }),
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
  noOffset: false
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