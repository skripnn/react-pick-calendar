"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newDate = newDate;
exports.getMonth = getMonth;

Date.prototype.getDay2 = function () {
  var day = this.getDay();
  if (day === 0) return 6;else return day - 1;
};

Date.prototype.getDiffWeeks = function (start) {
  return (this.getTime() - start.getTime()) / 604800000;
};

Date.prototype.format = function () {
  var dd = this.getDate();
  if (dd < 10) dd = '0' + dd;
  var mm = this.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  var yyyy = this.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
};

Date.prototype.monday = function () {
  this.setDate(this.getDate() - this.getDay2());
  return this;
};

Date.prototype.offsetDays = function (x) {
  this.setDate(this.getDate() + x);
  return this;
};

Date.prototype.offsetWeeks = function (x) {
  this.setDate(this.getDate() + x * 7);
  return this;
};

function newDate(date) {
  var newDate = date ? new Date(date) : new Date();
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function getMonth(m) {
  var mm = m + 1;
  if (mm < 10) mm = '0' + mm;
  return mm;
}