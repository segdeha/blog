{
  "title": "V8: neither all that nor a bag of chips",
  "slug": "v8-neither-all-that-nor-a-bag-of-chips",
  "topics": [
    "JavaScript",
    "Web Development"
  ],
  "keywords": "google, chrome, apple, safari, webkit, v8, squirrelfish, extreme, speed, javascript",
  "created_date": "2008-09-11 23:09:00",
  "short_url": "https://ahedg.es/36",
  "deprecated": true,
  "published": true
}

========

I just got an interesting result comparing [Google Chrome](https://www.google.com/chrome) to the latest [WebKit nightly build](https://nightly.webkit.org). WebKit was nearly twice as fast as Chrome at completing the little suite of JavaScript unit tests I keep here at [work](https://www.bookabach.co.nz). Is [V8](https://code.google.com/p/v8/)—Chrome’s [much-touted](https://news.cnet.com/8301-1001_3-10030888-92.html) JavaScript engine—neither all that _nor_ a bag of chips?

========

When I read [the comic](https://blogoscoped.com/google-chrome/), I got a mighty tingling sensation at the prospect that Google Chrome was going to change everything.

If [Google’s own benchmark results](https://www.download.com/8301-2007_4-10030888-12.html) were true, its JavaScript engine was going to be so fast, it was going to force all other browser vendors to cry “uncle” like the schoolgirls they are. Using Chrome was going to give you that “new sneakers” feeling you had as a kid when you got a new pair of shoes and _knew_ they made you faster.

Now, like [some](https://ejohn.org/blog/javascript-performance-rundown/) [others](https://javascriptly.com/2008/09/javascript-in-google-chrome/), I’ve come to the conclusion that V8 (despite the hype) is only evolutionary—not revolutionary—and has probably already been surpassed by at least one other major browser.

[Run the tests for yourself.](/blog/assets/files/js-unit-tests/)

<div class="photo-left">
  <p>
    <img src="/blog/assets/img/chrome-0.2.149.29-vs-webkit-r36309.png" alt="Chrome versus WebKit"><br>
    Chrome versus WebKit
  </p>
</div>

Did you run the tests? Did you notice the little line at the bottom of the results that said “Elapsed time”? On <span class="tooltip" title="MacBook Pro, 2.4GHz, 4GB RAM, running VMWare with Windows XP SP2">my system</span>, Google Chrome ran this collection of JavaScript **significantly** slower than did last night’s build of WebKit, which includes the brand new [SquirrelFish Extreme](https://www.tangerinesmash.com/writings/2008/sep/08/squirrelfish-extreme/) JavaScript engine.

For the sake of completeness, I also downloaded the latest build of Firefox. After [enabling TraceMonkey](https://wiki.mozilla.org/JavaScript:TraceMonkey#Playing_with_TraceMonkey), their hot poop JavaScript engine, it sill took twice as long as WebKit to complete my test suite. Folks, I think we have a winner! (At least for this week…)

Lots is [being](https://fernandoacorreia.wordpress.com/2008/09/02/chrome-is-fast-javascript-benchmark/) [written](https://waynepan.com/2008/09/02/v8-tracemonkey-squirrelfish-ie8-benchmarks/) [on the topic](https://scriptnode.com/article/google-chrome-benchmarks/) of JavaScript speed at the moment. In fact, you [can](https://kourge.net/node/122) [find](https://www.google.com/translate?u=http%3A%2F%2Fmy.opera.com%2Fquiris%2Fblog%2Fsquirrelfish-extreme-30&hl=en&ie=UTF-8&sl=pl&tl=en) [articles](https://weblogs.mozillazine.org/roadmap/archives/2008/09/tracemonkey_update.html) to support whatever flavour you favour.

I guess the moral of the story for me is that all three teams (that is, Chrome, WebKit, and [Mozilla](https://www.mozilla.org)) are locked in a heated battle for JavaScript speed bragging rights, and that can only benefit us all in the end. It’s good for end-users because faster is better. It’s good for web developers because it opens up possibilities for a little more “R” in our <acronym class="tooltip" title="Rich Internet Applications">RIAs</acronym>.

The [elephant in the room](https://en.wikipedia.org/wiki/Elephant_in_the_room), yet again, is why—with all of their vast engineering weight behind it—does Microsoft’s Internet Explorer (the browser still [saddling web developers everywhere](https://whydoeseverythingsuck.com/2008/09/who-cares-about-chrome-ie6-has-25.html)) [so](https://www.tgdaily.com/html_tmp/content-view-37904-113.html) [truly](https://lifehacker.com/5044668/beta-browser-speed-tests-which-is-fastest) [suck](https://www.emadibrahim.com/2008/09/02/google-chrome-javascript-speed-test/)? Maybe all of this innovation will shame them into getting with the program. Yeah, right. Call me cynical, but that makes me want to break out in [song](https://en.wikipedia.org/wiki/Dream_On_(Aerosmith_song)).
