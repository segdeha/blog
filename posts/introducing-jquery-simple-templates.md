{
  "title": "Introducing jQuery Simple Templates",
  "slug": "introducing-jquery-simple-templates",
  "topics": [
    "JavaScript",
    "jQuery",
    "Web Development"
  ],
  "keywords": "JavaScript, prototype, jquery, simple, templates, google code",
  "created_date": "2008-09-03 21:03:00",
  "short_url": "http://ahedg.es/34",
  "published": false
}

========

Overall, I love <a href="http://jquery.com/">jQuery</a>. One thing I have missed from my <a href="http://prototypejs.org/">Prototype</a> days was simple, built-in templating. Introducing <a href="http://plugins.jquery.com/project/simple-templates">jQuery Simple Templates</a>.

========

<p class="outdent">I've been meaning to write a blog post about jQuery for a while. If you're a web developer, you'd have to have been living under a rock for the past year not to have heard about it. jQuery is billed as the "write less, do more" JavaScript framework, and I have to say I agree.</p>
<blockquote style="text-align: center;">
<a href="http://jquery-simple-templates.googlecode.com/files/jquery.tmpl.1.1.1.js">Get Simple Templates</a>
</blockquote>
<p>That said, one deficiency in jQuery has been nagging at me for a while. When I was doing a lot of work with Prototype, I made extensive use of the <a href="http://prototypejs.org/api/template">Template</a> class. As the name implies, it is a way to create re-usable strings that can be merged with values to produce something useful.</p>
<p>Here's an example of templates in Prototype:</p>
<pre class="sh_javascript">
var link = new Template('<a href="#{url}">#{label}</a>');
var values = {
   url : 'http://andrew.hedges.name',
   label : 'My Homepage'
};
// <a href="http://andrew.hedges.name">My Homepage</a>
alert(link.evaluate(values));
</pre>
<p>I wrote <a href="http://plugins.jquery.com/project/simple-templates">Simple Templates</a> to work pretty much the same way. Here's an example:</p>
<pre class="sh_javascript">
var link = '<a href="#{url}">#{label}</a>';
var values = {
   url : 'http://andrew.hedges.name',
   label : 'My Homepage'
};
// <a href="http://andrew.hedges.name">My Homepage</a>
alert($.tmpl(link, values));
</pre>
<p>I'm pretty happy to have an easy way to do templating in jQuery without having to learn a new syntax. Maybe the best thing about this plug-in, though, is the fact it weighs in at only 1009 bytes!</p>
<p>Bug reports and enhancement requests can be filed at the <a href="http://code.google.com/p/jquery-simple-templates/">project home</a> on Google Code. </p>
<p><em>Enjoy!</em></p>
