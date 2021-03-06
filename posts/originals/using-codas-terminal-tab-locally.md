{
  "title": "Using Coda's Terminal Tab Locally",
  "slug": "using-codas-terminal-tab-locally",
  "topics": [
    "Apple",
    "Coda",
    "Web Development",
    "Widgets"
  ],
  "keywords": "panic, coda, apple, mac, os x, cli, command line,, webkit, dashcode, dashboard, widgets, web, development, ide, ssh, remote login",
  "created_date": "2008-08-22 08:22:08",
  "short_url": "http://ahedg.es/31",
  "deprecated": true,
  "published": true
}

========

This might be pretty obvious, but it's really simple to use <a href="http://www.panic.com/coda/">Coda's</a> Terminal tab to interact with your local system from the command line. Here's how...

========

<p class="outdent">If you haven't checked out <a href="http://www.panic.com/">Panic's</a> excellent web development <span class="tooltip" title="Integrated Development Environment">IDE</span>, Coda, you owe it to yourself to download the free trial. It's a great piece of Mac software from one of the best Mac software shops around.</p>
<p>One of Coda's features allows you to work in a terminal window from within the IDE. While this is quite excellent for tweaking server settings and such, by default it appears to work only for remote connections. The good news is that it's really simple to set it up to work with local files as well.</p>
<div class="photo-left">
  <p>
    <img src="http://segdeha.com/blog/assets/imgs/sharing.png" alt="Sharing Preference Pane">
    Sharing Pref Pane
  </p>
  <p>
    <img src="http://segdeha.com/blog/assets/imgs/coda-terminal.png" alt="Coda Terminal Login Screen">
    Coda Terminal Login
  </p>
  <p>
    <img src="http://segdeha.com/blog/assets/imgs/coda-terminal-session.png" alt="Coda Terminal Session">
    Voilà!
  </p>
  <p>
    <img src="http://segdeha.com/blog/assets/imgs/coda-local-shell-select.png" alt="Select Shell Source">
    Select Shell Source
  </p>
  <p>
    <img src="http://segdeha.com/blog/assets/imgs/coda-local-shell-connect.png" alt="Coda Local Terminal Session">
    Coda <em>Local</em> Terminal Session
  </p>
</div>
<p>What you do is go to your Sharing preference pane, found in System Preferences (see image to the right) and turn on Remote Login, if it's not already enabled.</p>
<p>Now, you can just go into Coda, hit the Terminal tab, and log in to your local system. Use <code>localhost</code> as the server name and your system login credentials as the username and password and Coda will connect to your local file system allowing you to do anything you could do directly in Terminal.app.</p>
<p>There is no step 3.</p>
<p>And, because I haven't gushed enough about Coda... If you do <a href="http://www.apple.com/downloads/dashboard/">Dashboard Widget</a> development, you <em>really</em> owe it to yourself to check out Coda. I set up a site that uses my Widgets folder as its root directory. This means I can just open that site, right-click on a widget, choose "Show Package Contents" and I have access to all of its innards from within the IDE. That, and the preview pane uses <a href="http://webkit.org/">WebKit</a> (the same rendering engine used by Widgets themselves), so it's great for getting started laying out your widget's design. This is all, of course, if--like me--you don't use <a href="http://developer.apple.com/tools/dashcode/">Dashcode</a>...</p>
<h2>Update:</h2>
<p>Turns out I was too clever (and too blind, apparently!) for my own good. The smart folks at Panic anticipated the need to connect to a local shell. (Didn't I say? They're good!)</p>
<p>In the Terminal tab in Coda, just click on the select list and choose "Local Shell" (see screenshot to the right). I verified that this works, regardless of whether Remote Login is enabled. Thanks to "bardiir" from the <a href="http://groups.google.com/group/coda-users/browse_thread/thread/bcfa140db02d7eb4?hl=en">Coda Users Google Group</a> for enlightening me!</p>
