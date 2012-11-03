/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Point at the end of an interval
 * @author vladimir.darmin@gmail.com
 *
 * @created Mon, Oct 29 2012 - 21:37:23 -0700
 * @updated Fri, Nov 02 2012 - 23:57:45 -0700
 */

var Boundary = function Boundary ( value, isInverted ) {
  if ( !(this instanceof Boundary) ) return new Boundary(value);

  this.value = value;

  this.state = 0;
  this.isContained = true;

  this.isInverted = false;
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

Boundary.prototype.next = function next ( isInverted ) {
  var border = new Boundary(this.value, isInverted);

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
  return a.value - b.value || a.state - b.state || b.isInverted - a.isInverted;
}

Boundary.areNeighbours = function areNeighbours ( a, b ) {
  return a.value == b.value && Math.abs(a.state - b.state) < 4;
}
