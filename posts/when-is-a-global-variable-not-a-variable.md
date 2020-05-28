{
  "title": "When is a global variable not a variable?",
  "slug": "when-is-a-global-variable-not-a-variable",
  "topics": ["JavaScript"],
  "keywords": "javascript, ecmascript, ecma-262, ecma-262-3, dmitry soshnikov, var, variables",
  "created_date": "2010-04-07 13:37:00",
  "short_url": "http://ahedg.es/84",
  "published": true
}

========

I’ve started reading [Dmitry Soshnikov](http://twitter.com/DmitrySoshnikov)’s excellent series, [ECMA-262-3 in detail](http://dmitrysoshnikov.com/ecmascript/). I’m only on chapter 2 and I’ve already learned a thing or two. I highly recommend it for anyone who wants to know JavaScript at a deep level.

========

Spoiler alert: I’ll spare you reading the whole post if you’re in a hurry. When is a global variable not a variable? When it is a property of the global object.

There, satisfied? Buh-bye. Want to know why? Read on…

[Chapter 2 of Dmitry’s series on JavaScript](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/) covers the variable object. One of the interesting details about this concerns how variables are created. Specifically, variables (that is, mutable values of the variable object type) are **only** created using the `var` statement.

“Aha, not so!” I can hear you thinking. (Or, maybe that was you sneezing. In that case, _gesundheit.)_ “If you set a variable without using the `var` statement, it just becomes a global variable!”

OK, there’s a lot less suspense involved in this because I gave away the answer at the top, but the truth is that, no, by omitting the `var` statement, you don’t create a global variable. You create a property on the global object. Esoteric, but true!

### Time for some examples

The following examples match very closely those in Dmitry’s article. The main difference is that I wrapped the first `alert` in each example in a `try`/`catch` block so you will see the error thrown, if any.

I recommend studying each of them and trying to predict the result of each before clicking the “Run it” link. (That link, by the way, will load a file into a tiny iframe, executing the code inline in that page.)

<iframe name="runner" src="about:blank" style="width: 0;height: 0;border: none !important;margin: 0;padding: 0;"></iframe>

<pre class="sh_javascript">try {
   alert(a);
}
catch (e) {
   alert(e);
}

var a = 10;

alert(a);</pre>

<a target="runner" href="/blog/assets/files/global-variable.html">Run it</a>

<pre class="sh_javascript">try {
   alert(b);
}
catch (e) {
   alert(e);
}

b = 20;

alert(b);</pre>

<a target="runner" href="/blog/assets/files/global-property.html">Run it</a>

</div>

Did the scripts do what you expected? Did you notice the difference?

In the first example, we first get an alert of “undefined” (it doesn’t actually hit the `catch` block). This is because, even though we haven’t yet declared it (and due to a thing called [variable hoisting](http://stackoverflow.com/questions/1162561/whats-wrong-with-defining-javascript-variables-within-if-blocks/1162756#1162756)), a variable object with the name `a` has been created at the time the script was _interpreted._ So, when the script is actually _executed,_ the variable already exists, but hasn’t been assigned a value yet.

In the second example, executing the first alert throws a [reference error](https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/ReferenceError). The variable has not been hoisted in the interpretation phase, so it is not available in the execution phase when we first try to alert it.

In a practical sense, the difference between the two is not likely to have much effect. Both the variable `a` and the global property `b` can be accessed later, modified, etc.

The biggest difference between the two is that variables (that is, ones declared with the `var` statement) can’t be deleted using the `delete` statement. Properties can.

Was this helpful? Let me know in the comments if you’d like me to post more articles like this one.

**Update (9 April 2010):** As Dmitry, himself, points out in the comments, there is one other case to consider. The `eval` statement constructs variables without the `{DontDelete}` attribute, even using the `var` statement. Consider the following:

<pre class="sh_javascript">var x = 10;

alert(delete x);

try {
   alert(x);
}
catch (e) {
   alert(e);
}</pre>

<a target="runner" href="/blog/assets/files/dontdelete-var.html">Run it</a>

<pre class="sh_javascript">eval('var y = 20');

alert(delete y);

try {
   alert(y);
}
catch (e) {
   alert(e);
}</pre>

<a target="runner" href="/blog/assets/files/dontdelete-eval.html">Run it</a>

You should have seen alerts of “false” and “10” in the first case (ie. the variable was not deleted) and “true” and a reference error in the second (i.e. the variable was deleted).
