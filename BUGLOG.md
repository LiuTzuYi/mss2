Bug Reports
======

##### - [x] list height on virtual repeat
-----
> **Status:** Close (v4.0.1-75)
  **Detail:**
    list height change
  **Steps to reproduce:**
    1. click hide filter multiple time

##### - [x] baidu marker performance issue
-----
> **Status:** Close (v4.0.1-73)
  **Detail:**
    baidu marker keep on redraw, causing slow performance
  **Steps to reproduce:**
    1. open live location in baidu
    2. click on the filter
    3. click on the filter again

##### - [x] typeahead not close on blur (occasionally)
-----
> **Status:** Close (v4.0.1-74) - no fix in IE11
  **Detail:**
    typeahead can't close when focus on scoll item (possible cause: two typeahead conflict)
  **Steps to reproduce:**
    1. open a typeahed
    2. scroll it
    3. click on other field

##### - [x] multiselect dropdown performance with large data on IE
-----
> **Status:** Close (v4.0.1-72)
  **Detail:**
    on IE, multiselect dropdown render very slow when it has a large dataset, which affects its usage.
  **Steps to reproduce:**
    1. prepare a dataset with >= 1000 items
    2. open multiselect dropdown in IE

##### - [x] typeahead performance with large data on IE
-----
> **Status:** Close (v4.0.1-72)
  **Detail:**
    on IE, typeahead render very slow when it has a large dataset, which affects its usage.
  **Steps to reproduce:**
    1. prepare a dataset with >= 1000 items
    2. open typeahead in IE