{
  "title": "Numerical array sorting in JavaScript",
  "slug": "numerical-array-sorting-in-javascript",
  "topics": [
    "JavaScript"
  ],
  "keywords": "javascript, array, sort, numerical, w3schools.com, javascriptkit, mozilla, developer, center, number, positive_infinity",
  "created_date": "2008-08-26 20:26:08",
  "short_url": "https://ahedg.es/32",
  "published": true
}

========

In these troubled times, it can be hard to know whom to trust. In looking for a numerical sort function, the [first](https://www.w3schools.com/jsref/jsref_sort.asp) [two](https://www.javascriptkit.com/javatutors/arraysort.shtml) articles I found both recommended the same syntax. Both of them were wrong.

========

Now, maybe I shouldn't be casting stones, considering [my last blog post](/blog/2008/08/22/using-codas-terminal-tab-locally). The truth is, the technique those sites offered will work in most cases, but technically leaves scripts open to errors at the edges.

In JavaScript, you can sort an array just by calling its native `sort` method. By default, this sorts the contents as strings. That's all fine and dandy when what you're sorting are, in fact, strings, but not when you're sorting numbers (e.g., 10 would come before 9).

The remedy for this is to pass a comparison function to the `sort` method. The comparison function needs to return -1 if the first argument should come before the second argument, 0 if they are equivalent in sort order, and 1 if the first argument should come after the second.

In most cases, the following syntax (suggested by both of the above linked sites) would work:

<pre class="sh_javascript">
var myArray = [10, 9];
myArray.sort(function (a, b) {
    return a - b;
});
// myArray is now [9, 10]
</pre>

It's terse. It's simple. Looks good, right? Wrong.

The [Mozilla Developer Center](https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference:Global_Objects:Array:sort) (an authoritative source, I reckon) has this to say about the above technique:

> To compare numbers instead of strings, you should not subtract the numbers because this can cause overflow. For example, `9e307-(-9e307)` equals `Number.POSITIVE_INFINITY` but so does `9e307-(-9.9e307)`.

The solution is to be more explicit in the comparisons. Here's the syntax I've settled on for this:

<pre class="sh_javascript">
var myArray = [10, 9];
myArray.sort(function (a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
});
// myArray is now [9, 10]
</pre>

The moral of the story: check multiple sources, watch for non-obvious gotchas, and never, ever take candy from strangers.
