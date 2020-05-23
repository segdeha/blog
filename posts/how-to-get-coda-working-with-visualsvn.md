{
  "title": "How-to get Coda working with VisualSVN",
  "slug": "how-to-get-coda-working-with-visualsvn",
  "topics": [
    "Coda",
    "Subversion (SVN)",
    "Web Development"
  ],
  "keywords": "coda, visualsvn, svn, subversion, operation, not, permitted, neon, chflags, nouchg, tigris, ra_neon, webdav, http",
  "created_date": "2009-02-19 19:19:19",
  "short_url": "http://ahedg.es/64",
  "published": false
}

========

At <a href="http://www.bookabach.co.nz/">work</a>, I had some problems getting <a href="http://www.panic.com/coda/">Coda</a> to work with our <a href="http://www.visualsvn.com/">VisualSVN</a> repositories. Here's what was wrong and how I fixed it.

========

<p class="outdent">When trying to interact with a fresh checkout of one of our VisualSVN repositories, Coda reported the following error:</p>
<pre>
svn: Can't move '.svn/tmp/entries' to 
'.svn/entries': Operation not permitted
</pre>
<p>It turns out there were two main problems:</p>
<ol>
  <li>The stock version of svn included with Mac OS X 10.5 (version 1.4.4) is not compatible with the repos.</li>
  <li>There are flags set on the files in the repo that cause svn to reject most commands with an "Operation not permitted" message.</li>
</ol>
<p>The following are the solutions to those sticky wickets.</p>
<h3>Upgrading svn</h3>
<p>With Apple's developers tools installed, it is easy enough to upgrade svn (currently at version 1.5.5). You can see what version of svn is in your path by typing <code> svn ‐‐version </code> into a Terminal session.</p>
<p>You may need to install one package before upgrading svn itself. It’s called Neon and it allows svn to use the <a href="http://en.wikipedia.org/wiki/WebDAV">WebDAV</a> protocol to access <code>http://</code> repositories (the kind we are using).</p>
<p>To install Neon, go to the <a href="http://www.webdav.org/neon/">Neon project page</a> and download the source (neon-0.28.3.tar.gz as of 19 Feb 2009). Move it to <code>/usr/src</code> and un-archive it. In Terminal, execute the following commands:</p>
<ol>
  <li><code>cd /usr/src/neon-0.28.3</code> <em>substitute your version number, if different</em></li>
  <li><code>./configure</code></li>
  <li><code>make</code></li>
  <li><code>sudo make install</code></li>
</ol>
<p>Now you can upgrade svn. Go to the <a href="http://subversion.tigris.org/servlets/ProjectDocumentList?folderID=260&expandFolder=74">Subversion source download page</a> and get the latest source (subversion-1.5.5.tar.bz2 as of this writing). Move it to <code>/usr/src</code> and un-archive it. In Terminal, execute the following commands:</p>
<ol>
  <li><code>cd /usr/src/subversion-1.5.5</code> <em>substitute your version number, if different</em></li>
  <li><code>./configure</code></li>
  <li><code>make</code></li>
  <li><code>sudo make install</code></li>
</ol>
<p>This should install the upgraded svn binary in <code>/usr/local/bin</code> (note: you will need to <a href="http://lmgtfy.com/?q=update+path+variable+mac+os+x">update your path</a> to include this directory before <code>/usr/bin</code> to make the new version your default). Once you’ve done that, run <code> svn ‐‐version </code> again and you should see something like the following:</p>
<pre class="sh_bash">
svn, version 1.5.5 (r34862)
   compiled Feb 19 2009, 11:58:22

Copyright (C) 2000-2008 CollabNet.
Subversion is open source software, see \
http://subversion.tigris.org/
This product includes software developed by \
CollabNet (http://www.Collab.Net/).

The following repository access (RA) modules \
are available:

* ra_neon : Module for accessing a repository \
via WebDAV protocol using Neon.
  - handles 'http' scheme
* ra_svn : Module for accessing a repository \
using the svn network protocol.
  - with Cyrus SASL authentication
  - handles 'svn' scheme
* ra_local : Module for accessing a repository \
on local disk.
  - handles 'file' scheme 
</pre>
<p>The <code>ra_neon</code> in that output means you can access <code>http://</code> style repos. Well done!</p>
<h3>Setting file flags</h3>
<p>After quite a bit of time spent Googling around, I finally discovered <a href="http://blogs.noname-ev.de/commandline-tools/archives/33-svn-Cant-move-.svntmpentries-to-.svnentries-Operation-not-permitted.html">this hint</a> that supplies the magic answer to giving Mac svn clients the ability to move and change files in a VisualSVN repo. In Terminal, do the following:</p>
<ol>
  <li><code>cd</code> to your svn working directory (e.g., <code>cd /Volumes/inetpub/andrew.hedges/</code> for me)</li>
  <li><code>chflags -R nouchg *</code></li>
</ol>
<p>I must admit, I only partially understand what that command does. I had tried just removing the “sticky bit” from the files and that did not do the trick, so obviously there is more to the story than just that.</p>
<h3>Configuring Coda</h3>
<p>As you might expect, configuring Coda to work with your new svn binary is the easiest part of the whole process. Just go into Preferences > Files and change the "Subversion Tool Path" from the default <code>/usr/bin/svn</code> to <code>/usr/local/bin/svn</code> (assuming you followed the process above).</p>
<p>Alert readers may notice that I have neglected to mention an orthogonal problem, the "pesky dot-underscore files" issue that occurs when Mac OS X's Finder interacts with files on a Windows file server. Others have <a href="http://www.macworld.com/article/132556/2008/04/geekfactor2504.html">attempted to address</a> this one, but I have not seen any truly satisfactory solutions. That problem will have to wait for another day.</p>
<p>The one tip I will offer about that is to use <a href="http://tortoisesvn.tigris.org/">ToirtoiseSVN</a> or some other Windows svn client to do the initial checkout. I was not able to successfully checkout VisualSVN repos using svn from the command-line.</p>
<p>Anyway, that should be all you need to do to get svn working on your Mac. Good luck!</p>
