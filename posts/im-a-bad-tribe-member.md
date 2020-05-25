{
  "title": "I&#8217;m a bad tribe member.",
  "slug": "im-a-bad-tribe-member",
  "topics": ["JavaScript", "Twitter"],
  "keywords": "javascript, mdc, mozilla developer connection, promotejs, tribes, thomas fuchs",
  "created_date": "2010-09-26 13:26:52",
  "short_url": "http://ahedg.es/86",
  "published": false
}

========

On teh internetz, badges and ribbons are a signifier of tribal affiliation. I&#8217;ve taken part before, like during the height of the <a href="http://helpiranelection.com/">election crisis in Iran</a> and in support of <a href="http://www.geekzone.co.nz/juha/6247">internet freedom in New Zealand</a>. Today, I questioned whether linking to pages in Mozilla&#8217;s excellent <a href="https://developer.mozilla.org/en/JavaScript">Developer Center JavaScript documentation</a> is the best way of boosting its <a href="http://google.about.com/od/g/g/google_juice.htm">Google juice</a>. How dare I?!

========

<p class="outdent">I want better JavaScript documentation to show up in search results as much as anyone. If, as <a href="http://www.promotejs.com/">PromoteJS</a> promotes, gazillions of us link to MDC, it will show up higher in search results. I get it. What I question is whether it makes sense to link to <em>random pages within the documentation</em> rather than linking to the top of the JavaScript section.</p>

<p>I&#8217;m no SEO expert, so I may have a misunderstanding of how these things work, but aren&#8217;t we diluting our power by linking to a bunch of different pages rather than all linking to the same page? Let me know in the comments.</p>

<p>I could be easily convinced that this is a good idea, but I&#8217;m kind of skeptical by nature, so <a href="https://twitter.com/#!/thomasfuchs/status/25606632227">telling me</a> &#8220;don&#8217;t question it, just do it!&#8221; actually makes me <em>way less likely</em> to participate. I link to MDC in <a href="http://andrew.hedges.name/blog/topic/JavaScript">my blog posts about JavaScript</a> whenever it makes sense, so I feel like I&#8217;m doing my part. I can do without the <a href="http://en.wikipedia.org/wiki/Groupthink">groupthink</a>.</p>

<p>To be fair, I probably fell victim to the 140 character communication bug. I could have been more clear about my concerns so <a href="https://twitter.com/#!/segdeha/status/25605723646">my question</a> could not have been taken to mean I don&#8217;t <em>at all</em> understand the concept that links = SEO.</p>

<h3>Blog posts from which I link to MDC</h3>

<ul>
<li><a href="http://andrew.hedges.name/blog/2010/04/07/when-is-a-global-variable-not-a-variable">When is a global variable not a variable?</a></li>
<li><a href="http://andrew.hedges.name/blog/2008/09/06/playing-to-a-browsers-strengths">Playing to a browser&#8217;s strengths: Simple Templates 1.1</a></li>
<li><a href="http://andrew.hedges.name/blog/2008/08/26/numerical-array-sorting-in-javascript">Numerical array sorting in JavaScript</a></li>
<li><a href="http://andrew.hedges.name/blog/2008/02/28/radiant-javascript-singletons-freelance-down-under">Radiant JavaScript Singletons Freelance Down Under</a></li>
</ul>

<p><strong>Update:</strong> I&#8217;ve decided to be a good doobie and play along, but on my own terms. In the right rail, you&#8217;ll notice the PromoteJS badge. What I did was collect all of the links they offer up and set it up to randomly serve a different one with each page view. (I also standardized on the smaller of the 2 images and deleted the trailing slash on the IMG tags. I don&#8217;t do XHTML.) It&#8217;s a simple hack and you&#8217;re welcome to use it. [<a href="/blog/assets/files/promotejs.php.txt">source</a>]<p>

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

<p><strong>Update II:</strong> I&#8217;m not above flip-flopping. Based on Kalena&#8217;s comment, I&#8217;m taking down my randomly generated links and will just link to the main JavaScript section page on MDC. That seems like the best way to build its PageRank while not risking actually making the situation worse by changing links or potentially linking to topics that don&#8217;t pertain to the blog post itself.</p>
