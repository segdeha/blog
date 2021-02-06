<?php

extract($_GET);

$nav = array(
	'home'    => 'Home',
	'faqs'    => 'FAQs',
	'about'   => 'About',
	'contact' => 'Contact',
);

if (!isset($selected) || (isset($selected) && !in_array($selected, array_keys($nav)))) {
	$selected = 'home';
}

?><!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<title>Nav Example</title>
		<style type="text/css">
		
		body {
			margin: 0;
			padding: 0;
			font: 16px/1.5 "Helvetica Neue", Helvetica, Sans-Serif;
			background: #333 fixed repeat-x;
			background-image: url(bg-page.png);
			background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, black), color-stop(1.0, #333));
			-moz-background-size: 100% 100%;
			background-size: 100% 100%;
			color: #aaa;
		}
		
		header {
			display: block;
			width: 640px;
			margin: 0 auto;
		}
		

		header h1 {
			margin: 0;
			padding: 20px;
			clear: both;
		}
		
		nav ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		
		nav ul li {
			display: block;
			float: left;
			text-align: center;
		}
		
		header nav li {
			width: 159px;
		}
		
		header nav li a {
			display: block;
			font: 14px/32px Verdana, Sans-Serif;
			text-decoration: none;
			text-shadow: #999 0 1px 1px;
			color: black;
			background: #666 url(bg-nav.png) top left repeat-x;
			border-left: solid 1px #333;
			outline: none;
		}
		
		header nav li:first-child a {
			width: 160px;
			-webkit-border-bottom-left-radius: 10px;
			-moz-border-radius-bottomleft: 10px;
			border-bottom-left-radius: 10px;
			border-left: none;
		}
		
		header nav li:last-child a {
			width: 159px;
			-webkit-border-bottom-right-radius: 10px;
			-moz-border-radius-bottomright: 10px;
			border-bottom-right-radius: 10px;
		}
		
		header nav li a:hover {
			color: #999;
			background-color: #444;
			background-position: left center;
			text-decoration: none;
			text-shadow: black 0 -1px 1px;
		}
		
		header nav li a.selected,
		header nav li a:hover.selected,
		header nav li a:active
		{
			color: #ccc;
			background-color: #333;
			background-position: left bottom;
			text-shadow: black 0 -1px 1px;
		}
		
		</style>
	</head>
	<body>
		<header>
			<nav>
				<ul>
<?php foreach ($nav as $key => $label): ?>
					<li><a<?php if ($selected === $key) { echo ' class="selected"'; } ?> href="index.php?selected=<?=$key?>"><?=$label?></a></li>
<?php endforeach; ?>
				</ul>
			</nav>
			<h1><?=$nav[$selected]?></h1>
		</header>
		<script type="text/javascript">
		
		// make page changes feel faster by selecting the just-clicked nav item
		(function () {
			(document.querySelector('header > nav > ul'))
				.addEventListener('click', function (evt) {
				evt.target.className = 'selected';
			}, false);
		})();
		
		</script>
	</body>
</html>