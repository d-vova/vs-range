/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Single interval in a range
 * @author vladimir.darmin@gmail.com
 *
 * @created Tue, Oct 23 2012 - 18:10:35 -0700
 * @updated Mon, Oct 29 2012 - 14:42:18 -0700
 */

var Interval = module.exports = function Interval ( min, max ) {
  this.min = Math.min(min, max);
  this.max = Math.max(min, max);

  this.hasMin = true;
  this.hasMax = true;

  this.containsReal= true;
}

Interval.prototype.excludeMin = function excludeMin ( ) {
  this.hasMin = false;

  return this;
}

Interval.prototype.excludeMax = function excludeMax ( ) {
  this.hasMax = false;

  return this;
}

Interval.prototype.includeMin = function includeMin ( ) {
  this.hasMin = true;

  return this;
}

Interval.prototype.includeMax = function includeMax ( ) {
  this.hasMax = true;

  return this;
}

Interval.prototype.whole = function whole ( ) {
  this.containsReal = false;

  return this;
}

Interval.prototype.real = function real ( ) {
  this.containsReal = true;

  return this;
}

Interval.prototype.contains = function contains ( value ) {
  var isInside = this.min < value && value < this.max;

  var isMin = this.containsMin && value == this.min;
  var isMax = this.containsMax && value == this.max;

  var matchesSubset = !this.containsReal && Math.round(value) == value;

  return (isInside || isMin || isMax) && matchesSubset;
}

Interval.prototype.random = function random ( ) {
  if ( this.min > this.max ) return NaN;

  var random = this.min + (this.max - this.min) * Math.random();

  if ( !this.containsReal ) {
    random = Math.round(random);

    if ( random < this.min ) random += 1;
    if ( random > this.max ) random -= 1;

    if ( random == this.min && !this.hasMin ) random += 1;
    if ( random == this.max && !this.hasMax ) random -= 1;
  }

  if ( random == this.min ) return this.hasMin ? random : NaN;
  if ( random == this.max ) return this.hasMax ? random : NaN;

  return this.min < random && random < this.max ? random : NaN;
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
