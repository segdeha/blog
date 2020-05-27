{
  "title": "HTML5 Client-side Storage. That’s hot.",
  "slug": "html5-client-side-storage",
  "topics": ["JavaScript", "Web Development"],
  "keywords": "html5, web sql, localstorage, sessionstorage, indexdb, chrome, safari, ios, android, opera, webkit, firefox, ie8",
  "created_date": "2011-03-20 20:03:11",
  "short_url": "http://ahedg.es/89",
  "published": true
}

========

I presented at the [East Bay HTML5 Meetup](http://www.meetup.com/East-Bay-HTML5/events/16650929/) last week. Good times! The following are my slides and demos.

========

30 minutes. 12 slides. 2 demos. A bit of Q&A. Happy attendees. [That’s hot!](http://www.youtube.com/watch?v=OdWMHyXp8qI)

Some of my slides are self-explanatory, some aren’t. Here is the slideshow with notes about each slide below.

<div style="width:425px" id="__ss_7313748">
    <object id="__sse7313748" width="425" height="355">
        <param name="movie" value="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=client-side-storage-110319022409-phpapp02&stripped_title=html5-clientside-storage&userName=segdeha">
        <param name="allowFullScreen" value="true">
        <param name="allowScriptAccess" value="always">
        <embed name="__sse7313748" src="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=client-side-storage-110319022409-phpapp02&stripped_title=html5-clientside-storage&userName=segdeha" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="355"></embed>
    </object>
</div>

1. Intro, yadda yadda
2. The web was designed in such a way that servers and clients don’t know about changes to the other except by the client making explicit requests (or by the server pushing updates via [WebSocket](http://dev.w3.org/html5/websockets/) or [EventSource](http://dev.w3.org/html5/eventsource/)).
3. This lack of state prompted browser makers (pretty early on) to come up with cookies as a solution. It’s a technology that has served the web pretty well, but has some limitations, including being limited to 4KB and the fact that all of the state data is sent back and forth between the client and server on every request.
4. There is a better way.
5. It’s a bird! It’s a plane! It’s…HTML5!
6. I covered 3 technologies: [Web SQL](http://www.w3.org/TR/webdatabase/), [localStorage](http://dev.w3.org/html5/webstorage/#the-localstorage-attribute), and [sessionStorage](http://dev.w3.org/html5/webstorage/#the-sessionstorage-attribute). Each has different characteristics, which I likened to different kinds of vehicles. Web SQL is a giant dump truck because it’s kind of lumbering, but works well when you’re dealing with heaps of data.
7. localStorage is a Honda Civic because it’s way easier than Web SQL to use. It’s more nimble and easier for the average programmer to work with, but less flexible in what it can store.
8. sessionStorage is a Smart Car because it’s also nimble and easy to use, but has less range (to stretch the analogy). Specifically, the data stored in it goes away when the browser window is closed.
9. Next, I talked about browser support. Web SQL is supported on WebKit and Opera browsers; localStorage and sessionStorage are supported on more browsers, including Firefox 3.5 and IE8. IndexDB is currently only supported in Firefox 4, but it is, apparently, the future. (See the [Q&A](#qanda) below for more detail about this.)
10. By understanding the characteristics of each technology, you can make an informed decision about how to use them in your projects. Persistent in this context means that the data survives between browser sessions, whereas sessionStorage is erased when the browser window is closed.
11. Demo time!
12. In this job market, the “we’re hiring” slide just has to be done. [Email me](mailto:andrew@hedges.name) if you have what it takes to work [here](http://tapulous.com/jobs/)!

### Working Code Trumps All

[Phil Dodds](http://en.wikipedia.org/wiki/Phil_Dodds) used to say “Working code trumps all theories.” It is in that spirit that I offered the following 2 demos, one of [localStorage](http://ahedg.es/html5/localstorage.html), the other of [Web SQL](http://ahedg.es/html5/sql.html). Have a play and feel free to ask questions about them in the comments.

### Q&A

Folks asked some great questions during the presentation, only some of which I was able to answer. I’ve done a bit of research on the ones I can remember. Again, please jog my memory in the comments if I’ve forgotten any.

<dl>
    <dt>Isn’t the Web SQL API deprecated?</dt>
    <dd>Turns out this API is, in fact, deprecated. According to [this working group note](http://www.w3.org/TR/webdatabase/) (last updated November 18, 2010), the specification is at an impasse because, while WebKit and Opera agreed to use [SQLite](http://sqlite.org/), Mozilla and Microsoft balked. The [IndexDB specification](http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html) appears to be blessed by the W3C, but it is in flux and only just showing up in browsers (most notably Firefox 4). Web SQL is likely to live on for some time, at least in WebKit, because of its utility as a way of enabling offline apps on mobile devices.</dd>
    <dt>How secure is parameterized SQL?</dt>
    <dd>[David Schachter](http://www.meetup.com/East-Bay-HTML5/members/8714419/), who attended the Meetup, clarified after my presentation that the way in which parameterized SQL is safer is that it is not vulnerable to [SQL injection](http://en.wikipedia.org/wiki/SQL_injection) attacks. That doesn’t mean you’re out of the woods! You should not trust values saved in this way when pulling them from your database (by, for example, injecting unsanitized strings into the innerHTML property of a DOM object).</dd>
    <dt>How much faster is localStorage than Web SQL?</dt>
    <dd>OK, so no one actually asked this. I did mention a couple of times that both localStorage and sessionStorage are significantly faster than client-side databases. If I’d had more time, I would have shown this [speed comparison](http://ahedg.es/e/storage-speed/) that shows just how much faster (spoiler alert: it’s around 3 orders of magnitude).</dd>
</dl>
