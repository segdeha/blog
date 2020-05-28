{
  "title": "innerHTML versus the DOM: Can’t we all just get along?",
  "slug": "innerhtml-versus-the-dom-cant-we-all-just-get-along",
  "topics": ["JavaScript"],
  "keywords": "innerhtml, dom, speed, quick, fast, createelement, safari, firefox, opera, mac, windows, internet explorer, ie6, ie7, ie8, clonenode, appendchild, parentnode, replacechild, documentfragment",
  "created_date": "2008-04-19 23:11:11",
  "short_url": "http://ahedg.es/23",
  "deprecated": true,
  "published": true
}

========

Having tested the relative speed of [innerHTML versus DOM node replacement](/blog/2007/07/03/the-need-for-speed) myself, I read with interest [When innerHTML isn’t Fast Enough](https://blog.stevenlevithan.com/archives/faster-than-innerhtml). I have put together a test of my previous 2 techniques plus one inspired by that article.

========

Each of the buttons below writes the phrase [Chubby bunny](https://en.wikipedia.org/wiki/Chubby_Bunny) 10,000 times to the container div, clears the content, then does it again. What I’m trying to test here is the effect of the different ways of clearing out the DOM nodes from the container. Code and discussion follows.

<iframe style="height: 262px;" src="/blog/assets/files/domdestroy.html"></iframe>

### innerHTML

This technique is the simplest and, probably, the most common on the web today. The following code builds up a long string of HTML, dumps it into the `innerHTML` attribute of the container `div`, then sets the content back to an empty string. Rinse, and repeat.

<pre class="sh_javascript">
// Start 1st pass
innerHTML  = [];
iterations = iters + 1;
while (—iterations > 0) {
    innerHTML[innerHTML.length] = htmlDiv;
}
resultDiv.innerHTML = innerHTML.join('');
resultDiv.innerHTML = '';

// Start 2nd pass
innerHTML  = [];
iterations = iters + 1;
while (—iterations > 0) {
    innerHTML[innerHTML.length] = htmlDiv;
}
resultDiv.innerHTML = innerHTML.join('');
</pre>

### DOM replace

The following code builds up a document fragment by appending `div` nodes to it. The fragment is then appended to the container, a new fragment is built up, then the nodes are swapped out in one step.

<pre class="sh_javascript">
// Start 1st pass
container  = document.createDocumentFragment();
iterations = iters;
container.appendChild(nodeDiv);
while (—iterations > 0) {
    container.appendChild(container.firstChild.cloneNode(true));
}
resultDiv.appendChild(container);

// Start 2nd pass
cloneDiv    = resultDiv.cloneNode(false);
cloneDiv.id = 'result-domreplace';
container   = document.createDocumentFragment();
iterations  = iters;
container.appendChild(nodeDiv);
while (—iterations > 0) {
    container.appendChild(container.firstChild.cloneNode(true));
}
resultDiv.parentNode.replaceChild(cloneDiv, resultDiv);
cloneDiv.appendChild(container);
</pre>

### innerHTML + DOM replace

The following code combines inserting a string of HTML via the `innerHTML` attribute with the one-step swapping goodness of the DOM replace code.

<pre class="sh_javascript">
// Start 1st pass
innerHTML  = [];
iterations = iters + 1;
while (—iterations > 0) {
    innerHTML[innerHTML.length] = htmlDiv;
}
resultDiv.innerHTML = innerHTML.join('');

// Start 2nd pass
container  = resultDiv.cloneNode(false);
innerHTML  = [];
iterations = iters + 1;
while (—iterations > 0) {
    innerHTML[innerHTML.length] = htmlDiv;
}
container.innerHTML = innerHTML.join('');
resultDiv.parentNode.replaceChild(container, resultDiv);
</pre>

[View full source code](/blog/assets/files/domdestroy.js)

In theory, the last technique should be the fastest because the bottleneck with innerHTML is in removing the nodes by setting its value to an empty string. By building up a document fragment then swapping it out with the `parentNode.replaceChild` technique, we avoid using innerHTML to tear down the DOM.

In my testing, however, results were all over the shop. In Firefox, the results were as I expected: innerHTML was slowest, DOM replacement faster, and the combo technique fastest. In Internet Explorer, innerHTML was the fastest, the combo technique nearly as fast, and straight DOM manipulation nearly an order of magnitude slower. In Safari 3, I found no significant difference among the 3 techniques.

The following numbers are averages of 5 runs of each technique in the various browsers, expressed in milliseconds.

<table>
	<thead>
		<tr>
			<th><br></th>
			<th>innerHTML</th>
			<th>DOM replacement</th>
			<th>innerHTML + DOM</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Safari 3</th>
			<td>109</td>
			<td>104</td>
			<td>96</td>
		</tr>
		<tr><th>Safari 2</th>
			<td>489</td>
			<td>849</td>
			<td>457</td>
		</tr>
		<tr><th>Firefox 3b4</th>
			<td>1588</td>
			<td>1030</td>
			<td>523</td>
		</tr>
		<tr><th>Firefox 2</th>
			<td>1386</td>
			<td>1019</td>
			<td>401</td>
		</tr>
		<tr><th>IE 8b1</th>
			<td>900</td>
			<td>2131</td>
			<td>844</td>
		</tr>
		<tr><th>IE 7</th>
			<td>290</td>
			<td>1275</td>
			<td>475</td>
		</tr>
		<tr><th>IE 6</th>
			<td>339</td>
			<td>1880</td>
			<td>373</td>
		</tr>
		<tr>
			<th>Opera 9.27</th>
			<td>266</td>
			<td>847</td>
			<td>675</td>
		</tr>
	</tbody>
</table>

From the above, it looks like the biggest advantage of the combo technique is its consistency across browsers. While straight innerHTML is faster on some browsers and straight DOM manipulation is faster on others, combining the 2 techniques yields decent performance across browsers.

**Update:** I added numbers for Safari 2, IE 8b1 and Opera 9.27 to the list above. My conclusion still appears to hold.
