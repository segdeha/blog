{
  "title": "The first 48 hours of PHP Function Reference, by the numbers",
  "slug": "the-first-48-hours-of-php-function-reference-by-the-numbers",
  "topics": ["PHP", "Widgets", "Apple", "Marketing"],
  "keywords": "php, php function reference, phpfr, widget, apple, dashboard, stats, downloads, s3, macupdate, versiontracker, s3 fox, firefox, opera, safari, windows, linux, snipurl, netnewswire, dashboard-dev, marketing, pr, athens, georgia, united states, iphone, Mike",
  "created_date": "2008-04-08 11:00:00",
  "short_url": "http://ahedg.es/22",
  "deprecated": true,
  "published": true
}

========

I thought I had it all sorted. I thought I had put together a foolproof way to track exactly how many times my [PHP Function Reference](https://andrew.hedges.name/widgets/#phpfr) widget had been downloaded and from where. I was wrong.

========

Two years ago, when I first released PHPfr, I wasn’t prepared for the response. Thousands of downloads of the, then, 9.6MB file later, I found myself facing a hefty bill for bandwidth overages. To mitigate the issue, I cajoled some friends into mirroring the file and set up a download script that picked one of them at random for each request.

This time, I decided to simplify things and host the file on [Amazon S3](https://www.amazon.com/S3-AWS-home-page-Money/b/ref=sc_fe_l_2?ie=UTF8&node=16427261). (As an aside, this process was made about a gazillion times easier by the excellent [S3 Fox](https://addons.mozilla.org/en-US/firefox/addon/3247) extension for Firefox.)

I still use the download script, so sites that linked to it would continue to work. The script also helps me track some basic information by writing records to a log file of each widget request. It tracks IP address, user agent, and referer (not just for PHPfr, but also for [my other widgets](/widgets/)).

In the past, I’ve found the log file to be a bit unreliable. When 2 or more requests come in at essentially the same time, it munges the output. Now, I happened to put together my own [URL shortening service](https://segdeha.com/u/) recently, sort of like [SnipURL](https://snipurl.com/), only with fewer features and longer URLs. So, I have pointed my download script at one of my shortened URLs that points at the S3 URL.

Some of the download sites to which I posted the widget (e.g., [VersionTracker](https://www.versiontracker.com/dyn/moreinfo/macosx/29415) and [MacUpdate](https://www.macupdate.com/info.php/id/21082)) expose stats for how many times a piece of software has been downloaded. Not so for [Apple.com](https://www.apple.com/downloads/dashboard/developer/phpfunctionreference.html). Add this to the fact that Apple prefer to point directly to the file and not to a download script like mine, and it becomes difficult to track how many downloads are coming from that source.

So, I have some numbers below, but there are some anomalies in there. One idea I have is that the discrepancies between the download log and the database has to do with users who double-click on links (writing to the log file may take enough time that it only counts a double-click as one click, whereas the database is able to capture both clicks). PHPfr is targeted at developers, so I’d be surprised if this was a very large number, but it could account for some of the difference.

The download log shows **603** requests for PHPfr, but the database shows **860.**

Apple.com links directly to the file on Amazon S3, but S3 logs show only **930** downloads. I am _certain_ there have been far more than 70 downloads from Apple.com in the last 2 days. In fact, it’s likely based on past performance that more downloads have come from Apple than from all other sources combined.

VersionTracker shows **430** downloads, but the database shows **308** requests from that referer.

MacUpdate shows **338** downloads, but the database shows **219** requests from that referer. What’s interesting about the MacUpdate numbers to me is that this site is performing much better relative to VersionTracker than it has in the past. Are they catching up in popularity? Is VersionTracker fading?

The following stats (except the S3 byte total) all come from the database, so they’re probably pretty accurate:

* **3338427725** bytes downloaded from S3 (1 download = 3589361 bytes)
* **488** downloads by Safari users
* **390** downloads directly from my widgets page
* **247** downloads by Firefox users
* **48** downloads by Windows users
* **26** downloads from NetNewsWire
* **17** downloads from Apple.com before they changed the download link from my redirect script to a direct file download
* **16** downloads from [MyOSXFreeware.com](https://www.myosxfreeware.com/php-function-reference-10/)
* **8** downloads by Opera users
* **3** downloads by Linux users
* **1** download from an iPhone, curiously by someone in Florence, Italy

The **1st** download was by someone in Athens, Georgia, United States (I’d love to know who you are!).

With better access to a geolocation service, I could provide a breakdown of where the downloads are coming from, geographically. For example, I know I’m getting a lot of downloads from Italy because of a posting on [a prominent Mac site there](https://www.tevac.com/article.php/2008040801310163). If anyone knows a _free_ way to geolocate IP addresses _in bulk,_ [let me know!](mailto:andrew@hedges.name)

I’m providing these detailed numbers a) because I can, and b) to give other widget developers a baseline against which to compare their own marketing efforts. I think promoting our work is an area—perhaps because a lot of us are doing this on-the-side—where widget makers are not as effective as we could be.

I [asked](https://lists.apple.com/archives/dashboard-dev/2008/Mar/msg00060.html) the Dashboard-Dev mailing list for tips for best marketing PHPfr. I received just one [response](https://lists.apple.com/archives/dashboard-dev/2008/Mar/msg00061.html), from Mike Filippone. Most of what he said, I knew from my own experience, but he did remind me about the importance of hitting the right spot in the news cycle. I tried my best to wait until Monday morning (in the States) to release the widget, but I ended up jumping the gun a little when VersionTracker noticed that I changed [my widgets page](/widgets/) on Sunday evening.

I also hit a bunch of Mac- and PHP-related blogs and forums with a quick note about the release. This is a bit spammy of me, but I did limit myself only to forums where I thought people would be truly interested. The response has been uniformly positive.

So, that’s it. The first 2 days of PHPfr 1.0 have come and gone. I’m pleased with the results. Next time, the only thing I think I’d change is to be more disciplined about when I update my website.
