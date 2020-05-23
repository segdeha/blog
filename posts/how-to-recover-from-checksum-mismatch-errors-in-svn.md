{
  "title": "How-to recover from checksum mismatch errors in SVN",
  "slug": "how-to-recover-from-checksum-mismatch-errors-in-svn",
  "topics": [
    "Coda",
    "Subversion (SVN)",
    "Web Development"
  ],
  "keywords": "svn, subversion, coda, checksum, mismatch, expected, actual, recover, how-to, sudo, fix, fixing, problem, solution, easy, quick",
  "created_date": "2009-01-25 17:17:17",
  "short_url": "http://ahedg.es/60",
  "published": true
}

========

You know [Coda](http://www.panic.com/coda/), the text editor I sometimes [rave](http://andrew.hedges.name/blog/2008/08/27/coda-1-dot-5-is-the-bees-knees) about? Like many text editors, it has this handy feature for doing global searches and replaces. But, unlike any other I’ve ever seen, it will happily, and without prompting for an administrator password, let you replace text in files for which you don’t have permission to write. You know, like [Subversion](http://subversion.tigris.org/) repo copies. D’oh!

========

Don’t get me wrong. I love Coda. I love it enough to choose to spend most of every day with it front-and-center on my screen. But, for the life of me, I can’t imagine why it allows me to replace, without prompting me for an administrator password, text in a file with the following permissions:

    -r--r--r--

_For the uninitiated, the distinct lack of w’s in that line is_ supposed _to mean that the file is read-only._

> [Enough, already! Show me how to fix it!](#enough-already)

Whatever the reason, Coda changed the files, which just happened to be the Subversion (SVN) reference versions of some of my repository files. The next time I tried to commit changes to my repository, I got an error message something like the following:

    svn: Checksum mismatch for '.svn/text-base/blah.ext';
    expected: 'f8d45250f7df5561635854165862fdd8',
    actual: '644f85c4befa671150c5c6ec5fad9885'

The above is actually taken straight from an article called “[subversion checksum mismatch - easy workaround](http://glob.bushi.net.nz/glob/2007/02/14/subversion-checksum-mismatch-easy-workaround/).” I’m glad I found the article because it helped me fix the problem. Contrary to the title of the blog post, however, I didn’t find Chris’s instructions all that clear, so I thought I’d take a shot at explaining it in a way that is maybe a little easier to follow.

### A side trip down Background Lane

_Feel free to [skip this section](#enough-already) if you are familiar with [how SVN works](http://en.wikipedia.org/wiki/Subversion_(software)) or are just in a hurry to fix your issue and get on with life!_

SVN is software that helps you track revisions to files. As such, it is very important for SVN to know when a file changes. SVN stores information about every change made to files under its control locally in plain text files inside hidden `.svn` directories. Trust me, you don’t want to edit those files directly.

Before committing (saving) a file, SVN compares the latest revision of the file in the repository with the corresponding, locally saved, latest revision. Actually, it doesn’t compare the files directly. Instead, it compares the [checksums](http://en.wikipedia.org/wiki/Checksum). A checksum is a shortened hash that represents the contents of a file. If the checksum for a file changes, you know it has been altered.

Once you change a file, it’s really hard to get it back to its original state for the purposes of this check. Directly putting back the text that was changed didn’t work for me. I don’t know exactly how checksums are calculated, but it could be that they’re based on the contents of the file plus some meta-data (like the last modified date) or else I just missed some of the changes.

In any case, I was having a bugger of a time with this, until I discovered the above-linked article. Then, I was, to quote [The Proclaimers](http://www.youtube.com/watch?v=1Xmlb3ZRPuU), on my way from misery to happiness. Uh-huh. Uh-huh.

<a name="enough-already"></a>
### Enough, already! Show me how to fix it!

The process we will follow to restore the repo to a state where we can commit entails the following steps:

1. Check out the latest revision of the corrupted directory into a temporary directory
2. Delete the munged SVN revision files
3. Copy the correct SVN revision files into the working directory

As you can see, it’s not difficult. You just have to know where to look for the correct files to swap out.

A benefit of my way over [other procedures I’ve seen described](http://stackoverflow.com/questions/6130/repair-svn-checksum) is that I didn’t have to do anything special to get back to a state where I could commit the latest changes I had made. After doing the above, SVN told me I had changes to commit. I committed them, and I was done.

**Ominous disclaimer:** what I am describing worked for me, for text files. It may not work for you. It should work for binary files, but I haven’t personally tried it. Following this procedure, you may lose your life’s work, putting you on an irreversible path to destitution and despair. **You have been warned.**

OK, now that you’re too scared out of your wits to try them, know that these steps have [face validity](http://en.wikipedia.org/wiki/Face_validity) and worked in my case. If that’s enough assurance for you, let’s get this road on the show.

The following are the commands I used to restore my repo. The paths and filenames have been changed to protect the innocent. Also, I am describing the process for Mac OS X, so if you’re on a different operating system, make the proper adjustments.

1. Open Terminal.app or your command line interface of choice
2. Change to a directory that is not under version control. `/tmp` works nicely: `$ cd /tmp`
3. Checkout the latest revision of the corrupted directory: `$ svn co svn://me@myserver/path/to/directory`
4. Change into the directory that holds the SVN revision files: `$ cd directory/.svn/text-base/`
5. Open a _second_ terminal window and change into the directory with the corrupted revision files: `$ cd /path/to/working/directory/.svn/text-base/` At this point, if you were to list the contents of the `text-base` directories in both windows, they should be identical and consist of a list something like the following: `$ ls -la` `drwxr-xr-x  31 andrew  andrew   1054 24 Jan 14:52 .<br>
drwxr-xr-x   8 andrew  andrew    272 25 Jan 15:50 ..<br>
-r--r--r--   1 andrew  andrew    198 16 Nov 18:21 .project.svn-base<br>
-r--r--r--   1 andrew  andrew     27 19 Dec 09:27 myTextFile.svn-base`
6. In the _second_ window (the one with your working copy), delete the corrupted revision files. If you know which one(s) they are, just delete them. Otherwise, you can delete everything in this directory: `$ sudo rm *` (Note for the paranoid: you could backup this directory before performing this step if you want. I figured why bother since it’s corrupted already and I had a backup in the form of the newly checked out version in `/tmp`)
7. Back in the _first_ window, copy the contents of the `text-base` directory into your working directory: `$ sudo cp * /path/to/working/directory/.svn/text-base/`

That’s it. You should now be able to commit to your heart’s content.
