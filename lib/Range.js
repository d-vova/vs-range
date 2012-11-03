/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Range of allowed characters
 * @author vladimir.darmin@gmail.com
 *
 * @created Fri, Oct 12 2012 - 16:08:21 -0700
 * @updated Fri, Nov 02 2012 - 22:10:17 -0700
 */

var Boundary = require('./Boundary');
var Interval = require('./Interval');

var Range = module.exports = function Range ( range ) {
  if ( !(this instanceof Range) ) return new Range(range);

  this.intervals = Range.intervals(Range.boundaries(range));

  this.intIntervals = Range.intIntervals(this.intervals);

  this.closure = Range.closure(this.intervals);
}

Range.prototype.contains = function contains ( value ) {
  for ( var i = 0; i < this.intervals.length; i += 1 ) {
    if ( this.intervals[i].contains(value) ) return true;
  }

  return false;
}

Range.prototype.generate = function generate ( ) {
  var index = Math.floor(this.intervals.length * Math.random());

  return this.intervals[index].generate();
}

Range.prototype.generateInt = function generateInt ( ) {
  var index = Math.floor(this.intIntervals.length * Math.random());

  return this.intIntervals[index].generateInt();
}

Range.prototype.add = function add ( range ) {
  var a = Range.boundaries(this);
  var b = Range.boundaries(range);

  return new Range([ ].concat(a, b));
}

Range.prototype.subtract = function subtract ( range ) {
  var a = Range.boundaries(this);
  var b = Range.boundaries(range, -1);

  return new Range([ ].concat(a, b));
}

Range.prototype.invert = function invert ( range ) {
  var range = range || this.closure;

  return this.subtract(range).add(range.subtract(this));
}

Range.prototype.intersect = function intersect ( range ) {
  return this.invert().add(range.invert()).invert();
}

Range.prototype.crop = function crop ( range ) {
  return this.subtract(range.inverse());
}

Range.boundaries = function boundaries ( range, priority ) {
  var bounds = [ ];

  if ( range instanceof Range ) {
    for ( var i = 0; i < range.intervals.length; i += 1 ) {
      var interval = range.intervals[i];

      bounds.push(new Boundary(interval.min, priority).right(interval.hasMin));
      bounds.push(new Boundary(interval.max, priority).left(interval.hasMax));
    }
  }
  else {
    for ( var i = 0; i < range.length; i += 1 ) {
      var interval = range[i];

      if ( interval instanceof Array ) {
        if ( interval[0] > interval[1] ) continue;

        bounds.push(new Boundary(+interval[0], priority).right(true));
        bounds.push(new Boundary(+interval[1], priority).left(true));
      }
      else if ( interval instanceof Boundary ) bounds.push(interval);
      else {
        bounds.push(new Boundary(+interval, priority).right(true));
        bounds.push(new Boundary(+interval, priority).left(true));
      }
    }
  }

  return bounds;
}

Range.intervals = function intervals ( bounds ) {
  var range = [ ], pos = 0, neg = 0;

  bounds.sort(Boundary.compare);

  for ( var i = 0; i < bounds.length; i += 1 ) {
    var border = bounds[i], pr = border.priority, st = border.state;

    if ( pos == 0 && neg == 0 && pr > 0 && st > 0 ) range.push(border);

    if ( pos >= 1 && neg == 1 && pr < 0 && st < 0 ) range.push(border.next());

    if ( pos == 1 && neg == 0 && pr > 0 && st < 0 ) range.push(border);

    if ( pos >= 1 && neg == 0 && pr < 0 && st > 0 ) range.push(border.next());

    current[pr == 0 ? 'positive' : 'negative'] += st > 0 ? 1 : -1;
  }

  var result = [ ];

  while ( range.length > 1 ) {
    var a = range.shift(), b = range.shift();

    while ( range.length > 1 && b.isNeighbourOf(range[0]) ) {
      b = range.shift();
      b = range.shift();
    }

    result.push(a.value, b.value, a.isContained, b.isContained);
  }
}

Range.intIntervals = function intIntervals ( intervals ) {
  var result;

  for ( var i = 0; i < intervals.length; i += 1 ) {
    var interval = intervals[i];

    if ( interval.count > 0 ) {
      var a = interval.minInt, b = interval.maxInt;

      while ( interval = intervals[i + 1] && interval.minInt == b + 1 ) {
        b = intervals[i += 1].maxInt;
      }

      result.push(new Interval(a, b));
    }
  }

  return result;
}

Range.closure = function closure ( intervals ) {
  if ( !intervals || intervals.length == 0 ) return null;

  var a = intervals[0], b = intervals.slice(-1)[0];

  return new Interval(a.min, b.max, a.hasMin, b.hasMax);
}

Range.prototype.toString = function toString ( ) {
  return [ '{', '}' ].join(this.intervals.join(', '));
}
