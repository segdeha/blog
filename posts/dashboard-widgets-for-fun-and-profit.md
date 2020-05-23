{
  "title": "Dashboard Widgets for Fun and Profit",
  "slug": "dashboard-widgets-for-fun-and-profit",
  "topics": [
    "Apple",
    "Business",
    "Coda",
    "Dashboard",
    "Widgets"
  ],
  "keywords": "apple, mac, os x, dashboard, widgets, fun, profit, auckland, web design, meetup, api, ide",
  "created_date": "2009-03-19 23:59:59",
  "short_url": "http://ahedg.es/68",
  "published": false
}

========

I gave a presentation tonight to the [Auckland Web Design Meetup](http://www.meetup.com/aucklandweb/) on [Dashboard widgets](http://www.apple.com/downloads/dashboard/). Here are my slides and a little commentary for those who were unable to attend.

========

The slides are a bit sparse. This was intentional as I wanted folks to focus on what I was saying and not be reading massive bulleted lists of text. I'll try to fill in the gaps in my commentary after the slides themselves. Feel free to ask for clarification or more detail in the comments.

<iframe width="400" height="500" src="http://280slides.com/Viewer/?user=17132&name=Dashboard%20widgets%20for%20fun%20%26%20profit" style="border: 1px solid black; margin: 0; padding: 0;margin-left: -160px;"></iframe>

There were 2 main points I wanted to get across in the presentation:

1. Widgets are simple to build.
2. Building widgets can be good for a web designer/developer's career, even if they don't make you rich directly.

The following is a slide-by-slide annotation:

<ol>
  <li>Title slide</li>
  <li>Outline for the talk</li>
  <li>My credentials as a widget builder—I mentioned that the number of downloads I list here is a conservative estimate because Apple.com doesn't expose download statistics. Otherwise, I touted publicity my widgets have received, that some have been distributed on CD-ROMs with print magazines and that I've been interviewed on a couple of [podcasts](/widgets/#articles) on the topic of widgets. My kids think I'm famous because my name has been in magazines. :-)</li>
  <li>Transition slide to "What is a widget?" section</li>
  <li>Graphic showing several of the default widgets that ship with Mac OS X--I made the point that widgets are simple, single-purpose mini-applications.</li>
  <li>Dashboard is the name for the platform upon which widgets are built.</li>
  <li>Dashboard's foundation is [WebKit](http://webkit.org/), the HTML rendering engine used in Safari, Chrome, the iPhone and Android.</li>
  <li>Widgets, at their core, are just little web pages built with the familiar technologies of HTML, CSS, and JavaScript.</li>
  <li>Graphic showing the [Coda](http://www.panic.com/coda/) workspace for my [Hurl widget](/widgets/#hurler)--The point of this slide was to show the web developers in the room how simple widgets are to build.</li>
  <li>Graphic showing the Hurl widget in [Dashcode](http://developer.apple.com/tools/dashcode/), Apple's <span class="tooltip" title="Integrated Development Environment">IDE</span> for building widgets. It has advantages and disadvantages when compared to hand-coding, which is my personal preference.</li>
  <li>List of technologies available within widgets--There are lots of powerful things one can do with widgets, including anything you can do from the command line in OS X.</li>
  <li>I tried here to make a funny about the need to create tight, compact user interfaces for widgets, but the joke bombed. Anyway, my point was that thoughtful design wins over quick-and-dirty.</li>
  <li>Summary of "What is a widget?" section</li>
  <li>Take away: for a room full of web designers and developers, building widgets should feel within reach.</li>
  <li>Transition slide to "So what?" section</li>
  <li>In my experience, businesses try to do 1 of these 3 things when they build widgets. The most worthwhile is building add-ons to existing applications.</li>
  <li>My client, [Whole Foods](http://www.wholefoodsmarket.com/), tried push marketing, but obviously abandoned the effort after a bit.</li>
  <li>Businesses are better off focusing their effort on publishing a solid, free <span class="tooltip" title="Application Programming Interface">API</span> and letting widgets (and gadgets, and Facebook apps, and...) come to them.</li>
  <li>Graphic showing several successful widgets that build on public APIs and RSS feeds</li>
  <li>Here, I offer 5 motivators for widget builders. I haven't made much money off my widgets, directly. My widget work has led to some great contacts and [consulting work](http://www.engadget.com/2009/02/19/sonar-hopes-to-power-social-featurephones-we-get-a-demo-2). Many times, developers build widgets just to scratch their own itch, for some notoriety, to get better working with web technologies, and just for fun.</li>
  <li>Graphic showing the [bobblehead widget](http://tr.im/heheboy) I built for my 1000th follower on [Twitter](http://twitter.com/segdeha)</li>
  <li>Snarky [link to resources](http://lmgtfy.com/?q=developing+dashboard+widgets) for further learning</li>
  <li>Closing slide</li>
</ol>

There were some great questions following the expository portion of my presentation. Folks asked about security within widgets (they can be made secure by using SSL and HTTP Basic Auth), tracking widget use (you could code that in, but if you do, be clear with users that your widget "phones home"), and using Google Analytics in widgets to track usage (I answered that it should work, but I'm not sure now that this will work because the "page" is only loaded once, when the widget is first loaded).

There were other questions, but I'm drawing a bit of a blank at the moment. If you were there, feel free to remind me in the comments.

Overall, indications are that people enjoyed my talk. Simon Young said on [Twitter](http://twitter.com/audaciousgloop/status/1353607056), "I want to be a widget developer now". That's about the highest compliment I can think of!
