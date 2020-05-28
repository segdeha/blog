{
  "title": "Playing to a browser's strengths: Simple Templates 1.1",
  "slug": "playing-to-a-browsers-strengths",
  "topics": [
    "JavaScript",
    "jQuery"
  ],
  "keywords": "javascript, jquery, simple templates, plugin, plug-in",
  "created_date": "2008-09-06 23:11:11",
  "short_url": "http://ahedg.es/35",
  "published": false
}

========

In the 3 days since I first published <a href="http://plugins.jquery.com/project/simple-templates">Simple Templates</a>, I have released 1 bug fix and 1 minor upgrade. It's a much better plugin than it was a couple of days ago. I guess this is why they say "Release early. Release often."

========

<p class="outdent">Tonight, I posted a minor upgrade to Simple Templates, my jQuery plugin <a href="/blog/2008/09/03/introducing-jquery-simple-templates">announced</a> a mere 3 days ago. This release is pretty much a complete rewrite (as much as you can completely rewrite 1000-some-odd bytes of code!).</p>
<blockquote style="text-align: center;">
<a href="http://jquery-simple-templates.googlecode.com/files/jquery.tmpl.1.1.1.js">Get Simple Templates</a>
</blockquote>
<p>I was inspired to rewrite it because of some code posted to <a href="http://groups.google.com/group/jquery-ui/browse_thread/thread/45d0f5873dad0178/0f3c684499d89ff4">this thread</a> on the jQuery UI Google Group. The snippet there reminded me of a JavaScript feature I had read about but never actually implemented before, namely that you can pass a function as the second parameter to <code>String.replace()</code>.</p>
<p><a href="http://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/String/Replace">Sayeth Mozilla</a>, regarding this parameterized function cum <a href="http://dankogai.typepad.com/blog/2006/03/lambda_calculus.html">lambda</a>:</p>
<blockquote>
In your function, you can dynamically generate the string that replaces the matched substring. The result of the function call is used as the replacement value.
</blockquote>
<p>The previous versions of Simple Templates worked like so:</p>
<ol>
  <li>Call <code>String.match()</code> to find pattern matches within the string to be manipulated</li>
  <li>Loop over the matches using <code>$.each()</code></li>
  <li>For each match, use <code>String.substring()</code> to extract a potential hash key</li>
  <li>If the hash key exists, replace the match with the corresponding value using <code>String.replace()</code></li>
</ol>
<p>For those keeping score at home, thar be 3 calls to string methods, 2 of them residing <strong>inside a loop.</strong></p>
<p>(That this algorithm performs at all acceptably is testament to the skill of JavaScript interpreter authors everywhere. I'm sorry, guys, that you so often have to put up with poorly thought out implementations like mine!)</p>
<p>Version 1.1 implements the following algorithm:</p>
<ol>
  <li>Call <code>String.replace()</code></li>
</ol>
<p>Boy howdy, if that ain't a whole heap simpler! By taking advantage of this feature of the language, we can avoid all kinds of expensive operations.</p>
<p>To be fair, I could have eliminated step 3 in previous versions with a little smarter use of regular expressions, but still, avoiding an unnecessary loop is a potentially big win.</p>
<p>But how big, exactly?</p>
<p>Not one to take these things on faith, I put together a page that let me <a href="http://andrew.hedges.name/experiments/simple-templates-speed-test/">test the difference for myself</a>. In my (admittedly, limited) testing, I found version 1.1 to be about 30% faster than version 1.0.1. "Beats a kick in the pants," as my mother used to say.</p>
<hr>
<p><em><a href="http://plugins.jquery.com/project/simple-templates">Simple Templates</a> is a <a href="http://jquery.com/">jQuery</a> plugin for creating dynamically merged strings in JavaScript. Bug reports and feature requests are welcome at the <a href="http://code.google.com/p/jquery-simple-templates/">project home</a>.</em></p>
