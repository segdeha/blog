{
  "title": "CSS Fast Nav: Because (perception of) speed matters!",
  "slug": "css-fast-nav-because-perception-of-speed-matters",
  "topics": ["JavaScript", "Web Development", "CSS"],
  "keywords": "css, javascript, web development, fast, nav, html5, html 5, header, background, perception of speed",
  "created_date": "2010-04-09 21:04:00",
  "short_url": "http://ahedg.es/85",
  "published": true
}

========

There must be [80 million tutorials for turning unordered lists into pretty navigation using CSS](http://www.google.com/search?client=safari&rls=en&q=tutorial+css+ul+nav&ie=UTF-8&oe=UTF-8). This is _not_ #80,000,001. Here, I focus on one detail that often gets overlooked: how to give the user the perception that her click had an immediate effect. In this post, I borrow a little inspiration from [Apple.com](http://www.apple.com/) and show you how to give your site _fast nav._

========

I am not a designer. I told the client that. And yet, I still found myself spending my week putting design around their simple marketing website. Not being a designer, I drew, um…inspiration from the masters of UX.

Click around the top nav on [the Apple website](http://www.apple.com/). You’ll see a hover effect on the nav items, but also, when you click, it looks like the item gets pressed in.

That’s good. It makes you feel like your click did something. But, notice how the nav item goes back to the “at rest” state while you’re waiting for the next page? The illusion of speed is broken. We can do better!

Now, click around [my demo page](/blog/assets/files/nav/). (View source, too, because I’m not going to go through the whole thing line-by-line and explain it. Most of it should be pretty straightforward. Feel free to ask questions about it in the comments if you find anything frightening.)

> In case you missed it, here’s a link to [the demo page](/blog/assets/files/nav/).

Again, you should see a hover state when you mouseover the nav items. And, you should see the nav item look depressed when you click on one (don’t worry, we’ll get him some counseling or something). The difference between my nav and Apple’s is that mine sticks in that pressed-in state until the new page loads.

<div class="photo-left">
	<p>
		<img src="/blog/assets/imgs/dr_evil_laser.jpg" alt="Dr. Evil">
	</p>
</div>

That’s the point I want to focus in on, like a _frickin’ laser._ It’s how to make your nav feel really fast. It’s not _actually_ any faster, mind you. It just _feels_ faster. Faster—whether real or perceived—makes users happier.

**The trick? Make that nav stick.** _Frickin’ laser!_

**Update (10 Apr 2010):** At [Sergey Chernyshev](http://www.sergeychernyshev.com/)’s [request](/blog/2010/04/09/css-fast-nav-because-perception-of-speed-matters#22252), I’ve added a demo page [without CSS Fast Nav](/blog/assets/files/nav/non-fast.php) for comparison purposes. Not as spiffy, don’t you agree?

Rocket scientists (I am not making this up) have found that [human speed perception is contrast dependent](http://gateway.nlm.nih.gov/MeetingAbstracts/ma?f=102212932.html). The following is excerpted from the above-linked research abstract (which is all I read of it…I’m no rocket scientist):

> A moving grating is judged slower than an otherwise identical grating of higher contrast moving at the same speed. However, the uncertainty in this type of speed judgment is largely independent of the contrast ratio. … [T]his effect appears robust to changes in spatial frequency, temporal frequency, and even absolute contrast.


What does this mean? Does it mean a zebra will appear faster than a horse going the same speed? I have _no idea._

In any case, back to the subject at hand, most CSS nav has the following 3 states:

* Selected - for the current page
* Hovered - for whichever item is currently under the user’s mouse
* At rest - for everything else

HTML for nav these days typically looks like the following:

<pre class="sh_html">&lt;!-- HTML 5 --&gt;
&lt;nav&gt;
  &lt;ul&gt;
     &lt;li&gt;&lt;a class="selected" href="#"&gt;Home&lt;/a&gt;
     &lt;li&gt;&lt;a href="#"&gt;FAQs&lt;/a&gt;
     &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;
     &lt;li&gt;&lt;a href="#"&gt;Contact&lt;/a&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</pre>

And, the CSS might start with something like this:

<pre class="sh_css">/* CSS */
ul {
   list-style: none;
}

li {
   display: block;
   float: left;
}

li a {
   display: inline-block;
   background: #999;
   color: black;
}

li a:hover {
   background: #666;
   color: #ccc;
}

li a.selected {
   background: #333;
   color: white;
}</pre>

_Fast Nav™_ adds the following 4<sup>th</sup> state (no, “Fast Nav” is not actually trademarked, that was just for effect):

* Active - for an item that has been clicked

To get that 4<sup>th</sup> state, the obvious thing to do would be to add the following declaration to our CSS:

<pre class="sh_css">/* CSS */
li a:active {
   background: #333;
   color: white;
}</pre>

That’s not actually enough. The problem is that the request for the new page doesn’t fire until the user has released her mouse. So, there is invariably a noticeable lag after the nav has gone back to the “at rest” state and before the next page loads.

Not to worry! We can add a little JavaScript to get the behavior we want. What we’ll do is, when the user clicks on a nav item, set it to our selected state by adding the “selected” class name. This will “lock” the nav item in the active state in perpetuity or until the next page loads, whichever comes first (if you’ve surfed the web over dialup lately, you know what I mean).

Here’s some code to do that:

<pre class="sh_javascript">(document.querySelector('nav > ul'))
   .addEventListener('click', function (evt) {
   evt.target.className = 'selected';
}, false);</pre>

That’s the code I use in the demo, but you should know it only works in recent, standards-compliant browsers ([Safari](http://www.apple.com/safari/), [Chrome](http://www.google.com/chrome/), [Firefox](http://mozilla.org/firefox/), [Opera](http://opera.com/)). If you stubbornly insist on catering to the other [54% of web users](http://en.wikipedia.org/wiki/Usage_share_of_web_browsers), the [jQuery](http://jquery.com) equivalent might be something like this:

<pre class="sh_javascript">$('nav > ul').live('click', function (evt) {
   $(this).addClass('selected');
});</pre>

So, there you have it, _CSS Fast Nav._ I know what you’re thinking, “That was a helluva lot of words to tell me just to set the nav item to selected when the user clicks.” Sorry if I wasted your time. I guess I just got excited.

