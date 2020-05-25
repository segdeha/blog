<?php

// phpinfo();exit;

require('SmartyPants.php');

define('DBSERVER', 'db140a.pair.com');
define('USERNAME', 'segdeha_17_r'); // read-only login
define('PASSWORD', 'uv7nWFZU');
define('DATABASE', 'segdeha_blog2');

function db_open() {
    // open read=only connection to mysql
    $lnk = mysql_connect(DBSERVER, USERNAME, PASSWORD)
           or die ('Not connected: ' . mysql_error());

    // change the current db
    mysql_select_db(DATABASE, $lnk)
           or die ("Can't use <strong>" . DATABASE . '</strong>: ' . mysql_error());
}

function db_close() {
    mysql_close();
}

function db_query($query) {
    $handle = mysql_query($query)
              or die ('<strong>MySQL Error:</strong> ' . mysql_error() . "<pre>$query</pre>");
    return $handle;
}

function extract_rows($results) {
    $rows = array();
    while ($row = mysql_fetch_assoc($results)) {
        array_push($rows, $row);
    }
    return $rows;
}

function apply_template($entry) {

// echo '<pre>';var_dump($entry);exit;

    $title = SmartyPants($entry['title']);
    $slug = $entry['name'];
    $topics = implode('", "', $entry['topics']);
    $keywords = $entry['keywords'];
    $created_date = $entry['created'];
    $id = $entry['id'];
    $summary = SmartyPants($entry['summary']);
    $body = SmartyPants($entry['body']);

// echo '<pre>';var_dump($entry['topics']);//exit;
// echo '<pre>';var_dump($topics);exit;

    $md = <<<EOT
{
  "title": "{$title}",
  "slug": "{$slug}",
  "topics": ["$topics"],
  "keywords": "{$keywords}",
  "created_date": "{$created_date}",
  "short_url": "http://ahedg.es/{$id}",
  "published": false
}

========

{$summary}

========

{$body}

EOT;

    return $md;
}

function get_slug($entry) {
    $pieces = split('========', $entry);
    $metadata = json_decode($pieces[0]);

// echo '<pre>';var_dump($metadata);exit;

    return $metadata->slug;
}

function write_files($entries) {
    foreach ($entries as $entry) {
        file_put_contents('./posts/' . get_slug($entry) . '.md', $entry);
    }
}

function get_topics_for_entry($entry) {
    $id = $entry['id'];
    $query = "
        SELECT topic
        FROM entries_topics, topics
        WHERE entries_topics.entry_id = $id
        AND entries_topics.topic_id = topics.id
        ;
    ";
    db_open();
    $results = db_query($query);
    $topics_arrays = extract_rows($results);
    $topics = array();
    foreach ($topics_arrays as $arr) {
        array_push($topics, $arr['topic']);
    }

// echo '<pre>';var_dump($topics);exit;

    db_close();
    $entry['topics'] = $topics;
    return $entry;
}

function get_entries() {
    $query = "SELECT * FROM entries WHERE entries.id IN (16, 17, 18, 19, 20, 21, 22, 23, 24, 29);";
    db_open();
    $results = db_query($query);

// echo '<pre>';var_dump($results);exit;

    $entries = array_map('get_topics_for_entry', extract_rows($results));
    db_close();
    return $entries;
}

write_files(array_map('apply_template', get_entries()));
