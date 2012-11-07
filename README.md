#vs-range#

Range of numerical values that allows to specify, unite, intersect, subtract, and invert intervals, as well as generate random values and compute corner case values


##Module##

```javascript
var range = require('vs-range');
```


##Range##

Range is the underlying class that represents a series of numerical intervals

```javascript
var Range = require('vs-range').Range;
```

###create###

Create a new instance of Range using `create`:

```javascript
var r = Range.create(pRange, nRange);
```

or using `new`:

```javascript
var r = new Range(pRange, nRange);
```

###shape###

Convert an argument to an instance of Range using `shape`:

```javascript
var r = Range.shape(range);
```

or using constructor:

```javascript
var r = Range(range);
```

###unite/or###

Combine a group of ranges all together using `unite`;

```javascript
var r = Range.unite([ r1, r2, r3 ]);
```

or individually using `or`:

```javascript
var r = Range(r1).or(Range(r2)).or(Range(r3));
```

###subtract/sub###

Subtract one range from another one using `subtract`:

```javascript
var r = Range.subtract(rangeA, rangeB);
```

or using `sub`:

```javascript
var r = Range(rangeA).sub(Range(rangeB));
```

###intersect/and###

Find the common part of a group of ranges all together using `intersect`:

```javascript
var r = Range.intersect(r1, r2, r3);
```

or individually using `and`:

```javascript
var r = Range(r1).and(Range(r2)).and(Range(r3));

###invert/not###

Find the inverse of a range using `invert`:

```javascript
var r = Range.invert(range);
```

or using `not`:

```javascript
var r = Range(range).not();
```

###random###

Generate a random value that belongs to the range using `random`:

```javascript
var v = Range.random(range);
```

or:

```javascript
var v = Range(range).random();
```

###filter###

Add constraints on the elements included in range using `filter`:

```javascript
var check = function check ( value ) {
  return value % 2 == 0;
}

var next = function next ( value ) {
  return value + (check(value) ? 2 : 1);
}

var previous = function previous ( value ) {
  return value - (check(value) ? 2 : 1);
}

var random = function random ( min, max ) {
  var min = next(min), max = previous(max), count = (max - min) / 2 + 1;

  return count > 0 ? min + 2 * Math.floor(Math.random() * count) : NaN;
}

var r = Range(range).filter(check, random, next, previous);
```
