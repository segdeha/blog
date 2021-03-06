{
  "title": "JavaScript Unit Testing",
  "slug": "javascript-unit-testing",
  "topics": [
    "JavaScript"
  ],
  "keywords": "javascript, ecmascript, unit, functional, selenium, test, testing, test-driven, development, assert, method, jsunit, isTrue, isFalse, areEqual, areSame, isNull, isArray, mac, macintosh, dashboard, widget, phpfr, php",
  "created_date": "2007-06-10 06:10:00",
  "short_url": "http://ahedg.es/3",
  "deprecated": true,
  "published": true
}

========

I’ve started working on version 1.0 of my [PHP function reference](http://andrew.hedges.name/widgets/#phpfr) widget for [Mac OS X Dashboard](http://www.apple.com/macosx/features/dashboard/). At [work](http://vianet.travel/), we cover a lot of our code with [unit](http://en.wikipedia.org/wiki/Unit_testing), [functional](http://en.wikipedia.org/wiki/Functional_testing), and [Selenium](http://www.openqa.org/selenium/) tests. I decided to drink the juice and do the same in the context of widget development.

========

[JavaScript](http://en.wikipedia.org/wiki/Javascript) doesn’t have an `assert()` method. No biggie. I wrote my own. It’s actually several functions (e.g., isTrue, isFalse, areEqual, areSame, isNull, isArray, etc.). (Yes, I could have used [JSUnit](http://www.google.com/url?sa=t&source=web&ct=res&cd=1&url=http%3A%2F%2Fwww.jsunit.net%2F&ei=SV3USO6vGoOspwSqpZCoDg&usg=AFQjCNG0db_XFUf8UoLVbQLDykBtzwjGeQ&sig2=BEne6HCloxV24oyQb12loA), but then I wouldn’t have had the learning experience of writing my own. Anyway, I think what I came up with is more useful in a widget environment for reasons elaborated below.)

In Mac OS X Dashboard, `alert('Hello');` will write the string _Hello_ to the Console. That’s basically what my assert methods do: write an "ok" message if the assertion passes and a "NOT OK" if it does not.

As I started covering my code with tests, I started to want a summary of the tests at the end so I wouldn’t have to wade through the individual test results. So, I wrote a `summarize()` method that displays the total number of tests run, plus a breakdown of how many passed and how many didn’t.

I even figured out a way to test some asynchronous function calls, specifically `widget.system()` invocations. That bit is actually a wee kludge. I’d be interested to hear if anyone has a more elegant way of doing it.

In any case, here’s some of the code (`writeDebug()` is a function I wrote for widget debugging. It basically calls an `alert()` method, but adds some formatting.):

<pre class="sh_javascript">
var assert = {
   areEqual: function (a, b) {
      if (a == b) {
         writeDebug('ok: ' + a + ' equals ' + b);
         return true;
      } else {
         writeDebug('NOT OK: ' + a + ' does not equal ' + b);
         return false;
      }
   },
   isArray: function (a) {
      if (a instanceof Array) {
         writeDebug('ok: ' + a + ' is an array');
         return true;
      } else {
         writeDebug('NOT OK: ' + a + ' is not an array');
         return false;
      }
   }
}
</pre>

This shows just a couple of the methods on the `assert` object. Pretty simple, eh? Next, let’s look at some sample tests:

<pre class="sh_javascript">
var tests = {
   library: function () {
      writeDebug('Tests of phpfr-library.js');
      assert.isTrue("['one', 'two'].in_array('one')");
      assert.isFalse("['one', 'two'].in_array('three')");
   }
}
</pre>

In this example, by calling `tests.library();` I run two tests of the `in_array()` method I wrote for my JavaScript library.

I mentioned that I wanted a summary of the tests. Here is the code I added to the `tests` object to accomplish that (this also required rewriting my `assert` calls):

<pre class="sh_javascript">
var tests = {
   results: {
      ok: 0,
      not_ok: 0,
      summarize: function () {
         var results = "\n\n\t" + 'Ran ' + (tests.results.ok + \
            tests.results.not_ok) + ' tests.' + "\n";
         results += "\t\tok: " + tests.results.ok + "\n";
         results += "\t\tNOT OK: " + tests.results.not_ok + "\n";
         writeDebug(results);
      }
   },
   library: function () {
      writeDebug('Tests of phpfr-library.js');
      (assert.isTrue("['one', 'two'].in_array('one')"))? \
         ++tests.results.ok: ++tests.results.not_ok;
      (assert.isFalse("['one', 'two'].in_array('three')"))? \
         ++tests.results.ok: ++tests.results.not_ok;
   }
}
</pre>

Now, by calling `tests.results.summarize();` at the end of my test run, I get a neat, little summary of the results.

Asynchronous calls proved to be a little tricky. In this case, I wanted to test the result of an asynchronous `widget.system()` call, contained in another file, that looks like the following:

<pre class="sh_javascript">
var topicsArray;
evalResponse = function (obj) {
   topicsArray = eval(obj.outputString);
}
widget.system("/usr/bin/php 'Assets/php/topics.php'", \
   evalResponse);
</pre>

That little snippet returns an array of topic names from the PHP documentation. But, it takes 100 miliseconds or so to process, so I needed to force my `summarize()` method to wait until the call was finished before spitting out its results. Here’s the code:

<pre class="sh_javascript">
var tests = {
   timers: $H({ // yes, i use prototype!
      topicsArray: undefined
   },
   results: {
      timer: undefined,
      ok: 0,
      not_ok: 0,
      summarize: function () {
         clearTimeout(tests.results.timer);
         var all_finished = tests.timers.all(
            function (s) {
               return (s.value === undefined);
            }
         );
         if (all_finished) {
            var results = "\n\n\t" + 'Ran ' + (tests.results.ok + \
               tests.results.not_ok) + ' tests.' + "\n";
            results += "\t\tok: " + tests.results.ok + "\n";
            results += "\t\tNOT OK: " + tests.results.not_ok + "\n";
            writeDebug(results);
         } else {
            tests.results.timer = \
               setTimeout('tests.results.summarize();', 50);
         }
      }
   },
   library: function () {
      writeDebug('Tests of phpfr-library.js');
      (assert.isTrue("['one', 'two'].in_array('one')"))? \
         ++tests.results.ok: ++tests.results.not_ok;
      (assert.isFalse("['one', 'two'].in_array('three')"))? \
         ++tests.results.ok: ++tests.results.not_ok;
   },
   topicsArray: function () {
      writeDebug('Tests of phpfr-topic-names.js');
      clearTimeout(tests.timers.topicsArray);
      if (topicsArray) {
         tests.timers.topicsArray = undefined;
         (assert.isArray(topicsArray))? ++tests.results.ok: \
         ++tests.results.not_ok;
      } else {
         tests.timers.topicsArray = \
            setTimeout('tests.topicsArray()', 50);
      }
   }
}
</pre>

Was this a lot of effort? Kind of. It was actually fun coming up with the `assert` methods and writing the test cases. I uncovered about a dozen bugs in my recently refactored code base in the process, too. That more than makes it worth the time it took to come up with all of this!

[PHPfr](http://andrew.hedges.name/widgets/#phpfr) is a Mac OS X Dashboard widget that lets you quickly and easily lookup PHP functions using a downloaded version of the docs from [PHP.net](http://www.php.net/). It also includes an extensive cheat sheet and an interactive date formatter. It’s useful enough that I go to it a few times a day in my [job](http://vianet.travel/). PHPfr is an open source project, via [Google Code](http://code.google.com/p/phpfr/). Let me know if you’d be interested in contributing!
