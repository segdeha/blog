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
  "deprecated": true,
  "published": true
}

========

The best [Dashboard widgets](https://www.apple.com/downloads/dashboard/) scratch an itch. I’m a big fan of [tr.im](https://tr.im) for URL shortening, but even their excellent <span class="tooltip" title="JavaScript bookmark that acts on the current page">bookmarklet</span> wasn't quite convenient enough for me. Lucky for me that a) tr.im publish a public [API](https://tr.im/api/), and b) I know how to build widgets.

========

For a while, I ran my own URL shortening service. I had to shut it down after spammers used it to advertise all manner of unmentionable content. URL shortening services (others include [qurl.net](https://qurl.net), [tinyurl.com](https://tinyurl.com/) and [is.gd](https://is.gd))—as [others have noted](https://www.codinghorror.com/blog/archives/000935.html)—have their shortcomings (har har), but are really good for working around the following common problems:

1. **Sending long links in emails -** many email clients are steaming piles that break long URLs into multiple lines, rendering them unclickable
2. **Posting links to Twitter or SMS messages -** both of these services limit you to around 140 characters; a long URL can take up most of that limit

<div class="photo-left">
  <p>
    <img style="border: none;" src="/blog/assets/img/trimit-front.png" alt="tr.im.it interface">
  </p>
</div>

Yesterday, I released [tr.im.it](https://tr.im/trimit), a widget for Mac OS X’s Dashboard that makes it super-duper simple to create short URLs. Here’s how it works:

* You’re cruising YouTube and stumble upon [a really fantastic work of cinematic art](https://www.youtube.com/watch?v=HK0l2tqFDvM).
* You think to yourself, “Self, I just have to tweet this, but along with my pithy commentary, the link will never fit into 140 characters.”
* Good thing you thought ahead and downloaded [tr.im.it](https://tr.im/trimit)!
* You invoke Dashboard with a quick click of the ol’ F12.
* tr.im.it grabs the URL automagically.
* You click the cleverly labelled “Trim It” button.
* tr.im.it goes out through the [Intertubes](https://en.wikipedia.org/wiki/Intertubes), asks the tr.im website for a shortened URL, and comes back to show you. _At the same time,_ tr.im.it has anticipated your needs and has copied the shortened URL (in this case: [https://tr.im/q4q](https://tr.im/q4q)) to the pasteboard.
* You tweet about your find and are an instant [’net celeb](https://en.wikipedia.org/wiki/Internet_celebrity#People). Congrats!

> [Get tr.im.it](https://tr.im/trimit)

This is the simplest widget I’ve built in a long time. That’s a good thing. I turned it around in a 24 hour span that also included taking the kids trick-or-treating and several hours of freelance work. I intentionally kept the interface simple. Heck, I didn’t even include a link back to my own site! My hope is the [KISS principle](https://en.wikipedia.org/wiki/Kiss_principle) will satisfy the 80% of users who just want a quick way to shorten URLs.

This is the power of [APIs](https://en.wikipedia.org/wiki/Application_programming_interface), I think, especially ones built on solid [REST](https://en.wikipedia.org/wiki/Representational_State_Transfer) principles. The hardest part of building this thing was figuring out the AppleScript to grab the URL from Safari. Even that wasn’t hard.

In any case, I’m happy to have a widget that gives me a more convenient way to shorten URLs. Find out more about tr.im.it on [my widgets page](https://tr.im/trimit).

> [Get tr.im.it](https://tr.im/trimit)
