{
  "title": "Radiant JavaScript Singletons Freelance Down Under",
  "slug": "radiant-javascript-singletons-freelance-down-under",
  "topics": ["JavaScript", "Life", "Ruby on Rails", "New Zealand"],
  "keywords": "radiant cms, ruby on rails, javascript, module pattern, crockford, prototype, object oriented, html, css, usability, user-centered, coda, freelancing, summer, swimming, parrots, jandals, new zealand, under, pool, sinking",
  "created_date": "2008-02-28 23:11:11",
  "short_url": "http://ahedg.es/16",
  "published": false
}

========

It&#8217;s <a title="Summer in New Zealand means kicking off the Jandals" href="http://www.zooomr.com/photos/newfangledtelegraph/4342294/">summer</a> <a title="Find out where in the world is Kerikeri, New Zealand" href="http://maps.google.com/maps?f=q&hl=en&geocode=&q=kerikeri,+nz&ie=UTF8&z=12&iwloc=addr">down under</a> and I&#8217;ve spent the last 2 weeks on a self-styled &#8220;working holiday,&#8221; <a title="One of my clients, the Institute for Spanish Language Studies" href="http://isls.com/">freelancing</a> doing some fun work with <a title="Radiant is a highly usable CMS built in Ruby on Rails" href="http://radiantcms.org/">Radiant CMS</a> and rediscovering the beauty of <a title="Prototypal languages make more sense to me than Class-based ones." href="http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Guide:Class-Based_vs._Prototype-Based_Languages">JavaScript prototypes</a>. I&#8217;ve also managed to relax a bit, going to the beach and swimming with <a title="They're gonna kill me for linking to this photo. Hehe." href="http://www.zooomr.com/photos/newfangledtelegraph/4063278/">my beautiful daughters</a>. Not a bad way to spend some time off <a title="We're looking for developers! Send me your CV!" href="http://vianet.travel/">work</a>.

========

<p class="outdent">Let me apologise in advance. This blog post isn&#8217;t really about any particular topic. Or, at least, I didn&#8217;t think it through enough to find the theme. It&#8217;s more a series of points that, to me, hang together because they all relate to a slice of my time, but to you might make as much sense as a cauliflower sandwich.</p>
<div class="photo-left">
	<p>
		<img src="http://static.zooomr.com/images/4342329_3511b990cb_o.jpg" alt="">
		Parrots rock. See? Random.
	</p>
</div>
<ol start="1">
	<li>Freelancing, I&#8217;ve made as much in a week-and-a-half as I make in a <em>month</em>-and-a-half in my &#8220;real&#8221; job. Don&#8217;t get me wrong, real jobs have benefits, like predictability. (Good for raising a family, that.) But there&#8217;s something a little thrilling about invoicing someone for <strong>thousands</strong> of dollars after spending just a week on their project. I know the client is getting a good value, but a part of me still feels like I&#8217;m getting away with something.</li>
</ol>
<ol start="2">
	<li>I&#8217;ve been lucky since I moved to New Zealand to have had the opportunity to really push my understanding of programming and software development in general and JavaScript, specifically. I feel like I&#8217;ve &#8220;grown up&#8221; career-wise in the last 10 months, going from talented amateur to confident professional in the process.</li>
</ol>
<ol start="3">
	<li>I know now, better than ever, what I like to do. It&#8217;s pretty fun to design a database. It&#8217;s rewarding in a kind of brushing-your-teeth way to write the back-end plumbing for a dynamic site. I do enjoy solving usability problems employing user-centered analysis and design. But what <em>really</em> floats my boat is taking a complex graphic design and creating a correct, lightweight, standards-proud implementation of it. What makes me want to run, <em>not walk,</em> the dog and hurry through my bowl of cereal so I can get back as-fast-as-possible to <a title="Coda is the closest I've found to a perfect IDE for building web sites." href="http://panic.com/coda/">Coda</a>, is taking a set of design requirements and expressing it in HTML, CSS, and JavaScript in a way that is efficient and elegant and rock-solid across browsers and platforms. In short, it&#8217;s implementing the client-side experience that really makes my hair fly back (so to speak, since my hair is actually less than 1 cm long, not to mention thinning&#8230;).</li>
</ol>
<ol start="4">
	<li>Over the last 3 months particularly, I have had the opportunity to really push myself as a programmer. It started with a 3 week stint in the <a title="Trade Me is the eBay of New Zealand" href="http://www.trademe.co.nz/">Trade Me</a> offices working up new GUI widgets for <a title="Trade Me's accommodation booking site, built by Vianet" href="http://www.travelbug.co.nz/">Travelbug</a>. These included a <a title="Go on, you know you want to see it" href="http://www.travelbug.co.nz/accommodation/Wellington">sliding price selector</a>, animated <a title="No Scriptaculous here, I use Bernie Code!" href="http://www.travelbug.co.nz/lastminutedeals/Wellington">&#8220;last minute deals&#8221; calendar</a>, and some other bits and bytes. It&#8217;s not often that you have the opportunity to do something over. With the last minute deals calendar, I had that chance. I had built a very similar (though a bit more complex) <a title="I recommend the private house, a steal at only $1500 per night!" href="http://www.travelbug.co.nz/visit/19216#book">booking calendar</a> for the original Travelbug launch and it was a monumental effort on my part. Blood, sweat, tears, the whole 9 yards. This time, it took far less effort, was far more organised, was far easier to tweak when the inevitable changes to the original requirements crept in, and was just plain more fun to build.</li>
</ol>
<ol start="5">
	<li>Just this last week, I built a fading slideshow interface element for <a title="Get ready for 2D codes, because here they come!" href="http://www.wapid.co.nz/">wapid!</a> yeah, this kind of thing has been done 100 times and I probably could have found someone else&#8217;s component that would have done the job. But then I wouldn&#8217;t have experienced the joy of rediscovering prototypal object instances. You see, I&#8217;ve been <em>way</em> into the <a title="Module pattern is a way of creating private variables in JavaScript" href="http://yuiblog.com/blog/2007/06/12/module-pattern/">module pattern</a> recently, to the point where I&#8217;ve been using it for pretty much everything. This slideshow widget showed me that it is sometimes not enough by itself. For this slideshow, I have multiple &#8220;campaigns&#8221; (sets of slides, basically) and a single viewport (and set of controls). I mean, it&#8217;s basic <acronym title="Object Oriented Programming">OOP</acronym >, but isn&#8217;t it obvious that I would want multiple instances of a Campaign object and a singleton, basically, to control the viewport? The correct design is the design that seems obvious once it&#8217;s implemented. Anyway, have a look at <a title="Warning: code" href="http://www.wapid.co.nz/assets/js/wapid.js">the script itself</a> (specifically <code>WAPID.animation</code>). It combines the module pattern with good old fashioned constructors and prototypes (implemented as private members). The result makes sense, at least to me, and just feels good to think about. It&#8217;s code that makes me smile.</li>
</ol>
<ol start="6">
	<li>I was thinking today of taking up sculpting. I&#8217;ve always wanted to sculpt and, after skimming through some books at the library on gothic and baroque architecture and art, had an idea for how to approach it. I want to sculpt hands. I want to sculpt 100 hands. The first one doesn&#8217;t have to be any good at all. The second, either. By the time I have done 100 hands, I&#8217;ll have a good idea of whether I&#8217;m any good at sculpting. I&#8217;m sure I&#8217;ll be better at it than when I started, <em>and</em> I&#8217;ll have <em>done something.</em> Isn&#8217;t that what art is about, anyway?</li>
</ol>
<div class="photo-left">
	<p>
		<img src="http://www.webtime.ch/bilder/atoll.jpg" alt="">
		I know it&#8217;s shellfish, I mean&#8230;selfish.
	</p>
</div>
<ol start="7">
	<li>I really, really like having a pool. I know it&#8217;s a waste of resources. I picture some atoll in the Pacific sinking just a little further under water each time I run the filter overnight, but I have to say, it&#8217;s the most fun I&#8217;ve had with my kids ever. We get in the pool and it&#8217;s all splashing and laughing. They&#8217;re perfecting synchronised swimming routines. We&#8217;re all doing handstands and somersaults. It&#8217;s a blast. Keeping it up is a bit of work and expense, but I actually like doing the maintenance on it. There&#8217;s something Zen-like to the process of skimming the leaves off the surface and slowly running the vacuum over the pool floor. I never thought in a million years I&#8217;d have my own pool. Now I don&#8217;t ever want to be without one!</li>
</ol>

<p>And so concludes my (to you) random collection of points about this little slice of life I call the last 2 weeks. We&#8217;re off to a <a title="Crazy kiwis have silly names for everything" href="http://en.wikipedia.org/wiki/Bach_%28New_Zealand%29">bach</a> in <a title="Find out where in the world is Pataua, New Zealand" href="http://maps.google.com/maps?f=q&hl=en&geocode=&q=Pataua&sll=37.0625,-95.677068&sspn=51.443116,84.023438&ie=UTF8&z=13&iwloc=addr">Pataua</a> for the weekend for some family time. We&#8217;ll swim in the ocean, hunt for seashells, then it&#8217;s back to the real world come Monday.</p>
