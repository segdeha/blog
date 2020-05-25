{
  "title": "The first 48 hours of PHP Function Reference, by the numbers",
  "slug": "the-first-48-hours-of-php-function-reference-by-the-numbers",
  "topics": ["PHP", "Widgets", "Apple", "Marketing"],
  "keywords": "php, php function reference, phpfr, widget, apple, dashboard, stats, downloads, s3, macupdate, versiontracker, s3 fox, firefox, opera, safari, windows, linux, snipurl, netnewswire, dashboard-dev, marketing, pr, athens, georgia, united states, iphone, Mike",
  "created_date": "2008-04-08 11:00:00",
  "short_url": "http://ahedg.es/22",
  "published": false
}

========

I thought I had it all sorted. I thought I had put together a foolproof way to track exactly how many times my <a href="http://andrew.hedges.name/widgets/#phpfr">PHP Function Reference</a> widget had been downloaded and from where. I was wrong.

========

<p class="outdent">Two years ago, when I first released PHPfr, I wasn&#8217;t prepared for the response. Thousands of downloads of the, then, 9.6MB file later, I found myself facing a hefty bill for bandwidth overages. To mitigate the issue, I cajoled some friends into mirroring the file and set up a download script that picked one of them at random for each request.</p>

<p>This time, I decided to simplify things and host the file on <a href="http://www.amazon.com/S3-AWS-home-page-Money/b/ref=sc_fe_l_2?ie=UTF8&node=16427261">Amazon S3</a>. (As an aside, this process was made about a gazillion times easier by the excellent <a href="https://addons.mozilla.org/en-US/firefox/addon/3247">S3 Fox</a> extension for Firefox.)</p>

<p>I still use the download script, so sites that linked to it would continue to work. The script also helps me track some basic information by writing records to a log file of each widget request. It tracks IP address, user agent, and referer (not just for PHPfr, but also for <a href="/widgets/">my other widgets</a>).</p>

<p>In the past, I&#8217;ve found the log file to be a bit unreliable. When 2 or more requests come in at essentially the same time, it munges the output. Now, I happened to put together my own <a href="http://segdeha.com/u/">URL shortening service</a> recently, sort of like <a href="http://snipurl.com/">SnipURL</a>, only with fewer features and longer URLs. So, I have pointed my download script at one of my shortened URLs that points at the S3 URL.</p>

<p>Some of the download sites to which I posted the widget (e.g., <a href="http://www.versiontracker.com/dyn/moreinfo/macosx/29415">VersionTracker</a> and <a href="http://www.macupdate.com/info.php/id/21082">MacUpdate</a>) expose stats for how many times a piece of software has been downloaded. Not so for <a href="http://www.apple.com/downloads/dashboard/developer/phpfunctionreference.html">Apple.com</a>. Add this to the fact that Apple prefer to point directly to the file and not to a download script like mine, and it becomes difficult to track how many downloads are coming from that source.</p>

<p>So, I have some numbers below, but there are some anomalies in there. One idea I have is that the discrepancies between the download log and the database has to do with users who double-click on links (writing to the log file may take enough time that it only counts a double-click as one click, whereas the database is able to capture both clicks). PHPfr is targeted at developers, so I&#8217;d be surprised if this was a very large number, but it could account for some of the difference.</p>

<p>The download log shows <strong>603</strong> requests for PHPfr, but the database shows <strong>860.</strong></p>

<p>Apple.com links directly to the file on Amazon S3, but S3 logs show only <strong>930</strong> downloads. I am <em>certain</em> there have been far more than 70 downloads from Apple.com in the last 2 days. In fact, it&#8217;s likely based on past performance that more downloads have come from Apple than from all other sources combined.</p>

<p>VersionTracker shows <strong>430</strong> downloads, but the database shows <strong>308</strong> requests from that referer.</p>

<p>MacUpdate shows <strong>338</strong> downloads, but the database shows <strong>219</strong> requests from that referer. What&#8217;s interesting about the MacUpdate numbers to me is that this site is performing much better relative to VersionTracker than it has in the past. Are they catching up in popularity? Is VersionTracker fading?</p>

<p>The following stats (except the S3 byte total) all come from the database, so they&#8217;re probably pretty accurate:</p>

<ul>
	<li><strong>3338427725</strong> bytes downloaded from S3 (1 download = 3589361 bytes)</li>
	<li><strong>488</strong> downloads by Safari users</li>
	<li><strong>390</strong> downloads directly from my widgets page</li>
	<li><strong>247</strong> downloads by Firefox users</li>
	<li><strong>48</strong> downloads by Windows users</li>
	<li><strong>26</strong> downloads from NetNewsWire</li>
	<li><strong>17</strong> downloads from Apple.com before they changed the download link from my redirect script to a direct file download</li>
	<li><strong>16</strong> downloads from <a href="http://www.myosxfreeware.com/php-function-reference-10/">MyOSXFreeware.com</a></li>
	<li><strong>8</strong> downloads by Opera users</li>
	<li><strong>3</strong> downloads by Linux users</li>
	<li><strong>1</strong> download from an iPhone, curiously by someone in Florence, Italy</li>
</ul>

<p>The <strong>1st</strong> download was by someone in Athens, Georgia, United States (I&#8217;d love to know who you are!).</p>

<p>With better access to a geolocation service, I could provide a breakdown of where the downloads are coming from, geographically. For example, I know I&#8217;m getting a lot of downloads from Italy because of a posting on <a href="http://www.tevac.com/article.php/2008040801310163">a prominent Mac site there</a>. If anyone knows a <em>free</em> way to geolocate IP addresses <em>in bulk,</em> <a href="mailto:andrew@hedges.name">let me know!</a></p>

<p>I&#8217;m providing these detailed numbers a) because I can, and b) to give other widget developers a baseline against which to compare their own marketing efforts. I think promoting our work is an area&#8212;perhaps because a lot of us are doing this on-the-side&#8212;where widget makers are not as effective as we could be.</p>

<p>I <a href="http://lists.apple.com/archives/dashboard-dev/2008/Mar/msg00060.html">asked</a> the Dashboard-Dev mailing list for tips for best marketing PHPfr. I received just one <a href="http://lists.apple.com/archives/dashboard-dev/2008/Mar/msg00061.html">response</a>, from Mike Filippone. Most of what he said, I knew from my own experience, but he did remind me about the importance of hitting the right spot in the news cycle. I tried my best to wait until Monday morning (in the States) to release the widget, but I ended up jumping the gun a little when VersionTracker noticed that I changed <a href="/widgets/">my widgets page</a> on Sunday evening.</p>

<p>I also hit a bunch of Mac- and PHP-related blogs and forums with a quick note about the release. This is a bit spammy of me, but I did limit myself only to forums where I thought people would be truly interested. The response has been uniformly positive.</p>

<p>So, that&#8217;s it. The first 2 days of PHPfr 1.0 have come and gone. I&#8217;m pleased with the results. Next time, the only thing I think I&#8217;d change is to be more disciplined about when I update my website.</p>
