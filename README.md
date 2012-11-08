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

###create ( positive, negative )###

* `Range | [ Interval ]` - range of included values
* `Range | [ Interval ]` - range of excluded values

Create a new instance of Range as `positive - negative` using `create`:

```javascript
var r = Range.create(pRange, nRange);
```

or using `new`:

```javascript
var r = new Range(pRange, nRange);
```

###shape ( range )###

* `Range | [ Interval ]`

Convert an argument to an instance of Range using `shape`:

```javascript
var r = Range.shape(range);
```

or using constructor:

```javascript
var r = Range(range);
```

###unite ( ranges ) / or ( range )###

* `[ Range | [ Interval ] ]`

* `Range | [ Interval ]`

Combine a group of ranges all together using `unite`;

```javascript
var r = Range.unite([ r1, r2, r3 ]);
```

or individually using `or`:

```javascript
var r = Range(r1).or(Range(r2)).or(Range(r3));
```

###subtract ( range ) / sub ( range )###

* `Range | [ Interval ]`

Subtract one range from another one using `subtract`:

```javascript
var r = Range.subtract(rangeA, rangeB);
```

or using `sub`:

```javascript
var r = Range(rangeA).sub(Range(rangeB));
```

###intersect ( ranges ) / and ( range )###

* `[ Range | [ Interval ] ]`

* `Range | [ Interval ]`

Find the common part of a group of ranges all together using `intersect`:

```javascript
var r = Range.intersect(r1, r2, r3);
```

or individually using `and`:

```javascript
var r = Range(r1).and(Range(r2)).and(Range(r3));
```

###invert ( range ) / not ( )###

* `Range | [ Interval ]`

Find the inverse of a range using `invert`:

```javascript
var r = Range.invert(range);
```

or using `not`:

```javascript
var r = Range(range).not();
```

###random ( range ) / random ( )###

* `Range | [ Interval ]`

Generate a random value that belongs to the range using `random`:

```javascript
var v = Range.random(range);
```

or:

```javascript
var v = Range(range).random();
```

###filter ( check, random, next, previous )###

* `Function ( Number )` - check if the value is lying in range
* `Function ( Number, Number )` - generate a random number included in range
* `Function ( Number ) | null` - get the next value in range
* `Function ( Number ) | null` - get the previous value in range

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
