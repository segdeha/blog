{
  "title": "I’m a bad tribe member.",
  "slug": "im-a-bad-tribe-member",
  "topics": ["JavaScript", "Twitter"],
  "keywords": "javascript, mdc, mozilla developer connection, promotejs, tribes, thomas fuchs",
  "created_date": "2010-09-26 13:26:52",
  "short_url": "http://ahedg.es/86",
  "published": true
}

========

On teh internetz, badges and ribbons are a signifier of tribal affiliation. I’ve taken part before, like during the height of the [election crisis in Iran](http://helpiranelection.com/) and in support of [internet freedom in New Zealand](http://www.geekzone.co.nz/juha/6247). Today, I questioned whether linking to pages in Mozilla’s excellent [Developer Center JavaScript documentation](https://developer.mozilla.org/en/JavaScript) is the best way of boosting its [Google juice](http://google.about.com/od/g/g/google_juice.htm). How dare I?!

========

I want better JavaScript documentation to show up in search results as much as anyone. If, as [PromoteJS](http://www.promotejs.com/) promotes, gazillions of us link to MDC, it will show up higher in search results. I get it. What I question is whether it makes sense to link to _random pages within the documentation_ rather than linking to the top of the JavaScript section.


I’m no SEO expert, so I may have a misunderstanding of how these things work, but aren’t we diluting our power by linking to a bunch of different pages rather than all linking to the same page? Let me know in the comments.


I could be easily convinced that this is a good idea, but I’m kind of skeptical by nature, so [telling me](https://twitter.com/#!/thomasfuchs/status/25606632227) “don’t question it, just do it!” actually makes me _way less likely_ to participate. I link to MDC in [my blog posts about JavaScript](http://andrew.hedges.name/blog/topic/JavaScript) whenever it makes sense, so I feel like I’m doing my part. I can do without the [groupthink](http://en.wikipedia.org/wiki/Groupthink).


To be fair, I probably fell victim to the 140 character communication bug. I could have been more clear about my concerns so [my question](https://twitter.com/#!/segdeha/status/25605723646) could not have been taken to mean I don’t _at all_ understand the concept that links = SEO.


### Blog posts from which I link to MDC

* [When is a global variable not a variable?](http://andrew.hedges.name/blog/2010/04/07/when-is-a-global-variable-not-a-variable)
* [Playing to a browser’s strengths: Simple Templates 1.1](http://andrew.hedges.name/blog/2008/09/06/playing-to-a-browsers-strengths)
* [Numerical array sorting in JavaScript](http://andrew.hedges.name/blog/2008/08/26/numerical-array-sorting-in-javascript)
* [Radiant JavaScript Singletons Freelance Down Under](http://andrew.hedges.name/blog/2008/02/28/radiant-javascript-singletons-freelance-down-under)

**Update:** I’ve decided to be a good doobie and play along, but on my own terms. In the right rail, you’ll notice the PromoteJS badge. What I did was collect all of the links they offer up and set it up to randomly serve a different one with each page view. (I also standardized on the smaller of the 2 images and deleted the trailing slash on the IMG tags. I don’t do XHTML.) It’s a simple hack and you’re welcome to use it. [[source](/blog/assets/files/promotejs.php.txt)]

<pre class="sh_php" style="overflow: hidden;">&lt;?php
$promotes = array(
    "&lt;a href='https://developer.mozilla.org/en/JavaScript' title='JavaScript Reference, JavaScript Guide, JavaScript API, JS API, JS Guide, JS Reference, Learn JS, JS Documentation'&gt;&lt;img src='http://static.jsconf.us/promotejshs.png' height='150' width='180' alt='JavaScript Reference, JavaScript Guide, JavaScript API, JS API, JS Guide, JS Reference, Learn JS, JS Documentation'&gt;&lt;/a&gt;",
    "&lt;a href='https://developer.mozilla.org/en/JavaScript/Guide' title='JS Tutorial, JavaScript Tutorial, JavaScript Guide, Learn JavaScript JS, How To Learn JS, Learning JavaScript'&gt;&lt;img src='http://static.jsconf.us/promotejshs.png' height='150' width='180' alt='JS Tutorial, JavaScript Tutorial, JavaScript Guide, Learn JavaScript JS, How To Learn JS, Learning JavaScript'&gt;&lt;/a&gt;",
    "&lt;a href='https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array' title='JavaScript JS Documentation: JS Array lastIndexOf, JavaScript Array lastIndexOf, JS Array .lastIndexOf, JavaScript Array .lastIndexOf'&gt;&lt;img src='http://static.jsconf.us/promotejshs.png' height='150' width='180' alt='JavaScript JS Documentation: JS Array lastIndexOf, JavaScript Array lastIndexOf, JS Array .lastIndexOf, JavaScript Array .lastIndexOf'&gt;&lt;/a&gt;",
    "&lt;a href='https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function' title='JavaScript JS Documentation: JS Function arguments, JavaScript Function arguments, JS Function .arguments, JavaScript Function .arguments'&gt;&lt;img src='http://static.jsconf.us/promotejshs.png' height='150' width='180' alt='JavaScript JS Documentation: JS Function arguments, JavaScript Function arguments, JS Function .arguments, JavaScript Function .arguments'&gt;&lt;/a&gt;",
    "&lt;a href='https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number' title='JavaScript JS Documentation: JS Number valueOf, JavaScript Number valueOf, JS Number .valueOf, JavaScript Number .valueOf'&gt;&lt;img src='http://static.jsconf.us/promotejshs.png' height='150' width='180' alt='JavaScript JS Documentation: JS Number valueOf, JavaScript Number valueOf, JS Number .valueOf, JavaScript Number .valueOf'&gt;&lt;/a&gt;",
    "&lt;a href='https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp' title='JavaScript JS Documentation: JS RegExp test, JavaScript RegExp test, JS RegExp .test, JavaScript RegExp .test'&gt;&lt;img src='http://static.jsconf.us/promotejshs.png' height='150' width='180' alt='JavaScript JS Documentation: JS RegExp test, JavaScript RegExp test, JS RegExp .test, JavaScript RegExp .test'&gt;&lt;/a&gt;",
    "&lt;a href='https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String' title='JavaScript JS Documentation: JS String split, JavaScript String split, JS String .split, JavaScript String .split'&gt;&lt;img src='http://static.jsconf.us/promotejshs.png' height='150' width='180' alt='JavaScript JS Documentation: JS String split, JavaScript String split, JS String .split, JavaScript String .split'&gt;&lt;/a&gt;",
);

echo $promotes[rand(0, count($promotes) - 1)];

?&gt;</pre>

**Update II:** I’m not above flip-flopping. Based on Kalena’s comment, I’m taking down my randomly generated links and will just link to the main JavaScript section page on MDC. That seems like the best way to build its PageRank while not risking actually making the situation worse by changing links or potentially linking to topics that don’t pertain to the blog post itself.
