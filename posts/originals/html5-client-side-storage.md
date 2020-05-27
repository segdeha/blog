{
  "title": "HTML5 Client-side Storage. That&#8217;s hot.",
  "slug": "html5-client-side-storage",
  "topics": ["JavaScript", "Web Development"],
  "keywords": "html5, web sql, localstorage, sessionstorage, indexdb, chrome, safari, ios, android, opera, webkit, firefox, ie8",
  "created_date": "2011-03-20 20:03:11",
  "short_url": "http://ahedg.es/89",
  "published": false
}

========

I presented at the <a href="http://www.meetup.com/East-Bay-HTML5/events/16650929/">East Bay HTML5 Meetup</a> last week. Good times! The following are my slides and demos.

========

<p class="dedent">30 minutes. 12 slides. 2 demos. A bit of Q&A. Happy attendees. <a href="http://www.youtube.com/watch?v=OdWMHyXp8qI">That&#8217;s hot!</a></p>
<p>Some of my slides are self-explanatory, some aren&#8217;t. Here is the slideshow with notes about each slide below.</p>
<div style="width:425px" id="__ss_7313748">
    <object id="__sse7313748" width="425" height="355">
        <param name="movie" value="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=client-side-storage-110319022409-phpapp02&stripped_title=html5-clientside-storage&userName=segdeha">
        <param name="allowFullScreen" value="true">
        <param name="allowScriptAccess" value="always">
        <embed name="__sse7313748" src="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=client-side-storage-110319022409-phpapp02&stripped_title=html5-clientside-storage&userName=segdeha" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="355"></embed>
    </object>
</div>
<ol>
    <li>Intro, yadda yadda</li>
    <li>The web was designed in such a way that servers and clients don&#8217;t know about changes to the other except by the client making explicit requests (or by the server pushing updates via <a href="http://dev.w3.org/html5/websockets/">WebSocket</a> or <a href="http://dev.w3.org/html5/eventsource/">EventSource</a>).</li>
    <li>This lack of state prompted browser makers (pretty early on) to come up with cookies as a solution. It&#8217;s a technology that has served the web pretty well, but has some limitations, including being limited to 4KB and the fact that all of the state data is sent back and forth between the client and server on every request.</li>
    <li>There is a better way.</li>
    <li>It&#8217;s a bird! It&#8217;s a plane! It&#8217;s&#8230;HTML5!</li>
    <li>I covered 3 technologies: <a href="http://www.w3.org/TR/webdatabase/">Web SQL</a>, <a href="http://dev.w3.org/html5/webstorage/#the-localstorage-attribute">localStorage</a>, and <a href="http://dev.w3.org/html5/webstorage/#the-sessionstorage-attribute">sessionStorage</a>. Each has different characteristics, which I likened to different kinds of vehicles. Web SQL is a giant dump truck because it&#8217;s kind of lumbering, but works well when you&#8217;re dealing with heaps of data.</li>
    <li>localStorage is a Honda Civic because it&#8217;s way easier than Web SQL to use. It&#8217;s more nimble and easier for the average programmer to work with, but less flexible in what it can store.</li>
    <li>sessionStorage is a Smart Car because it&#8217;s also nimble and easy to use, but has less range (to stretch the analogy). Specifically, the data stored in it goes away when the browser window is closed.</li>
    <li>Next, I talked about browser support. Web SQL is supported on WebKit and Opera browsers; localStorage and sessionStorage are supported on more browsers, including Firefox 3.5 and IE8. IndexDB is currently only supported in Firefox 4, but it is, apparently, the future. (See the <a href="#qanda">Q&A</a> below for more detail about this.)</li>
    <li>By understanding the characteristics of each technology, you can make an informed decision about how to use them in your projects. Persistent in this context means that the data survives between browser sessions, whereas sessionStorage is erased when the browser window is closed.</li>
    <li>Demo time!</li>
    <li>In this job market, the &#8220;we&#8217;re hiring&#8221; slide just has to be done. <a href="mailto:andrew@hedges.name">Email me</a> if you have what it takes to work <a href="http://tapulous.com/jobs/">here</a>!</li>
</ol>
<h2>Working Code Trumps All</h2>
<p><a href="http://en.wikipedia.org/wiki/Phil_Dodds">Phil Dodds</a> used to say &#8220;Working code trumps all theories.&#8221; It is in that spirit that I offered the following 2 demos, one of <a href="http://ahedg.es/html5/localstorage.html">localStorage</a>, the other of <a href="http://ahedg.es/html5/sql.html">Web SQL</a>. Have a play and feel free to ask questions about them in the comments.</p>
<h2 id="qanda">Q&A</h2>
<p>Folks asked some great questions during the presentation, only some of which I was able to answer. I&#8217;ve done a bit of research on the ones I can remember. Again, please jog my memory in the comments if I&#8217;ve forgotten any.</p>
<dl>
    <dt>Isn&#8217;t the Web SQL API deprecated?</dt>
    <dd>Turns out this API is, in fact, deprecated. According to <a href="http://www.w3.org/TR/webdatabase/">this working group note</a> (last updated November 18, 2010), the specification is at an impasse because, while WebKit and Opera agreed to use <a href="http://sqlite.org/">SQLite</a>, Mozilla and Microsoft balked. The <a href="http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html">IndexDB specification</a> appears to be blessed by the W3C, but it is in flux and only just showing up in browsers (most notably Firefox 4). Web SQL is likely to live on for some time, at least in WebKit, because of its utility as a way of enabling offline apps on mobile devices.</dd>
    <dt>How secure is parameterized SQL?</dt>
    <dd><a href="http://www.meetup.com/East-Bay-HTML5/members/8714419/">David Schachter</a>, who attended the Meetup, clarified after my presentation that the way in which parameterized SQL is safer is that it is not vulnerable to <a href="http://en.wikipedia.org/wiki/SQL_injection">SQL injection</a> attacks. That doesn&#8217;t mean you&#8217;re out of the woods! You should not trust values saved in this way when pulling them from your database (by, for example, injecting unsanitized strings into the innerHTML property of a DOM object).</dd>
    <dt>How much faster is localStorage than Web SQL?</dt>
    <dd>OK, so no one actually asked this. I did mention a couple of times that both localStorage and sessionStorage are significantly faster than client-side databases. If I&#8217;d had more time, I would have shown this <a href="http://ahedg.es/e/storage-speed/">speed comparison</a> that shows just how much faster (spoiler alert: it&#8217;s around 3 orders of magnitude).</dd>
</dl>
