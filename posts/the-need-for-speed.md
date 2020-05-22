{
  "title": "The need for speed: innerHTML versus DOM manipulation",
  "slug": "the-need-for-speed",
  "topics": [
    "JavaScript",
    "Web Development"
  ],
  "keywords": "dom, manipulation, quick, speed, fast, faster, time, innerhtml, javascript, ecmascript, safari, opera, firefox, internet explorer, ie6, ie7, windows, mac, macintosh, optimized, clonenode, appendchild, parentnode, replacechild, documentfragment",
  "created_date": "2007-07-03 21:21:21",
  "short_url": "http://ahedg.es/2",
  "published": true
}

========

At [work](https://web.archive.org/web/20071012165406/http://vianet.travel/), I’ve been tackling some fairly sophisticated JavaScript [DOM](http://en.wikipedia.org/wiki/Document_object_model) manipulation scenarios. As such, I’ve started to run up against the limitations of my long-used technique of stuffing loads of HTML as a string into some element’s `innerHTML` property. Specifically, when inserting very long strings containing complex HTML, there can be a troublesome delay between when JavaScript _thinks_ it’s done inserting the elements and when the elements are _actually_ available for further manipulation.

========

After [reading](http://www.developer-x.com/content/innerhtml/dom_vs_innerHTML_perf_test.html) [some](http://www.mredkj.com/tutorials/tablebasics3.html) [articles](http://www.quirksmode.org/dom/innerhtml.html) [on](http://www.developer-x.com/content/innerhtml/) [the](http://slayeroffice.com/articles/innerHTML_alternatives/) [subject](http://slayeroffice.com/articles/DOM/), I conducted <a title="Click here to test the two techniques for yourself and to see code samples of each" href="http://andrew.hedges.name/experiments/innerhtml/">my own tests (go there to see some code!)</a> of the speed of `innerHTML` versus direct DOM manipulation (in the process coming up with highly optimized versions of each.) I came to the conclusion that there is a bit of mythology on the [Intertubes](http://www.urbandictionary.com/define.php?term=intertubes) that may be based on incomplete knowledge of how DOM methods work.

<dl>
    <dt>Myth:</dt>
    <dd><code>innerHTML</code> execution is <strong>way</strong> faster than DOM scripting.</dd>
    <dt>Truth:</dt>
    <dd><a title="Click here to test the two techniques for yourself and to see code samples of each" href="http://andrew.hedges.name/experiments/innerhtml/">When written optimally</a>, DOM scripting ranges from clearly slower (run in Internet Explorer 6 and 7) to nearly as fast (on Gecko-based browsers) to slightly faster (on Safari and Opera). This also only takes into account the time it takes the browser to release the thread, not how long it takes for the new node(s) to be available for manipulation. Saying "[`innerHTML`] is faster than DOM. This is a [proven fact.](http://blogger-hacked.blogspot.com/2007/01/to-innerhtml-or-not-to-innerhtml.html)" is simply bogus.</dd>
    <dt>Myth:</dt>
    <dd><code>innerHTML</code> is <strong>way</strong> easier to code up.</dd>
    <dt>Truth:</dt>
    <dd>There is <em>some</em> truth to this. For a novice scripter, if you have haven’t dealt much with XML or the DOM, it can be confusing to do more than just dump strings into <code>innerHTML</code>. But there are advantages to going the hard road. A big one (for me) is that <code>innerHTML</code> is not technically a standard so <strike>it offends my inner purist</strike> support for it could dwindle over time. More objectively, it does take time to attach nodes to the DOM when using <code>innerHTML</code> whereas nodes attached directly are available immediately. While not a problem in a lot of use cases, it’s cropped up as a problem for me in certain situations.</dd>
    <dt>Myth:</dt>
    <dd><code>innerHTML</code> takes <strong>way</strong> less code to do the same thing.</dd>
    <dt>Truth:</dt>
    <dd class="last">`innerHTML` takes <strong>way</strong> less code to do the same thing. So what? If <code>innerHTML</code> is causing problems that DOM scripting can solve, are you really so <a title="Of course, I mean lazy in a bad way. If you are lazy in the way the linked article states, you will actually more readily adopt DOM scripting because it allows you more flexibility to script solutions." href="http://undefined.com/ia/2006/10/24/the-fourteen-types-of-programmers-type-4-lazy-ones/">lazy</a> that you’re going to avoid it anyway? I mean, isn’t that why it’s called work?</dd>
</dl>

To be fair, there are some gotchas that are worth noting with DOM scripting. Namely, you can’t use HTML entities in text nodes (makes sense, but I learned the hard way). Instead, you have to use Unicode encoded entities. For example, rather than using `&#8217;` for an apostrophe, you have to use `\u2019`. Luckily, there are sites on the [Interweb](http://www.urbandictionary.com/define.php?term=interweb) that let you [look this stuff up](http://slayeroffice.com/tools/unicode_lookup/).

The rest (at least in terms of optimizations) is [common sense to most programmers](http://www.peachpit.com/articles/article.asp?p=31567&seqNum=6&rl=1), e.g., do as much work outside your loops as possible. One tip that I found really sped things up was to work on a [document fragment](http://www.devguru.com/technologies/xmldom/quickref/obj_documentFragment.html), rather than directly manipulating the top level `document` object.

### Conclusion

Any anthropologist will tell you that [myths don’t have to be true to be useful](http://www.anthroblog.tadmcilwraith.com/2006/05/25/does-truth-matter-in-stories/). Maybe it’s better that JavaScript programmers _don’t_ go the DOM route if they don’t fully understand how to make it work effectively. My advice? Bite the bullet and learn how to (efficiently) script the DOM.

**Update:** I should probably have been more explicit about this above, but you can get to the code I used to run my speed tests <a title="Click here to test the two techniques for yourself and to see code samples of each" href="http://andrew.hedges.name/experiments/innerhtml/">here</a>.

**Update 2009-12-25:** After some discussion on the [iUI Google Group](http://groups.google.com/group/iphonewebdev/browse_thread/thread/98fde2079026678d), I updated [my speed test](http://andrew.hedges.name/e/innerhtml/) to use [PPK’s method](http://www.quirksmode.org/blog/archives/2009/08/when_to_read_ou.html) for measuring DOM attachments. My conclusions above are unchanged.
