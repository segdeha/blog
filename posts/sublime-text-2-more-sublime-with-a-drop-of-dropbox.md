{
  "title": "Sublime Text 2 more sublime with a drop of Dropbox",
  "slug": "sublime-text-2-more-sublime-with-a-drop-of-dropbox",
  "topics": ["Coda", "Web Development"],
  "keywords": "sublime text 2, coda, skedit, dropbox, packages, installed packages, pristine packages, st2",
  "created_date": "2012-01-19 21:19:12",
  "short_url": "http://ahedg.es/96",
  "published": false
}

========

I&#8217;ve been a big fan of Panic&#8217;s <a href="/blog/2008/08/27/coda-1-dot-5-is-the-bees-knees">Coda</a> since early on (and <a href="/blog/2006/09/20/skedit-the-mostly-perfect-text-editor">skEdit</a> before that). But, move over bacon, there&#8217;s a new sheriff in town. After just a few days of use, I&#8217;m all in with <a href="http://www.sublimetext.com/2">Sublime Text 2</a>.

========

<p>Among its many great features, one of the cool things about ST2 is the licensing terms. <a href="http://www.sublimetext.com/buy">Buy a license</a> and you can use it on as many machines as you like. In this modern age, this is as it should be.</p>
<p>ST2 is great out of the, uh, download (we need a new metaphor here, people), but <a href="http://wbond.net/sublime_packages/community">packages</a> go a long way towards extending its functionality. Problem is, once you start adding a bunch of packages (the first of which should be <a href="http://wbond.net/sublime_packages/package_control">Package Control</a>), it becomes a nuisance to keep them in sync across  installations on multiple machines.</p>
<p>Enter <a href="http://dropbox.com">Dropbox</a>.</p>
<p>In case you live under a rock, Dropbox is incredibly simple, reliable software that syncs a folder or folders between multiple computers. If you don&#8217;t already have an account, <a href="http://db.tt/T8FHs0t7">get yours here</a> (and help me get a bit more storage space in the process [this is referred to colloquially as a &#8220;win-win&#8221;]).</p>
<p>The following steps (which are for OS X, please add how to do this on Windows & Linux if you know how!) should get you up and running with synchronized packages across multiple machines:</p>
<ol>
<li>Quit Sublime Text 2 (so you don&#8217;t accidentally change any settings)</li>
<li>In your Dropbox folder (usually at <code>~/Dropbox/</code>), add a folder called <code>Sublime Text 2</code></li>
<li>Open the folder with your ST2 settings (should be <code>~/Library/Application Support/Sublime Text 2/</code>)</li>
<li>Copy the following 3 folders into <code>~/Dropbox/Sublime Text 2/</code>: <code>Installed Packages</code>, <code>Packages</code>, and <code>Pristine Packages</code></li>
<li>Rename the original 3 folders in <code>~/Library/Application Support/Sublime Text 2/</code> to something like <code>Installed Packages-20110119</code>, <code>Packages-20110119</code>, and <code>Pristine Packages-20110119</code> (optional, but I&#8217;m kind of anal about these things, so I want to make sure I can revert if need be)</li>
<li>Now, dive into Terminal.app (if you&#8217;re not comfortable using a <span class="tooltip" title="Command Line Interface">CLI</span>, you probably aren&#8217;t a good candidate for ST2)</li>
<li>Navigate into <code>~/Library/Application Support/Sublime Text 2/</code> (using <code>cd</code>, you got this, right?)</li>
<li>Here, we&#8217;re going to create <span class="tooltip" title="Symbolic Links">symlinks</span> to the folders in <code>~/Dropbox/Sublime Text 2/</code></li>
<li>
The command to create a symlink is <code>ln -s [source] [destination]</code>, so we want to do the following, 1 at a time:
<ul>
<li><code>ln -s ~/Dropbox/Sublime\ Text\ 2/Installed\ Packages ./Installed\ Packages</code></li>
<li><code>ln -s ~/Dropbox/Sublime\ Text\ 2/Packages ./Packages</code></li>
<li><code>ln -s ~/Dropbox/Sublime\ Text\ 2/Pristine\ Packages ./Pristine\ Packages</code></li>
</ul>
</li>
<li>There is no step 10.</li>
</ol>
<div class="photo-hero">
	<p>
		<img src="/blog/-/img/sublime-dropbox.png" alt="End result"><br>
		When you&#8217;re done, you should end up with something like this.
	</p>
</div>
<p>That should do it. Fire up ST2 and make sure you have the list of packages you expect to. Just to be sure, install another package and make sure it shows up in <code>~/Dropbox/Sublime Text 2/Packages/</code>.</p>
<p><span class="tooltip" title="Worked For Me">WFM</span> <span class="tooltip" title="Your Mileage May Vary">YMMV</span> <span class="tooltip" title="Smile">:-)</span></p>
<p>For good measure, here are the packages I have installed. Feel free to recommend others in the comments!</p>
<ul>
<li><a href="http://wbond.net/sublime_packages/package_control">Package Control</a> (start here and use it to install the rest)</li>
<li>Alignment</li>
<li>ChangeQuotes</li>
<li>DocBlockr</li>
<li>Git</li>
<li>Goto-CSS-Declaration</li>
<li>HyperlinkHelper</li>
<li>Inc-Dec-Value</li>
<li>RegReplace</li>
<li>SFTP</li>
<li>SideBarGit</li>
<li>StringEncode</li>
<li>sublime-csspecific</li>
<li>sublime-jslint</li>
<li>ToggleQuotes</li>
<li>TrailingSpaces</li>
</ul>

