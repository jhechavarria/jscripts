# Interval

## Set as many intervals you want!

This JavaScript piece of code allows you to associate as many callback function as you want to "fake" setTimeout loops.

## How it works

Interval creates an array of callbacks with their associated interval. When started, a single setTimeout call will call every function and check, with some calculations if the elapsed time corresponds to its interval. If so, callback will be function fired.

## How to use

### 1 - Include Interval

Start including the script into your page: `<script type="text/javascript" src="js/Interval.js"></script>`
You can change the setTimeout's interval by editing the `Interval.milliseconds` property (ex: `Interval.milliseconds = 10`).

### 2 - Unchain callbacks

Add callback functions you wish to fire with their associated interval as you would do with a basic setTimeout function: `Interval.addCallback(callback, time);`
Time must be defined in milliseconds, precision is key :)

### 3 - Start looping!

Just type `Interval.start();`

## Thanks!!!

Special thanks to [aduth](https://github.com/aduth) and his awesome [correctingInterval](https://github.com/aduth/correctingInterval) helper! After extracting and modifying some of his code, I integrated its automatic adjusting of setTimeout delay.

## License

Copyright 2017 Jessie Hechavarria.

Released freely under the MIT license (refer to LICENSE.txt).
