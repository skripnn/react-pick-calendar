// eslint-disable-next-line no-extend-native
Date.prototype.getWeek = function () {
  // получение номера недели
  const first_day_in_year = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - first_day_in_year) / 86400000) + first_day_in_year.getDay2()) / 7) - 1;
};

// eslint-disable-next-line no-extend-native
Date.prototype.getDay2 = function () {
  // Date.getDay (Monday = 0)
  const day = this.getDay()
  if (day === 0) return 6
  else return day - 1
}

// eslint-disable-next-line no-extend-native
Date.prototype.getWeeksInYear = function (i=0) {
  // получение количества недель в году
  const last_date_in_year = new Date(this.getFullYear() + i, 11, 31)
  return last_date_in_year.getWeek()
}

// eslint-disable-next-line no-extend-native
Date.prototype.getDiffWeeks = function (start) {
  // получение разницы между неделями
  const c = start.getWeeksInYear() - this.getWeeksInYear()
  let w = this.getWeek() - start.getWeek() + c
  if (this.getFullYear() !== start.getFullYear()) {
    for (let i = 0; i < this.getFullYear() - start.getFullYear(); i++) {
      w += start.getWeeksInYear(i)
    }
  }
  return w
}

// eslint-disable-next-line no-extend-native
Date.prototype.getDiffMonth = function (start) {
  // получение разницы между месяцами
  let more, less
  if (this.getTime() > start.getTime()) {
    more = this
    less = start
  }
  else if (start.getTime() > this.getTime()) {
    more = start
    less = this
  }
  else return 0

  let m = more.getMonth() - less.getMonth()
  if (more.getFullYear() !== less.getFullYear()) {
    for (let i = 0; i < more.getFullYear() - less.getFullYear(); i++) {
      m += 12
    }
  }
  return m
}

// eslint-disable-next-line no-extend-native
Date.prototype.format = function () {
  // Date to String format YYYY-MM-DD
  let dd = this.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = this.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yyyy = this.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
}

// eslint-disable-next-line no-extend-native
Date.prototype.monday = function () {
  // Set day to Monday
  this.setDate(this.getDate() - this.getDay2())
  return this
}

// eslint-disable-next-line no-extend-native
Date.prototype.offsetDays = function (x) {
  // Date + x days
  this.setDate(this.getDate() + x)
  return this
}

// eslint-disable-next-line no-extend-native
Date.prototype.offsetWeeks = function (x) {
  // Date + x weeks
  this.setDate(this.getDate() + x * 7)
  return this
}

export function newDate(date) {
  // Create new Date without time (00:00:00:000)
  let newDate = date? new Date(date) : new Date()
  newDate.setHours(0,0,0,0)
  return newDate
}

export function getMonth(m) {
  // format MM from M
  let mm = m + 1;
  if (mm < 10) mm = '0' + mm;
  return mm
}