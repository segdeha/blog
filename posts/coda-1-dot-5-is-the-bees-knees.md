{
  "title": "Coda 1.5 is the bee's knees",
  "slug": "coda-1-dot-5-is-the-bees-knees",
  "topics": [
    "Coda",
    "JavaScript",
    "Web Development"
  ],
  "keywords": "apple, mac, coda, panic, javascript, web, skedit, clearwired, perfect, bbedit, svn, eclipse, code, navigator, jquery, reference, widget, crockford, yahoo",
  "created_date": "2008-08-27 13:11:11",
  "short_url": "http://ahedg.es/33",
  "published": false
}

========

A long time ago, in a country far, far away, I wrote a blog post where I called <em><a href="http://www.clearwired.com/loop/archives/23-skEdit,-The-Mostly-Perfect-Text-Editor.html">skEdit The (Mostly) Perfect Text Editor</a>.</em> <a href="http://www.panic.com/coda/">Coda</a>, while itself not perfect, is even better.

========

<p class="outdent"><a href="http://www.panic.com/">Panic</a> have just released version 1.5 of Coda, a free-to-current-users upgrade to their one-window web development application. It's sweet as.</p>
<p>I was once smitten with <a href="http://www.skti.org/skedit/">skEdit</a> because it <em>didn't</em> do everything. I had used <a href="http://www.barebones.com/products/bbedit/">BBEdit</a> for a long time before that. While BBEdit had some really fine points to it, it just felt clunky and over-featured compared to skEdit.</p>
<p>Coda takes this elegance a step further by combining an excellent text editor with other commonly needed features for web designers and developers. It's big selling point is the one-window thing. I was wary at first, but have come to love it.</p>
<p>Now, Coda 1.5 is here. It fixes a couple of niggles I had with previous versions and adds some new features that make it even more useful. The #1 feature everyone <a href="http://www.downloadsquad.com/2008/08/26/coda-1-5-released/">is</a> <a href="http://getsatisfaction.com/panic/topics/coda_svn_booya">talking</a> <a href="http://twitter.com/MikeBucks/statuses/899735440">about</a> is integrated support for <a href="http://en.wikipedia.org/wiki/Subversion_(software)">SVN</a>.</p>
<div class="photo-left">
  <p>
    <img src="http://segdeha.com/blog/assets/imgs/coda-svn.png" alt="Coda's SVN support">
    Coda's SVN support
  </p>
</div>
<p>I used to develop in <a href="http://www.eclipse.org/">Eclipse</a>. One of the things I liked most about it was the visual integration of SVN functionality. I like Coda's approach way better. It's simple, elegant, and easy-to-use; everything you'd expect from great Mac software.</p>
<p>I was glad to see that Coda 1.5 fixed some issues I'd been seeing with JavaScript syntax highlighting. Specifically, older versions of Coda would incorrectly colour keywords (such as <code>for</code> and <code>in</code>) in comments. It was annoying, but not that big of a deal in the scheme of things.</p>
<p>There is, however, one problem I'd like to humbly ask the Coda gods to address. It keeps me from being able to use what could be a killer feature. I'm talking about the Code Navigator and it's lack of understanding of the <a href="http://yuiblog.com/blog/2007/06/12/module-pattern/">module pattern</a>.</p>
<p>I spend almost every working hour writing JavaScript. As I've written about <a href="http://andrew.hedges.name/blog/2008/05/13/widget-javascript-the-un-series-part-0">before</a>, I am a consistent user of the module pattern popularised by <a href="http://www.crockford.com/">Douglas Crockford</a> of <a href="http://www.yahoo.com/">Yahoo!</a> Coda's Code Navigator does a really poor job of recognising important symbols in JavaScript written this way. Here's an example from the <a href="http://code.google.com/p/jquery-reference/">jQuery widget</a> I'm currently building:</p>
<pre class="sh_javascript">
var DOCS = (function () {
    // private members
    var _urls, _callback;
    _urls = {
        xml : MAIN.base + '/Assets/xml/api-docs.xml',
        xsl : MAIN.base + '/Assets/xsl/main.xsl'
    };
    _callback = function (obj) {
        if (obj.outputString.indexOf('SUCCESS') > -1) {
            // success
        } else {
            // error
        }
    };
    // public members
    return {
        load: function () {
            $('#front .content').xslt(_urls.xml, _urls.xsl);
        },
        update: function () {
            WW.system(MAIN.base + '/Assets/php/update-docs.php', 
                _callback);
        }
    };
})();
</pre>
<p>This is typical stuff. It creates a global object with a private variable, a private method, and a couple of public methods.</p>
<p>Unfortunately, the only symbol that shows up in Coda's Code Navigator is <code>_callback</code>. I assume the reason for this is that for the public methods to be recognised, Coda would have to actually evaluate the JavaScript, rather than just doing syntax matching. It's understandable, but I hope the good people at Panic find a way to make the Code Navigator smarter in a future release.</p>
