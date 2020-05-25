{
  "title": "Yet Another Explanation of JavaScript Closures",
  "slug": "yet-another-explanation-of-javascript-closures",
  "topics": ["JavaScript"],
  "keywords": "javascript, closures",
  "created_date": "2011-04-26 13:11:11",
  "short_url": "http://ahedg.es/91",
  "published": false
}

========

The closure is perhaps the most important and least understood concept in JavaScript. There are <a href="http://skilldrick.co.uk/2011/04/closures-explained-with-javascript/">many</a> <a href="http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/">excellent</a> <a href="http://jibbering.com/faq/notes/closures/">explanations</a> <a href="http://www.javascriptkit.com/javatutors/closures.shtml">already</a> <a href="http://stackoverflow.com/questions/111102/how-do-javascript-closures-work">on the</a> <a href="http://bonsaiden.github.com/JavaScript-Garden/#function.closures">intertubes</a>. To these, I humbly add mine.

========

<p class="dedent">I won&#8217;t pretend this is anything other than documentation of my current understanding of closures as restricted by my ability to communicate what is in my head. Still, I hope it contributes to rather than muddies the conversation.</p>
<p>My lay explanation is the following:</p>
<blockquote>A closure is like a crystal ball that can only see into where it was created.</blockquote>
<p>If you already understand closures, that probably makes sense. If not, don&#8217;t worry, I&#8217;m just setting up the mental model for you. Let&#8217;s get into the meat of it, starting with an example.</p>
<pre class="sh_javascript">
function outer() {
    var n = 10
    function inner() {
        alert(n)
    }
    return inner
}

var enclosured = outer()
enclosured() // alerts 10
alert(n) // throws a ReferenceError (see below)
</pre>
<p>What&#8217;s happening here? First, we define a function, <code>outer</code> (for the record, &#8216;outer&#8217;, &#8216;inner&#8217;, and &#8216;enclosured&#8217; could be any <a href="http://stackoverflow.com/questions/1661197/valid-characters-for-javascript-variable-names/3155352#3155352">valid function names</a>) that contains a variable <code>n</code> and a function <code>inner</code>. Calling <code>outer</code> returns a reference to <code>inner</code> and assigns it to our variable, <code>enclosured</code>. Calling <code>enclosured</code> invokes the <code>inner</code> function, alerting the value 10.</p>
<p>In this example, <code>inner</code> is like the crystal ball and <code>outer</code> is where it was created. Cool, eh?</p>
<p>To fully <a href="http://en.wikipedia.org/wiki/Grok">grok</a> what&#8217;s going on under the hood, you need to understand the concept of scope. In JavaScript, scope is like a container for references to variables and function definitions. How closures work is that the current scope retains a reference to its enclosing scope dynamically and automagically. More on that below.</p>
<p>One of the nifty (and when you&#8217;re trying to debug stuff sometimes maddening) things about the language is that when a reference to a variable or function is missing, JavaScript will look &#8216;up the scope chain&#8217; for it. So, if something&#8217;s not in the current scope, JavaScript will look in the current scope&#8217;s container for it, in the container&#8217;s container, and so on.</p>
<p>If JavaScript climbs all the way up to the global scope and still doesn&#8217;t find the variable or function, then it will throw a <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/ReferenceError">ReferenceError</a> (like when we tried to alert <code>n</code> outside of our function above).</p>
<p>In the above example, <code>inner</code> remembers that it was created inside <code>outer</code> so when it goes looking for the variable <code>n</code> and doesn&#8217;t find it in its own scope, it looks up the scope chain and finds it in the the enclosing (<code>outer</code>&#8217;s) scope.</p>
<p>This is pretty powerful stuff. For example, it allows us to create <a href="http://www.crockford.com/javascript/private.html">private variables</a>, store DOM references and access them later when the user clicks, etc.</p>
<h3>JavaScript Dynamite!</h3>
<p>JavaScript is what is known as a <a href="http://en.wikipedia.org/wiki/Dynamic_programming_language">dynamic language</a>. That means variables and even functions can be redefined, on-the-fly, at run time (or, as I like to call it, &#8216;fun time&#8217;).</p>
<p>This includes variables and functions in closures. <em>I know, right?</em></p>
<p>To more fully appreciate that little tidbit, let&#8217;s consider the following, slightly more complex, example:</p>
<pre class="sh_javascript">
function outer() {
    var n = 10
    function inner() {
        alert(n)
    }
    function alter() {
        n += 5
    }
    return {
        inner : inner,
        alter : alter
    }
}

var container = outer()
container.inner() // alerts 10
container.alter()
container.inner() // alerts 15
</pre>
<p>In this case, calling <code>outer</code> returns an object literal with 2 members: the functions <code>inner</code> and <code>alter</code>. Calling <code>container.inner</code> the first time alerts 10, like in our original example. But, when we call <code>container.alter</code>, we add 5 to the value of <code>n</code> so the next time we call <code>container.inner</code>, we alert the value 15 (10 + 5).</p>
<p>The change to <code>n</code> actually happens in <code>alter</code>&#8217;s containing scope, which also happens to be <code>inner</code>&#8217;s containing scope. That&#8217;s why <code>inner</code> has access to the changed value. Boo. Yah.</p>
<p>You now have no excuse for fumbling the question &#8216;What are closures?&#8217; in <a href="http://tapulous.com/jobs/">your next job interview</a>. ;-)</p>

