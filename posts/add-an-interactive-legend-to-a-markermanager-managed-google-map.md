{
  "title": "Add an interactive legend to a MarkerManager managed Google Map",
  "slug": "add-an-interactive-legend-to-a-markermanager-managed-google-map",
  "topics": ["JavaScript", "Web Development", "Google"],
  "keywords": "google maps, markermanager, legend, legendcontrol, custom control, gmap2, gmarker",
  "created_date": "2009-11-22 11:22:33",
  "short_url": "http://ahedg.es/79",
  "published": false
}

========

There&#8217;s plenty of help out there for <a href="http://stackoverflow.com/questions/36515/fixed-legend-in-google-maps-mashup">adding a legend to a Google Map</a>. There are resources for <a href="http://gmaps-utility-library-dev.googlecode.com/svn/trunk/markermanager/docs/examples.html">working with MarkerManager</a> as well. I can&#8217;t believe this is new ground, but there didn&#8217;t seem to be anything related to getting an interactive legend to play nice with MarkerManager. Now there is!

========

<p class="outdent">On a recent site, the client specified the (quite reasonable) dual requirements of showing different pins at different zoom levels and having a legend on the map that could be used to toggle pins of different types.</p>
<p>Having used the excellent, open source <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markermanager/">MarkerManager library</a> before, I immediately thought of it for managing the zoom levels. I hadn&#8217;t implemented an interactive legend before, so I went a-Googling and found <a href="http://code.google.com/apis/maps/documentation/controls.html#Custom_Controls">documentation and examples for adding custom map controls</a>. So far, so good.</p>
<p>I stumbled around a bit about how to get the MarkerManager class to filter pins by both zoom level and type until I buckled down and just read the source of the class. Turns out, the solution was pretty simple (which is always a good sign).</p>
<p>In the end, I created a custom map control (<code>LegendControl</code>) that adds and removes groups of pins to and from the MarkerManager instance&#8217;s internal grid. It seems so obvious in hindsight!</p>
<h3>E.g.</h3>
<p>In case you&#8217;re confused about what problem I&#8217;m trying to solve, interact with the map below. Notice how you get different pins by zooming in and out and how you can turn whole classes of pins on and off.</p>
<iframe style="width: 600px;height: 400px;border: solid 8px #ccc;" src="http://andrew.hedges.name/experiments/google-maps/legend.html" name="map-example"></iframe>
<h3>SoC</h3>
<p>Implementing MarkerManager to show and hide large numbers of pins by zoom level is a snap. And, it&#8217;s relatively trivial to write a couple of functions to show/hide individual pins by type. In fact, my client supplied me with functions they&#8217;d used before on other sites.</p>
<p>I decided from the outset to build the legend as a proper map control because, well, that&#8217;s what it is. I&#8217;m glad I did because it enforced separation of concerns. The resulting code is more tidy than if I&#8217;d just started hacking away.</p>
<p>I won&#8217;t go into detail about creating custom controls. You&#8217;re welcome to <a href="/e/google-maps/LegendControl.js">check out the script</a> yourself to see how it&#8217;s done.</p>
<h3>Now for the How</h3>
<p>If you <a target="_blank" href="http://andrew.hedges.name/e/google-maps/legend.html">go to the map in a new window</a> and view source, you&#8217;ll see a bunch of stuff that&#8217;s typical in a Google Maps implementation. For example, the following is the function I use to set up the map, itself:</p>
<pre class="sh_javascript">
function initMap() {
  var map, mgr;
  
  // set up your basic map
  map = new GMap2(document.getElementById('map'));
  map.setCenter(new GLatLng(-36.848, 174.756), 13);
  map.addControl(new GLargeMapControl());
  map.addControl(new GScaleControl());
  map.addControl(new GMapTypeControl());
  
  // create markermanager instance
  mgr = new MarkerManager(map);
  
  // add markers to MarkerManager and set up markerGroups
  initMarkers(mgr);
  
  // add legend
  map.addControl(new LegendControl({
    mgr          : mgr,
    markerGroups : markerGroups,
    legendValues : legendValues
  }));
}
</pre>
<p>See that last bit? That creates our legend control. But, I guess you figured that out, right?</p>
<p><s>Unfortunately, the way it&#8217;s currently written, <code>LegendControl</code> requires certain variables to be in the global scope. Yucky, I know. I&#8217;m open to feedback about how to tweak things to better encapsulate the control by passing in the necessary objects and options.</s></p>
<p><s>The variables that need to be in the global scope are as follows:</s></p>
<dl>
	<dt><s><code>map</code></s></dt>
	<dd><s>Instance of <code>GMap2</code></s></dd>
	<dt><s><code>mgr</code></s></dt>
	<dd><s>Instance of <code>MarkerManager</code></s></dd>
	<dt><s><code>legendValues</code></s></dt>
	<dd><s>Array of object literals, each with the following properties: <code>type</code>, <code>description</code>, and <code>pinSrc</code></s></dd>
	<dt><s><code>markerGroups</code></s></dt>
	<dd><s>Object literal with arrays of markers keyed by type</s></dd>
</dl>
<blockquote>
<strong>Update:</strong> I&#8217;ve refactored the code to eliminate the need for variables to be in the global scope. Amazing what a good night&#8217;s sleep can do!
</blockquote>
<p>The <s>other</s> <strong>only</strong> trickiness required by <code>LegendControl</code> is that your markers (instances of <code>GMarker</code>) must have 2 properties in addition to the ones the class adds by default. These are <code>zoomMin</code> and <code>zoomMax</code> and they correspond to the minimum and maximum zoom levels at which the marker should be displayed.</p>
<p>So, by way of example, my function for creating individual markers looks like the following:</p>
<pre class="sh_javascript">
/**
 * Create a marker
 * @param object obj Object literal specifying marker attributes
 * @return GMarker
 */
function createMarker(obj) {
  var marker;
  
  marker = new GMarker(new GLatLng(obj.lat, obj.lng), {
    title   : obj.name,
    icon    : MapIconMaker.createMarkerIcon({
      width      : PIN_WIDTH,
      height     : PIN_HEIGHT,
      primaryColor : colors[obj.type]
    })
  });
  
  marker.zoomMin = obj.zoomMin;
  marker.zoomMax = obj.zoomMax;
  
  GEvent.addListener(marker, 'click', function() {
    marker.openInfoWindowHtml('<div>' + obj.name + '</div>');
  });
  
  return marker;
}
</pre>
<p>Again, <a target="_blank" href="http://andrew.hedges.name/e/google-maps/legend.html">go to the map in a new window</a> and view source to see the full implementation. It will make more sense than me spending another 500 words trying to explain it. :-)</p>
<p>I hope you found this helpful. As I said above, any suggestions for reducing the need for variables in the global scope are appreciated.</p>
<strong>Update 9 Feb 2010:</strong> There has been a bit of interest in Legend Control, so I have put it up on <a href="http://code.google.com/p/legendcontrol/">Google Code</a> under the MIT license. The script is free to use, modify, and distribute in both personal and commercial projects. Enjoy!
</blockquote>
