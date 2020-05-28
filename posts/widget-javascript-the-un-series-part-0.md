{
  "title": "Widget JavaScript, the Un-series: Part 0 (Namespacing and the Module Pattern)",
  "slug": "widget-javascript-the-un-series-part-0",
  "topics": ["JavaScript", "Widgets"],
  "keywords": "apple, mac, dashboard, widget, javascript, namespace, module pattern",
  "created_date": "2008-05-13 15:45:00",
  "short_url": "http://ahedg.es/24",
  "deprecated": true,
  "published": true
}

========

I’m not big on series of blog posts. Others have done it [successfully](https://cameronmoll.com/archives/2008/02/the_highly_extensible_css_interface_the_series/), but personally I’ve [promised](https://www.clearwired.com/loop/archives/21-What-Sundial-Taught-Me.html) this kind of thing before and not delivered. So, _I’m not making any promises that this series will get past Part 0,_ but please know I have the best of intentions. If all goes as hoped, over the next _however-many_ posts I will provide a few useful JavaScript code snippets that [Dashboard widget](https://www.apple.com/downloads/dashboard/) authors can take and easily adapt to their own needs. This is based on my experience authoring nearly 20 [widgets](https://andrew.hedges.name/widgets/) over the last 3 years. As you can imagine, some patterns have emerged. In this pre-series post, I will discuss a couple of concepts important to understanding my examples (you know, if I get around to posting them): namespacing and the module pattern.

========

### Namespacing

You namespace your JavaScript, right? Right?!

Just because [Prototype](https://prototypejs.org/) doesn’t do it doesn’t mean _you_ shouldn’t. Better to follow the example of [jQuery](https://jquery.com/), [YUI](https://developer.yahoo.com/yui/), and [Dojo](https://dojotoolkit.org/) and put your JavaScript in a tidy little top-level object so it has less chance of stomping on or getting stomped on by other scripts. I won’t name names, but I recently worked on a site where we were told to include 3rd party ad serving code that put the cleverly named function `random()` in the global namespace. I’m surprised that’s not used as example #1 in the dictionary for the word “naive.”

Now that I’ve ridiculed you into submission, I’m going to say something you might consider a bit contradictory. In widgets, you don’t have to be so strict about namespacing. There, I’ve said it. Sue me. But first, let me explain.

Unlike the WWW (Wild West Web), where you’re not always in control of all the JavaScript on your pages, in a widget, the environment is more controlled, so it’s easier to know what’s going on. So, rather than putting all of your JavaScript in one namespace (like I myself have done in all my [to-date] published widgets, _again with the contradictions,_ sheesh!), I recommend grouping like functionality into namespaces.

For example, I _plan_ to talk about (though I make _no_ promises, you understand) preferences and version checking. Each of these could go in their own namespace. You know, like `PREFS` and, oh, I don’t know, maybe `VERSION`.

There’s nothing magical about this from a coding perspective. Here’s a simple example:

<pre class="sh_javascript">
var MYNAMESPACE = {};
MYNAMESPACE.getFunky = function () {
    // do funky stuff
};
MYNAMESPACE.getFunky();
</pre>

Tidy. Orderly. [Encapsulated](https://en.wikipedia.org/wiki/Separation_of_concerns).

### Module Pattern

The [module pattern](https://yuiblog.com/blog/2007/06/12/module-pattern/) is a technique for organizing large JavaScripts into public and private members. It was popularized by [Douglas Crockford](https://crockford.com/) and has been [blogged](https://www.wait-till-i.com/2007/07/24/show-love-to-the-module-pattern/) [about](https://klauskomenda.com/code/javascript-programming-patterns/) ([and](https://peter.michaux.ca/article/3556) [criticized](https://ejohn.org/blog/simple-class-instantiation/)) [all](https://www.engfers.com/code/javascript/misc/javascript-module-pattern/) [over](https://nefariousdesigns.co.uk/archive/2007/08/javascript-module-pattern-variations/) [the](https://mattsnider.com/languages/javascript/alternative-module-pattern/) [flipping](https://foohack.com/2007/08/yui-crockford-module-pattern-vs-prototypes-class-function/) [shop](https://www.jibbering.com/faq/faq_notes/closures.html#clEncap).

One of the important concepts you need to understand to “get” the module pattern is [closures](https://en.wikipedia.org/wiki/Closure_(computer_science)). Go read this [example-laden overview of closures](https://blog.morrisjohns.com/javascript_closures_for_dummies.html) as they are implemented in JavaScript and come back. I’ll wait.

My use of the module pattern is pretty faithful to the original. The purpose of it, for me, is to be able to create both public and private variables and methods in tight, little, namespaced objects. Here’s an example.

<pre class="sh_javascript">
var MYOBJ;
MYOBJ = (function () {

    // private variable
    var _rgxp;
    _rgxp = /^abc$/i;

    // private method
    var _isMatch;
    _isMatch = function (str) {
        return _rgxp.test(str);
    };

    // public method
    return {
        ask: function () {
            var input;
            input = prompt('What are the first 3 letters \
                of the alphabet?');
            (_isMatch(input))? alert('Correct!') : \
                alert('Wrong!');
        }
    };

})();

MYOBJ.ask();
</pre>

As I said above, this has the advantage of being tidy and encapsulated. I can also run this with confidence that my regular expression (because it’s assigned to a private variable) hasn’t been stomped. The example is contrived, but hopefully you get the idea.

### Bonus!

> As a reward to myself for finishing each of the posts in this “un-series,” I plan to (again, _no promises!_) include at the end a little “bonus” code I use to make my widget-building life a little easier. Enjoy!

If you don’t currently [localize your widgets](https://www.clearwired.com/loop/archives/29-Widget.html), you should. It’s pretty easy and it not only gives you a wider audience for your work, it makes your non-native language users feel all warm and fuzzy.

The following function is based on one generated by [Dashcode](https://developer.apple.com/tools/dashcode/), Apple’s excellent Dashboard development <acronym class="tooltip" title="Integrated Development Environment">IDE</acronym>. Usage is simple. You tell your string you want it localized and it takes care of looking up the string in the `localizedStrings` array from the proper localized file, and replacing it out.

<pre class="sh_javascript">
String.prototype.localize = function () {
    try {
        var string = localizedStrings[this] || this;
    } catch (e) {}
    return string;
}
var localString = 'My string'.localize();
</pre>

In my [day job](https://www.vianet.travel/), we use the [Symfony](https://www.symfony-project.org/) [PHP](https://www.php.net/) framework. Symfony creates a function for localizing strings: `__`  (That’s 2 underscores, if you’re wondering.)

Being used to the pattern `__('My string')`, I decided to make it so I could call my localization String method in the same way. It’s simple, really.

<pre class="sh_javascript">
__ = function (str) {
    return str.localize();
}
var localString = __('My string');
</pre>

### Conclusion

OK, that’s it. I hoped you enjoyed this pre-installment of my un-series. I _hope_ to post the next one, real soon now…
