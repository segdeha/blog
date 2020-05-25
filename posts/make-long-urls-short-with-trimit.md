{
  "title": "Make long URLs short with tr.im.it",
  "slug": "make-long-urls-short-with-trimit",
  "topics": [
    "Twitter",
    "Widgets"
  ],
  "keywords": "apple, dashboard, widgets, tr.im, url, shortening, tr.im.it, boogie, boogie, hedgehog, youtube",
  "created_date": "2008-11-01 12:34:56",
  "short_url": "http://ahedg.es/52",
  "published": false
}

========

The best <a href="http://www.apple.com/downloads/dashboard/">Dashboard widgets</a> scratch an itch. I'm a big fan of <a href="http://tr.im/">tr.im</a> for URL shortening, but even their excellent <span class="tooltip" title="JavaScript bookmark that acts on the current page">bookmarklet</span> wasn't quite convenient enough for me. Lucky for me that a) tr.im publish a public <a href="http://tr.im/api/">API</a>, and b) I know how to build widgets.

========

<p class="outdent">For a while, I ran my own URL shortening service. I had to shut it down after spammers used it to advertise all manner of unmentionable content. URL shortening services (others include <a href="http://qurl.net/">qurl.net</a>, <a href="http://tinyurl.com/">tinyurl.com</a> and <a href="http://is.gd/">is.gd</a>) -- as <a href="http://www.codinghorror.com/blog/archives/000935.html">others have noted</a> -- have their shortcomings (har har), but are really good for working around the following common problems:</p>

<ol>
  <li><strong>Sending long links in emails -</strong> many email clients are steaming piles that break long URLs into multiple lines, rendering them unclickable</li>
  <li><strong>Posting links to Twitter or SMS messages -</strong> both of these services limit you to around 140 characters; a long URL can take up most of that limit</li>
</ol>

<div class="photo-left">
  <p>
    <img style="border: none;" src="/widgets/screenshots/trimit/1.0/trimit-front.png" alt="tr.im.it interface">
  </p>
</div>

<p>Yesterday, I released <a href="http://tr.im/trimit">tr.im.it</a>, a widget for Mac OS X's Dashboard that makes it super-duper simple to create short URLs. Here's how it works:</p>

<ul>
  <li>You're cruising YouTube and stumble upon <a href="http://www.youtube.com/watch?v=HK0l2tqFDvM">a really fantastic work of cinematic art</a>.</li>
  <li>You think to yourself, "Self, I just have to tweet this, but along with my pithy commentary, the link will never fit into 140 characters."</li>
  <li>Good thing you thought ahead and downloaded <a href="http://tr.im/trimit">tr.im.it</a>!</li>
  <li>You invoke Dashboard with a quick click of the ol' F12.</li>
  <li>tr.im.it grabs the URL automagically.</li>
  <li>You click the cleverly labelled "Trim It" button.</li>
  <li>tr.im.it goes out through the <a href="http://en.wikipedia.org/wiki/Intertubes">Intertubes</a>, asks the tr.im website for a shortened URL, and comes back to show you. <em>At the same time,</em> tr.im.it has anticipated your needs and has copied the shortened URL (in this case: <a href="http://tr.im/q4q">http://tr.im/q4q</a>) to the pasteboard.</li>
  <li>You tweet about your find and are an instant <a href="http://en.wikipedia.org/wiki/Internet_celebrity#People">’net celeb</a>. Congrats!</li>
</ul>

<blockquote style="text-align: center;">
  <a href="http://tr.im/trimit">Get tr.im.it</a>
</blockquote>

<p>This is the simplest widget I've built in a long time. That's a good thing. I turned it around in a 24 hour span that also included taking the kids trick-or-treating and several hours of freelance work. I intentionally kept the interface simple. Heck, I didn't even include a link back to my own site! My hope is the <a href="http://en.wikipedia.org/wiki/Kiss_principle">KISS principle</a> will satisfy the 80% of users who just want a quick way to shorten URLs.</p>

<p>This is the power of <a href="http://en.wikipedia.org/wiki/Application_programming_interface">APIs</a>, I think, especially ones built on solid <a href="http://en.wikipedia.org/wiki/Representational_State_Transfer">REST</a> principles. The hardest part of building this thing was figuring out the AppleScript to grab the URL from Safari. Even that wasn't hard.</p>

<p>In any case, I'm happy to have a widget that gives me a more convenient way to shorten URLs. Find out more about tr.im.it on <a href="http://tr.im/trimit">my widgets page</a>.</p>

<blockquote style="text-align: center;">
  <a href="http://tr.im/trimit">Get tr.im.it</a>
</blockquote>
