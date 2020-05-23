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
  "published": false
}

========

With apologies to David Letterman's <a href="http://www.youtube.com/watch?v=g-dE_TJfOVg">Stupid Human Tricks</a> segment, I presented a session at <a href="http://bca.geek.nz/">Barcamp Auckland (BCA3)</a> on some <a href="http://webkit.org/">WebKit</a>-specific features you can leverage in web applications for <a href="http://www.apple.com/iphone/">iPhone</a>, <a href="http://www.android.com/">Android</a>, and the <a href="http://www.palm.com/us/products/phones/pre/">Palm Pre</a>. This is my synopsis, plus a bonus trick I didn't present at the (un)conference!

========

<p class="outdent">WebKit is Apple's open source HTML rendering engine. It is used to power several browsers and even a software platform, including <a href="http://www.apple.com/safari/">Safari</a>, Mobile Safari, <a href="http://www.google.com/chrome">Google Chrome</a>, and the Palm Pre operating system. To see the following examples in action, you'll need one of them.</p>
<p>Here are my <a href="http://segdeha.com/bca/stupid-webkit-tricks.html">presentation notes</a>.</p>
<p>At BCA3, we were allotted just 30 minutes to present. That, plus the session I attended right before mine went a little over. After getting set up, I had approximately 23 minutes of talk time (you know, <a href="http://www.latimes.com/business/la-fi-iphone3-2009jul03,0,2546606.story">kind of like an iPhone</a>).</p>
<p>I quickly ran through examples of <a href="http://segdeha.com/experiments/css-gradients/index.html">CSS gradients</a>, <a href="http://segdeha.com/experiments/css-transitions/dock.html">scaling</a>, <a href="http://segdeha.com/experiments/css-transitions/classnames.html">moving</a>, & <a href="http://segdeha.com/experiments/css-transitions/opacity.html">fading</a> elements, <a href="http://segdeha.com/experiments/css-transitions/flipper.html">flipping stuff over</a> (best viewed on an iPhone), and finally <a href="http://segdeha.com/experiments/css-transitions/masks.html">CSS masks</a>. It was a whirlwind, but I hope it gave a taste of what WebKit (and, hopefully soon, other browsers) can do. Best of all, most of it is hardware accelerated on the iPhone.</p>
<h3>How it works</h3>
<p>The basic pattern for all of the above mentioned animations is the following:</p>
<ol>
<li>In CSS, tell WebKit that, for an element or group of elements, when a specific property changes, it should <em>transition</em> from one state to another over a set duration and using a particular timing function (also called an "easing algorithm").</li>
<li>Also in CSS, set the initial state of the element and the state to which the element is to transition.</li>
<li>Either in CSS (using the <code>:hover</code> pseudo-class) or in JavaScript (by toggling a class name), initiate the transition by setting a new state for the property in question.</li>
</ol>
<p>Here's a simple example. First, the CSS:</p>
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
<p>The CSS just implements steps 1 & 2 above.</p>
<p>Next, the JavaScript:</p>
<pre class="sh_javascript">
document
  .getElementById('mydiv')
  .addEventListener('click', function () {
  this.className = 'faded' === this.className ? '' : 'faded';
}, false);
</pre>
<p>The above code sets up our DIV to listen for click events. When you click the DIV, it checks whether the class name is 'faded'. If it is, it sets the class name to nothing. If it's not, it sets it to 'faded'. Try it for yourself:</p>
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
<p>Pretty cool, eh? Read everything there is to know about this stuff in <a href="http://developer.apple.com/safari/library/documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Introduction/Introduction.html">the official documentation from Apple</a>.</p>
<h3>Bonus!</h3>
<p>As promised, here is a little bonus technique: key-framed animations. This is sweet. First, try the example below:</p>
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
<p>In a WebKit-based browser, you should see the DIV grow to about twice it's "normal" size, then pop back to actual size. The code for this animation is only a little more complex than the previous example, and it builds on what we already know.</p>
<p>Here's the CSS:</p>
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
<p>In the CSS, the first thing we're doing is creating an animation (<code>@-webkit-keyframes</code>) with the name "pop". Our animation has three states: 0%, our starting state; 70%, the state we want our element in when 70% of the duration has elapsed; and, 100%, our ending state.</p>
<p>Next, we set the initial state for the element to be scaled down to 50% of "actual" size (<code>-webkit-transform: scale(0.5);</code>) and declare that when the class "popping" is added to the element we will use the "pop" animation sequence to transition to our ending state (<code>-webkit-transform: scale(1.0);</code>) over 250 milliseconds and using the <code>ease-in-out</code> timing function.</p>
<p>The JavaScript is essentially the same as before. Only the DIV ID and class names have been changed.</p>
<pre class="sh_javascript">
document
  .getElementById('popper')
  .addEventListener('click', function () {
  this.className = 'popping' === this.className ? '' : 'popping';
}, false);
</pre>
<p>So, that's it. Pretty cool what WebKit can do. I mentioned earlier that other browsers will hopefully implement these techniques as well. Apple have <a href="http://webkit.org/specs/">proposed</a> all of the techniques I've used in my examples to the appropriate standards bodies. My guess is <a href="http://www.mozilla.org/">Mozilla</a> and <a href="http://www.opera.com/">Opera</a> will get on board relatively quickly. When <a href="http://www.microsoft.com/ie/">The Beast</a> decides to grow a round tuit is anyone's guess. IE12, perhaps?</p>
