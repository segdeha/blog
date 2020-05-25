{
  "title": "Widget Localization",
  "slug": "widget-localization",
  "topics": [
    "New Mexico",
    "Widgets"
  ],
  "keywords": "clearwired, loop, dashboard, widget, sundial, localization, i18n",
  "created_date": "2006-09-28 09:28:00",
  "short_url": "http://ahedg.es/45",
  "published": false
}

========

<a href="http://www.clearwired.com/loop/archives/21-What-Sundial-Taught-Me.html">Sundial taught me</a> how to localize <a href="http://www.apple.com/macosx/features/dashboard/">Dashboard</a> widgets. It's pretty painless, really. If you're not doing it already, hopefully this article will inspire you.

========

<h3>Easier Than You Might Think</h3>

<p class="outdent">Before developing <a href="http://www.clearwired.com/sundial/">Sundial</a>, the closest I had come to localizing a widget was making it so my <a href="http://andrew.hedges.name/widgets/#phpfr">PHP Function Reference</a> widget could read all of the available language versions of the <a href="http://www.php.net/">PHP</a> documentation. Fully localizing Sundial was actually easier.</p>

<p>Conceptually, the process is pretty simple: replace all strings in your widget with calls to a <a href="http://en.wikipedia.org/wiki/JavaScript">JavaScript</a> function that pulls the correct string from an associative array populated based on the user's language preferences as set in the International pane of her System Preferences.</p>

<div class="photo-left">
  <p>
    <img src="/blog/assets/imgs/the-loop/sundial_localized.png" alt="Sundial, localized"><br />
  Sundial in English & French
  </p>
  <p>
    <img src="/blog/assets/imgs/the-loop/International.png" alt="International pane of System Preferences"><br />
  My system's International preference pane
  </p>
  <p>
    <img style="width: 239px;" src="/blog/assets/imgs/the-loop/sundial_in_skedit.png" alt="Sundial folder structure"><br />
  Sundial's folder organization
  </p>
</div>

<p>In <a href="http://www.apple.com/macosx/">Mac OS X</a>, users set up a cascade of languages by reordering the list in the International preference pane. Whichever language is listed first is the one the system looks for first when opening a new application. If resources for that language are not found, the system looks for resources related to the next language in the list, and so on. This applies to widgets as well, provided they are organized and programmed in a <a href="http://developer.apple.com/documentation/AppleApplications/Conceptual/Dashboard_ProgTopics/Articles/Localization.html">certain way</a>.</p>

<h3>Organizing Your Widget's Structure</h3>

<p>The first thing I did was set up Sundial's folder structure to contain <code>xx.lproj</code> folders, at the root of the widget bundle, for each langauge into which the widget would be localized (where "<code>xx</code>" is replaced with the language's two-letter code). Sundial 1.0 shipped with English and French localizations, so it contained <code>en.lproj</code> and <code>fr.lproj</code> folders as shown in this screenshot from my <a href="http://www.clearwired.com/loop/archives/23-skEdit,-The-Mostly-Perfect-Text-Editor.html">skEdit</a> project view.</p>

<p>You'll notice four files in my <code>xx.lproj</code> folders: <code>Info.plist</code>, <code>LocalizedStrings.js</code>, and two image files. It is possible to localize any subset of the strings in your widget's <code>Info.plist</code> file, all of the strings in your widget's interface (of course), and even images. In the case of Sundial, the "Save Entry" button is actually an image, so we include both French and English versions here.</p>

<p><a href="http://developer.apple.com/documentation/AppleApplications/Conceptual/Dashboard_ProgTopics/Articles/Localization.html#//apple_ref/doc/uid/TP40003047-DontLinkElementID_47">Apple recommends</a> localizing the name of your widget, if possible, so we do this in <code>fr.lproj/Info.plist</code> by setting <code>CFBundleDisplayName</code> and <code>CFBundleName</code> to "Cadran Solaire" (we don't bother redefining the other keys because they're mostly version numbers and such).</p>

<p><code>LocalizedStrings.js</code> is where most of the heavy lifting occurs. (To keep things simple, this file--like all of your widget files--should be encoded as <a href="http://en.wikipedia.org/wiki/UTF-8">UTF-8</a>.) <code>LocalizedStrings.js</code> populates an associative JavaScript array with a series of keys and values. The keys consist of the default (in our case English) text for all of Sundial's strings. The values are the translated versions of the strings.</p>

<p>Using the full strings as the keys in the <code>LocalizedStrings</code> array is quite clever, actually. The JavaScript function (<a href="#javascript_localization_function">shown below</a>) used to pull the strings is designed to return the key if a related value is not found. That way, you're never left with a textual hole in your interface. Keeping all of your strings in one single-purpose file also keeps things simple for your translators.</p>

<p>One thing that wasn't clear to me from Apple's documentation was how I was supposed to include the <code>LocalizedStrings.js</code> file into my widget. After some experimentation, I figured out that this is how it's done:</p>

<pre class="sh_html">
<script type="text/javascript" \
    src="LocalizedStrings.js" charset="utf-8">
</script>
</pre>

<p>Notice I don't specify the full path to the file (e.g., <code>en.lproj/LocalizedStrings.js</code>). This is where the magic happens. By <strong>not</strong> specifying the path, I leave it up to OS X to find the file corresponding to my language settings. Slick.</p>

<p>Ditto with images. To localize an image, <strong>don't</strong> specify the full path to it. I found it a little counter-intuitive at first, but quickly got over it.</p>

<pre class="sh_html">
<img src="logtime_button.png" alt="" />
</pre>

<h3>Something Borrowed, Something Blue</h3>

<p>I "borrowed" the following JavaScript localization function straight from <a href="http://developer.apple.com/documentation/AppleApplications/Conceptual/Dashboard_ProgTopics/Articles/Localization.html#//apple_ref/doc/uid/TP40003047-DontLinkElementID_46">Apple's tutorial</a> on the subject:</p>

<pre class="sh_javascript">
function getLocalizedString(key) {
    try {
        var ret = LocalizedStrings[key];
        if (ret === undefined) ret = key;
        return ret;
    } catch (ex) {}
    return key;
}
</pre>

<p>Here's a breakdown of what <code>getLocalizedString()</code> does:</p>

<ol>
  <li>Take a string as the <code>key</code> argument</li>
  <li>Look in <code>LocalizedStrings</code> for an entry matching <code>key</code> – <em>this is where OS X reads your language preferences and searches the <code>LocalizedStrings</code> array in your corresponding <code>xx.lproj</code> folders until it finds the proper string to return</em></li>
  <li>If a match is found, return it</li>
  <li>Otherwise, return <code>key</code></li>
  <li>If something goes horribly wrong (that's the <code>try/catch</code> part of it), return <code>key</code></li>
</ol>

<h3>Displaying Localized Strings in Your Interface</h3>

<p>Now we have most of the pieces in place to localize our widget. The only thing that's left is to actually pull the strings defined in <code>LocalizedStrings.js</code> into our interface.</p>

<p>Displaying a particular string is as simple as calling <code>getLocalizedString()</code> and putting the result in the <code>innerHTML</code> or <code>value</code> property of the element. Here's an example:</p>

<p><strong>HTML Snippet:</strong></p>

<pre class="sh_html">
<div id="status"></div>
</pre>

<p><strong>Corresponding JavaScript:</strong></p>

<pre class="sh_javascript">
document.getElementById('status').innerHTML = \
    getLocalizedString('Status: Ready');
</pre>

<p>If your language preferences are set to English, you'll see "Status: Ready" in Sundial's status bar. If your language preferences are set to French, you'll see "Statut: Prêt". It's that easy!</p>

<p>In Sundial, I defined a string intialization function that is called when the widget loads. This string goes through all the spots in the interface with text and calls <code>getLocalizedString()</code> on them. Then, whenever I change text in response to a user action, I just use <code>getLocalizedString()</code> to replace the old text with the new.</p>

<h3>The Hardest Part</h3>

<p>The hardest part of localization is managing the added complexity of maintaining <em>n</em> versions of all of your strings. In Sundial, we got our feet wet by including just two languages at the launch. The next version will include between three and <span class="tooltip" title="Brazilian Portuguese, Dutch, Norwegian, Portuguese, Romanian, Russian, Spanish, and Turkish">eight</span> more! In our case, no one on our staff is bilingual enough to translate a technical interface, so we are working with different individuals for every language version. By nature, that slows things down a bit as we wait for nearly a dozen people to find (volunteer!) time to respond to requests for additional strings as we add them.</p>

<h3>In Conclusion</h3>

<p>If you want your widgets to have broad (international) appeal, the extra effort of localization is worth it. And, truth be told, it's not that much more work. The main thing is to approach the project from the beginning with localization in mind. I hope this article has made you, widget developer, a little more likely to include localization as a feature in your next widget!</p>

<blockquote>
This entry was first published on <a href="http://www.clearwired.com/loop/">The Loop</a>, the blog of my former employer, <a href="http://www.clearwired.com/">Clearwired Web Services</a>.
</blockquote>
