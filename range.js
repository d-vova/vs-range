/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Range of numerical values that allows to specify, unite,
 *               intersect, subtract, and invert intervals, as well as 
 *               generate random values and compute corner case values
 * @author vladimir.darmin@gmail.com
 *
 * @created Fri, Nov 02 2012 - 23:10:35 -0700
 * @updated Fri, Nov 02 2012 - 23:10:35 -0700
 */

var Boundary = exports.Boundary = require('./Boundary');

var Interval = exports.Interval = require('./Interval');

var Range = exports.Range = require('./Range');

exports.create = function create ( ) {
  return new Range(arguments);
}

exports.unite = function unite ( ) {
  var ranges = [ ];
  
  for ( var i = 0; i < arguments.length; i += 1 ) {
    var range = arguments[i];

    ranges.push(range instanceof Range ? range : new Range(range));
  }

  return Range.unite(ranges);
}

exports.intersect = function intersect ( ) {
  var ranges = [ ];
  
  for ( var i = 0; i < arguments.length; i += 1 ) {
    var range = arguments[i];

    ranges.push(range instanceof Range ? range : new Range(range));
  }

  return Range.intersect(ranges);
}

exports.invert = function invert ( ) {
  return new Range(arguments).invert();
}
