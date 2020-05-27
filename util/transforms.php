<?php

// % php util/transforms.php posts/

// var_dump($argc); //number of arguments passed
// var_dump($argv); //the arguments passed

$filename = $argv[1];

// read file from STDIN
$contents = file_get_contents($filename);

// save the original file in case this goes sideways
file_put_contents($filename . '-original', $contents);

$regex_replacements = array(
    '/<a href="([^"]+)">([^<]+)<\/a>/' => '[$2]($1)',
    '/\&#8216;([^\&]+)\&#8217;/' => '“$1”',
);

foreach ($regex_replacements as $search => $replace) {
    $contents = preg_replace($search, $replace, $contents);
}

$simple_replacements = array(
    '<code>' => '`',
    '</code>' => '`',
    '<strong>' => '**',
    '</strong>' => '**',
    '<em>' => '_',
    '</em>' => '_',
    '<h3>' => '###',
    '</h3>' => "\n",
    '<p>' => '',
    '<p class="outdent">' => '',
    '<p class="dedent">' => '',
    '</p>' => "\n",
    '</pre>' => "</pre>\n",
    '<blockquote>' => '> ',
    '</blockquote>' => '',
    '</li>' => '',
    '</ul>' => '',
    '</ol>' => '',
    '&#8217;' => '’',
    '&#8220;' => '“',
    '&#8221;' => '”',
    '&#8230;' => '…',
    '&#224;' => 'à',
    '&#241;' => 'ñ',
);

foreach ($simple_replacements as $search => $replace) {
    $contents = str_replace($search, $replace, $contents);
}

// save new file
file_put_contents('originals/' . $filename, $contents);
// file_put_contents($filename . '-altered', $contents);
