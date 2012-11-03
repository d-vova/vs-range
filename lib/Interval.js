/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Single interval in a range
 * @author vladimir.darmin@gmail.com
 *
 * @created Tue, Oct 23 2012 - 18:10:35 -0700
 * @updated Fri, Nov 02 2012 - 23:57:55 -0700
 */

var Interval = module.exports = function Interval ( min, max, hasMin, hasMax ) {
  this.hasMin = hasMin != null ? !!hasMin : true;
  this.hasMax = hasMax != null ? !!hasMax : true;

  this.min = Math.min(min, max);
  this.max = Math.max(min, max);

  this.length = this.max - this.min;

  this.minInt = Interval.minInt(this);
  this.maxInt = Interval.maxInt(this);

  this.count = Interval.count(this);
}

Interval.prototype.contains = function contains ( value ) {
  var isInside = this.min < value && value < this.max;

  var isMin = this.hasMin && value == this.min;
  var isMax = this.hasMax && value == this.max;

  return isInside || isMin || isMax;
}

Interval.prototype.generate = function generate ( ) {
  return this.min + this.length * Math.random();
}

Interval.prototype.generateInt = function generateInt ( ) {
  if ( this.count == 0 ) return NaN;

  return this.minInt + Math.floor(this.count * Math.random());
}

Interval.prototype.toString = function toString ( ) {
  var string = '';

  string += this.hasMin ? '[' : '(';

  string += this.min;

  if ( this.min != this.max ) {
    if ( this.containsReal ) string += '-';
    else string += this.min + 1 == this.max ? ',' : '..';

    string += this.max;
  }

  string += this.hasMax ? ']' : ')';

  return string;
}

Interval.prototype.valueOf = function valueOf ( ) { return this.toString(); }

Interval.minInt = function minInt ( interval ) {
  var min = Math.ceil(interval.min);

  if ( min == interval.min && !interval.hasMin ) min += 1;
  if ( min == interval.max && !interval.hasMax ) min = NaN;

  return min <= interval.max ? min : NaN;
}

Interval.maxInt = function maxInt ( interval ) {
  var max = Math.floor(interval.max);

  if ( max == interval.max && !interval.hasMax ) max -= 1;
  if ( max == interval.min && !interval.hasMin ) max = NaN;

  return max >= interval.min ? max : NaN;
}

Interval.count = function count ( interval ) {
  var hasInts = interval.minInt != NaN && interval.maxInt != NaN;

  return hasInts ? interval.maxInt - interval.minInt + 1 : 0;
}
