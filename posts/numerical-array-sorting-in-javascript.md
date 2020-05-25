{
  "title": "Numerical array sorting in JavaScript",
  "slug": "numerical-array-sorting-in-javascript",
  "topics": [
    "JavaScript"
  ],
  "keywords": "javascript, array, sort, numerical, w3schools.com, javascriptkit, mozilla, developer, center, number, positive_infinity",
  "created_date": "2008-08-26 20:26:08",
  "short_url": "http://ahedg.es/32",
  "published": false
}

========

In these troubled times, it can be hard to know whom to trust. In looking for a numerical sort function, the <a href="http://www.w3schools.com/jsref/jsref_sort.asp">first</a> <a href="http://www.javascriptkit.com/javatutors/arraysort.shtml">two</a> articles I found both recommended the same syntax. Both of them were wrong.

========

<p class="outdent">Now, maybe I shouldn't be casting stones, considering <a href="/blog/2008/08/22/using-codas-terminal-tab-locally">my last blog post</a>. The truth is, the technique those sites offered will work in most cases, but technically leaves scripts open to errors at the edges.</p>
<p>In JavaScript, you can sort an array just by calling its native <code>sort</code> method. By default, this sorts the contents as strings. That's all fine and dandy when what you're sorting are, in fact, strings, but not when you're sorting numbers (e.g., 10 would come before 9).</p>
<p>The remedy for this is to pass a comparison function to the <code>sort</code> method. The comparison function needs to return -1 if the first argument should come before the second argument, 0 if they are equivalent in sort order, and 1 if the first argument should come after the second.</p>
<p>In most cases, the following syntax (suggested by both of the above linked sites) would work:</p>
<pre class="sh_javascript">
var myArray = [10, 9];
myArray.sort(function (a, b) {
   return a - b;
});
// myArray is now [9, 10]
</pre>
<p>It's terse. It's simple. Looks good, right? Wrong.</p>
<p>The <a href="http://developer.mozilla.org/En/Core_JavaScript_1.5_Reference:Global_Objects:Array:sort">Mozilla Developer Center</a> (an authoritative source, I reckon) has this to say about the above technique:</p>
<blockquote>To compare numbers instead of strings, you should not subtract the numbers because this can cause overflow. For example, <code>9e307-(-9e307)</code> equals <code>Number.POSITIVE_INFINITY</code> but so does <code>9e307-(-9.9e307)</code>.</blockquote>
<p>The solution is to be more explicit in the comparisons. Here's the syntax I've settled on for this:</p>
<pre class="sh_javascript">
var myArray = [10, 9];
myArray.sort(function (a, b) {
   return a > b ? 1 : a < b ? -1 : 0;
});
// myArray is now [9, 10]
</pre>
<p>The moral of the story: check multiple sources, watch for non-obvious gotchas, and never, ever take candy from strangers.</p>
