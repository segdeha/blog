{
  "title": "Mobile WebKit Optimizations & Tools",
  "slug": "mobile-webkit-optimizations-and-tools",
  "topics": ["JavaScript", "Web Development", "Mobile", "iPhone"],
  "keywords": "webkit, mobile, iphone, android, webos, weinre, charles proxy, slidekit, slideshare, javascript, css3, html5, tapulous, disney, jquery, zepto, iscroll",
  "created_date": "2011-08-11 20:11:00",
  "short_url": "http://ahedg.es/94",
  "published": false
}

========

Last night I presented at the <a href="http://www.meetup.com/javascript-9/events/28854751/">Mt View JavaScript Meetup</a> (along with <a href="http://www.slideshare.net/GlanThomas/building-smart-async-functions-for-mobile">Glan</a>). The following are my slide notes along with links to relevant resources. Get on the bus, &#8217;cuz we&#8217;re goin&#8217; to school!

========

<p>At the Meetup, I showed <a href="http://ahedg.es/p/mobilewebkit/">my slides</a> in <a href="http://www.google.com/chrome/">Google Chrome</a> using the <a href="https://github.com/segdeha/SlideKit">SlideKit slideshow framework</a>. Because that only runs in <a href="http://www.webkit.org/">WebKit</a> browsers, I&#8217;ve since posted them to <a href="http://www.slideshare.net/segdeha/mobile-webkit-optimizations-tools">SlideShare</a> and embedded them below for your viewing pleasure.</p>
<div style="width:940px;margin:20px 0;" id="__ss_8831337"><iframe src="http://www.slideshare.net/slideshow/embed_code/8831337" width="940" height="752" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>
<ol>
    <li>My team at <a href="http://tapulous.com">Tapulous</a> builds web views that behave as close as possible to native iOS (and Android) screens.</li>
    <li>Tapulous (part of Disney Mobile) has released a string of #1 games in the 8 months I&#8217;ve worked there, including&#8230;</li>
    <li><a href="http://itunes.apple.com/us/app/tap-tap-revenge-4/id405373266?mt=8">Tap Tap Revenge 4</a></li>
    <li><a href="http://itunes.apple.com/us/app/lady-gaga-born-this-way-revenge/id436037299?mt=8">Born This Way Revenge</a> for Lady Gaga</li>
    <li><a href="http://itunes.apple.com/us/app/tap-tap-glee/id449960771?mt=8">Tap Tap Glee</a> for <a href="http://www.fox.com/glee/">the FOX TV show</a></li>
    <li><a href="http://itunes.apple.com/us/app/clubworld/id421251265?mt=8">ClubWorld</a>, our first foray into tycoon gaming</li>
    <li><a href="http://itunes.apple.com/us/app/cars-2-lite/id441778249?mt=8">Cars 2</a> in collaboration with <a href="http://www.pixar.com/">Pixar</a></li>
    <li>The optimizations I covered, some of them apply on the open web, some apply to mobile environments in general, and some are specific to mobile WebKit</li>
    <li>
        On mobile, latency can be up to 10x greater (which is really worser) than on the desktop web. So, reducing the number of requests you make (and the number of hostnames you access in those requests, a point I neglected to mention in my talk) is über-important.
        <ul>
            <li>Rather than linking to multiple CSS or JS files, contatentate them. Also, consider inlining rather than linking to these assets.</li>
            <li>Rather than linking to a bunch of small images, <a href="http://css-tricks.com/158-css-sprites/">combine them into 1 image and use <code>background-position</code> to show the part you need</a>.</li>
            <li>In some cases, it can actually be advantageous to <a href="http://www.motobit.com/util/base64-decoder-encoder.asp">base64</a> and inline images (and other binary assets such as fonts) into your CSS or <code>img</code> tags using <a href="http://en.wikipedia.org/wiki/Data_URI_scheme">data URLs</a>.</li>
        </ul>
    </li>
    <li>
        It should be self-evident that it&#8217;s slower to send more bytes. Additionally, many users on mobile still have to deal with bandwidth caps (as do users in <a href="http://www.stuff.co.nz/business/5400444/Low-internet-data-caps-investigated">some parts of the world</a> even on &#8220;broadband&#8221;, but that&#8217;s another story). So, yeah&#8230;send fewer bytes.
        <ul>
            <li>The size of text components can be reduced <a href="http://www.phpied.com/reducing-tpayload/">on average by 70%</a> by <a href="http://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/">gzipping</a> them. Most modern web servers can handle this no problem. You may already be doing it.</li>
            <li>Minifying CSS and JS is the process of stripping out unnecessary whitespace and comments from these files. Obfuscation is the process of reducing the length of tokens in JavaScript where possible. We use <a href="https://github.com/mishoo/UglifyJS">UglifyJS</a> on our JS and <a href="http://developer.yahoo.com/yui/compressor/">YUI Compressor</a> on our CSS. This is usually a big win.</li>
            <li>Using <a href="http://www.noupe.com/design/everything-you-need-to-know-about-image-compression.html">the right compression method for different types of images</a> can save loads of bytes (as can persuading your designers to use a higher compression setting than they would otherwise!).</li>
            <li>There&#8217;s no sense in sending cookies along with static assets. Most <a href="http://en.wikipedia.org/wiki/Content_delivery_network">CDNs</a> are set up not to send cookies.</li>
            <li>One of <a href="http://ahedg.es/p/txjs/2011/">the things I learned</a> from <a href="http://paulirish.com/">Paul Irish</a> at <a href="http://2011.texasjavascript.com">Texas JavaScript</a> was that you can leave out a surprisingly high number of HTML tags from your documents and the browser will just fill them in for you. It may not save a huge amount of data, but, hey, if <a href="http://www.google.com/asdf" title="Click that sucker and hit 'View Source'">it&#8217;s good enough for Google</a>, it&#8217;s good enough for me.</li>
        </ul>
    </li>
    <li>
        Probably the biggest win in the mobile optimization game is not to hit the network if you don&#8217;t have to. Luckily, we have several caching techniques we can use.
        <ul>
            <li>The &#8220;right&#8221; way to do caching on mobile WebKit is to use HTML5 cache manifests. Unfortunately, they&#8217;re a bit tricky to work with. This <a href="http://diveintohtml5.org/offline.html">Dive into HTML5 article</a> does a good job of providing examples of working code as well as explaining the pitfalls.</li>
            <li>Another tool at your disposal is localStorage. <a href="http://ahedg.es/html5/localstorage.html">The API couldn&#8217;t be simpler.</a> There&#8217;s a 5MB limit (without the user being alerted) and you can only store strings, but it&#8217;s a great way to cache, e.g., Ajax responses or JavaScript templates.</li>
            <li>In Tap Tap Revenge 4, we implemented a scheme that allowed us to cache pages and page fragments inside the app bundle. This requires coordination with the native host app, but again can be a way to avoid hitting the network if implemented correctly.</li>
            <li>A technique we&#8217;re investigating for future apps is to use <a href="http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html">custom URL scheme commands</a> to request binary assets from within the app bundle. Something like <code><img src="myapp://binaryasset/someimage.jpg"></code></li>
        </ul>
    </li>
    <li>
        One of the nicest things about working in mobile WebKit all day is all of the things CSS3 allows us to do that were way harder just a couple of years ago.
        <ul>
            <li>Most web developers are familiar with <a href="http://api.jquery.com/animate/">jQuery&#8217;s animate method</a>. Before jQuery, I used to lean heavily on Bernie Sumption&#8217;s <a href="http://berniesumption.com/software/animator/">Animator</a> lib. In 2006, it was ahead of its time. But, JavaScript is single-threaded and gated by the CPU. Now, we get to write some CSS and let the browser hardware accelerate the <a href="http://css3.bradshawenterprises.com/all/">transforms, transitions, and animations</a>.</li>
            <li>WebKit (and other modern browsers) also allow us to use a few lines of CSS to generate complex images such as gradients. These can save 100s of KBs. Some <a href="http://www.colorzilla.com/gradient-editor/">excellent</a> <a href="http://gradients.glrzad.com/">gradient</a> <a href="http://www.display-inline.fr/projects/css-gradient/">generators</a> are popping up. You might be amazed at <a href="http://leaverou.me/css3patterns/">what is possible</a>.</li>
            <li>A cool and underutilized technique you can use is <a href="http://css-tricks.com/6883-understanding-border-image/">CSS-only 9-slice borders</a>. Your designers will thank you.</li>
        </ul>
    </li>
    <li>
        It was a JavaScript Meetup, so I had to say a few words about <a href="http://javascript.crockford.com/popular.html">the world&#8217;s most popular programming language</a>.
        <ul>
            <li>Touchscreen devices give us a new set of events for detecting user interactions. <a href="http://developer.apple.com/library/iOS/#documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html">Touch events</a> have some differences from more traditional mouse events, but the effort to learn how they work will pay off in a more native feeling experience.</li>
            <li>Profligate use of <a href="http://andrew.hedges.name/blog/2011/04/26/yet-another-explanation-of-javascript-closures">JavaScript closures</a> can use a big chunk of a device&#8217;s meager RAM. Closures are an important technique, but if you make extensive use of them you may want to keep an eye on your memory consumption.</li>
            <li>Some JavaScript libraries (including our own internal stuff until recently!) execute code whether it&#8217;s needed or not. If at all possible, load your nicely concatenated JavaScript blob, but only run the code that&#8217;s strictly needed. E.g., you may include constructors for a bunch of objects, but only instantiate the ones you need for that page.</li>
        </ul>
    </li>
    <li>
        1000s of person hours have been put into open source JavaScript libraries. The developers have encountered and, in many cases, fixed or worked around countless bugs. Why wouldn&#8217;t you leverage their work?
        <ul>
            <li><a href="http://zeptojs.com/">Zepto</a> is a lightweight, WebKit-specific clone of jQuery. It weighs in at about 5KB and offers some of the familiar APIs as well as chaining.</li>
            <li><a href="http://jqtouch.com/">jQTouch</a> is a jQuery plug-in that gives you the ability to create simple mobile apps quickly and easily. In a couple of our apps, we use a version of jQTouch we modified to work with Zepto.</li>
            <li><a href="http://cubiq.org/iscroll-4">iScroll</a> works around the lack of support for <code>position:fixed</code> in iOS versions of WebKit. It gives you the ability to designate scrolling regions in your pages that behave pretty darn close to native scrolling.</li>
            <li>We are currently evaluating <a href="http://documentcloud.github.com/underscore/">underscore.js</a> and <a href="http://documentcloud.github.com/backbone/">backbone.js</a> for organizing our client-side code. Underscore is really a utility library, but a good one. Backbone provides an MVC structure to JS apps.</li>
        </ul>
    </li>
    <li>
        You can get pretty far by building your pages in desktop Safari (or Chrome), but there is nothing like working on the device for being confident your code will behave as you expect. We find these tools indispensible for working in the relatively opaque environment of mobile Safari.
        <ul>
            <li><a href="http://www.charlesproxy.com/">Charles Proxy</a> allows you to route traffic from your device through your desktop machine, allowing you to inspect requests and responses.</li>
            <li><a href="http://phonegap.github.com/weinre/">Weinre</a> is a remote debugging tool that lets you attach a debugging session to WebKit on your iOS, Android, or webOS device.</li>
        </ul>
    </li>
    <li>Follow me on <a href="http://twitter.com/segdeha">Twitter</a> or <a href="mailto:andrew@hedges.name">email me</a> with any questions!</li>
</ol>
