{
  "title": "When is a global variable not a variable?",
  "slug": "when-is-a-global-variable-not-a-variable",
  "topics": ["JavaScript"],
  "keywords": "javascript, ecmascript, ecma-262, ecma-262-3, dmitry soshnikov, var, variables",
  "created_date": "2010-04-07 13:37:00",
  "short_url": "http://ahedg.es/84",
  "published": false
}

========

I&#8217;ve started reading <a href="http://twitter.com/DmitrySoshnikov">Dmitry Soshnikov</a>&#8217;s excellent series, <a href="http://dmitrysoshnikov.com/ecmascript/">ECMA-262-3 in detail</a>. I&#8217;m only on chapter 2 and I&#8217;ve already learned a thing or two. I highly recommend it for anyone who wants to know JavaScript at a deep level.

========

<p class="outdent">Spoiler alert: I&#8217;ll spare you reading the whole post if you&#8217;re in a hurry. When is a global variable not a variable? When it is a property of the global object.</p>
<p>There, satisfied? Buh-bye. Want to know why? Read on&#8230;</p>
<p><a href="http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/">Chapter 2 of Dmitry&#8217;s series on JavaScript</a> covers the variable object. One of the interesting details about this concerns how variables are created. Specifically, variables (that is, mutable values of the variable object type) are <strong>only</strong> created using the <code>var</code> statement.</p>
<p>&#8220;Aha, not so!&#8221; I can hear you thinking. (Or, maybe that was you sneezing. In that case, <em>gesundheit.</em>) &#8220;If you set a variable without using the <code>var</code> statement, it just becomes a global variable!&#8221;</p>
<p>OK, there&#8217;s a lot less suspense involved in this because I gave away the answer at the top, but the truth is that, no, by omitting the <code>var</code> statement, you don&#8217;t create a global variable. You create a property on the global object. Esoteric, but true!</p>
<h3>Time for some examples</h3>
<p>The following examples match very closely those in Dmitry&#8217;s article. The main difference is that I wrapped the first <code>alert</code> in each example in a <code>try</code>/<code>catch</code> block so you will see the error thrown, if any.</p>
<p>I recommend studying each of them and trying to predict the result of each before clicking the &#8220;Run it&#8221; link. (That link, by the way, will load a file into a tiny iframe, executing the code inline in that page.)</p>
<iframe name="runner" src="about:blank" style="width: 0;height: 0;border: none !important;margin: 0;padding: 0;"></iframe>
<div style="float: left;width: 220px">
<pre class="sh_javascript">try {
   alert(a);
}
catch (e) {
   alert(e);
}

var a = 10;

alert(a);</pre>
<p><a target="runner" href="/blog/assets/files/global-variable.html">Run it</a></p>
</div>
<div style="float: left;width: 220px;">
<pre class="sh_javascript">try {
   alert(b);
}
catch (e) {
   alert(e);
}

b = 20;

alert(b);</pre>
<p><a target="runner" href="/blog/assets/files/global-property.html">Run it</a></p>
</div>
<p style="clear: left;">Did the scripts do what you expected? Did you notice the difference?</p>
<p>In the first example, we first get an alert of &#8220;undefined&#8221; (it doesn&#8217;t actually hit the <code>catch</code> block). This is because, even though we haven&#8217;t yet declared it (and due to a thing called <a href="http://stackoverflow.com/questions/1162561/whats-wrong-with-defining-javascript-variables-within-if-blocks/1162756#1162756">variable hoisting</a>), a variable object with the name <code>a</code> has been created at the time the script was <em>interpreted.</em> So, when the script is actually <em>executed,</em> the variable already exists, but hasn&#8217;t been assigned a value yet.</p>
<p>In the second example, executing the first alert throws a <a href="https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/ReferenceError">reference error</a>. The variable has not been hoisted in the interpretation phase, so it is not available in the execution phase when we first try to alert it.</p>
<p>In a practical sense, the difference between the two is not likely to have much effect. Both the variable <code>a</code> and the global property <code>b</code> can be accessed later, modified, etc.</p>
<p>The biggest difference between the two is that variables (that is, ones declared with the <code>var</code> statement) can&#8217;t be deleted using the <code>delete</code> statement. Properties can.</p>
<p>Was this helpful? Let me know in the comments if you&#8217;d like me to post more articles like this one.</p>
<hr>
<p><strong>Update (9 April 2010):</strong> As Dmitry, himself, points out <a href="#22210">in the comments</a>, there is one other case to consider. The <code>eval</code> statement constructs variables without the <em>{DontDelete}</em> attribute, even using the <code>var</code> statement. Consider the following:</p>
<div style="float: left;width: 220px">
<pre class="sh_javascript">var x = 10;

alert(delete x);

try {
   alert(x);
}
catch (e) {
   alert(e);
}</pre>
<p><a target="runner" href="/blog/assets/files/dontdelete-var.html">Run it</a></p>
</div>
<div style="float: left;width: 220px;">
<pre class="sh_javascript">eval('var y = 20');

alert(delete y);

try {
   alert(y);
}
catch (e) {
   alert(e);
}</pre>
<p><a target="runner" href="/blog/assets/files/dontdelete-eval.html">Run it</a></p>
</div>
<p style="clear: left;">You should have seen alerts of &#8220;false&#8221; and &#8220;10&#8221; in the first case (ie. the variable was not deleted) and &#8220;true&#8221; and a reference error in the second (ie. the variable was deleted).</p>
