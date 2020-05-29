{
  "title": "A Gem of a Week",
  "slug": "a-gem-of-a-week",
  "topics": [
    "Life",
    "Ruby on Rails"
  ],
  "keywords": "ruby, rails, svn, sprint, php, zope, jsp, asp.net, fun, flow",
  "created_date": "2007-02-05 23:33:33",
  "short_url": "http://ahedg.es/6",
  "published": true
}

========

Time compresses when you are in the flow. Musicians know this, as do athletes, and, yes, even programmers. For us, “time flies when you’re having fun” is more than just a saying. The last 10 days have not just flown by, they’ve soared by like a jumbo jet making up time en route to some far away destination.

========

I won’t try to recall every detail of last Sunday’s sprint because others have already done so with aplomb. I do want to talk a little about an area that hasn’t been explored in as much depth: the technology behind what we did. It ended up being a huge part of my entire week, not just that one, wonderful day.

<!--
<figure>
    <img src="" alt="">
    <figcaption></figcaption>
</figure>

<div class="photo-left">
	<p>
		<img src="http://static.zooomr.com/images/688986_0b43c0c834.jpg" alt="Obligatory Artsy Shot">
	</p>
</div>
-->

For the backstory, check out [Mark Bixby](http://markbixby.com/)’s excellent [blog post](http://www.methodarts.com/blog/post/the_sprint/) on the [Method Arts](http://methodarts.com/) website. (Kelly Patrick Robinson also wrote [a great summary](http://kellypatrickrobinson.com/), but his site changes so often, I’m almost afraid to link to it.) Reid Givens also [blogged](http://www.reidgivens.com/roi_blog/2007/02/04/10-professionals-12-hours-1-big-task-the-method-arts-sprint/) about it and put together two [great](http://www.reidgivens.com/roi_blog/2007/02/04/method-arts-sprint-podcast-brian-warren/) [podcasts](http://www.reidgivens.com/roi_blog/2007/02/04/method-arts-sprint-podcast/) where you can meet the team and hear a little more about what we did. **Update:** Brian Warren has now put [his thoughts](http://bw.watchtan.com/article/358/the-sprint) up on his blog as well.

OK, I’ll assume from here on that you’re hip to what went down in a borrowed office space in Albuquerque, New Mexico, between 8:00 a.m. and 8:00 p.m. Mountain time, January 28, 2007.

When we were meeting in the week before “The Sprint,” [Daniel Lyons](http://storytotell.org/) suggested we use [Ruby on Rails](http://en.wikipedia.org/wiki/Ruby_on_Rails) as our [development framework](http://en.wikipedia.org/wiki/Framework).

I respect Daniel immensely, not just as a programmer, but as a person. He is easily the best programmer I know. Go ahead. Ask him to write out—off the top of his head—the [Fibonacci sequence](http://en.wikipedia.org/wiki/Fibonacci_sequence) in [Java](http://en.wikipedia.org/wiki/Java_%28programming_language%29). Or [Perl](http://en.wikipedia.org/wiki/Perl). Or [C](http://en.wikipedia.org/wiki/C_%28programming_language%29). Or [C++](http://en.wikipedia.org/wiki/C++). Or [C#](http://en.wikipedia.org/wiki/C_Sharp). Or [Lisp](http://en.wikipedia.org/wiki/Lisp_%28programming_language%29). Or [Haskel](http://en.wikipedia.org/wiki/Haskell_%28programming_language%29). Or [Ocaml](http://en.wikipedia.org/wiki/OCaml). Or... You get the idea. He could have suggested anything for the sprint. He suggested Ruby on Rails and he couldn’t have been more right.

I had barely touched Ruby on Rails before that Sunday, but ended up spending all of last week with it (more on that later). I was so impressed with how productive we were and how well thought out Rails is that I now have to bite my tongue to keep myself from telling everyone I know (well, everyone I know who builds web apps), “Stop. No, _really._ **Stop!** Get trained on Rails. Get your people trained on Rails. _Start over._ I promise you will finish faster than if you continue with [PHP](http://en.wikipedia.org/wiki/PHP) / [Python](http://en.wikipedia.org/wiki/Python_%28programming_language%29) / [Zope](http://en.wikipedia.org/wiki/Zope) / [JSP](http://en.wikipedia.org/wiki/JavaServer_Pages) / [ASP.NET](http://en.wikipedia.org/wiki/ASP.NET) / Insert-Favorite-Supposedly-Web-Savvy-Middleware-Here.”

Rails is optimized for building web applications. It is an incredibly well thought out framework for implementing what is understood to be the best practices of circa 2007, rapid, agile methodology web development. It seems obvious in hindsight, but we were building a web app and we had to build it fast. Hence, Ruby on Rails.

<!--
<figure>
    <img src="" alt="">
    <figcaption></figcaption>
</figure>

<div class="photo-left">
	<p>
		<img src="http://static.zooomr.com/images/688994_f6d655237d.jpg" alt="Daniel and Lance">
	</p>
</div>
-->

What Rails allowed us to do was separate the work we had to do on the _plumbing_ of the site from the work on the _faucets_ from the work on the _wash basins_ (the model, controllers, and views, for those following along at home). Also of great help that day was [Subversion](http://en.wikipedia.org/wiki/Subversion_%28software%29), killer revision control software. Thanks to Rails’ separation of model, controllers, and views and Subversion’s ability to seemingly intuit what we intended, Daniel, Lance Sanchez, and I were able to commit 63 revisions to the repository that day while only having to manually fix one conflict. Pretty smooth. This combination of software did what good software is supposed to do: get out of the way and let users solve problems.

We could have built something that day using another language and another framework. But, we wouldn’t have made it nearly as far and we wouldn’t have had as much fun.

Having barely touched Ruby on Rails before that day, I let Daniel and Lance do most of the heavy lifting. We had a great time working under the self-imposed pressure of our contrived event. The next day, though, things got real…

The Friday before the sprint, Daniel had the idea that he and I could rebuild—in one week—[a system](http://apexednm.org/) [my contract employer](http://apexeducation.org/) had invested two years and a bunch of money building. Much to his credit, my boss gave us the green light to spend all of last week on this, rather than my regularly scheduled duties. Again, Daniel did a lot of the heavy lifting (things like database migrations and model classes), but if the sprint was an interesting, if superficial, foray into the world of Rails, last week was a full-on immersion.

Just like the sprint, we were building a data-driven web application and speed was of the essence. You see, Daniel left today for two months of driving across North America testing [a new type of spark plug](http://www.pulstarplug.com/index.php). (It’s a long story.) Anyway, the point is, we literally had one week to do this.

[We did it.](http://apexed.storytotell.org/) We built a complex, database driven web application in one work week. I am convinced that if we had used any other framework and any other language, we would have made it half as far with half the fun and twice the stress.

<!--
<figure>
    <img src="" alt="">
    <figcaption></figcaption>
</figure>

<div class="photo-left">
	<p>
		<img src="http://static.zooomr.com/images/688993_78228c2043.jpg" alt="Christopher Anderton">
	</p>
</div>
-->

You may have noticed that I’ve mentioned “fun” a couple of times now. Some might complain that if it’s fun, it must not be work. I guess they’re right. It doesn’t feel like work when you’re having that much fun. Thing is, when you enjoy what you do, you don’t even notice the passing of the hours. All you know is that you’re getting things done at a rate you never thought possible. You’re in the flow. I don’t see anything wrong with that.

The sprint has garnered some attention in the <a href="/assets/files/abqjournalstory.pdf" title="Reprint of Jan. 28 Albuquerque Journal story (236KB, PDF)">press</a>. It’s fun to be recognized for being willing to take a shot at solving a problem that has cost New Mexico taxpayers both money and frustration, but more than the publicity that has come from all of this, the real value for me was in my introduction to Ruby on Rails, the most productive web building framework imaginable, and, even more importantly, in the camaraderie of that special, intense day that will forever after be known as The Sprint.

### Afterword

The [Albuquerque Journal](http://www.abqjournal.com/) story neglected to mention everyone who participated in The Sprint. So, for the record, here it is, the official list of participants with the role(s) they filled that day:

<!--
<figure>
    <img src="" alt="">
    <figcaption></figcaption>
</figure>

<div class="photo-left">
	<p>
		<img src="http://static.zooomr.com/images/688987_8b778ddbce.jpg" alt="From left: Brian Warren, Mark Bixby, and Kelly Patrick Robinson">
	</p>
</div>
-->

* Christopher Anderton, Videographer
* [Mark Bixby](http://markbixby.com/), Visual Designer
* [Reid Givens](http://reidgivens.com/), Podcastographer & Strategic Consultant
* Me, [Andrew Hedges](http://newfangledtelegraph.com/), Front-end Developer & Liaison Between Design and Development
* [Daniel Lyons](http://storytotell.org/), Database & Back-end Developer
* [Kelly Patrick Robinson](http://kellypatrickrobinson.com/), Copy Writer & [Development Abstraction Layer](http://www.joelonsoftware.com/articles/DevelopmentAbstraction.html) Consultant
* [Joshua Sallach](http://nrpro.com/), Videographer & [Hallway Napper](http://beta.zooomr.com/photos/newfangledtelegraph/688996)
* Lance Sanchez, Back-end & AJAX Developer
* [Vincent Thomé](http://vincentthome.com/), Cat Herder & Development Abstraction Layer Wrangler
* [Brian Warren](http://begoodnotbad.com/), XHTML/CSS Ninja

---

**Update:** I was interviewed about the sprint a couple of weeks after it took place. Here is the video of the interview on Albuquerque local TV:

<iframe class="video-iframe" src="https://www.youtube.com/embed/r9RgAmGI-g8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
