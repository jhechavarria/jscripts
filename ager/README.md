# Ager
Ager is a simple to use jQuery plugin which makes age calculation and formatting easier.

## Setup

Include ager.js within your html page

```js
<script src="jquery.js"></script>
<script src="ager.js"></script>
```

## Basic usage

Two options are given to you. You can put your birthday date within the tags targetted by ager, or directly within ager's settings. Both methods can be used at same time in a single page. Dates contained by html tags will be prioritized.

### First method

```html
<span class="ager">2005-04-23</span>

<script src="js/jquery.js"></script>
<script src="js/ager.js"></script>
<script>
$(".ager").ager();
</script>
```

### Second method

```html
<span class="ager"></span>

<script src="js/jquery.js"></script>
<script src="js/ager.js"></script>
<script>
$(".ager").ager({
  birth: "2005-04-23"
});
</script>
```

## Plugin Options

None of these options are required. Only **birth** option is needed in case you don't put the birthday date within the targetted html tag.

Option | Type | Default | Description
------------ | ------------- | ------------- | -------------
**birth** | String | NULL | Birthday date to calculate. Format: yyyy-mm-dd.
**output** | String | %a %Y (%d/%m/%y) | Format of the string you wish to get.
**output_type** | String | text | Choose between **text** and **html**. **html** enables the interpretation of html tags found within the **output** option.
**years_text** | String | NULL | Rpresented by **%Y** flag, it adds texts like "Years old" wherever you want.
**text_months** | Array | NULL | List of moths full names. They are represented by the **%M** flag.
**day_first_suffixes** | Array | NULL | A list of day's suffixes (ex: st, nd, rd). Ther are represented by **%s** flag.
**day_global_suffix** | String | NULL | Adds a suffix to all days that don't have a specific suffix listed in the *day_first_suffixes* option. It is also represented by the **%s** flag.

## Output flags

Flag | Description
------------ | -------------
%d | Days from 01 to 31
%D | Days from 1 to 31
%m | Months from 01 to 12
%M | Months from 1 to 12
%N | Months names
%y | Birthday year
%Y | A text that can be appent to the calculated age (ex: 13 **years old**)
%a | Calculated age
%s | Day's suffix

## Full example

The below code prints the following text within the **.ager**'s tag: **13 Years Old | Apr. 24<sup>th</sup> 2005**

```html
<span class="ager">2005-04-23</span>

<script src="js/jquery.js"></script>
<script src="js/ager.js"></script>
<script>
  $('.ager').ager({
    years_text: "Years Old",
    output: "%a %Y | %M. %D<sup>%s</sup> %y",
    day_first_suffixes: ["st", "nd", "rd"],
    day_global_suffixes: "th",
    text_months: ["Jan", "Feb", "Mar", "Apr", "May", "jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    output_type: "html"
});
</script>
```
