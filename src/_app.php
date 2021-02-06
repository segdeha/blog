<?php

// functions used to compose a blog post

require_once('Parsedown.php');

define('SEPARATOR', '========');
define('BASE_PATH', 'blog');
define('PATH_TO_POSTS', '/usr/home/segdeha/public_html/' . BASE_PATH . '/posts/');
define('CONTENT_TYPE_POST', 'post');
define('CONTENT_TYPE_LIST', 'list');
define('WPM', 200);

function isPreview() {
    $uri = $_SERVER['REQUEST_URI'];
    $uri_pieces = explode('?', $uri);
    return isset($uri_pieces[1]) && 'preview' === $uri_pieces[1];
}

// allow posts where published: false when there’s a ?preview on the url
function showOrNo($contents) {
    $components = getPostComponents($contents['post']);
    if (isPreview() || $components['metadata']->published) {
        return $contents;
    }
    else {
        header('HTTP/1.1 404 Not Found');
        return array(
            'status' => 404
        );
    }
}

function getContent() {
    $uri_pieces = getUriPieces();
    $uri_pieces = $uri_pieces['uri_pieces'];

    // is it a valid, non-post url?
    // if yes, return the special type
    if (count($uri_pieces) > 1) {
        // /blog/search
        if ('search' === $uri_pieces[1]) {
            // if yes, redirect to /blog/ (not a 301 in case i want to bring back search in the future)
            header('Location: /' . BASE_PATH . '/');
            exit;
        }

        // /blog/slug
        // /blog/yyyy/mm/dd/slug
        $slug = $uri_pieces[count($uri_pieces) - 1];
        if (!is_numeric($slug)) {
            // assume this is a slug because all other valid cases are numbers
            // returns false if the file does not exist
            $contents = getContentsFromSlug($slug);
            return showOrNo($contents, isPreview());
        }

        // /blog/yyyy/[mm/[dd/]]
        if ($uri_pieces[1] > 1995) {
            $date_to_match = $uri_pieces[1];
            if (isset($uri_pieces[2])) {
                $date_to_match .= '-' . $uri_pieces[2];
            }
            if (isset($uri_pieces[3])) {
                $date_to_match .= '-' . $uri_pieces[3];
            }
            return getPostsForDate($date_to_match);
        }
        // /blog/nnn <-- db id of a post from the old system, used for short urls
        else {
            $slug = getSlugFromId($uri_pieces[1]);
            if ($slug) {
                $contents = getContentsFromSlug($slug);
                $contents = showOrNo($contents, isPreview());
                if (404 === $contents['status']) {
                    return $contents;
                }
                else {
                    // if the ID is valid, redirect to canonical url
                    header('Location: https://andrew.hedges.name/' . BASE_PATH . '/' . $slug);
                    exit;
                }
            }
            else {
                header('HTTP/1.1 404 Not Found');
                return array(
                    'status' => 404
                );
            }
        }
    }
    else {
        // straight /blog/ so find the most recent post slug
        $slug = getSlugForMostRecentPost();
        $contents = getContentsFromSlug($slug);
        return $contents;
    }
}

// create an array from all of the valid bits between the slashes
function getUriPieces() {
    // get the valid pieces of the url
    $uri = $_SERVER['REQUEST_URI'];
    // we don’t ever the query string because we don’t currently have search
    $uri = strtok($uri, '?'); // from https://stackoverflow
    $uri_pieces = explode('/', $uri);
    // remove empty strings from the array
    $empty_string_keys = array_keys($uri_pieces, '');
    foreach ($empty_string_keys as $key) {
        unset($uri_pieces[$key]);
    }
    return array(
        'is_preview' => isPreview(),
        'uri_pieces' => array_values($uri_pieces),
    );
}

function getSlugFromId($id) {
    // read directory for files
    $slug = null;
    if ($handle = opendir(PATH_TO_POSTS)) {
        while (null === $slug && false !== ($filename = readdir($handle))) {
            if ($filename != '.' && $filename != '..') {
                // look for match inside contents as raw string (should be faster than parsing the json)
                $contents = file_get_contents(PATH_TO_POSTS . $filename);
                if (false !== strpos($contents, '"short_url": "http://ahedg.es/' . $id . '",')) {
                    $json = getPostMetadata($contents);
                    closedir($handle);
                    return $json->slug;
                }
            }
        }
        closedir($handle);
    }
    // FIXME there appears to be a problem returning NULL from here
    return $slug;
}

function getSlugForMostRecentPost() {
    $is_preview = isPreview();
    $date = '0000-00-00 00:00:00';
    $slug = null;
    // read through all files
    if ($handle = opendir(PATH_TO_POSTS)) {
        while (false !== ($filename = readdir($handle))) {
            if ($filename != '.' && $filename != '..') {
                $contents = file_get_contents(PATH_TO_POSTS . $filename);
                $metadata = getPostMetadata($contents);
                // "created_date": "2003-05-06 09:08:00"
                if ($metadata->created_date > $date && ($metadata->published || $is_preview)) {
                    $date = $metadata->created_date;
                    $slug = $metadata->slug;
                }
            }
        }
    }
    return $slug;
}

function getContentsFromSlug($slug) {
    $contents = array(
        'status' => 200,
        'type' => CONTENT_TYPE_POST,
        CONTENT_TYPE_POST => file_get_contents(PATH_TO_POSTS . $slug . '.md')
    );
    return $contents;
}

function getPostMetadata($content) {
    $sections = explode(SEPARATOR, $content);
    $json = json_decode($sections[0]);
    return $json;
}

function getPostComponents($contents) {
    $Parsedown = new Parsedown();
    $sections = explode(SEPARATOR, $contents);
    $metadata = json_decode($sections[0]);
    $subhead = $Parsedown->text($sections[1]);
    $body = $Parsedown->text($sections[2]);

    // strip leading <p> and trailing </p> from $subhead <-- super hacky 😔
    $subhead = str_replace('<p>', '', $subhead);
    $subhead = str_replace('</p>', '', $subhead);

    // calculate read time and add to metadata
    $words = array_merge(
        explode(' ', strip_tags($subhead)),
        explode(' ', strip_tags($body))
    );
    $metadata->read_time = ceil(count($words) / WPM);

    return array(
        'metadata' => $metadata,
        'subhead' => $subhead,
        'body' => $body,
    );
}

function getPostsForDate($date) {
    function cmp($a, $b) {
        // reverse chronological order
        return strcmp($b['created_date'], $a['created_date']);
    }
    $is_preview = isPreview();
    $data = array(
        'status' => 200,
        'type' => CONTENT_TYPE_LIST,
        'date' => $date,
        'posts' => array(),
    );
    // read through all files
    if ($handle = opendir(PATH_TO_POSTS)) {
        while (null === $slug && false !== ($filename = readdir($handle))) {
            if ($filename != '.' && $filename != '..') {
                $contents = file_get_contents(PATH_TO_POSTS . $filename);
                // "created_date": "2003-05-06 09:08:00"
                $metadata = getPostMetadata($contents);
                if (false !== strpos($metadata->created_date, $date) && ($metadata->published || $is_preview)) {
                    array_push($data['posts'], array(
                        'title' => $metadata->title,
                        'slug' => $metadata->slug,
                        'created_date' => $metadata->created_date,
                    ));
                }
            }
        }
    }
    usort($data['posts'], 'cmp');
    return $data;
}

function getYearFromUri() {
    // get the valid pieces of the url
    $uri = $_SERVER['REQUEST_URI'];
    // we don’t ever the query string because we don’t currently have search
    $uri = strtok($uri, '?'); // from https://stackoverflow.com/a/42476194/11577
    $uri_pieces = explode('/', $uri);
    if (isset($uri_pieces[2]) && is_numeric($uri_pieces[2]) && $uri_pieces[2] > 1995) {
        return $uri_pieces[2];
    }
    else {
        return 0;
    }
}

function getNextPrevPosts($datetime) {
    $prevnext = array(
        'prev' => array(
            'created_date' => '0000-00-00 00:00:00',
            'slug' => null,
            'title' => null,
        ),
        'next' => array(
            'created_date' => '9999-99-99 99:99:99',
            'slug' => null,
            'title' => null,
        ),
    );
    // read through all files
    if ($handle = opendir(PATH_TO_POSTS)) {
        while (false !== ($filename = readdir($handle))) {
            if ($filename != '.' && $filename != '..') {
                $contents = file_get_contents(PATH_TO_POSTS . $filename);
                // "created_date": "2003-05-06 09:08:00"
                $metadata = getPostMetadata($contents);
                if ($metadata->published || $is_preview) {
                    // previous post needs to be earlier than current post
                    if ($metadata->created_date < $datetime
                     && $metadata->created_date > $prevnext['prev']['created_date']) {
                         $prevnext['prev']['created_date'] = $metadata->created_date;
                         $prevnext['prev']['slug'] = $metadata->slug;
                         $prevnext['prev']['title'] = $metadata->title;
                         $prevnext['prev']['image'] = isset($metadata->background_image) ? $metadata->background_image : '/blog/assets/img/clouds.jpg';
                    }
                    // next post needs to be later than current post
                    if ($metadata->created_date > $datetime
                     && $metadata->created_date < $prevnext['next']['created_date']) {
                         $prevnext['next']['created_date'] = $metadata->created_date;
                         $prevnext['next']['slug'] = $metadata->slug;
                         $prevnext['next']['title'] = $metadata->title;
                         $prevnext['next']['image'] = isset($metadata->background_image) ? $metadata->background_image : '/blog/assets/img/underwater.jpg';
                     }
                }
            }
        }
    }
    return $prevnext;
}

function getYearsWithPosts() {
    $is_preview = isPreview();
    $years = array();
    // read through all files
    if ($handle = opendir(PATH_TO_POSTS)) {
        while (false !== ($filename = readdir($handle))) {
            if ($filename != '.' && $filename != '..') {
                $contents = file_get_contents(PATH_TO_POSTS . $filename);
                // "created_date": "2003-05-06 09:08:00"
                $metadata = getPostMetadata($contents);
                if ($metadata->published || $is_preview) {
                    $date_parts = explode('-', $metadata->created_date);
                    $year = $date_parts[0];
                    if (!in_array($year, $years)) {
                        array_push($years, $year);
                    }
                }
            }
        }
    }
    rsort($years, SORT_NUMERIC);
    return $years;
}
