{
  "title": "jQuery 1.3: Sweet upgrade, but can we use it?",
  "slug": "jquery-13-sweet-upgrade-but-can-we-use-it",
  "topics": [
    "JavaScript",
    "jQuery",
    "Web Development"
  ],
  "keywords": "jquery, javascript, web, browsers, safari, firefox, internet explorer, ie6, ie7, ie8, opera, resig, mozilla",
  "created_date": "2009-01-14 14:14:14",
  "short_url": "http://ahedg.es/59",
  "published": false
}

========

The jQuery team has outdone themselves in many ways with <a href="http://docs.jquery.com/Release:jQuery_1.3">version 1.3</a> of the world's best JavaScript library. But are they leaving real-world web development behind?

========

<p class="outdent">3 features have me most excited about the latest release of <a href="http://jquery.com/">jQuery</a>: massive speed increases (e.g., <a href="http://docs.jquery.com/Release:jQuery_1.3#HTML_Injection_Rewrite">6x faster element insertion</a>, wow!), <a href="http://docs.jquery.com/Release:jQuery_1.3#Live_Events">live events</a>, and <a href="http://docs.jquery.com/Release:jQuery_1.3#Sizzle_Selector_Engine">Sizzle</a>, the new, standalone CSS selector engine which I expect to be a big win for the entire web development community.</p>
<p>I am concerned, though. I am concerned that some design decisions made by the jQuery team have made it a little harder to sell the use of the library to decision makers, the people who care less about sweet features and more about whether their software works for as many users as possible.</p>
<p>When building software, you have to choose your trade-offs carefully. There are major benefits to leaving behind legacy software. The biggest is that you can keep a leaner, cleaner code base, which makes maintenance and upgrades less costly. The trade-off is that you leave some percentage of users behind. As your code progresses, you necessarily introduce incompatibilities with older software. This isn't evil, it's just how it goes.</p>
<p>My specific concerns around jQuery 1.3 have to do with inconsistencies in the documented browser compatibility. The <a href="http://docs.jquery.com/Browser_Compatibility">official line</a> is that jQuery supports Firefox 1.5+, Internet Explorer 6+, Safari 2.0.2+, and Opera 9+. To quote:</p>
<blockquote>
  Any problem with them should be considered and reported as a bug in jQuery. 
</blockquote>
<p>Wow, that sounds great! Web developers the world over should have no problem selling their bosses and clients on that! How about known issues? While that same page states there are "known problems" with several older browsers, a look a the <a href="http://docs.jquery.com/Known_Issues">known issues</a> page lists only 2.</p>
<p>The jQuery team does a lot of things right. One of them is to cover their code base with <a href="http://docs.jquery.com/Release:jQuery_1.3#Testing">tests</a>.</p>
<p>What I found puzzling in the release announcements for jQuery 1.3 was that the published test results did not match up with the purportedly supported browsers. Where are the test results for Firefox 2? Where are the test results for Safari 2?</p>
<p>I ran the tests myself on those two browsers. (You should, too, <a href="http://jquery.com/test/">here</a>.) On Firefox 2, 1 test did not pass (#137: ajax module: jQuery.post(String, Hash, Function) - simple with xml (1, 2, 3)). Out of 1271 tests, that's pretty much awesome. Still, it would be good to see that non-passing test discussed on the known issues page.</p>
<p>More troubling was the result of running the test suite in Safari 2.0.4. On my test system, the test suite crashed Safari every time. That's the kind of thing that can turn off management types in a hurry. Maybe it's a little thing, easily worked around. Maybe it's not. Without some official discussion of the bug, it's tough to sort out. Sure, Safari 2 browser share is pretty small, but it's not zero and while <a href="http://en.wikipedia.org/wiki/Safari_(web_browser)#Version_compatibility">it's possible for users on older versions of Mac OS X to upgrade</a>, many simply won't.</p>
<p>To <a href="http://ejohn.org/blog/a-web-developers-responsibility/">quote</a> John Resig, inventor of jQuery, "It's safe to say that the biggest tax on a web developer is spending so much time dealing with browser bugs and incompatibilities." This is true in my experience as well. The temptation to leave those old browsers behind is like a tiny devil on my shoulder. It's one of the reasons I'm so excited about <a href="http://cameronmoll.com/archives/2009/01/12_resources_for_html5/">recent developments around HTML5</a>.</p>
<p>Unfortunately, we web developers live in a world where users don't upgrade as quickly as we'd like. On some projects, you can say "screw ’em!" but on most you have to cater to them as best you can. jQuery is now the most high visibility, widest used JavaScript library. This means it reaches more people's browsers than any other. With great power comes great responsibility. I understand the need to cut off legacy software at some point. I think the jQuery team is erring on the aggressive side at the moment and that leaves web developers trying to sell their managers on it in a tough spot.</p>
<p><strong>Update:</strong> After a little more research, it looks like the issue of the test suite crashing Safari 2.0.4 is a <a href="http://dev.jquery.com/ticket/1006">known one</a> that has been around for a long time. It's marked "wontfix" I presume because of the low browser share for that browser.</p>
<p>I don't mean to step on any toes with my post here. I love jQuery and advocate for it constantly. As I say above, there are trade-offs for any software team in where to expend resources. jQuery 1.3 appears to be a major step forward in almost every way. With this release out the door, hopefully the jQuery team will have time to catch the documentation up to the state of the library.</p>
