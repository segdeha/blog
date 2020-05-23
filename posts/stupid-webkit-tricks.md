{
  "title": "Stupid WebKit Tricks",
  "slug": "stupid-webkit-tricks",
  "topics": [
    "Apple",
    "JavaScript",
    "Web Development"
  ],
  "keywords": "webkit, safari, chrome, iphone, palm pre, css, transitions, transforms, opacity, barcamp, android, apple",
  "created_date": "2009-07-19 19:19:09",
  "short_url": "http://ahedg.es/73",
  "published": true
}

========

With apologies to David Letterman’s [Stupid Human Tricks](http://www.youtube.com/watch?v=g-dE_TJfOVg) segment, I presented a session at [Barcamp Auckland (BCA3)](http://bca.geek.nz/) on some [WebKit](http://webkit.org/)-specific features you can leverage in web applications for [iPhone](http://www.apple.com/iphone/), [Android](http://www.android.com/), and the [Palm Pre](http://www.palm.com/us/products/phones/pre/). This is my synopsis, plus a bonus trick I didn’t present at the (un)conference!

========

WebKit is Apple’s open source HTML rendering engine. It is used to power several browsers and even a software platform, including [Safari](http://www.apple.com/safari/), Mobile Safari, [Google Chrome](http://www.google.com/chrome), and the Palm Pre operating system. To see the following examples in action, you’ll need one of them.

Here are my [presentation notes](http://segdeha.com/bca/stupid-webkit-tricks.html).

At BCA3, we were allotted just 30 minutes to present. That, plus the session I attended right before mine went a little over. After getting set up, I had approximately 23 minutes of talk time (you know, [kind of like an iPhone](http://www.latimes.com/business/la-fi-iphone3-2009jul03,0,2546606.story)).

I quickly ran through examples of [CSS gradients](http://segdeha.com/experiments/css-gradients/index.html), [scaling](http://segdeha.com/experiments/css-transitions/dock.html), [moving](http://segdeha.com/experiments/css-transitions/classnames.html), & [fading](http://segdeha.com/experiments/css-transitions/opacity.html) elements, [flipping stuff over](http://segdeha.com/experiments/css-transitions/flipper.html) (best viewed on an iPhone), and finally [CSS masks](http://segdeha.com/experiments/css-transitions/masks.html). It was a whirlwind, but I hope it gave a taste of what WebKit (and, hopefully soon, other browsers) can do. Best of all, most of it is hardware accelerated on the iPhone.

### How it works

The basic pattern for all of the above mentioned animations is the following:

1. In CSS, tell WebKit that, for an element or group of elements, when a specific property changes, it should _transition_ from one state to another over a set duration and using a particular timing function (also called an "easing algorithm").</li>
2. Also in CSS, set the initial state of the element and the state to which the element is to transition.</li>
3. Either in CSS (using the `:hover` pseudo-class) or in JavaScript (by toggling a class name), initiate the transition by setting a new state for the property in question.</li>


Here’s a simple example. First, the CSS:

<pre class="sh_css">
#mydiv {
  -webkit-transition-property: opacity;
  -webkit-transition-duration: 1500ms;
  -webkit-transition-timing-function: ease;
  opacity: 1.0;
}

#mydiv.faded {
  opacity: 0.0;
}
</pre>

The CSS just implements steps 1 & 2 above.

Next, the JavaScript:

<pre class="sh_javascript">
document
  .getElementById('mydiv')
  .addEventListener('click', function () {
  this.className = 'faded' === this.className ? '' : 'faded';
}, false);
</pre>

The above code sets up our DIV to listen for click events. When you click the DIV, it checks whether the class name is `'faded'`. If it is, it sets the class name to nothing. If it’s not, it sets it to `'faded'`. Try it for yourself:

<style type="text/css">
#mydiv {
  -webkit-transition-property: opacity;
  -webkit-transition-duration: 1500ms;
  -webkit-transition-timing-function: ease;
  opacity: 1.0;
}

#mydiv.faded {
  opacity: 0.0;
}
</style>
<div style="border:solid 1px black;margin: 1em 0;padding: 1em;background: navy;color: white;font-weight: bold;width: 200px;text-align: center;" id="mydiv">Click me!</div>
<script type="text/javascript">
document
  .getElementById('mydiv')
  .addEventListener('click', function () {
  this.className = 'faded' === this.className ? '' : 'faded';
}, false);
</script>

Pretty cool, eh? Read everything there is to know about this stuff in [the official documentation from Apple](http://developer.apple.com/safari/library/documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Introduction/Introduction.html).

### Bonus!

As promised, here is a little bonus technique: key-framed animations. This is sweet. First, try the example below:

<style type="text/css">
@-webkit-keyframes pop {
  0%   { -webkit-transform: scale(0.5); }
  70%  { -webkit-transform: scale(2.0); }
  100% { -webkit-transform: scale(1.0); }
}
#popper {
  -webkit-transform: scale(0.5);
}
#popper.popping {
  -webkit-transform: scale(1.0);
  -webkit-animation-name: pop;
  -webkit-animation-duration: 250ms;
  -webkit-animation-timing-function: ease-in-out;
}
</style>
<div style="border:solid 1px black;margin: 1em 0;padding: 1em;background: maroon;color: white;font-weight: bold;width: 200px;text-align: center;" id="popper">Click me!</div>
<script type="text/javascript">
document
  .getElementById('popper')
  .addEventListener('click', function () {
  this.className = 'popping' === this.className ? '' : 'popping';
}, false);
</script>

In a WebKit-based browser, you should see the DIV grow to about twice it's "normal" size, then pop back to actual size. The code for this animation is only a little more complex than the previous example, and it builds on what we already know.

Here's the CSS:

<pre class="sh_css">
@-webkit-keyframes pop {
  0%   { -webkit-transform: scale(0.5); }
  70%  { -webkit-transform: scale(2.0); }
  100% { -webkit-transform: scale(1.0); }
}
#popper {
  -webkit-transform: scale(0.5);
}
#popper.popping {
  -webkit-transform: scale(1.0);
  -webkit-animation-name: pop;
  -webkit-animation-duration: 250ms;
  -webkit-animation-timing-function: ease-in-out;
}
</pre>

In the CSS, the first thing we're doing is creating an animation (`@-webkit-keyframes`) with the name "pop". Our animation has three states: 0%, our starting state; 70%, the state we want our element in when 70% of the duration has elapsed; and, 100%, our ending state.

Next, we set the initial state for the element to be scaled down to 50% of "actual" size (`-webkit-transform: scale(0.5);`) and declare that when the class "popping" is added to the element we will use the "pop" animation sequence to transition to our ending state (`-webkit-transform: scale(1.0);`) over 250 milliseconds and using the `ease-in-out` timing function.

The JavaScript is essentially the same as before. Only the DIV ID and class names have been changed.

<pre class="sh_javascript">
document
  .getElementById('popper')
  .addEventListener('click', function () {
  this.className = 'popping' === this.className ? '' : 'popping';
}, false);
</pre>

So, that's it. Pretty cool what WebKit can do. I mentioned earlier that other browsers will hopefully implement these techniques as well. Apple have [proposed](http://webkit.org/specs/) all of the techniques I've used in my examples to the appropriate standards bodies. My guess is [Mozilla](http://www.mozilla.org/) and [Opera](http://www.opera.com/) will get on board relatively quickly. When [The Beast](http://www.microsoft.com/ie/) decides to grow a round tuit is anyone's guess. IE12, perhaps?
