{
  "title": "The Sincerest Form of Flattery",
  "slug": "the-sincerest-form-of-flattery",
  "topics": ["Business", "Design"],
  "keywords": "trade me, travelbug, jasons, design, imitation, inspiration, flattery, business, competition, google, google maps, travel, amenities, short, url, query string, compression, javascript, event, back button, hash",
  "created_date": "2008-03-02 15:33:33",
  "short_url": "http://ahedg.es/17",
  "published": true
}

========

[They say](https://www.quotationspage.com/quote/27484.html) imitation is the sincerest form of flattery. They also say there is a fine line between imitation and inspiration. Gentle reader, I leave it for you to decide on which side of this line the following falls.

========

I helped build [Travelbug](https://www.travelbug.co.nz/), [Trade Me’s](https://www.trademe.co.nz/) online accommodation booking site. We launched Travelbug on 9 September 2007. Today, it came to my attention that a direct competitor has, essentially, lifted a major feature of the site.

The feature in question (coded primarily by me, coincidentally) is the booking calendar. You can see it in action by visiting any [location page](https://www.travelbug.co.nz/visit/19160#book) on the Travelbug site. It shows about a week’s worth of availability at a time, giving you the ability to scroll ahead and back, and allows you to start the booking process using a neat-o, visual interface.

<figure>
    <img src="/blog/assets/img/admirals-travelbug.png" alt="Admiral’s View Lodge, Travelbug Style">
    <figcaption>Admiral’s View Lodge, Travelbug Style</figcaption>
</figure>

<figure>
    <img src="/blog/assets/img/admirals-jasons.png" alt="Admiral’s View Lodge, Jasons Style">
    <figcaption>Admiral’s View Lodge, Jasons Style</figcaption>
</figure>

Location pages also contain basic info like name and address, amenities, photos, and a Google Map of the location. Makes sense.

I guess [there are only so many ways](https://www.37signals.com/svn/posts/575-but-theres-only-so-many-ways-to-do-something-right) to display some of that basic info so I could forgive some similarities there. But, the booking calendar widget, while obvious once you see and use it, was pretty original in its conception and execution. Or, so I thought…

It’s _possible_ that the folks at [Jasons](https://www.jasons.com/) had the same idea, without ever having seen Travelbug. OK, it’s not actually possible. At least, I don’t think so, after looking at what they offer on their site.

Name, address, check. Description, list of amenities, check. Photos, Google Map, check. Scrolling booking calendar…hey, haven’t I seen that somewhere before?

Now, this isn’t my design. I only implemented it. From what I understand, the Trade Me guys are having a laugh about the whole thing, which is big of them. If it were me, I’d be fairly livid about this blatant plagiarism. I guess they’re more secure in their design-hood.

From a technical perspective, the thing I find interesting is that their page uses 2 or 3 different JavaScript animation libraries ([YUI](https://developer.yahoo.com/yui/animation/) and [Script.aculo.us](https://script.aculo.us/) for sure, and one that looks like a .NET kinda thing) and weighs in at over **1.3MB,** roughly _quadruple_ ours. Just saying.

Compare for yourself:

* [Admiral’s View Lodge, Travelbug style](https://www.travelbug.co.nz/visit/20564)
* [Admiral’s View Lodge, Jasons style](https://www.jasons.com/New-Zealand/Paihia/Admirals-View-Lodge)
