/**
 * Handlebars Helpers Utils
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';



var Dates = module.exports = {};

Dates.padNumber = function(num, count, padCharacter) {
  if (typeof padCharacter === 'undefined') {
    padCharacter = '0';
  }
  var lenDiff = count - String(num).length;
  var padding = '';
  if (lenDiff > 0) {
    while (lenDiff--) {
      padding += padCharacter;
    }
  }
  return padding + num;
};

Dates.dayOfYear = function(date) {
  var oneJan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((date - oneJan) / 86400000);
};

Dates.weekOfYear = function(date) {
  var oneJan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((((date - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
};

Dates.isoWeekOfYear = function(date) {
  var target = new Date(date.valueOf());
  var dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  var jan4 = new Date(target.getFullYear(), 0, 4);

  var dayDiff = (target - jan4) / 86400000;
  return 1 + Math.ceil(dayDiff / 7);
};

Dates.tweleveHour = function(date) {
  if (date.getHours() > 12) {
    return date.getHours() - 12;
  } else {
    return date.getHours();
  }
};

Dates.timeZoneOffset = function(date) {
  var hoursDiff = -date.getTimezoneOffset() / 60;
  var result = Dates.padNumber(Math.abs(hoursDiff), 4);
  return (hoursDiff > 0 ? '+' : '-') + result;
};

Dates.format = function(date, format) {
  var match = null;
  return format.replace(Dates.formats, function(m, p) {
    switch (p) {
      case 'a':
        return Dates.abbreviatedWeekdays[date.getDay()];
      case 'A':
        return Dates.fullWeekdays[date.getDay()];
      case 'b':
        return Dates.abbreviatedMonths[date.getMonth()];
      case 'B':
        return Dates.fullMonths[date.getMonth()];
      case 'c':
        return date.toLocaleString();
      case 'C':
        return Math.round(date.getFullYear() / 100);
      case 'd':
        return Dates.padNumber(date.getDate(), 2);
      case 'D':
        return Dates.format(date, '%m/%d/%y');
      case 'e':
        return Dates.padNumber(date.getDate(), 2, ' ');
      case 'F':
        return Dates.format(date, '%Y-%m-%d');
      case 'h':
        return Dates.format(date, '%b');
      case 'H':
        return Dates.padNumber(date.getHours(), 2);
      case 'I':
        return Dates.padNumber(Dates.tweleveHour(date), 2);
      case 'j':
        return Dates.padNumber(Dates.dayOfYear(date), 3);
      case 'k':
        return Dates.padNumber(date.getHours(), 2, ' ');
      case 'l':
        return Dates.padNumber(Dates.tweleveHour(date), 2, ' ');
      case 'L':
        return Dates.padNumber(date.getMilliseconds(), 3);
      case 'm':
        return Dates.padNumber(date.getMonth() + 1, 2);
      case 'M':
        return Dates.padNumber(date.getMinutes(), 2);
      case 'n':
        return '\n';
      case 'p':
        if (date.getHours() > 11) {
          return 'PM';
        } else {
          return 'AM';
        }
      break;
      case 'P':
        return Dates.format(date, '%p').toLowerCase();
      case 'r':
        return Dates.format(date, '%I:%M:%S %p');
      case 'R':
        return Dates.format(date, '%H:%M');
      case 's':
        return date.getTime() / 1000;
      case 'S':
        return Dates.padNumber(date.getSeconds(), 2);
      case 't':
        return '\t';
      case 'T':
        return Dates.format(date, '%H:%M:%S');
      case 'u':
        if (date.getDay() === 0) {
          return 7;
        } else {
          return date.getDay();
        }
        break;
      case 'U':
        return Dates.padNumber(Dates.weekOfYear(date), 2);
      case 'v':
        return Dates.format(date, '%e-%b-%Y');
      case 'V':
        return Dates.padNumber(Dates.isoWeekOfYear(date), 2);
      case 'W':
        return Dates.padNumber(Dates.weekOfYear(date), 2);
      case 'w':
        return Dates.padNumber(date.getDay(), 2);
      case 'x':
        return date.toLocaleDateString();
      case 'X':
        return date.toLocaleTimeString();
      case 'y':
        return String(date.getFullYear()).substring(2);
      case 'Y':
        return date.getFullYear();
      case 'z':
        return Dates.timeZoneOffset(date);
      default:
        return match;
    }
  });
};

Dates.formats = /%(a|A|b|B|c|C|d|D|e|F|h|H|I|j|k|l|L|m|M|n|p|P|r|R|s|S|t|T|u|U|v|V|W|w|x|X|y|Y|z)/g;

Dates.abbreviatedWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

Dates.fullWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

Dates.abbreviatedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

Dates.fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


