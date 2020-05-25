{
  "title": "Animating your iPhone web application",
  "slug": "animating-your-iphone-web-application",
  "topics": [
    "Apple",
    "JavaScript",
    "Web Development"
  ],
  "keywords": "iphone, javascript, mobile, css, css transitions, webkit, safari, chrome, firefox",
  "created_date": "2009-05-29 18:18:18",
  "short_url": "http://ahedg.es/72",
  "published": true
}

========

Recently, [Rebecca Murphey](http://www.rebeccamurphey.com/) asked on [Twitter](http://twitter.com/rmurphey/status/1932522734) why she was seeing choppy animation of [CSS transitions](http://webkit.org/specs/CSSVisualEffects/CSSTransitions.html) in her [iPhone](http://www.apple.com/iphone/) web application. Initially, I had the same experience, but through some experimentation came to find the smoothness I craved.

========

I’m in the midst of some mobile web app development. Our first target platform is, of course, the iPhone. An issue of utmost importance when attempting to emulate a native application in an iPhone web view is rendering smooth animations for things like page transitions.

I spent today experimenting with different techniques and am here to share what I’ve learned. Below, I review 2 JavaScript-based techniques for animations as well as the use of [WebKit](http://webkit.org/) CSS [transitions](http://webkit.org/specs/CSSVisualEffects/CSSTransitions.html) and [transforms](http://webkit.org/specs/CSSVisualEffects/CSSTransforms.html). Which is best? Read on...

_All of the animations use a duration of 250ms. Click the viewports (touch on your iPhone) to see the animations. Right-click on a viewport and select “View source” to see how it’s done. If the animations don’t go, follow the link beside the viewport to see the stand-alone page._

---

<iframe style="width: 320px;height: 480px;float: left;border: solid 1px black;margin: 0 1rem 1rem 0" title="My animation example" name="mine" src="/experiments/iphone/animations/mine.html"></iframe>

The viewport to the left represents my custom attempt to provide a smooth animation experience. It combines a time-based, strictly linear animation algorithm with a small delay between invocations in an effort not to stress the wee iPhone CPU. It’s OK, but the lack of easing looks unfinished.

[Stand-alone page](/experiments/iphone/animations/mine.html)

<div style="clear: both;"></div>

---

<iframe style="width: 320px;height: 480px;float: left;border: solid 1px black;margin: 0 1rem 1rem 0" title="Animation example using the Animator JavaScript library" name="js" src="/experiments/iphone/animations/js.html"></iframe>

This example uses the excellent [Animator](http://www.berniecode.com/writing/animator.html) class to handle the animation. It includes an easing algorithm that makes the animation look a little nicer. Not bad, but it doesn’t quite feel like a native application.

[Stand-alone page](/experiments/iphone/animations/js.html)

<div style="clear: both;"></div>

---

<iframe style="width: 320px;height: 480px;float: left;border: solid 1px black;margin: 0 1rem 1rem 0" title="Example using CSS to animate the `left` property" name="css" src="/experiments/iphone/animations/css.html"></iframe>

This example leverages WebKit’s native CSS transitions. Of the 3, this is the simplest to code and it also offers the best performance. The pages seem to “snap” into place, unlike the other examples.

[Stand-alone page](/experiments/iphone/animations/css.html)

Honestly, I’m not sure what was vexing the examples Rebecca and I were looking at earlier. It could be that [my first experiment with CSS transitions](/experiments/css-transitions/) was trying to do too much (moving 4 divs while changing the opacity on 2 of them). The above examples are extremely simple cases, so they’re bound to perform better.

It stands to reason that native code would perform better than interpreted JavaScript code. Based on my first experiment, I rendered a verdict of [unusable 4 now](http://twitter.com/segdeha/status/1953270139). After digging a little deeper, I stand corrected.

<div style="clear: both;"></div>

### Update: CSS Transforms

---

<iframe style="width: 320px;height: 480px;float: left;border: solid 1px black;margin: 0 1rem 1rem 0" title="Example using CSS to animate a `transform`" name="css-hw" src="/experiments/iphone/animations/css-hw.html"></iframe>

Based on comments below by Sean Gilligan, developer of [iUI](http://code.google.com/p/iui/), I have added a fourth example. This one uses `-webkit-transform: translateX` to achieve hardware acceleration on the iPhone. I’ve also slowed down the animations to 250ms to accentuate the differences between the various techniques.

I’m not sure it’s better, at least on my phone. What do you think?

[Stand-alone page](/experiments/iphone/animations/css-hw.html)

