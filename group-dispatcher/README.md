# group-dispatcher
Node module that allows you to dispatch array data in smaller groups in a balanced or specified way

# Install

## Install with NPM

Go to your project folder through your terminal and type the following command:

```sh
npm install git+https://github.com/jhechavarria/jscripts/tree/master/group-dispatcher.git
```
## Install manually

1) Download files.
2) Create a directory named **group-dispatcher** within the **node_modules** directory in your node project.
3) Unzip the downloaded archive and put contents in the **group-dispatcher** directory.

# Guide

## Basic usage

```js
const { Dispatcher } = require('group-dispatcher');

const reference = [2, 3, 1, 2.5, 2.5, 1, 2.5, 1.5, 1, 1.5];
const groups = 3;

const dispatcher = new Dispatcher(reference, groups);

dispatcher.start();

const dispatchedGroups = dispatcher.groups;

dispatcher.print();
```

## Set reference array

### Native arrays

A simple array of numbers can be given to ***Dispatcher***.

```js
const { Dispatcher } = require('group-dispatcher');

const reference = [2, 3, 1, 2.5, 2.5, 1, 2.5, 1.5, 1, 1.5];

const dispatcher = new Dispatcher(reference, 3);
```

### Using NumberArray

You could also import the ***NumberArray*** class.

```js
const { NumberArray, Dispatcher } = require('group-dispatcher');

const reference = new NumberArray(2, 3, 1, 2.5, 2.5, 1, 2.5, 1.5, 1, 1.5);

const dispatcher = new Dispatcher(reference, 3);
```

This class extends native ***Array*** class and implements other methods mor specific to numbers operations.

### Mixing both

If you are using a native array and wish to pass an instance of ***NumberArray*** you could hydrate it with native array easilly.

```js
const { NumberArray, Dispatcher } = require('group-dispatcher');

const nativeArray = [2, 3, 1, 2.5, 2.5, 1, 2.5, 1.5, 1, 1.5];

const reference = new NumberArray();
reference.hydrate(nativeArray);

const dispatcher = new Dispatcher(reference, 3);
```

## Groups

A ***Group*** is a subset of ***Dispatcher***. It contains balanced values comming from the reference.

```js
const { Group } = require('group-dispatcher');
const limit = 5;

const group = new Group(limit);
```

### Group limit

Any ***Group*** takes a `limit` asargument in its constructor. This limit sets the maximum amount of values that this subset could contain.

### Setting groups automatically

If second argument given to ***Dispatcher*** is a number. It represents the number of groups you want your data to be dispatched in. Groups will be created internally and limits set automatically with close values.

```js
const { Dispatcher } = require('group-dispatcher');

const reference = [2, 3, 1, 2.5, 2.5, 1, 2.5, 1.5, 1, 1.5];
const groups = 3

const dispatcher = new Dispatcher(reference, groups);

dispatcher.start();
dispatcher.print();
```

### Setting groups manually

Alternatively, you can provide a custom array of groups as second argument to ***Dispatcher*** . It allows you to manage each group limit yourself.

```js
const { Group, Dispatcher } = require('group-dispatcher');

const reference = [2, 3, 1, 2.5, 2.5, 1, 2.5, 1.5, 1, 1.5];
const groups = [
  new Group(5),
  new Group(5)
];

const dispatcher = new Dispatcher(reference, groups);

dispatcher.start();
dispatcher.print();
```

If set manually, you must provide a valid set of groups. It means that total of given limits must correspond to to reference length.

## Dispatching data

### Grouping overlap

Overlap is designed to let you decide how precise the selection algorithm will be. Low overlap forces **Dispatcher** to be as close as possible of perfect equivalence between groups. High overlap is more permissive and, as a consequence, less precise.

`lowOverlap` could only be **true** or **false**. If **true**, it will be as precise as possible.

```js
const { Dispatcher } = require('group-dispatcher');

const reference = [2, 3, 1, 2.5, 2.5, 1, 2.5, 1.5, 1, 1.5];
const groups = 3;
const lowOverlap = true;

const dispatcher = new Dispatcher(reference, groups, lowOverlap);

dispatcher.start();
dispatcher.print();
```

### Start dispatch

When everything is configured and ready, simply call the **start** method from **Dispatcher**

```js
const { Dispatcher } = require('group-dispatcher');

const reference = [2, 3, 1, 2.5, 2.5, 1, 2.5, 1.5, 1, 1.5];
const groups = 3;

const dispatcher = new Dispatcher(reference, groups);

if (dispatcher.start())
{
  dispatcher.print();
}
else
{
  console.log('Something went wrong');
  dispatcher.printConfig();
}
```

**start** method returns a boolean to tell if there was some error while dispatching the data;

### Execution timeout

**Dispatcher** class has a `timeout` property which is meant to prevent infinite loops during dispatch. It contains a duration set in milliseconds to define the maximum duration allowed for dispatch process. By default its value is 3500 milliseconds.

```js
const { Group, Dispatcher } = require('group-dispatcher');

const reference = [2, 3, 1, 2.5, 2.5, 1, 2.5, 1.5, 1, 1.5];
const groups = [
  new Group(3),
  new Group(7)
];

const dispatcher = new Dispatcher(reference, groups);

dispatcher.timeout = 5000;

if (dispatcher.start())
{
  dispatcher.print();
}
else
{
  console.log('Something went wrong');
  dispatcher.printConfig();
}
```

In this example dispatch will try to do his work during 5 seconds before aborting and return **false**.

# Reference

## NumberArray

### Methods

#### *number* **sum(** *void* **)**

Returns the sum of all values.

#### *number* **max(** *number* cells=1 **)**

Returns the sum of the N highest values. Cells defines how many values to get.

#### *number* **min(** *number* cells=1 **)**

Returns the sum of the N lowest values. Cells defines how many values to get.

#### *number* **avg(** *void* **)**

Returns the average value of array elements values.

#### *NumberArray* **copt(** *void* **)**

Returns an editable version of the current array.

#### *number* **percent(** *number* percent **)**

Returns a percent of the sum of all values.

#### *number* **random(** *void* **)**

Returns a random value from the array.

#### *void* **remove(** *number* value, *boolean* all=false **)**

Removes given value from the array. If all is set to **true** all corresponding values will be removed.

#### *void* **hydrate(** *Array* array **)**

Injects all values from given array into the current one.

## Group

### Properties

#### *NumberArray* values=new NumberArray()

Contains all values of the group.

#### *number* limit

Contains the maximum amount of values a group can have.

### Methods

#### *void **constructor(** *number* limit **)**

Sets the limit for the group on group instantiation.

#### *void **add(** *number* value **)**

Adds a value to the group.

#### *void **remove(** *number* value **)**

Removes a value from the group.

#### *void **reset(** *void* **)**

Resets the values in the group.

#### *boolean **busy(** *void* **)**

Returns the amount of values in the group.

#### *boolean **full(** *void* **)**

Returns whether or not values amount reached group's limit.

#### *boolean* **isReady(** *number* overlap **)**

Returns **true** if current group is full and its cumulated values are lower or equal to overlap.

#### *void* **debug(** *number* overlap **)**

Prints some information about the group in the console.

## Dispatcher

### Properties

#### *NumberArray* reference

Contains the reference array to dispatch

#### *array* groups

Contains groups subsets where data is dispatched

#### *number* divider

Represents the perfect balance between all values and groups

#### *number* overlap

Represents the maximum amouny that cumulated values of a group can have.

#### *number* timeout

Contains dispatch process maximum duration time in milliseconds

### Methods

#### *void* **setReference(** *array* reference **)**

Sets reference. It could be either a simple array or an instance of **NumberArray**.

#### *void* **setGroups(** *number | array* groups **)**

Sets the groups where data will ba dispatched. If number is given, groups will be generated automatically otherwise **groups** argument must be an array of groups.

#### *void* **setDivider(** *void* **)**

Sets the representation of a perfect group balance.

#### *void* **setOverlap(** *boolean* lowOverlap=true **)**

Sets the maximum value that group cumulated values cannot exceed.

`lowOverlap` represents the algorithm's degree of precision. If **false** precision will be lower and difference between groups potentially higher.

#### *boolean* **isReady(** *void* **)**

Returns **true** if all groups are valid (full and not overlapping).

#### *boolean* **start(** *function* selectorCallback=null **)**

Proceeds to dispatch. If `selectorCallback` is given, it will be used to select reference data to dispatch instead of random.

#### *void* **printConfig(** *void* **)**

Prints all config data to console. It does not include dispatched data.

#### *void* **print(** *void* **)**

Prints config data and dispatched data to console.
