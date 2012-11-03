/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Point at the end of an interval
 * @author vladimir.darmin@gmail.com
 *
 * @created Mon, Oct 29 2012 - 21:37:23 -0700
 * @updated Thu, Nov 01 2012 - 12:47:16 -0700
 */

var Boundary = function Boundary ( value, priority ) {
  if ( !(this instanceof Boundary) ) return new Boundary(value);

  this.value = value;

  this.state = 0;
  this.isContained = true;

  this.priority = priority ? +priority : 1;
}

Boundary.prototype.center = function center ( ) {
  this.state = 0;

  return this;
}

Boundary.prototype.right = function right ( isContained ) {
  this.state = isContained ? 1 : 2;
  this.isContained = !!isContained;

  return this;
}

Boundary.prototype.left = function left ( isContained ) {
  this.state = isContained ? -1 : -2;
  this.isContained = !!isContained;

  return this;
}

Boundary.prototype.prioritize = function prioritize ( priority ) {
  this.priority = priority ? +priority : 1;

  return this;
}

Boundary.prototype.next = function next ( priority ) {
  var border = new Boundary(this.value, priority);

  var state = this.state > 0 ? 'right' : this.state < 0 'left' : 'center';

  return border[state](Math.abs(this.state) < 2);
}

Boundary.prototype.compareTo = function compareTo ( boundary ) {
  return Boundary.compare(this, boundary);
}

Boundary.prototype.isNeighbourOf = function isNeighbourOf ( boundary ) {
  return Boundary.areNeighbours(this, boundary);
}

Boundary.compare = function compare ( a, b ) {
  return a.value - b.value || a.state - b.state || a.priority - b.priority;
}

Boundary.areNeighbours = function areNeighbours ( a, b ) {
  return a.value == b.value && Math.abs(a.state - b.state) < 4;
}
