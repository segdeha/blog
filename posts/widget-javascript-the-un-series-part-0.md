{
  "title": "Widget JavaScript, the Un-series: Part 0 (Namespacing and the Module Pattern)",
  "slug": "widget-javascript-the-un-series-part-0",
  "topics": ["JavaScript", "Widgets"],
  "keywords": "apple, mac, dashboard, widget, javascript, namespace, module pattern",
  "created_date": "2008-05-13 15:45:00",
  "short_url": "http://ahedg.es/24",
  "published": false
}

========

I&#8217;m not big on series of blog posts. Others have done it <a href="http://cameronmoll.com/archives/2008/02/the_highly_extensible_css_interface_the_series/">successfully</a>, but personally I&#8217;ve <a href="http://www.clearwired.com/loop/archives/21-What-Sundial-Taught-Me.html">promised</a> this kind of thing before and not delivered. So, <em>I&#8217;m not making any promises that this series will get past Part 0,</em> but please know I have the best of intentions. If all goes as hoped, over the next <em>however-many</em> posts I will provide a few useful JavaScript code snippets that <a href="http://www.apple.com/downloads/dashboard/">Dashboard widget</a> authors can take and easily adapt to their own needs. This is based on my experience authoring nearly 20 <a href="http://andrew.hedges.name/widgets/">widgets</a> over the last 3 years. As you can imagine, some patterns have emerged. In this pre-series post, I will discuss a couple of concepts important to understanding my examples (you know, if I get around to posting them): namespacing and the module pattern.

========

<h3>Namespacing</h3>
<p class="outdent">You namespace your JavaScript, right? Right?!</p>
<p>Just because <a href="http://prototypejs.org/">Prototype</a> doesn&#8217;t do it doesn&#8217;t mean <em>you</em> shouldn&#8217;t. Better to follow the example of <a href="http://jquery.com/">jQuery</a>, <a href="http://developer.yahoo.com/yui/">YUI</a>, and <a href="http://dojotoolkit.org/">Dojo</a> and put your JavaScript in a tidy little top-level object so it has less chance of stomping on or getting stomped on by other scripts. I won&#8217;t name names, but I recently worked on a site where we were told to include 3rd party ad serving code that put the cleverly named function <code>random()</code> in the global namespace. I&#8217;m surprised that&#8217;s not used as example #1 in the dictionary for the word &#8220;naive.&#8221;</p>
<p>Now that I&#8217;ve ridiculed you into submission, I&#8217;m going to say something you might consider a bit contradictory. In widgets, you don&#8217;t have to be so strict about namespacing. There, I&#8217;ve said it. Sue me. But first, let me explain.</p>
<p>Unlike the WWW (Wild West Web), where you&#8217;re not always in control of all the JavaScript on your pages, in a widget, the environment is more controlled, so it&#8217;s easier to know what&#8217;s going on. So, rather than putting all of your JavaScript in one namespace (like I myself have done in all my [to-date] published widgets, <em>again with the contradictions,</em> sheesh!), I recommend grouping like functionality into namespaces.</p>
<p>For example, I <em>plan</em> to talk about (though I make <em>no</em> promises, you understand) preferences and version checking. Each of these could go in their own namespace. You know, like <code>PREFS</code> and, oh, I don&#8217;t know, maybe <code>VERSION</code>.</p>
<p>There&#8217;s nothing magical about this from a coding perspective. Here&#8217;s a simple example:</p>
<pre class="sh_javascript">
var MYNAMESPACE = {};
MYNAMESPACE.getFunky = function () {
    // do funky stuff
};
MYNAMESPACE.getFunky();
</pre>
<p>Tidy. Orderly. <a href="http://en.wikipedia.org/wiki/Separation_of_concerns">Encapsulated</a>.</p>
<h3>Module Pattern</h3>
<p>The <a href="http://yuiblog.com/blog/2007/06/12/module-pattern/">module pattern</a> is a technique for organizing large JavaScripts into public and private members. It was popularized by <a href="http://crockford.com/">Douglas Crockford</a> and has been <a href="http://www.wait-till-i.com/2007/07/24/show-love-to-the-module-pattern/">blogged</a> <a href="http://klauskomenda.com/code/javascript-programming-patterns/">about</a> (<a href="http://peter.michaux.ca/article/3556">and</a> <a href="http://ejohn.org/blog/simple-class-instantiation/">criticized</a>) <a href="http://www.engfers.com/code/javascript/misc/javascript-module-pattern/">all</a> <a href="http://nefariousdesigns.co.uk/archive/2007/08/javascript-module-pattern-variations/">over</a> <a href="http://mattsnider.com/languages/javascript/alternative-module-pattern/">the</a> <a href="http://foohack.com/2007/08/yui-crockford-module-pattern-vs-prototypes-class-function/">flipping</a> <a href="http://www.jibbering.com/faq/faq_notes/closures.html#clEncap">shop</a>.</p>
<p>One of the important concepts you need to understand to &#8220;get&#8221; the module pattern is <a href="http://en.wikipedia.org/wiki/Closure_(computer_science)">closures</a>. Go read this <a href="http://blog.morrisjohns.com/javascript_closures_for_dummies.html">example-laden overview of closures</a> as they are implemented in JavaScript and come back. I&#8217;ll wait.</p>
<p>My use of the module pattern is pretty faithful to the original. The purpose of it, for me, is to be able to create both public and private variables and methods in tight, little, namespaced objects. Here&#8217;s an example.</p>
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
<p>As I said above, this has the advantage of being tidy and encapsulated. I can also run this with confidence that my regular expression (because it&#8217;s assigned to a private variable) hasn&#8217;t been stomped. The example is contrived, but hopefully you get the idea.</p>
<h3>Bonus!</h3>
<blockquote>As a reward to myself for finishing each of the posts in this &#8220;un-series,&#8221; I plan to (again, <em>no promises!</em>) include at the end a little &#8220;bonus&#8221; code I use to make my widget-building life a little easier. Enjoy!</blockquote>
<p>If you don&#8217;t currently <a href="http://www.clearwired.com/loop/archives/29-Widget.html">localize your widgets</a>, you should. It&#8217;s pretty easy and it not only gives you a wider audience for your work, it makes your non-native language users feel all warm and fuzzy.</p>
<p>The following function is based on one generated by <a href="http://developer.apple.com/tools/dashcode/">Dashcode</a>, Apple&#8217;s excellent Dashboard development <span class="tooltip" title="Integrated Development Environment">IDE</span>. Usage is simple. You tell your string you want it localized and it takes care of looking up the string in the <code>localizedStrings</code> array from the proper localized file, and replacing it out.</p>
<pre class="sh_javascript">
String.prototype.localize = function () {
    try {
        var string = localizedStrings[this] || this;
    } catch (e) {}
    return string;
}
var localString = 'My string'.localize();
</pre>
<p>In my <a href="http://www.vianet.travel/">day job</a>, we use the <a href="http://www.symfony-project.org/">Symfony</a> <a href="http://www.php.net/">PHP</a> framework. Symfony creates a function for localizing strings: <code>__</code>  (That&#8217;s 2 underscores, if you&#8217;re wondering.)</p>
<p>Being used to the pattern <code>__('My string')</code>, I decided to make it so I could call my localization String method in the same way. It&#8217;s simple, really.</p>
<pre class="sh_javascript">
__ = function (str) {
    return str.localize();
}
var localString = __('My string');
</pre>
<h3>Conclusion</h3>
<p>OK, that&#8217;s it. I hoped you enjoyed this pre-installment of my un-series. I <em>hope</em> to post the next one, real soon now&#8230;</p>
