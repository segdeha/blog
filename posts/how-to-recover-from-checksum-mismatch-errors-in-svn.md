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
  "published": false
}

========

You know <a href="http://www.panic.com/coda/">Coda</a>, the text editor I sometimes <a href="http://andrew.hedges.name/blog/2008/08/27/coda-1-dot-5-is-the-bees-knees">rave</a> about? Like many text editors, it has this handy feature for doing global searches and replaces. But, unlike any other I've ever seen, it will happily, and without prompting for an administrator password, let you replace text in files for which you don't have permission to write. You know, like <a href="http://subversion.tigris.org/">Subversion</a> repo copies. D'oh!

========

<p class="outdent">Don't get me wrong. I love Coda. I love it enough to choose to spend most of every day with it front-and-center on my screen. But, for the life of me, I can't imagine why it allows me to replace, without prompting me for an administrator password, text in a file with the following permissions:</p>

<pre>-r--r--r--</pre>

<p><em>For the uninitiated, the distinct lack of w's in that line is </em>supposed<em> to mean that the file is read-only.</em></p>

<blockquote style="text-align: center;">
  <a href="#enough-already">Enough, already! Show me how to fix it!</a>
</blockquote>

<p>Whatever the reason, Coda changed the files, which just happened to be the Subversion (SVN) reference versions of some of my repository files. The next time I tried to commit changes to my repository, I got an error message something like the following:</p>

<pre>svn: Checksum mismatch for '.svn/text-base/blah.ext'; 
expected: 'f8d45250f7df5561635854165862fdd8', 
actual: '644f85c4befa671150c5c6ec5fad9885'</pre>

<p>The above is actually taken straight from an article called "<a href="http://glob.bushi.net.nz/glob/2007/02/14/subversion-checksum-mismatch-easy-workaround/">subversion checksum mismatch - easy workaround</a>." I'm glad I found the article because it helped me fix the problem. Contrary to the title of the blog post, however, I didn't find Chris's instructions all that clear, so I thought I'd take a shot at explaining it in a way that is maybe a little easier to follow.</p>

<h3>A side trip down Background Lane</h3>

<p><em>Feel free to <a href="#enough-already">skip this section</a> if you are familiar with <a href="http://en.wikipedia.org/wiki/Subversion_(software)">how SVN works</a> or are just in a hurry to fix your issue and get on with life!</em></p>

<p>SVN is software that helps you track revisions to files. As such, it is very important for SVN to know when a file changes. SVN stores information about every change made to files under its control locally in plain text files inside hidden <code>.svn</code> directories. Trust me, you don't want to edit those files directly.</p>

<p>Before committing (saving) a file, SVN compares the latest revision of the file in the repository with the corresponding, locally saved, latest revision. Actually, it doesn't compare the files directly. Instead, it compares the <a href="http://en.wikipedia.org/wiki/Checksum">checksums</a>. A checksum is a shortened hash that represents the contents of a file. If the checksum for a file changes, you know it has been altered.</p>

<p>Once you change a file, it's really hard to get it back to its original state for the purposes of this check. Directly putting back the text that was changed didn't work for me. I don't know exactly how checksums are calculated, but it could be that they're based on the contents of the file plus some meta-data (like the last modified date) or else I just missed some of the changes.</p>

<p>In any case, I was having a bugger of a time with this, until I discovered the above-linked article. Then, I was, to quote <a href="http://www.youtube.com/watch?v=1Xmlb3ZRPuU">The Proclaimers</a>, on my way from misery to happiness. Uh-huh. Uh-huh.</p>

<h3><a name="enough-already"></a>Enough, already! Show me how to fix it!</h3>

<p>The process we will follow to restore the repo to a state where we can commit entails the following steps:</p>

<ol>
  <li>Check out the latest revision of the corrupted directory into a temporary directory</li>
  <li>Delete the munged SVN revision files</li>
  <li>Copy the correct SVN revision files into the working directory</li>
</ol>

<p>As you can see, it's not difficult. You just have to know where to look for the correct files to swap out.</p>

<p>A benefit of my way over <a href="http://stackoverflow.com/questions/6130/repair-svn-checksum">other procedures I've seen described</a> is that I didn't have to do anything special to get back to a state where I could commit the latest changes I had made. After doing the above, SVN told me I had changes to commit. I committed them, and I was done.</p>

<p><strong>Ominous disclaimer:</strong> what I am describing worked for me, for text files. It may not work for you. It should work for binary files, but I haven't personally tried it. Following this procedure, you may lose your life's work, putting you on an irreversible path to destitution and despair. <strong>You have been warned.</strong></p>

<p>OK, now that you're too scared out of your wits to try them, know that these steps have <a href="http://en.wikipedia.org/wiki/Face_validity">face validity</a> and worked in my case. If that's enough assurance for you, let's get this road on the show.</p>

<p>The following are the commands I used to restore my repo. The paths and filenames have been changed to protect the innocent. Also, I am describing the process for Mac OS X, so if you're on a different operating system, make the proper adjustments.</p>

<ol>
  <li>Open Terminal.app or your command line interface of choice</li>
  <li>Change to a directory that is not under version control. <code>/tmp</code> works nicely:<br><br><code>$ cd /tmp</code><br><br></li>
  <li>Checkout the latest revision of the corrupted directory:<br><br><code>$ svn co svn://me@myserver/path/to/directory</code><br><br></li>
  <li>Change into the directory that holds the SVN revision files:<br><br><code>$ cd directory/.svn/text-base/</code><br><br></li>
  <li>Open a <em>second</em> terminal window and change into the directory with the corrupted revision files:<br><br><code>$ cd /path/to/working/directory/.svn/text-base/</code><br><br>At this point, if you were to list the contents of the <code>text-base</code> directories in both windows, they should be identical and consist of a list something like the following:<br><br><code>$ ls -la</code><br><br><code>drwxr-xr-x  31 andrew  andrew   1054 24 Jan 14:52 .<br>
drwxr-xr-x   8 andrew  andrew    272 25 Jan 15:50 ..<br>
-r--r--r--   1 andrew  andrew    198 16 Nov 18:21 .project.svn-base<br>
-r--r--r--   1 andrew  andrew     27 19 Dec 09:27 myTextFile.svn-base</code><br><br></li>
  <li>In the <em>second</em> window (the one with your working copy), delete the corrupted revision files. If you know which one(s) they are, just delete them. Otherwise, you can delete everything in this directory:<br><br><code>$ sudo rm *</code><br><br>(Note for the paranoid: you could backup this directory before performing this step if you want. I figured why bother since it's corrupted already and I had a backup in the form of the newly checked out version in <code>/tmp</code>)</li>
  <li>Back in the <em>first</em> window, copy the contents of the <code>text-base</code> directory into your working directory:<br><br><code>$ sudo cp * /path/to/working/directory/.svn/text-base/</code></li>
</ol>

<p>That's it. You should now be able to commit to your heart's content.</p>


