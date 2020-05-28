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
  "short_url": "https://ahedg.es/34",
  "published": true
}

========

Overall, I love [jQuery](https://jquery.com/). One thing I have missed from my [Prototype](https://prototypejs.org/) days was simple, built-in templating. Introducing [jQuery Simple Templates](https://plugins.jquery.com/project/simple-templates).

========

I’ve been meaning to write a blog post about jQuery for a while. If you’re a web developer, you’d have to have been living under a rock for the past year not to have heard about it. jQuery is billed as the “write less, do more” JavaScript framework, and I have to say I agree.

> [Get Simple Templates](https://jquery-simple-templates.googlecode.com/files/jquery.tmpl.1.1.1.js)

That said, one deficiency in jQuery has been nagging at me for a while. When I was doing a lot of work with Prototype, I made extensive use of the [Template](https://prototypejs.org/api/template) class. As the name implies, it is a way to create re-usable strings that can be merged with values to produce something useful.

Here’s an example of templates in Prototype:

<pre class="sh_javascript">
var link = new Template('[#{label}](#{url})');
var values = {
    url : 'https://andrew.hedges.name',
    label : 'My Homepage'
};
// [My Homepage](https://andrew.hedges.name)
alert(link.evaluate(values));
</pre>

I wrote [Simple Templates](https://plugins.jquery.com/project/simple-templates) to work pretty much the same way. Here’s an example:

<pre class="sh_javascript">
var link = '[#{label}](#{url})';
var values = {
    url : 'https://andrew.hedges.name',
    label : 'My Homepage'
};
// [My Homepage](https://andrew.hedges.name)
alert($.tmpl(link, values));
</pre>

I’m pretty happy to have an easy way to do templating in jQuery without having to learn a new syntax. Maybe the best thing about this plug-in, though, is the fact it weighs in at only 1009 bytes!

Bug reports and enhancement requests can be filed at the [project home](https://code.google.com/p/jquery-simple-templates/) on Google Code.

_Enjoy!_
