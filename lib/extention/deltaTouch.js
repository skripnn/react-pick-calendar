"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DeltaTouchClass = function () {
  function DeltaTouchClass(dim) {
    _classCallCheck(this, DeltaTouchClass);

    _defineProperty(this, "x", true);

    _defineProperty(this, "y", true);

    _defineProperty(this, "touchDeltas", []);

    _defineProperty(this, "moveTimer", void 0);

    _defineProperty(this, "endTimer", void 0);

    _defineProperty(this, "lastDelta", void 0);

    _defineProperty(this, "lastTouch", void 0);

    if (dim === 'x') this.y = false;
    if (dim === 'y') this.x = false;
  }

  _createClass(DeltaTouchClass, [{
    key: "eXY",
    value: function eXY(e) {
      return (this.x ? e.touches[0].clientX : 0) + (this.y ? e.touches[0].clientY : 0);
    }
  }, {
    key: "start",
    value: function start(e) {
      clearInterval(this.endTimer);

      if (e.touches.length > 1) {
        this.lastTouch = null;
        this.lastDelta = null;
        return;
      }

      e.preventDefault();
      this.lastTouch = this.eXY(e);
    }
  }, {
    key: "move",
    value: function move(e, func) {
      var _this = this;

      if (e.touches.length > 1 || !this.lastTouch) return;
      var delta = this.lastTouch - this.eXY(e);
      this.lastTouch = this.eXY(e);
      this.touchDeltas.push(delta);
      this.lastDelta = delta;
      this.moveTimer = setInterval(function () {
        if (_this.touchDeltas.length === 0) {
          clearInterval(_this.moveTimer);
          return;
        } else delta = _this.touchDeltas.splice(0, 1)[0];

        if (delta > 50) {
          delta = delta / 2;
          func(delta);
        }

        func(delta);
      }, 16);
      e.preventDefault();
    }
  }, {
    key: "end",
    value: function end(e, func) {
      var _this2 = this;

      if (this.lastDelta) {
        var a = this.lastDelta > 0 ? this.lastDelta : -this.lastDelta;
        var deltaList = [];

        while (a > 0.1) {
          a -= Math.log1p(a) * 0.5;
          var delta = Math.ceil(this.lastDelta > 0 ? a : -a);
          deltaList.push(delta);
          if (a < 10) deltaList.push(delta);
          if (a < 5) deltaList.push(delta);
          if (a < 2) deltaList.push(delta);
        }

        this.endTimer = setInterval(function () {
          var delta = deltaList.splice(0, 1)[0];
          func(delta);
          if (deltaList.length === 0) clearInterval(_this2.endTimer);
        }, 16);
        this.lastDelta = null;
      }
    }
  }]);

  return DeltaTouchClass;
}();

exports["default"] = DeltaTouchClass;