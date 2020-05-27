{
  "title": "Yet Another Explanation of JavaScript Closures",
  "slug": "yet-another-explanation-of-javascript-closures",
  "topics": ["JavaScript"],
  "keywords": "javascript, closures",
  "created_date": "2011-04-26 13:11:11",
  "short_url": "http://ahedg.es/91",
  "published": true
}

========

The closure is perhaps the most important and least understood concept in JavaScript. There are [many](http://skilldrick.co.uk/2011/04/closures-explained-with-javascript/) [excellent](http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/) [explanations](http://jibbering.com/faq/notes/closures/) [already](http://www.javascriptkit.com/javatutors/closures.shtml) [on the](http://stackoverflow.com/questions/111102/how-do-javascript-closures-work) [intertubes](http://bonsaiden.github.com/JavaScript-Garden/#function.closures). To these, I humbly add mine.

========

I won’t pretend this is anything other than documentation of my current understanding of closures as restricted by my ability to communicate what is in my head. Still, I hope it contributes to rather than muddies the conversation.

My lay explanation is the following:

> A closure is like a crystal ball that can only see into where it was created.
If you already understand closures, that probably makes sense. If not, don’t worry, I’m just setting up the mental model for you. Let’s get into the meat of it, starting with an example.

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

What’s happening here? First, we define a function, `outer` (for the record, “outer”, “inner”, and “enclosured” could be any [valid function names](http://stackoverflow.com/questions/1661197/valid-characters-for-javascript-variable-names/3155352#3155352)) that contains a variable `n` and a function `inner`. Calling `outer` returns a reference to `inner` and assigns it to our variable, `enclosured`. Calling `enclosured` invokes the `inner` function, alerting the value 10.

In this example, `inner` is like the crystal ball and `outer` is where it was created. Cool, eh?

To fully [grok](http://en.wikipedia.org/wiki/Grok) what’s going on under the hood, you need to understand the concept of scope. In JavaScript, scope is like a container for references to variables and function definitions. How closures work is that the current scope retains a reference to its enclosing scope dynamically and automagically. More on that below.

One of the nifty (and when you’re trying to debug stuff sometimes maddening) things about the language is that when a reference to a variable or function is missing, JavaScript will look “up the scope chain” for it. So, if something’s not in the current scope, JavaScript will look in the current scope’s container for it, in the container’s container, and so on.

If JavaScript climbs all the way up to the global scope and still doesn’t find the variable or function, then it will throw a [ReferenceError](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/ReferenceError) (like when we tried to alert `n` outside of our function above).

In the above example, `inner` remembers that it was created inside `outer` so when it goes looking for the variable `n` and doesn’t find it in its own scope, it looks up the scope chain and finds it in the the enclosing (`outer`’s) scope.

This is pretty powerful stuff. For example, it allows us to create [private variables](http://www.crockford.com/javascript/private.html), store DOM references and access them later when the user clicks, etc.

###JavaScript Dynamite!

JavaScript is what is known as a [dynamic language](http://en.wikipedia.org/wiki/Dynamic_programming_language). That means variables and even functions can be redefined, on-the-fly, at run time (or, as I like to call it, “fun time”).

This includes variables and functions in closures. _I know, right?_

To more fully appreciate that little tidbit, let’s consider the following, slightly more complex, example:

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

In this case, calling `outer` returns an object literal with 2 members: the functions `inner` and `alter`. Calling `container.inner` the first time alerts 10, like in our original example. But, when we call `container.alter`, we add 5 to the value of `n` so the next time we call `container.inner`, we alert the value 15 (10 + 5).

The change to `n` actually happens in `alter`’s containing scope, which also happens to be `inner`’s containing scope. That’s why `inner` has access to the changed value. Boo. Yah.

You now have no excuse for fumbling the question “What are closures?” in [your next job interview](http://tapulous.com/jobs/). ;-)
