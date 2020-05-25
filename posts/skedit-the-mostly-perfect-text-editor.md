{
  "title": "skEdit, The (Mostly) Perfect Text Editor",
  "slug": "skedit-the-mostly-perfect-text-editor",
  "topics": [
    "New Mexico",
    "Web Development"
  ],
  "keywords": "clearwired, loop, skedit",
  "created_date": "2006-09-20 09:20:00",
  "short_url": "http://ahedg.es/44",
  "published": false
}

========

I'm crazy about <a href="http://skti.org/">skEdit</a>. I use it every day in my work here at Clearwired. It replaced for me <a href="http://barebones.com/products/bbedit/">BBEdit</a>, which I had been a paid user of for several versions. (I still keep BBEdit 8.0 around, but I only use it for finding diffs between documents.) I like skEdit so much that I gave it an unsolicited plug in a recent <a href="http://www.widgetshow.com/?p=81">podcast segment</a>.

========

<p>skEdit has some great features including the following:</p>

<ul>
  <li>Snippets -- insert bits of code with user-configurable key combinations</li>
  <li>Sites -- set up sites by project and have all of the files available in the left pane</li>
  <li>Tabs -- open multiple files in one, tabbed interface</li>
  <li>The price -- it's just $25 US for a <em>lifetime</em> license, a great deal as long as it continues to be <a href="http://skti.org/journal.php">updated</a>!</li>
</ul>

<p class="outdent">Granted, my needs are relatively modest. I spend most of my time coding in HTML, CSS, JavaScript and <a href="http://python.org/">Python</a>. Making the claim that X, Y or Z is the perfect text editor is—to be brutally honest—a flagrant attempt to drive traffic to the site. Let the flame wars begin!</p>

<p>I do love skEdit, but one thing drives me bananas. (I have some other nits to pick, but this is the biggie.)</p>

<p>Double-click on a word in skEdit and drag it somewhere. If the word had a space immediately preceding it, skEdit also erases that space. This is called Smart Insert and Delete and you'll find it in most word processing applications on the Mac. In the context of a word processor, this feature makes sense and works <a href="http://daringfireball.net/2006/04/more_smart_cut_copy_paste">pretty well</a>.</p>

<p>This "smart" behavior (a feature of Cocoa's <a href="http://developer.apple.com/documentation/Cocoa/Conceptual/TextEditing/Tasks/Subclassing.html">NSTextView</a>) has no business being enabled in a text editor. When you're coding and you want to cut a piece of text, you don't want the editor also deleting whitespace. Not cool. Whitespace is often as important as non-whitespace to a programmer (this is especially true if, like me, you code in Python where indentation matters).</p>

<p>What really doesn't make sense to me is, according to the <a href="http://skti.org/skEdit.php">release notes for version 3.6.1</a>, while smart cutting is enabled (at least in most cases), smart pasting is not. I mean, if you're going to be clever, why only go halfway?</p>

<p>I wrote Sean Kelly, the developer of skEdit, and asked him, "Any chance you can change this in the next version (or at least make it a preference)?" So far, no response. To give Sean the benefit of the doubt, maybe this is a really tough thing to work around if your app is Cocoa-based.</p>

<p>The next biggest issue for me is that you can only have one remote connection open at a time. It's great to be able to connect to a remote server using SFTP (or FTP or WebDAV) and edit files directly, but why is it so hard to have multiple concurrent connections open? This isn't a huge deal, but once in a while it rears its ugly head.</p>

<p>The rest of <a href="http://clearwired.com/people/">the Clearwired crew</a> uses <a href="http://macromates.com/">TextMate</a> (well, except Kevin, he's still deciding between skEdit and TextMate). They seem to like it a lot, but most of them also don't mind spending a little time in <a href="http://en.wikipedia.org/wiki/Vi">vi</a> now and again.  (I'm a <a href="http://en.wikipedia.org/wiki/Pico_%28text_editor%29">pico</a> kind of guy, myself.) As Daniel says, "It's just a text editor." My perspective is, when you spend 8 (10? 12?) hours a day in it, it had better not make a nuisance of itself. Then again, Daniel also knows a guy who uses <a href="http://tnt.sourceforge.net/">Emacs to AIM</a>. To each his own...</p>

<p><strong>Update (2006-09-21 16:33):</strong> After posting this, I (finally!) got an email from Sean Kelly, developer of skEdit. He says he will be addressing my concerns about smart cut and paste in the next release. Thanks, Sean!</p>

<blockquote>
This entry was first published on <a href="http://www.clearwired.com/loop/">The Loop</a>, the blog of my former employer, <a href="http://www.clearwired.com/">Clearwired Web Services</a>.
</blockquote>

