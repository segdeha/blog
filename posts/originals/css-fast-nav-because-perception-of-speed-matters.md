{
  "title": "CSS Fast Nav: Because (perception of) speed matters!",
  "slug": "css-fast-nav-because-perception-of-speed-matters",
  "topics": ["JavaScript", "Web Development", "CSS"],
  "keywords": "css, javascript, web development, fast, nav, html5, html 5, header, background, perception of speed",
  "created_date": "2010-04-09 21:04:00",
  "short_url": "http://ahedg.es/85",
  "published": false
}

========

There must be <a href="http://www.google.com/search?client=safari&rls=en&q=tutorial+css+ul+nav&ie=UTF-8&oe=UTF-8">80 million tutorials for turning unordered lists into pretty navigation using CSS</a>. This is <em>not</em> #80,000,001. Here, I focus on one detail that often gets overlooked: how to give the user the perception that her click had an immediate effect. In this post, I borrow a little inspiration from <a href="http://www.apple.com/">Apple.com</a> and show you how to give your site <em>fast nav.</em>

========

<p class="outdent">I am not a designer. I told the client that. And yet, I still found myself spending my week putting design around their simple marketing website. Not being a designer, I drew, um&#8230;inspiration from the masters of UX.</p>
<p>Click around the top nav on <a href="http://www.apple.com/">the Apple website</a>. You&#8217;ll see a hover effect on the nav items, but also, when you click, it looks like the item gets pressed in.</p>
<p>That&#8217;s good. It makes you feel like your click did something. But, notice how the nav item goes back to the &#8220;at rest&#8221; state while you&#8217;re waiting for the next page? The illusion of speed is broken. We can do better!</p>
<p>Now, click around <a href="/blog/assets/files/nav/">my demo page</a>. (View source, too, because I&#8217;m not going to go through the whole thing line-by-line and explain it. Most of it should be pretty straightforward. Feel free to ask questions about it in the comments if you find anything frightening.)</p>
<blockquote style="text-align: center;">
	In case you missed it, here&#8217;s a link to <a href="/blog/assets/files/nav/">the demo page</a>.
</blockquote>
<p>Again, you should see a hover state when you mouseover the nav items. And, you should see the nav item look depressed when you click on one (don&#8217;t worry, we&#8217;ll get him some counseling or something). The difference between my nav and Apple&#8217;s is that mine sticks in that pressed-in state until the new page loads.</p>
<div class="photo-left">
	<p>
		<img src="/blog/assets/imgs/dr_evil_laser.jpg" alt="Dr. Evil">
	</p>
</div>
<p>That&#8217;s the point I want to focus in on, like a <em>frickin&#8217; laser.</em> It&#8217;s how to make your nav feel really fast. It&#8217;s not <em>actually</em> any faster, mind you. It just <em>feels</em> faster. Faster&#8212;whether real or perceived&#8212;makes users happier.</p>
<p><strong>The trick? Make that nav stick.</strong> <em>Frickin&#8217; laser!</em></p>
<p><strong>Update (10 Apr 2010):</strong> At <a href="http://www.sergeychernyshev.com/">Sergey Chernyshev</a>&#8217;s <a href="/blog/2010/04/09/css-fast-nav-because-perception-of-speed-matters#22252">request</a>, I&#8217;ve added a demo page <a href="/blog/assets/files/nav/non-fast.php">without CSS Fast Nav</a> for comparison purposes. Not as spiffy, don&#8217;t you agree?</p>
<p>Rocket scientists (I am not making this up) have found that <a href="http://gateway.nlm.nih.gov/MeetingAbstracts/ma?f=102212932.html">human speed perception is contrast dependent</a>. The following is excerpted from the above-linked research abstract (which is all I read of it&#8230;I&#8217;m no rocket scientist):</p>
<blockquote>
	A moving grating is judged slower than an otherwise identical grating of higher contrast moving at the same speed. However, the uncertainty in this type of speed judgment is largely independent of the contrast ratio. &#8230; [T]his effect appears robust to changes in spatial frequency, temporal frequency, and even absolute contrast.
</blockquote>
<p>What does this mean? Does it mean a zebra will appear faster than a horse going the same speed? I have <em>no idea.</em></p>
<p>In any case, back to the subject at hand, most CSS nav has the following 3 states:</p>
<ul>
	<li>Selected - for the current page</li>
	<li>Hovered - for whichever item is currently under the user&#8217;s mouse</li>
	<li>At rest - for everything else</li>
</ul>
<p>HTML for nav these days typically looks like the following:</p>
<pre class="sh_html">&lt;!-- HTML 5 --&gt;
&lt;nav&gt;
  &lt;ul&gt;
     &lt;li&gt;&lt;a class="selected" href="#"&gt;Home&lt;/a&gt;
     &lt;li&gt;&lt;a href="#"&gt;FAQs&lt;/a&gt;
     &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;
     &lt;li&gt;&lt;a href="#"&gt;Contact&lt;/a&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</pre>
<p>And, the CSS might start with something like this:</p>
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
<p><em>Fast Nav&#8482;</em> adds the following 4<sup>th</sup> state (no, &#8220;Fast Nav&#8221; is not actually trademarked, that was just for effect):</p>
<ul>
	<li>Active - for an item that has been clicked</li>
</ul>
<p>To get that 4<sup>th</sup> state, the obvious thing to do would be to add the following declaration to our CSS:</p>
<pre class="sh_css">/* CSS */
li a:active {
   background: #333;
   color: white;
}</pre>
<p>That&#8217;s not actually enough. The problem is that the request for the new page doesn&#8217;t fire until the user has released her mouse. So, there is invariably a noticeable lag after the nav has gone back to the &#8220;at rest&#8221; state and before the next page loads.</p>
<p>Not to worry! We can add a little JavaScript to get the behavior we want. What we&#8217;ll do is, when the user clicks on a nav item, set it to our selected state by adding the &#8220;selected&#8221; class name. This will &#8220;lock&#8221; the nav item in the active state in perpetuity or until the next page loads, whichever comes first (if you&#8217;ve surfed the web over dialup lately, you know what I mean).</p>
<p>Here&#8217;s some code to do that:</p>
<pre class="sh_javascript">(document.querySelector('nav > ul'))
   .addEventListener('click', function (evt) {
   evt.target.className = 'selected';
}, false);</pre>
<p>That&#8217;s the code I use in the demo, but you should know it only works in recent, standards-compliant browsers (<a href="http://www.apple.com/safari/">Safari</a>, <a href="http://www.google.com/chrome/">Chrome</a>, <a href="http://mozilla.org/firefox/">Firefox</a>, <a href="http://opera.com/">Opera</a>). If you stubbornly insist on catering to the other <a href="http://en.wikipedia.org/wiki/Usage_share_of_web_browsers">54% of web users</a>, the <a href="http://jquery.com">jQuery</a> equivalent might be something like this:</p>
<pre class="sh_javascript">$('nav > ul').live('click', function (evt) {
   $(this).addClass('selected');
});</pre>
<p>So, there you have it, <em>CSS Fast Nav.</em> I know what you&#8217;re thinking, &#8220;That was a helluva lot of words to tell me just to set the nav item to selected when the user clicks.&#8221; Sorry if I wasted your time. I guess I just got excited.</p>
