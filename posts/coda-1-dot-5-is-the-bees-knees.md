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
  "short_url": "https://ahedg.es/33",
  "published": true
}

========

A long time ago, in a country far, far away, I wrote a blog post where I called _[skEdit The (Mostly) Perfect Text Editor](https://www.clearwired.com/loop/archives/23-skEdit,-The-Mostly-Perfect-Text-Editor.html)._ [Coda](https://www.panic.com/coda/), while itself not perfect, is even better.

========

[Panic](https://www.panic.com) have just released version 1.5 of Coda, a free-to-current-users upgrade to their one-window web development application. It’s sweet as.

I was once smitten with [skEdit](https://www.skti.org/skedit/) because it _didn’t_ do everything. I had used [BBEdit](https://www.barebones.com/products/bbedit/) for a long time before that. While BBEdit had some really fine points to it, it just felt clunky and over-featured compared to skEdit.

Coda takes this elegance a step further by combining an excellent text editor with other commonly needed features for web designers and developers. Its big selling point is the one-window thing. I was wary at first, but have come to love it.

Now, Coda 1.5 is here. It fixes a couple of niggles I had with previous versions and adds some new features that make it even more useful. The #1 feature everyone [is](https://www.downloadsquad.com/2008/08/26/coda-1-5-released/) [talking](https://getsatisfaction.com/panic/topics/coda_svn_booya) [about](https://twitter.com/MikeBucks/statuses/899735440) is integrated support for [SVN](https://en.wikipedia.org/wiki/Subversion_(software)).

<div class="photo-left">
  <p>
    <img src="/blog/assets/img/coda-svn.png" alt="Coda’s SVN support">
    Coda’s SVN support
  </p>
</div>

I used to develop in [Eclipse](https://www.eclipse.org/). One of the things I liked most about it was the visual integration of SVN functionality. I like Coda’s approach way better. It’s simple, elegant, and easy-to-use; everything you’d expect from great Mac software.

I was glad to see that Coda 1.5 fixed some issues I’d been seeing with JavaScript syntax highlighting. Specifically, older versions of Coda would incorrectly colour keywords (such as `for` and `in`) in comments. It was annoying, but not that big of a deal in the scheme of things.

There is, however, one problem I’d like to humbly ask the Coda gods to address. It keeps me from being able to use what could be a killer feature. I’m talking about the Code Navigator and it’s lack of understanding of the [module pattern](https://yuiblog.com/blog/2007/06/12/module-pattern/).

I spend almost every working hour writing JavaScript. As I’ve written about [before](/blog/2008/05/13/widget-javascript-the-un-series-part-0), I am a consistent user of the module pattern popularised by [Douglas Crockford](https://www.crockford.com/) of [Yahoo!](https://www.yahoo.com/) Coda’s Code Navigator does a really poor job of recognising important symbols in JavaScript written this way. Here’s an example from the [jQuery widget](https://code.google.com/p/jquery-reference/) I’m currently building:

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

This is typical stuff. It creates a global object with a private variable, a private method, and a couple of public methods.

Unfortunately, the only symbol that shows up in Coda’s Code Navigator is `_callback`. I assume the reason for this is that for the public methods to be recognised, Coda would have to actually evaluate the JavaScript, rather than just doing syntax matching. It’s understandable, but I hope the good people at Panic find a way to make the Code Navigator smarter in a future release.
