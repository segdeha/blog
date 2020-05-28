{
  "title": "Playing to a browser’s strengths: Simple Templates 1.1",
  "slug": "playing-to-a-browsers-strengths",
  "topics": [
    "JavaScript",
    "jQuery"
  ],
  "keywords": "javascript, jquery, simple templates, plugin, plug-in",
  "created_date": "2008-09-06 23:11:11",
  "short_url": "https://ahedg.es/35",
  "published": true
}

========

In the 3 days since I first published [Simple Templates](https://plugins.jquery.com/project/simple-templates), I have released 1 bug fix and 1 minor upgrade. It’s a much better plugin than it was a couple of days ago. I guess this is why they say “Release early. Release often.”

========

Tonight, I posted a minor upgrade to Simple Templates, my jQuery plugin [announced](/blog/2008/09/03/introducing-jquery-simple-templates) a mere 3 days ago. This release is pretty much a complete rewrite (as much as you can completely rewrite 1000-some-odd bytes of code!).

> [Get Simple Templates](https://jquery-simple-templates.googlecode.com/files/jquery.tmpl.1.1.1.js)

I was inspired to rewrite it because of some code posted to [this thread](https://groups.google.com/group/jquery-ui/browse_thread/thread/45d0f5873dad0178/0f3c684499d89ff4) on the jQuery UI Google Group. The snippet there reminded me of a JavaScript feature I had read about but never actually implemented before, namely that you can pass a function as the second parameter to `String.replace()`.

[Sayeth Mozilla](https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/String/Replace), regarding this parameterized function cum [lambda](https://dankogai.typepad.com/blog/2006/03/lambda_calculus.html):

In your function, you can dynamically generate the string that replaces the matched substring. The result of the function call is used as the replacement value.

The previous versions of Simple Templates worked like so:

1. Call `String.match()` to find pattern matches within the string to be manipulated
2. Loop over the matches using `$.each()`
3. For each match, use `String.substring()` to extract a potential hash key
4. If the hash key exists, replace the match with the corresponding value using `String.replace()`

For those keeping score at home, thar be 3 calls to string methods, 2 of them residing **inside a loop.**

(That this algorithm performs at all acceptably is testament to the skill of JavaScript interpreter authors everywhere. I’m sorry, guys, that you so often have to put up with poorly thought out implementations like mine!)

Version 1.1 implements the following algorithm:

1. Call `String.replace()`

Boy howdy, if that ain’t a whole heap simpler! By taking advantage of this feature of the language, we can avoid all kinds of expensive operations.

To be fair, I could have eliminated step 3 in previous versions with a little smarter use of regular expressions, but still, avoiding an unnecessary loop is a potentially big win.

But how big, exactly?

Not one to take these things on faith, I put together a page that let me [test the difference for myself](https://andrew.hedges.name/experiments/simple-templates-speed-test/). In my (admittedly, limited) testing, I found version 1.1 to be about 30% faster than version 1.0.1. “Beats a kick in the pants,” as my mother used to say.

_[Simple Templates](https://plugins.jquery.com/project/simple-templates) is a [jQuery](https://jquery.com/) plugin for creating dynamically merged strings in JavaScript. Bug reports and feature requests are welcome at the [project home](https://code.google.com/p/jquery-simple-templates/)._
