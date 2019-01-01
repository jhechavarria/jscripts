# Clocker

Jquery plugin that displays date and time in whatever format you wish with a simple formatting method.

## Example usage

### Basic usage

```js
 jQuery(function() {
  $('#clocker').clocker();
 });
```

### With arguments

```js
 jQuery(function() {
  $('#clocker').clocker({
    "refresh_rate": 500,
    "output_format": "%h:%i:%s | %m/%d/%y",
    "months_terms": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']
  });
 });
```

## Options

You can easily change clocker's behaviour by changing a few options. All of them are detailed below.

### refresh_rate

This argument is quite explicit, it defines how often the date and time will be refreshed. It is based on a automatically adjusted timeout to get more reliable results.

```js
 jQuery(function() {
  $('#clocker').clocker({
    "refresh_rate": 500 // This will refresh timer every 500 milliseconds (half a second)
  });
 });
```

### output_format

This option helps to define precisely how the date and time will be displayed. It accepts a string as well as html combined with special characters representing parts of DateTime.

```js
 jQuery(function() {
  $('#clocker').clocker({
    "output_format": "%h:%i:%s | %m/%d/%y"
  });
 });
```
#### Keywords

Keyword | Format | Description
------------ | ------------- | -------------
**%y** | 2010 | Years digits
**%m** | 01-12 | Months from 01 to 12
**%d** | 01-31 | Days from 01 to 31
**%h** | 01-23 | Hours from 01 to 23
**%i** | 01-59 | Minutes from 01 to 59
**%s** | 01-59 | Seconds from 01 to 59

### months_terms

The **months_terms** argument lists all months terms in plain text. If defined, set terms will be used instead of numbers.

```js
jQuery(function() {
 $('#current_time').clocker({
  "months_terms": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']
 });
});
```
