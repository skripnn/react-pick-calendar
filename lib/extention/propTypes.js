"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = exports.propTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var propTypes = {
  // функция для получения значений - return Calendar Object
  get: _propTypes["default"].func,
  // функция для записи изменений (что делать с daysPick при изменении)
  onChange: _propTypes["default"].func,
  // можно ли менять daysPick
  edit: _propTypes["default"].bool,
  // отмена рассчета календаря от началльной даты в daysPick
  noOffset: _propTypes["default"].bool,
  // начальные значения - если есть, то к пустым значениям прибавляются те, что есть в init
  init: _propTypes["default"].object,
  // функции активности Day, которым передаётся информация о дне
  onDay: _propTypes["default"].shape({
    onTouchHold: _propTypes["default"].func,
    onMouseOver: _propTypes["default"].func,
    onContextMenu: _propTypes["default"].func
  }),
  // начало календаря (не скроллится раньше этой даты)
  startDate: function startDate(props, propName, componentName) {
    return checkDateFormat(props, propName, componentName);
  },
  // конец календаря (не скроллится дальше этой даты)
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
  // проверка на соответствие формату даты YYYY-MM-DD
  if (props[propName]) {
    var m = props[propName].match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

    if (m && Date.parse(props[propName])) {
      return;
    }

    return new Error(componentName + ': Wrong date format "' + propName + '". Please use YYYY-MM-DD');
  }
}