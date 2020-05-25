{
  "title": "V8: neither all that nor a bag of chips",
  "slug": "v8-neither-all-that-nor-a-bag-of-chips",
  "topics": [
    "JavaScript",
    "Web Development"
  ],
  "keywords": "google, chrome, apple, safari, webkit, v8, squirrelfish, extreme, speed, javascript",
  "created_date": "2008-09-11 23:09:00",
  "short_url": "http://ahedg.es/36",
  "published": false
}

========

I just got an interesting result comparing <a href="http://www.google.com/chrome">Google Chrome</a> to the latest <a href="http://nightly.webkit.org/">WebKit nightly build</a>. WebKit was nearly twice as fast as Chrome at completing the little suite of JavaScript unit tests I keep here at <a href="http://www.bookabach.co.nz/">work</a>. Is <a href="http://code.google.com/p/v8/">V8</a>--Chrome's <a href="http://news.cnet.com/8301-1001_3-10030888-92.html">much-touted</a> JavaScript engine--neither all that <em>nor</em> a bag of chips?

========

<p class="outdent">When I read <a href="http://blogoscoped.com/google-chrome/">the comic</a>, I got a mighty tingling sensation at the prospect that Google Chrome was going to change everything.</p>

<p>If <a href="http://www.download.com/8301-2007_4-10030888-12.html">Google's own benchmark results</a> were true, it's JavaScript engine was going to be so fast, it was going to force all other browser vendors to cry "uncle" like the schoolgirls they are. Using Chrome was going to give you that "new sneakers" feeling you had as a kid when you got a new pair of shoes and <em>knew</em> they made you faster.</p>

<p>Now, like <a href="http://ejohn.org/blog/javascript-performance-rundown/">some</a> <a href="http://javascriptly.com/2008/09/javascript-in-google-chrome/">others</a>, I've come to the conclusion that V8 (despite the hype) is only evolutionary--not revolutionary--and has probably already been surpassed by at least one other major browser.</p>

<p><a href="/blog/assets/files/js-unit-tests/">Run the tests for yourself.</a></p>

<div class="photo-left">
  <p>
    <img src="/blog/assets/imgs/chrome-0.2.149.29-vs-webkit-r36309.png" alt="Chrome versus WebKit"><br>
    Chrome versus WebKit
  </p>
</div>

<p>Did you run the tests? Did you notice the little line at the bottom of the results that said "Elapsed time"? On <span class="tooltip" title="MacBook Pro, 2.4GHz, 4GB RAM, running VMWare with Windows XP SP2">my system</span>, Google Chrome ran this collection of JavaScript <strong>significantly</strong> slower than did last night's build of WebKit, which includes the brand new <a href="http://www.tangerinesmash.com/writings/2008/sep/08/squirrelfish-extreme/">SquirrelFish Extreme</a> JavaScript engine.</p>

<p>For the sake of completeness, I also downloaded the latest build of Firefox. After <a href="https://wiki.mozilla.org/JavaScript:TraceMonkey#Playing_with_TraceMonkey">enabling TraceMonkey</a>, their hot poop JavaScript engine, it sill took twice as long as WebKit to complete my test suite. Folks, I think we have a winner! (At least for this week...)</p>

<p>Lots is <a href="http://fernandoacorreia.wordpress.com/2008/09/02/chrome-is-fast-javascript-benchmark/">being</a> <a href="http://waynepan.com/2008/09/02/v8-tracemonkey-squirrelfish-ie8-benchmarks/">written</a> <a href="http://scriptnode.com/article/google-chrome-benchmarks/">on the topic</a> of JavaScript speed at the moment. In fact, you <a href="http://kourge.net/node/122">can</a> <a href="http://www.google.com/translate?u=http%3A%2F%2Fmy.opera.com%2Fquiris%2Fblog%2Fsquirrelfish-extreme-30&hl=en&ie=UTF-8&sl=pl&tl=en">find</a> <a href="http://weblogs.mozillazine.org/roadmap/archives/2008/09/tracemonkey_update.html">articles</a> to support whatever flavour you favour.</p>

<p>I guess the moral of the story for me is that all three teams (that is, Chrome, WebKit, and <a href="http://www.mozilla.org/">Mozilla</a>) are locked in a heated battle for JavaScript speed bragging rights, and that can only benefit us all in the end. It's good for end-users because faster is better. It's good for web developers because it opens up possibilities for a little more "R" in our <span class="tooltip" title="Rich Internet Applications">RIAs</a>.</p>

<p>The <a href="http://en.wikipedia.org/wiki/Elephant_in_the_room">elephant in the room</a>, yet again, is why--with all of their vast engineering weight behind it--does Microsoft's Internet Explorer (the browser still <a href="http://whydoeseverythingsuck.com/2008/09/who-cares-about-chrome-ie6-has-25.html">saddling web developers everywhere</a>) <a href="http://www.tgdaily.com/html_tmp/content-view-37904-113.html">so</a> <a href="http://lifehacker.com/5044668/beta-browser-speed-tests-which-is-fastest">truly</a> <a href="http://www.emadibrahim.com/2008/09/02/google-chrome-javascript-speed-test/">suck</a>? Maybe all of this innovation will shame them into getting with the program. Yeah, right. Call me cynical, but that makes me want to break out in <a href="http://en.wikipedia.org/wiki/Dream_On_(Aerosmith_song)">song</a>.</p>

