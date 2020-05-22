{
  "title": "Handling Hash",
  "slug": "handling-hash",
  "topics": [
    "JavaScript"
  ],
  "keywords": "javascript, hash, firefox, safari, internet explorer, ie6, ie7, window.location, window.location.hash, location.hash, location.hash.slice, query string, querystring",
  "created_date": "2008-02-12 14:12:00",
  "short_url": "http://ahedg.es/15",
  "published": true
}

========

No, I’m not talking about drug smuggling. I’m talking about the inconsistencies in how [The](http://mozilla.org/firefox/) [Big](http://www.microsoft.com/windows/products/winfamily/ie/) [3](http://www.apple.com/safari/) web browsers deal with `window.location.hash`.

========

I know, I know, you can’t believe what you’re reading. But it’s true! [Firefox](http://mozilla.org/firefox/), [Internet Explorer](http://www.microsoft.com/windows/products/winfamily/ie/) and [Safari](http://www.apple.com/safari/) all behave differently in how they treat the [JavaScript](http://en.wikipedia.org/wiki/JavaScript) value `window.location.hash`. A stunning revelation, this.

As the web gets more [AJAXy](http://en.wikipedia.org/wiki/AJAX), the need for preserving state in URLs has grown. A way to meet this requirement that has been [noticed](http://feedblog.org/2007/01/22/hash-mark-killed-the-question-mark-star-or-ajax-permalinks/) to be in use on both Google and Yahoo properties is to add parameters to the URL, not with the traditional query string delimiter (?), but with the hash (#) sign instead.

This has the advantage of being something you can manipulate via JavaScript without forcing a page reload. Add a history entry at the same time and, violá, you just [un-broke the back button](http://www.contentwithstyle.co.uk/Articles/38/fixing-the-back-button-and-enabling-bookmarking-for-ajax-apps)!

At [work](http://vianet.travel/), we had a similar requirement for a client [site](http://www.travelbug.co.nz/) where, after registering, the user would round trip back to a Google Map with a particular info balloon open.

[See it in action.](http://www.travelbug.co.nz/accommodation/Northland/Kerikeri?view=map#23570)

In implementing this functionality, I noticed that Firefox, IE and Safari handle the various cases (<span class="tooltip" title="e.g., http://example.com/index.html">no hash</span>, <span class="tooltip" title="e.g., http://example.com/index.html#">hash only</span>, and <span class="tooltip" title="e.g., http://example.com/index.html#content">hash + content</span>) differently.

Essentially, the value of `window.location.hash` in all cases was either an empty string or a hash (optionally followed by content). The differences came in when you got which values. Here’s the breakdown:

<table>
	<thead>
		<tr>
			<th>Browser</th>
			<th>No Hash (<a href="#" onclick="document.getElementById('hashtest').src='/blog/assets/files/nohash.html';return false;">test</a>)</th>
			<th>Hash Only (<a href="#" onclick="document.getElementById('hashtest').src='/blog/assets/files/hashonly.html#';return false;">test</a>)</th>
			<th>Hash + Content (<a href="#" onclick="document.getElementById('hashtest').src='/blog/assets/files/hashcontent.html#content';return false;">test</a>)</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Firefox 2 & 3</th>
			<td>empty string</td>
			<td>empty string</td>
			<td>#content</td>
		</tr>
		<tr>
			<th>Internet Explorer 6 & 7</th>
			<td>empty string</td>
			<td>#</td>
			<td>#content</td>
		</tr>
		<tr>
			<th>Safari 3</th>
			<td>empty string</td>
			<td>empty string</td>
			<td>#content</td>
		</tr>
		<tr>
			<th>Safari 2</th>
			<td>empty string</td>
			<td>#</td>
			<td>#content</td>
		</tr>
	</tbody>
</table>
<iframe title="test frame" id="hashtest" style="display: none;width: 0;height: 0;" src="about:blank"></iframe>

All browsers return an empty string when no hash mark is present. Great. All browsers return the hash mark plus whatever comes after it if both of those pieces are present. Super.

They differ in how they handle just the hash mark by itself. Firefox returns an empty string in this case. Internet Explorer returns the hash mark. Oh well.

What I find interesting is that Safari 2 behaves like IE, but Safari 3 behaves like Firefox. I wonder why the change?

In any case, in my code, the following is how I test for a valid hash value:

<pre class="sh_javascript">
if ('' !== window.location.hash && '#' !== window.location.hash) {
    alert(window.location.hash.slice(1));
}
</pre>
