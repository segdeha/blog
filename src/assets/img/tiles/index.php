<?php

define('BASE', 'http://segdeha.com/assets/imgs/tiles/');

function filter($t) {
    return !in_array($t, array('.', '..', 'index.php'));
}

$tiles = array_filter(scandir('.'), filter);

$html  = '';
foreach ($tiles as $tile) {
    $html .= '<div><img src="' . $tile . '" alt="' . $tile . '"><br><a href="' . BASE . $tile . '">' . BASE . $tile . '</a></div>';
}

?><!doctype html public "">
<html>
    <head>
        <title>My Momentiles</title>
        <style type="text/css">
        body {
            font: 16px/1.5 Helvetica, Sans-Serif;
            margin: 0;
            padding: 0;
        }
        div {
            float: left;
            margin: 1em 0 1em 1em;
        }
        </style>
    </head>
    <body>
        <?= $html ?>
    </body>
</html>