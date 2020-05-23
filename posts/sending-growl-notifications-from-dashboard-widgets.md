{
  "title": "Sending Growl notifications from Dashboard widgets",
  "slug": "sending-growl-notifications-from-dashboard-widgets",
  "topics": [
    "Apple",
    "AppleScript",
    "Dashboard",
    "JavaScript",
    "Widgets"
  ],
  "keywords": "apple, dashboard, widget, growl, growlhelperapp, applescript, javascript, notifications, mac, os x, hurler, trimit, osascript, url, shortener",
  "created_date": "2009-03-14 15:14:15",
  "short_url": "http://ahedg.es/67",
  "published": true
}

========

Recently, on [Dashboard-Dev](http://lists.apple.com/mailman/listinfo/dashboard-dev), Aaron Vizzini [asked](http://lists.apple.com/archives/Dashboard-dev/2009/Mar/msg00015.html) how to integrate [Growl](http://growl.info/) notifications into Dashboard widgets. I just did this in [Hurler](http://andrew.hedges.name/widgets/#hurler) and [tr.im.it](http://andrew.hedges.name/widgets/#trimit), so I am happy to document the process here.

========

Growl, if you’re not familiar, is a notification system for [Mac OS X](http://www.apple.com/macosx/). It allows any application to notify you when it has, for example, finished uploading a file or changed the currently playing music track. Growl supports [AppleScript](http://www.apple.com/applescript/), and that’s all it takes to know we can use it within Dashboard.

My use case was that users of my URL shortening widgets wanted to be able to exit Dashboard and be notified when the URL had been shortened and copied to the pasteboard. I didn’t think of this initially because the process is quite fast, but Hurler user [Barry Briggs](https://twitter.com/quiffboy) contacted me on Twitter and asked for it because he happens to run about a gazillion virtual machines at a time which slows his system down quite a bit. A day later, Hurler (and tr.im.it) had Growl support.

**Note:** the code I share below isn’t exactly what you’ll find if you explore the current versions of my widgets. I have generalized the code to make it more immediately useful to other widget authors. It’s all tested, though, and this code will go out in their next releases.

Here’s an overview of what I’m about to show you.

1. Some JavaScript that checks for the presence of Growl, then executes the notification command
2. The shell script I use to check for the presence of Growl
3. The AppleScript I use to compose and send the notification

First, the JavaScript.

<pre class="sh_javascript">
widget.system('growl-enabled.sh', function (obj) {
   var cmd;
   if (+obj.outputString > 0) {
      cmd = '/usr/bin/osascript growl-notify.scpt ' +
         '"URL shortened" "Hurler Widget" "Dashboard" ' +
         '"http://hurl.ws/1bgq" "The URL has been shortened."';
      widget.system(cmd, function (obj) {});
   }
});
</pre>

This script makes a <code>widget.system</code> call, running the <code>growl-enabled.sh</code> shell script. When the shell script returns, it’s value is passed into the anonymous callback function.

The shell script is quite simple. It invokes the command-line utility <code>osascript</code> and runs a simple AppleScript asking for a count of the number of processes named "GrowlHelperApp". If Growl is enabled, the script returns a 1. Otherwise, the script returns a 0.

<pre class="sh_sh">
#!/bin/sh
osascript<<END
tell application "System Events"
   return count of (every process whose name is "GrowlHelperApp")
end tell
END
</pre>

If Growl is enabled, the JavaScript goes on to compose the command that will make the Growl notification happen. The command consists of calling `osascript` and passing it the following 6 parameters, in order:

<dl>
  <dt><code>growl-notify.scpt</code></dt>
    <dd>The path to the Growl notification AppleScript<br><br></dd>
  <dt><code>"URL shortened"</code></dt>
    <dd>The notification name<br><br></dd>
  <dt><code>"Hurler Widget"</code></dt>
    <dd>The name of the application requesting the notification<br><br></dd>
  <dt><code>"Dashboard"</code></dt>
    <dd>The name of the application whose icon we will show in the notification<br><br></dd>
  <dt><code>"http://hurl.ws/1bgq"</code></dt>
    <dd>The title of the notification (in this case, the result of the URL shortening call)<br><br></dd>
  <dt><code>"The URL has been shortened."</code></dt>
    <dd>The notification description</dd>
</dl>

`osascript` runs `growl-notify.scpt` and passes the other parameters to it. The AppleScript to make the notification request is as follows:

<pre class="sh_pascal">
on run argv
   tell application "GrowlHelperApp"
      set the allNotificationsList to {item 1 of argv}
      set the enabledNotificationsList to {item 1 of argv}
      register as application ¬
         item 2 of argv all notifications allNotificationsList ¬
         default notifications enabledNotificationsList ¬
         icon of application item 3 of argv
      notify with name ¬
         item 1 of argv title item 4 of argv ¬
         description ¬
         item 5 of argv application name item 2 of argv
   end tell
end run
</pre>

I won’t explain this in too much detail as AppleScript is fairly self-explanatory and this script is largely lifted from the [Growl documentation](http://growl.info/documentation/applescript-support.php), where it is explained in detail. I will point out that `on run argv` sets up an array of the arguments passed to the script, which are then accessed by asking for `item 1 of argv` (`"URL shortened"`), `item 2 of argv` (`"Hurler Widget"`), and so on.

> Download [growl-notify.scpt](http://segdeha.com/blog/assets/files/growl-notify.scpt.zip)

That’s it. I hope this is helpful. Post any questions or suggestions in the comments. Happy Growling!
