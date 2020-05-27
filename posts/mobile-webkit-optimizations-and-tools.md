{
  "title": "Mobile WebKit Optimizations & Tools",
  "slug": "mobile-webkit-optimizations-and-tools",
  "topics": ["JavaScript", "Web Development", "Mobile", "iPhone"],
  "keywords": "webkit, mobile, iphone, android, webos, weinre, charles proxy, slidekit, slideshare, javascript, css3, html5, tapulous, disney, jquery, zepto, iscroll",
  "created_date": "2011-08-11 20:11:00",
  "short_url": "http://ahedg.es/94",
  "published": true
}

========

Last night I presented at the [Mt View JavaScript Meetup](http://www.meetup.com/javascript-9/events/28854751/) (along with [Glan](http://www.slideshare.net/GlanThomas/building-smart-async-functions-for-mobile)). The following are my slide notes along with links to relevant resources. Get on the bus, ’cuz we’re goin’ to school!

========

At the Meetup, I showed [my slides](http://ahedg.es/p/mobilewebkit/) in [Google Chrome](http://www.google.com/chrome/) using my [SlideKit slideshow framework](https://github.com/segdeha/SlideKit). Because that only runs in [WebKit](http://www.webkit.org/) browsers, I’ve since posted them to [SlideShare](http://www.slideshare.net/segdeha/mobile-webkit-optimizations-tools) and embedded them below for your viewing pleasure.

<div style="width:940px;margin:20px 0;" id="__ss_8831337"><iframe src="http://www.slideshare.net/slideshow/embed_code/8831337" width="940" height="752" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>

1. My team at [Tapulous](http://tapulous.com) builds web views that behave as close as possible to native iOS (and Android) screens.
2. Tapulous (part of Disney Mobile) has released a string of #1 games in the 8 months I’ve worked there, including…
3. [Tap Tap Revenge 4](http://itunes.apple.com/us/app/tap-tap-revenge-4/id405373266?mt=8)
4. [Born This Way Revenge](http://itunes.apple.com/us/app/lady-gaga-born-this-way-revenge/id436037299?mt=8) for Lady Gaga
5. [Tap Tap Glee](http://itunes.apple.com/us/app/tap-tap-glee/id449960771?mt=8) for [the FOX TV show](http://www.fox.com/glee/)
6. [ClubWorld](http://itunes.apple.com/us/app/clubworld/id421251265?mt=8), our first foray into tycoon gaming
7. [Cars 2](http://itunes.apple.com/us/app/cars-2-lite/id441778249?mt=8) in collaboration with [Pixar](http://www.pixar.com/)
8. The optimizations I covered, some of them apply on the open web, some apply to mobile environments in general, and some are specific to mobile WebKit
9. On mobile, latency can be up to 10x greater (which is really worser) than on the desktop web. So, reducing the number of requests you make (and the number of hostnames you access in those requests, a point I neglected to mention in my talk) is über-important.
    * Rather than linking to multiple CSS or JS files, contatentate them. Also, consider inlining rather than linking to these assets.
    * Rather than linking to a bunch of small images, [combine them into 1 image and use `background-position` to show the part you need](http://css-tricks.com/158-css-sprites/).
    * In some cases, it can actually be advantageous to [base64](http://www.motobit.com/util/base64-decoder-encoder.asp) and inline images (and other binary assets such as fonts) into your CSS or `img` tags using [data URLs](http://en.wikipedia.org/wiki/Data_URI_scheme).
10. It should be self-evident that it’s slower to send more bytes. Additionally, many users on mobile still have to deal with bandwidth caps (as do users in [some parts of the world](http://www.stuff.co.nz/business/5400444/Low-internet-data-caps-investigated) even on “broadband”, but that’s another story). So, yeah…send fewer bytes.
    * The size of text components can be reduced [on average by 70%](http://www.phpied.com/reducing-tpayload/) by [gzipping](http://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/) them. Most modern web servers can handle this no problem. You may already be doing it.
    * Minifying CSS and JS is the process of stripping out unnecessary whitespace and comments from these files. Obfuscation is the process of reducing the length of tokens in JavaScript where possible. We use [UglifyJS](https://github.com/mishoo/UglifyJS) on our JS and [YUI Compressor](http://developer.yahoo.com/yui/compressor/) on our CSS. This is usually a big win.
    * Using [the right compression method for different types of images](http://www.noupe.com/design/everything-you-need-to-know-about-image-compression.html) can save loads of bytes (as can persuading your designers to use a higher compression setting than they would otherwise!).
    * There’s no sense in sending cookies along with static assets. Most [CDNs](http://en.wikipedia.org/wiki/Content_delivery_network) are set up not to send cookies.
    * One of [the things I learned](http://ahedg.es/p/txjs/2011/) from [Paul Irish](http://paulirish.com/) at [Texas JavaScript](http://2011.texasjavascript.com) was that you can leave out a surprisingly high number of HTML tags from your documents and the browser will just fill them in for you. It may not save a huge amount of data, but, hey, if [it’s good enough for Google](http://www.google.com/asdf), it’s good enough for me.
11. Probably the biggest win in the mobile optimization game is not to hit the network if you don’t have to. Luckily, we have several caching techniques we can use.
    * The “right” way to do caching on mobile WebKit is to use HTML5 cache manifests. Unfortunately, they’re a bit tricky to work with. This [Dive into HTML5 article](http://diveintohtml5.org/offline.html) does a good job of providing examples of working code as well as explaining the pitfalls.
    * Another tool at your disposal is localStorage. [The API couldn’t be simpler.](http://ahedg.es/html5/localstorage.html) There’s a 5MB limit (without the user being alerted) and you can only store strings, but it’s a great way to cache, e.g., Ajax responses or JavaScript templates.
    * In Tap Tap Revenge 4, we implemented a scheme that allowed us to cache pages and page fragments inside the app bundle. This requires coordination with the native host app, but again can be a way to avoid hitting the network if implemented correctly.
    * A technique we’re investigating for future apps is to use [custom URL scheme commands](http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html) to request binary assets from within the app bundle. Something like `&lt;img src="myapp://binaryasset/someimage.jpg"&gt;`
12. One of the nicest things about working in mobile WebKit all day is all of the things CSS3 allows us to do that were way harder just a couple of years ago.
    * Most web developers are familiar with [jQuery’s animate method](http://api.jquery.com/animate/). Before jQuery, I used to lean heavily on Bernie Sumption’s [Animator](http://berniesumption.com/software/animator/) lib. In 2006, it was ahead of its time. But, JavaScript is single-threaded and gated by the CPU. Now, we get to write some CSS and let the browser hardware accelerate the [transforms, transitions, and animations](http://css3.bradshawenterprises.com/all/).
    * WebKit (and other modern browsers) also allow us to use a few lines of CSS to generate complex images such as gradients. These can save 100s of KBs. Some [excellent](http://www.colorzilla.com/gradient-editor/) [gradient](http://gradients.glrzad.com/) [generators](http://www.display-inline.fr/projects/css-gradient/) are popping up. You might be amazed at [what is possible](http://leaverou.me/css3patterns/).
    * A cool and underutilized technique you can use is [CSS-only 9-slice borders](http://css-tricks.com/6883-understanding-border-image/). Your designers will thank you.
13. It was a JavaScript Meetup, so I had to say a few words about [the world’s most popular programming language](http://javascript.crockford.com/popular.html).
    * Touchscreen devices give us a new set of events for detecting user interactions. [Touch events](http://developer.apple.com/library/iOS/#documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html) have some differences from more traditional mouse events, but the effort to learn how they work will pay off in a more native feeling experience.
    * Profligate use of [JavaScript closures](http://andrew.hedges.name/blog/2011/04/26/yet-another-explanation-of-javascript-closures) can use a big chunk of a device’s meager RAM. Closures are an important technique, but if you make extensive use of them you may want to keep an eye on your memory consumption.
    * Some JavaScript libraries (including our own internal stuff until recently!) execute code whether it’s needed or not. If at all possible, load your nicely concatenated JavaScript blob, but only run the code that’s strictly needed. E.g., you may include constructors for a bunch of objects, but only instantiate the ones you need for that page.
14. 1000s of person hours have been put into open source JavaScript libraries. The developers have encountered and, in many cases, fixed or worked around countless bugs. Why wouldn’t you leverage their work?
    * [Zepto](http://zeptojs.com/) is a lightweight, WebKit-specific clone of jQuery. It weighs in at about 5KB and offers some of the familiar APIs as well as chaining.
    * [jQTouch](http://jqtouch.com/) is a jQuery plug-in that gives you the ability to create simple mobile apps quickly and easily. In a couple of our apps, we use a version of jQTouch we modified to work with Zepto.
    * [iScroll](http://cubiq.org/iscroll-4) works around the lack of support for `position:fixed` in iOS versions of WebKit. It gives you the ability to designate scrolling regions in your pages that behave pretty darn close to native scrolling.
    * We are currently evaluating [underscore.js](http://documentcloud.github.com/underscore/) and [backbone.js](http://documentcloud.github.com/backbone/) for organizing our client-side code. Underscore is really a utility library, but a good one. Backbone provides an MVC structure to JS apps.
15. You can get pretty far by building your pages in desktop Safari (or Chrome), but there is nothing like working on the device for being confident your code will behave as you expect. We find these tools indispensible for working in the relatively opaque environment of mobile Safari.
    * [Charles Proxy](http://www.charlesproxy.com/) allows you to route traffic from your device through your desktop machine, allowing you to inspect requests and responses.
    * [Weinre](http://phonegap.github.com/weinre/) is a remote debugging tool that lets you attach a debugging session to WebKit on your iOS, Android, or webOS device.
16. Follow me on [Twitter](http://twitter.com/segdeha) or [email me](mailto:andrew@hedges.name) with any questions!
