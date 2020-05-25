{
  "title": "Responsive iframes in pure CSS",
  "slug": "responsive-iframes-in-pure-css",
  "topics": ["JavaScript", "Web Development", "CSS"],
  "keywords": "css, javascript, youtube, iframe, responsive, video, padding, bottom",
  "created_date": "2015-12-15 12:15:15",
  "short_url": "http://ahedg.es/109",
  "published": false
}

========

On a recent freelance gig, I needed to integrate a <a href="http://tumblr.com">Tumblr</a> feed that included <a href="http://youtube.com">YouTube</a> videos into a fully responsive website. The videos are contained in&#8230;wait for it&#8230;<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe">&lt;iframes&gt;</a>. Lovely.

========

<p>There were a few problems to solve to get this working, but the main one stems from the fact that CSS doesn&#8217;t allow for maintaining <a href="http://andrew.hedges.name/experiments/aspect_ratio/">aspect ratios</a> when sizing elements (with 1 exception that I&#8217;m aware of: <imgs>).</p>
<p>Turns out there <em>is</em> a CSS property that works this way. Hey there, <code>padding</code>.</p>
<p>When I <span class="tooltip" title="Yep, using it as a verb, at the risk of diluting their trademark. Sucks to be ubiquitous.">googled</span> it, I came across <a href="http://www.goldenapplewebdesign.com/responsive-aspect-ratios-with-pure-css/">a couple</a> <a href="http://www.sitepoint.com/maintain-image-aspect-ratios-responsive-web-design/">of articles</a> that pointed out this helpful fact. So, when you see <code>padding-bottom: 56.25%;</code> below, now you know where that came from!</p>
<h3>The Solution</h3>
<blockquote>If you&#8217;re not part of the solution, you&#8217;re part of the precipitate.<br>~Chemistry Geek Humor</blockquote>
<p>The following might be a little specific to my situation, but I&#8217;ll do my best to call out the parts that are generalizable.</p>
<h4>Tumblr&#8217;s &#8220;API&#8221;</h4>
<p>Tumblr has moved on to <a href="https://www.tumblr.com/docs/en/api/v2">version 2</a> of their API, but they still support <a href="https://www.tumblr.com/docs/en/api/v1">version 1</a>, which offers a simple way to <code>GET</code> the latest posts from any Tumblr blog as either XML (gawd, shoot me now) or JavaScript (the API makes it seem like you&#8217;ll get JSON back, but it&#8217;s actually just a JavaScript variable with a big object assigned to it).</p>
<p>Here, try it (link will open in a new window/tab): <a target="_blank" href="http://theslantandgo.tumblr.com/api/read/json">http://theslantandgo.tumblr.com/api/read/json</a></p>
<p>You&#8217;ll see that it kinda boils down to:</p>
<pre class="sh_javascript sh_sourceCode">var tumblr_api_read = {};
</pre>
<p>The simplest way to consume this &#8220;API&#8221; is to inject a <code><script></code> tag into your page with your Tumblr API URL as the value for the <code>src</code> attribute. <a href="http://jquery.com/">jQuery</a> offers a super simple way to do this: <code><a href="https://api.jquery.com/jquery.getscript/">$.getScript</a></code>. It even handles assigning an <code>onload</code> event to the script so your callback function will fire after the script is all ready to go. Nice one, jQuery!</p>
<p>So, fine, you get this big JavaScript object from Tumblr and it&#8217;s got different kinds of posts and stuff, including video. Now, there are at least a couple types of video posts, but the ones I&#8217;m concerned with here are YouTube videos. Why? Because they&#8217;re delivered in <iframes> and <iframes> suck in so many ways, but I understand why they use them sandboxing security blah blah blah.</p>
<p>Here&#8217;s an example of one of these YouTube video posts, represented as JavaScript data (from <a target="_blank" href="http://awesomecatvideos.tumblr.com/post/133472224280/laughingsquid-cats-manage-to-outwit-the-tight">awesomecatvideos.tumblr.com</a>):</p>
<pre class="sh_javascript sh_sourceCode">{
  "id": "133472224280",
  "url": "http://awesomecatvideos.tumblr.com/post/133472224280",
  "url-with-slug": "http://awesomecatvideos.tumblr.com/post/133472224280/laughingsquid-cats-manage-to-outwit-the-tight",
  "type": "video",
  "date-gmt": "2015-11-18 17:00:19 GMT",
  "date": "Wed, 18 Nov 2015 12:00:19",
  "bookmarklet": 0,
  "mobile": 0,
  "feed-item": "",
  "from-feed-id": 0,
  "unix-timestamp": 1447866019,
  "format": "html",
  "reblog-key": "fpweTEr7",
  "slug": "laughingsquid-cats-manage-to-outwit-the-tight",
  "video-caption": "<p><a class=\"tumblr_blog\" href=\"http://laughingsquid.tumblr.com/post/133406638014\">laughingsquid</a>:</p>\n<blockquote>\n<p><a href=\"http://laughingsquid.com/cats-manage-to-outwit-the-tight-security-at-the-g20-summit-in-turkey-and-show-up-on-camera/\">Cats Manage to Outwit the Tight Security at the G20 Summit in Turkey and Show Up On-Camera</a></p>\n</blockquote>",
  "video-source": "<iframe width=\"540\" height=\"304\"  id=\"youtube_iframe\" src=\"https://www.youtube.com/embed/1lnNX6dND5k?feature=oembed&enablejsapi=1&origin=https://safe.txmblr.com&wmode=opaque\" frameborder=\"0\" allowfullscreen></iframe>",
  "video-player": "<iframe width=\"400\" height=\"225\"  id=\"youtube_iframe\" src=\"https://www.youtube.com/embed/1lnNX6dND5k?feature=oembed&enablejsapi=1&origin=http://safe.txmblr.com&wmode=opaque\" frameborder=\"0\" allowfullscreen></iframe>",
  "video-player-500": "<iframe width=\"500\" height=\"281\"  id=\"youtube_iframe\" src=\"https://www.youtube.com/embed/1lnNX6dND5k?feature=oembed&enablejsapi=1&origin=http://safe.txmblr.com&wmode=opaque\" frameborder=\"0\" allowfullscreen></iframe>",
  "video-player-250": "<iframe width=\"250\" height=\"141\"  id=\"youtube_iframe\" src=\"https://www.youtube.com/embed/1lnNX6dND5k?feature=oembed&enablejsapi=1&origin=http://safe.txmblr.com&wmode=opaque\" frameborder=\"0\" allowfullscreen></iframe>"
}</pre>
<h4>A bit of JavaScript</h4>
<p>Tumblr is nice enough to give us this <code>video-player</code> property that we can just dump into our page to get the video to play. That&#8217;s cool. The part that&#8217;s not as cool is that it has attributes on it for width and height and those don&#8217;t allow you to override them with simple CSS. So, yeah, JavaScript string manipulation to the rescue. Meh.</p>
<pre class="sh_javascript sh_sourceCode">// grab the post we want (this is just an example)
var post = tumblr_api_read.posts[0];

// remove the width and height attrs (note the use of double and single quotes)
var video = post['video-player'].replace("width='400' height='225'", '');

// wrap the iframe in a div so we can do our cool css trick
var html = '<div class="iframe-container">' + video + '</div>';

// insert the resulting html (again, just an example)
document.body.insertAdjacentHTML('beforeend', html);</pre>
<p>OK, now we have a wrapped <iframe> on our page stripped of its width and height attributes. Looks like crap, right? Hmm, maybe I should have started with the CSS.</p>
<p>Just want to make sure you noticed the part where we wrapped the <iframe> in a container element. See that? That&#8217;s what makes this whole blog post possible. No, really.</p>
<div class="photo-right">
	<p>
		<img src="/blog/assets/imgs/hey-everybody-pay-attention-to-me.jpg" alt=""><br>
		This is me doing my best to call out<br>
		the parts that are generalizable.
	</p>
</div>
<h4>The generalizable part</h4>
<p>According to the <a href="http://www.w3.org/TR/CSS2/box.html#padding-properties">CSS spec</a>, a box&#8217;s <code>padding</code>, when specified as a percentage, is calculated as a percentage of the box&#8217;s width. What that means in practical terms is you can make an element&#8217;s height change based on its width. Wicked!</p>
<p>From the <em>Sturm und Drang</em> above, you know we have HTML on our page of (roughly) the following format:</p>
<pre class="sh_html sh_sourceCode"><div class="iframe-container">
  <iframe>...</iframe>
</div>
</pre>
<p>This is where it gets good.</p>
<p>What we&#8217;re going for here is to have the video be the full width of its container (column, page, whatever that is) while maintaining the correct aspect ratio as we resize it.</p>
<p>The CSS (drum roll please)&#8230;.</p>
<div style="float: right;margin: 0 0 1em 1em;background: white;width: 33%;font-style: italic;">
	You might be wondering where the value 56.25% comes from. Turns out that&#8217;s the equivalent of a 16:9 aspect ratio, which is what HD video uses. If you wanted, say, 4:3 you would use 75%. If you wanted 2:1, you&#8217;d use 50%. See how that works?
</div>
<pre class="sh_css sh_sourceCode">.iframe-container {
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  width: 100%;
}

.iframe-container iframe {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}
</pre>
<p>So, because padding is calculated based on the element&#8217;s width, if—for example—the container is 1600 pixels wide, the bottom padding (which is added to the height of 0) will be 900 pixels (1600 × 0.5625). If the container resizes to 320 pixels wide, the bottom padding will be 180 pixels (320 × 0.5625). Beautiful!</p>
<p>The last bit of fairy dust is to use absolute positioning to pull the content back into view over the top of the padding. That&#8217;s why we gave <code>.iframe-container</code> relative positioning. You know, because an absolute positioned element is positioned relative to it&#8217;s nearest positioned parent. Obviously.</p>
<h4>Until next time&#8230;.</h4>
<p>So, yeah, that&#8217;s basically it. The cool part is the CSS. The rest is specific to my need to pull in content from Tumblr. I hope this was helpful!</p>
