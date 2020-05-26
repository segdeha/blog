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
  "deprecated": true,
  "published": true
}

========

At [work](http://www.bookabach.co.nz/), I had some problems getting [Coda](http://www.panic.com/coda/) to work with our [VisualSVN](http://www.visualsvn.com/) repositories. Here’s what was wrong and how I fixed it.

========

When trying to interact with a fresh checkout of one of our VisualSVN repositories, Coda reported the following error:

    svn: Can't move '.svn/tmp/entries' to
    '.svn/entries': Operation not permitted

It turns out there were two main problems:

1. The stock version of svn included with Mac OS X 10.5 (version 1.4.4) is not compatible with the repos.
2. There are flags set on the files in the repo that cause svn to reject most commands with an “Operation not permitted” message.

The following are the solutions to those sticky wickets.

### Upgrading svn

With Apple’s developers tools installed, it is easy enough to upgrade svn (currently at version 1.5.5). You can see what version of svn is in your path by typing ` svn ‐‐version ` into a Terminal session.

You may need to install one package before upgrading svn itself. It’s called Neon and it allows svn to use the [WebDAV](http://en.wikipedia.org/wiki/WebDAV) protocol to access `http://` repositories (the kind we are using).

To install Neon, go to the [Neon project page](http://www.webdav.org/neon/) and download the source (`neon-0.28.3.tar.gz` as of 19 Feb 2009). Move it to `/usr/src` and un-archive it. In Terminal, execute the following commands:

1. `cd /usr/src/neon-0.28.3` _substitute your version number, if different_
2. `./configure`
3. `make`
4. `sudo make install`

Now you can upgrade svn. Go to the [Subversion source download page](http://subversion.tigris.org/servlets/ProjectDocumentList?folderID=260&expandFolder=74) and get the latest source (`subversion-1.5.5.tar.bz2` as of this writing). Move it to `/usr/src` and un-archive it. In Terminal, execute the following commands:

1. `cd /usr/src/subversion-1.5.5` _substitute your version number, if different_
2. `./configure`
3. `make`
4. `sudo make install`

This should install the upgraded svn binary in `/usr/local/bin` (note: you will need to [update your path](http://lmgtfy.com/?q=update+path+variable+mac+os+x) to include this directory before `/usr/bin` to make the new version your default). Once you’ve done that, run `svn ‐‐version` again and you should see something like the following:

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

The `ra_neon` in that output means you can access `http://` style repos. Well done!

### Setting file flags

After quite a bit of time spent Googling around, I finally discovered this hint that supplies the magic answer to [giving Mac svn clients the ability to move and change files in a VisualSVN repo](http://blogs.noname-ev.de/commandline-tools/archives/33-svn-Cant-move-.svntmpentries-to-.svnentries-Operation-not-permitted.html). In Terminal, do the following:

1. `cd` to your svn working directory (e.g., `cd /Volumes/inetpub/andrew.hedges/` for me)
2. `chflags -R nouchg *`

I must admit, I only partially understand what that command does. I had tried just removing the “sticky bit” from the files and that did not do the trick, so obviously there is more to the story than just that.

### Configuring Coda

As you might expect, configuring Coda to work with your new svn binary is the easiest part of the whole process. Just go into Preferences > Files and change the "Subversion Tool Path" from the default `/usr/bin/svn` to `/usr/local/bin/svn` (assuming you followed the process above).

Alert readers may notice that I have neglected to mention an orthogonal problem, the “pesky dot-underscore files” issue that occurs when Mac OS X’s Finder interacts with files on a Windows file server. Others have [attempted to address](http://www.macworld.com/article/132556/2008/04/geekfactor2504.html) this one, but I have not seen any truly satisfactory solutions. That problem will have to wait for another day.

The one tip I will offer about that is to use [ToirtoiseSVN](http://tortoisesvn.tigris.org/) or some other Windows svn client to do the initial checkout. I was not able to successfully checkout VisualSVN repos using svn from the command-line.

Anyway, that should be all you need to do to get svn working on your Mac. Good luck!
