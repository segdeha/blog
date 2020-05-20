{
  "title": "Merge folders with Transmit",
  "slug": "merge-folders-with-transmit",
  "topics": [
    "Apple"
  ],
  "keywords": "merge, folders, macintosh, mac, two, folders, awesome, utility, folder, merging, feature, transmit, panic, preferences",
  "created_date": "2007-01-16 16:16:16",
  "short_url": "http://ahedg.es/7",
  "published": true
}

========

Maybe I missed it, but I don’t see a good solution on the Mac for merging folders full of files. Well, today I really needed to do just that, so I figured out a way using only Panic’s excellent ftp program <a href="http://www.panic.com/transmit/">Transmit</a>.

========

Today, my hard drive filled up. I guess it was the combination of the new <a href="http://www.dpreview.com/news/0607/06071905panasonicfz50.asp">camera</a> I got for Christmas, the <a href="http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewAlbum?id=75022496&s=143441">two-disc best of Pink Floyd set</a> I ripped recently, and the 1.2GB video podcast I downloaded of the recent <a href="http://www.apple.com/iphone/">iPhone</a> unveiling that did it. Whatever the cause, I needed to archive some bytes and didn’t want to spend all day doing it.

<div class="photo-left">
	<p>
		<img src="https://segdeha.com/blog/assets/imgs/system_prefs.png" alt="Sharing preference pane">
		Step 1 Turn on "FTP Access"<br>
		(if it’s not already)<br>
		in the Sharing preference pane<br>
		of the System Preferences.
	</p>
	<p>
		<img src="https://segdeha.com/blog/assets/imgs/transmit.png" alt="Transmit interface">
		Step 2 Use Transmit to connect<br>
		to your Mac as if it were a<br>
		remote server.
	</p>
	<p>
		<img src="https://segdeha.com/blog/assets/imgs/merge_panel.png" alt="Transmit’s merge files dialog">
		Step 3 Start your download.<br>
		When presented with the option,<br>
		choose to "Merge" the folders.
	</p>
</div>

My first stop on the merging folders express was FileMerge, a utility included with Apple’s <a href="http://www.apple.com/macosx/features/xcode/">Xcode</a>. It looked like it might do the trick (and was even <a href="http://www.macworld.com/weblogs/macosxhints/2006/03/cmpfldr/">recommended</a> by a prominent Mac mag), but apparently it compares not only the contents of two folders, but the contents of the <em>files</em> in two folders. (Which makes sense, considering it is used by programmers to find differences between source files.)</p>
<p>Needless to say, my PowerBook’s meager 1GHz G4 processor was quickly overwhelmed trying to compare a couple thousand big, binary MP3 and AAC files.

After force quitting FileMerge, I thought to myself, "Self, all I need is something like Transmit’s merge folders feature." Then it struck me. Why not use my Mac’s built-in ftp server to fool Transmit into thinking it’s connected to a remote server? Then, I <strong>can</strong> use the merge folders feature!

Sure enough, it worked like a charm with sustained copies of over 4500 KB/s from my built-in hard drive to the USB 2.0 external drive to which I was backing up. To the left is the step-by-step for those who wish to duplicate this awesome feat of folder mergerality.

The only issue I ran into is that Transmit seems to need to confirm whether to skip or replace files on a folder-by-folder basis. Even so, this technique is about a <a href="http://en.wikipedia.org/wiki/Gazillion">gazillion</a> times faster than tyring to merge two big folders by hand.
