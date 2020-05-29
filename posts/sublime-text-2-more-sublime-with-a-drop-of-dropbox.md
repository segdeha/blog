{
  "title": "Sublime Text 2 more sublime with a drop of Dropbox",
  "slug": "sublime-text-2-more-sublime-with-a-drop-of-dropbox",
  "topics": ["Coda", "Web Development"],
  "keywords": "sublime text 2, coda, skedit, dropbox, packages, installed packages, pristine packages, st2",
  "created_date": "2012-01-19 21:19:12",
  "short_url": "http://ahedg.es/96",
  "published": true
}

========

I’ve been a big fan of Panic’s [Coda](/blog/2008/08/27/coda-1-dot-5-is-the-bees-knees) since early on (and [skEdit](/blog/2006/09/20/skedit-the-mostly-perfect-text-editor) before that). But, move over bacon, there’s a new sheriff in town. After just a few days of use, I’m all in with [Sublime Text 2](http://www.sublimetext.com/2).

========

Among its many great features, one of the cool things about ST2 is the licensing terms. [Buy a license](http://www.sublimetext.com/buy) and you can use it on as many machines as you like. In this modern age, this is as it should be.

ST2 is great out of the, uh, download (we need a new metaphor here, people), but [packages](http://wbond.net/sublime_packages/community) go a long way towards extending its functionality. Problem is, once you start adding a bunch of packages (the first of which should be [Package Control](http://wbond.net/sublime_packages/package_control)), it becomes a nuisance to keep them in sync across  installations on multiple machines.

Enter [Dropbox](http://dropbox.com).

In case you live under a rock, Dropbox is incredibly simple, reliable software that syncs a folder or folders between multiple computers. If you don’t already have an account, [get yours here](http://db.tt/T8FHs0t7) (and help me get a bit more storage space in the process [this is referred to colloquially as a “win-win”]).

The following steps (which are for OS X, please add how to do this on Windows & Linux if you know how!) should get you up and running with synchronized packages across multiple machines:

1. Quit Sublime Text 2 (so you don’t accidentally change any settings)
2. In your Dropbox folder (usually at `~/Dropbox/`), add a folder called `Sublime Text 2`
3. Open the folder with your ST2 settings (should be `~/Library/Application Support/Sublime Text 2/`)
4. Copy the following 3 folders into `~/Dropbox/Sublime Text 2/`: `Installed Packages`, `Packages`, and `Pristine Packages`
5. Rename the original 3 folders in `~/Library/Application Support/Sublime Text 2/` to something like `Installed Packages-20110119`, `Packages-20110119`, and `Pristine Packages-20110119` (optional, but I’m kind of anal about these things, so I want to make sure I can revert if need be)
6. Now, dive into Terminal.app (if you’re not comfortable using a <span class="tooltip" title="Command Line Interface">CLI</span>, you probably aren’t a good candidate for ST2)
7. Navigate into `~/Library/Application Support/Sublime Text 2/` (using `cd`, you got this, right?)
8. Here, we’re going to create <span class="tooltip" title="Symbolic Links">symlinks</span> to the folders in `~/Dropbox/Sublime Text 2/`
9. The command to create a symlink is `ln -s [source] [destination]`, so we want to do the following, 1 at a time:
    * `ln -s ~/Dropbox/Sublime\ Text\ 2/Installed\ Packages ./Installed\ Packages`
    * `ln -s ~/Dropbox/Sublime\ Text\ 2/Packages ./Packages`
    * `ln -s ~/Dropbox/Sublime\ Text\ 2/Pristine\ Packages ./Pristine\ Packages`
10. There is no step 10.

<figure>
    <img src="/blog/assets/img/sublime-dropbox.png" alt="End result">
    <figcaption>When you’re done, you should end up with something like this.</figcaption>
</figure>

That should do it. Fire up ST2 and make sure you have the list of packages you expect to. Just to be sure, install another package and make sure it shows up in `~/Dropbox/Sublime Text 2/Packages/`.

<acronym class="tooltip" title="Worked For Me">WFM</acronym> <acronym class="tooltip" title="Your Mileage May Vary">YMMV</acronym> <span class="tooltip" title="Smile">:-)</span>

For good measure, here are the packages I have installed. Feel free to recommend others in the comments!

* [Package Control](http://wbond.net/sublime_packages/package_control) (start here and use it to install the rest)
* Alignment
* ChangeQuotes
* DocBlockr
* Git
* Goto-CSS-Declaration
* HyperlinkHelper
* Inc-Dec-Value
* RegReplace
* SFTP
* SideBarGit
* StringEncode
* sublime-csspecific
* sublime-jslint
* ToggleQuotes
* TrailingSpaces
