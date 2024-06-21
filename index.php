<?php

// it is the concern of getContent() to determine whether to return content for
// posts with the published flag set to false

require_once('./src/_app.php');

$content = getContent();
$preview = isPreview() ? '?preview' : '';

// used to inject elements into the <head>
$head_css = array();
$head_js = array();

// randomly select a default background image
$bg_srcs = array(
    '/blog/assets/img/underwater.jpg',
    '/blog/assets/img/clouds.jpg',
);
$bg_img = $bg_srcs[array_rand($bg_srcs)];

if (404 === $content['status']) {
    $title = 'Page not found';
    $html = <<<EOT

<h1>Page not found</h1>
<p class="giant-404">🤔</p>

EOT;
}
else if (CONTENT_TYPE_LIST === $content['type']) {
    // this is a list
    // FIXME convert date (and partial dates) into human readable form
    $date = $content['date'];
    $posts = $content['posts'];
    $title = 'Posts from ' . $date;
    $keywords = false;
    $progress = '';
    $description = 'Educator and engineering leader Andrew Hedges writes about technology and life.';
    $canonical_url = false;
    // make a list of links from the titles and slugs
    $list = '<ul>';
    foreach ($posts as $post) {
        $published_display = date('j F Y', strtotime($post['created_date']));
        $list .= '<li><a title="Published ' . $published_display . '" href="/' . BASE_PATH . '/' . $post['slug'] . $preview . '">' . $post['title'] . '</a></li>';
    }
    $list .= '</ul>';

    // no such thing as previous and next in this context
    $prevnext = null;

    $html = <<<EOT

<h1>{$title}</h1>
{$list}

EOT;
}
else {
    // this is a post
    $components = getPostComponents($content[CONTENT_TYPE_POST]);

    $metadata = $components['metadata'];
    $subhead = $components['subhead'];
    $body = $components['body'];
    $title = $metadata->title;
    $published_jsonld = $metadata->created_date;
    $published_display = date('j F Y', strtotime($metadata->created_date));
    $keywords = $metadata->keywords;
    $progress = '<progress class="content-progress" value="0" max="100"></progress><div class="max-progress" title="Click to jump back to where you left off"></div>';
    $read_time = $metadata->read_time;
    $wpm = WPM;
    $description = strip_tags($subhead);
    $canonical_url = 'https://andrew.hedges.name/blog/' . $metadata->slug;

    // if there is a background image other than the default, update the reference so we can write the CSS to the page
    if ($metadata->background_image) {
        $bg_img = $metadata->background_image;
    }

    // get word count for JSON-LD
    $words = strip_tags($body);
    $word_count = count(explode(' ', $words));

    // create tags to add Gallery code to <head>
    if ($metadata->gallery) {
        array_push($head_css, '<link rel="stylesheet" href="/' . BASE_PATH . '/assets/gallery/styles.css">');
        array_push($head_js, '<script defer src="/' . BASE_PATH . '/assets/gallery/behaviors.js"></script>');
    }

    // create HTML for deprecated posts
    // add CSS for deprecated posts
    if ($metadata->deprecated) {
        $deprecated_html = <<<EOT
            <aside class="deprecated">
                <h1 class="new-old">Ye Olde Blog Poste</h1>
                <p>The author has determined that the contents of this post are sufficiently outdated that a warning is warranted concerning their potential lack of utility and/or accuracy.</p>
                <p>The post herein is preserved for hysterical, er…<em>historical</em> purposes, but should not be viewed as authoritative.</p>
                <p class="new-old">Thank you for your understanding in this matter.</p>
            </aside>
EOT;
    }

    // get data to create html for links to next & previous posts
    $prevnext = getNextPrevPosts($metadata->created_date);

    // create structured data
    $base_path = BASE_PATH;
    $jsonld = <<<EOT

            <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "{$title}",
                "keywords": "{$keywords}",
                "wordcount": "{$word_count}",
                "url": "{$canonical_url}",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://andrew.hedges.name/{$base_path}/"
                },
                "datePublished": "{$published_jsonld}",
                "description": "{$description}",
                "image": "https://andrew.hedges.name/{$base_path}/assets/img/andrew.png",
                "publisher": {
                    "@type": "Person",
                    "name": "Andrew Hedges"
                },
                "author": {
                    "@type": "Person",
                    "name": "Andrew Hedges"
                }
            }
            </script>
EOT;

    // show the post
    $html = <<<EOT
        {$jsonld}

        <h1>{$title}</h1>
        <p class="published-date">{$published_display} &#183; <span class="tooltip" title="Calculated using an average reading speed of {$wpm} words per minute">Estimated reading time:</span> {$read_time} minutes</p>
        {$deprecated_html}
        <h2>{$subhead}</h2>
        {$body}
EOT;
}

$page_title = $title . ' &#183; andrew.hedges.name';

// create html for links to years with blog posts
$years_with_posts = getYearsWithPosts();
$year_from_uri = getYearFromUri();
$posts_by_year_html = '';
foreach ($years_with_posts as $year) {
    $selected = $year === $year_from_uri ? ' class="selected"' : '';
    $posts_by_year_html .= '<li><a' . $selected . ' href="/' . BASE_PATH . '/' . $year . $preview . '">' . $year . '</a></li>';
}

?><!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title><?=$page_title?></title>
        <script type="text/javascript">if(top.location.href!==document.location.href){top.location.href=document.location.href}</script>
        <meta name="author" content="Andrew Hedges, andrew@hedges.name">
<?php if ($keywords): ?>        <meta name="keywords" content="<?=$keywords?>"><?php endif; ?>
<?php if ($description): ?>        <meta name="description" content="<?=$description?>"><?php endif; ?>
<?php if ($canonical_url): ?>        <link rel="canonical" href="<?=$canonical_url?>"><?php endif; ?>
        <link rel="alternate" type="application/twitter" href="http://twitter.com/segdeha">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
        <!-- font loading technique borrowed from https://csswizardry.com/2020/05/the-fastest-google-fonts/ -->
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preload" as="style" href="//fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;700&family=Source+Code+Pro&display=swap&display=swap">
        <link rel="stylesheet" media="print" onload="this.media='all'" href="//fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;700&family=Source+Code+Pro&display=swap&display=swap">
        <link rel="stylesheet" media="print" onload="this.media='all'" href="/<?=BASE_PATH?>/assets/fonts.css">
        <link rel="stylesheet" media="print" onload="this.media='all'" href="/<?=BASE_PATH?>/assets/shjs/css/sh_coda.css">
<?php

foreach ($head_css as $css_tag) {
    echo "        $css_tag\n";
}

?>
        <style type="text/css" media="screen">
        html {
            background-image: url(<?=$bg_img?>);
        }
        </style>
        <style type="text/css">
        :root {
            --text-color: black;
            --lightest-gray-color: #f0f0f0;
            --gray-color: #ccc;
            --table-row-hover-color: #f3f6fb;
            --link-color: blue;
            --smaller-font-size: 0.85rem;
        }

        html {
            background-size: cover;
            background-attachment: fixed;
        }

        body {
            background: white;
            box-shadow: rgba(0, 0, 0, 0.5) 0 0 24px;
            color: var(--text-color);
            font: 300 16px/1.67 'Roboto Slab', serif;
            margin: 0 auto;
            max-width: 37rem;
            padding: 0 2rem;
            position: relative;
        }

        header {
            margin: 0 -2rem;
            padding: 0.25rem 2rem 0 2rem;
            position: relative;
        }
            header h1 {
                font-size: 1.25rem;
                font-weight: normal;
                margin-top: 0;
                padding-top: 0.67em;
            }

        main h1 {
            line-height: 1.15;
            margin-bottom: 0.15rem;
        }

        main h2 {
            font-weight: normal;
            line-height: 1.15;
        }

        a {
            color: var(--link-color);
            text-decoration: none;
        }
            a:hover {
                border-bottom: solid 1px var(--link-color);
            }
            a[name] {
                border-bottom: none;
                color: var(--text-color);
            }

        blockquote {
            border-left: solid 4px var(--lightest-gray-color);
            margin-left: 0;
            padding-left: 1.25rem;
        }

        code, pre {
            background: var(--lightest-gray-color);
            font-family: "CartographCF Light", "source-code-pro", "Panic Sans", "Andale Mono", Monaco, Monospace;
            font-size: var(--smaller-font-size);
        }

        code {
            display: inline-block;
            padding: 0.1em 0.5em;
        }

        pre {
            overflow: auto;
            padding: 0.5em 1em;
        }

        dt {
            font-weight: normal;
        }

        table {
            font-size: var(--smaller-font-size);
            margin: 1rem 0;
            width: 100%;
        }
            th, td {
                padding: 0.25em 0.5em;
            }
            th {
                background: var(--lightest-gray-color);
                font-weight: bold;
                text-align: left;
            }
                tr:hover th, tr:hover td {
                    background: var(--table-row-hover-color);
                }
                    thead tr:hover th {
                        background: #f0f0f0;
                    }

        .published-date {
            margin: 0 0 2rem 0;
        }

        .tooltip {
            border-bottom: dotted 1px #ccc;
            cursor: help;
        }

        .deprecated {
            background-image: url(/blog/assets/img/parchment.jpg);
            background-repeat: no-repeat;
            background-size: contain;
            font-size: var(--smaller-font-size);
            font-weight: normal;
            margin: 1rem 0;
            padding: 8rem 5rem;
            text-align: center;
        }

        .new-old {
            font-family: 'New Old English W05 Regular', cursive;
        }

        .video-iframe {
            height: 333px;
            width: 592px;
        }

        .clearfix:after {
            content: "";
            display: table;
            clear: both;
        }

        header .content-progress {
            border-radius: 0;
            height: 0.33rem;
            left: 0;
            position: fixed;
            right: 0;
            top: 0;
            width: auto;
            z-index: 1;
            -webkit-appearance: none;
               -moz-appearance: none;
                    appearance: none;
        }
            header .content-progress::-webkit-progress-bar {
                background-color: silver;
            }
            header .content-progress::-webkit-progress-value {
                background: gray;
            }
        header .max-progress {
            background-color: transparent;
            border-right: solid 0.25rem black;
            height: 0.33rem;
            left: 0;
            position: fixed;
            top: 0;
            width: 0;
            z-index: 1;
        }

        /* FIXME temporary styles to make images be not so broken */
        /* TODO restructure markup for images and apply appropriate styles */
       .photo-left img, .photo-right img {
           height: auto;
           width: 100%;
       }

        figure {
            margin: 1rem 0;
        }
            figure a:hover {
                border: none;
            }
            figure img {
                height: auto;
                width: 100%;
            }
            figure figcaption {
                font-size: var(--smaller-font-size);
                font-style: italic;
            }

        .related {
            border-top: solid 1px var(--lightest-gray-color);
            display: grid;
            grid-gap: 1rem;
            grid-template-rows: fit-content;
            margin-top: 1.5rem;
        }
            .related h1 {
                font-weight: normal;
                font-size: 1.5rem;
                margin: 1rem 0;
            }
            .related ul {
                margin-bottom: 1.5rem;
            }
            .related .selected {
                color: var(--text-color);
                font-weight: normal;
            }
            .related .selected:hover {
                border-color: black;
            }

        .author {
            background: var(--lightest-gray-color);
            font-size: var(--smaller-font-size);
            margin: 1rem 0;
            padding: 0.5em 1em;
        }
            .author summary {
                font-weight: normal;
                margin: 0 -0.67rem;
                padding: 0 0.67rem;
            }
            .author p {
                margin: 0.5rem 0;
            }
            .author img {
                float: left;
                height: auto;
                margin: 0.25rem 1rem 0 0;
                width: 33%;
            }

        strong, th {
            font-weight: normal;
        }

        .giant-404 {
            font-size: 10rem;
            margin: 1rem 0;
        }

        footer {
            border-top: solid 1px var(--gray-color);
            font-size: var(--smaller-font-size);
            margin-top: 1rem;
            padding-bottom: 0.5rem;
        }
            footer nav {
                float: left;
                margin: 0;
            }
            footer .license, footer nav {
                width: 50%;
            }
            footer .selected {
                color: var(--text-color);
                font-weight: normal;
            }
            footer .selected:hover {
                border-color: black;
            }

        /* used in the footer */
        .license {
            float: right;
            font-size: var(--smaller-font-size);
        }

        /* used in the footer */
        .icon {
            display: inline-block;
            height: 16px;
            margin-right: 0.25rem;
            width: 16px;
        }
            .icon:hover {
                border-bottom: none;
            }
            .icon img {
                height: 100%;
                transform: scale(1.0) rotate(0) translateZ(0);
                transition: -webkit-transform 720ms ease-out;
                width: 100%;
            }
                .icon:hover img {
                    transform: scale(1.5) rotate(360deg) translateZ(0);
                }

        /* gallery over-rides */
        .gallery li p {
            font-size: var(--smaller-font-size);
            line-height: 1.15;
        }

        /* screens wide enough for the related elements to sit side by side */
        @media (min-width: 510px) {
            .related {
                grid-template-columns: 1fr 2fr;
            }
        }

        /* small-ish screens */
        @media (max-width: 656px) {
            .video-iframe {
                height: 180px;
                width: 320px;
            }
        }

        /* small screens */
        @media (max-width: 575px) {
            .video-iframe {
                height: 180px;
                width: 320px;
            }
            footer .license, footer nav {
                float: none;
                width: auto;
            }
            .icon {
                height: 32px;
                margin-right: 0.5rem;
                width: 32px;
            }
        }
        </style>
        <style type="text/css" media="print">
        .related {
            display: none;
        }
        </style>
<?php

foreach ($head_js as $js_tag) {
    echo "        $js_tag\n";
}

?>
        <script defer src="/<?=BASE_PATH?>/assets/shjs/sh_main.js"></script>
        <script defer type="module" src="/<?=BASE_PATH?>/assets/behaviors.js"></script>
    </head>
    <body>
        <header>
            <?=$progress?>
            <h1>
                <a href="https://andrew.hedges.name">andrew.<wbr>hedges.<wbr>name</a> / 
                <a href="https://andrew.hedges.name/<?=BASE_PATH?>/">blog</a>
            </h1>
        </header>
        <main>
            <article class="content">
               <?=$html?>
            </article>
            <nav class="related">
                <div>
                    <h1>Archive</h1>
                    <ul><?=$posts_by_year_html?></ul>
                </div>
<?php if (isset($prevnext) && is_array($prevnext)): ?>
    <?php

    $base = BASE_PATH;

    $next = $prevnext['next']['slug'] === null ? '' :
        <<<EOT
                    <h1>Next</h1>
                    <p><a data-preload-img="{$prevnext['next']['image']}" href="/{$base}/{$prevnext['next']['slug']}">{$prevnext['next']['title']}</a></p>
EOT;

    $prev = $prevnext['prev']['slug'] === null ? '' :
        <<<EOT
                    <h1>Previous</h1>
                    <p><a data-preload-img="{$prevnext['prev']['image']}" href="/{$base}/{$prevnext['prev']['slug']}">{$prevnext['prev']['title']}</a></p>
EOT;

    ?>
                <div>
                    <?=$next?>
                    <?=$prev?>
                </div>
<?php endif; ?>
            </nav>
            <aside class="author">
                <details>
                    <summary>
                        About the author
                    </summary>
                    <p>
                        <img src="/<?=BASE_PATH?>/assets/img/beatys-butte-beard.jpg" alt="In this photo, Andrew wears a Jeep baseball cap and sunglasses. The sky is bright blue behind him and his long, white beard is backlit by the sun.">
                        Andrew Hedges is an educator and technologist based in Portland, Oregon. A professional web developer since 1998, Andrew is the Cofounder of and COO for <a href="https://assistivlabs.com">Assistiv Labs</a>, a web accessibility testing platform. Prior to Assistiv Labs, Andrew provided engineering leadership to Disney, Apple, and Zapier.
                    </p>
                    <p>During the Summer of 2019, Andrew founded <a href="https://the-collab-lab.codes">The Collab Lab</a>, a nonprofit that provides remote, collaborative project practice for early career web developers. The program brings code school graduates and self-taught career switchers together with working web developers to work on software projects using agile practices used by professional software teams.</p>
                    <p>Outside of work, Andrew publishes books with <a href="https://david.hedges.name">his dad</a> via <a href="https://roadsendpress.com">Road’s End Press</a> and produces <a href="https://theslantandgo.com">The Slant and Go</a>, a podcast about the National Football League.</p>
                    <p>Prior to his career in web development, Andrew worked in higher education administration, coordinating training programs for university staff. He holds a Masters of Education from the University of Maryland, College Park. In 1995, Andrew wrote his terminal paper for that degree on <a href="https://img.hedges.name/cmcandcsd.html">the potential effects of computer-mediated communication on college student identity development</a>.</p>
                </details>
            </aside>
        </main>
        <footer class="clearfix">
            <nav>
                <p>
                    <a href="https://andrew.hedges.name">Home</a> |
                    <a href="https://andrew.hedges.name/<?=BASE_PATH?>/" class="selected">Blog</a> |
                    <a href="https://andrew.hedges.name/experiments/">Experiments</a> |
                    <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#97;&#110;&#100;&#114;&#101;&#119;&#64;&#104;&#101;&#100;&#103;&#101;&#115;&#46;&#110;&#97;&#109;&#101;">Contact</a>
                </p>
                <p>
                    <a class="icon" href="https://github.com/segdeha"><img loading="lazy" src="/blog/assets/img/icon/github.png" alt="GitHub"></a>
                    <a class="icon" href="https://instagram.com/segdeha"><img loading="lazy" src="/blog/assets/img/icon/instagram.png" alt="Instagram"></a>
                    <a class="icon" href="https://www.linkedin.com/in/andrewhedges"><img loading="lazy" src="/blog/assets/img/icon/linkedin.png" alt="LinkedIn"></a>
				    <a class="icon" href="https://mastodon.social/@segdeha"><img src="/-/img/icons/mastodon.png" alt="Mastodon"></a>
                    <a class="icon" href="https://stackoverflow.com/users/11577"><img loading="lazy" src="/blog/assets/img/icon/stackoverflow.png" alt="Stack Overflow"></a>
                    <a class="icon" href="https://twitter.com/segdeha"><img loading="lazy" src="/blog/assets/img/icon/twitter.png" alt="Twitter"></a>
                </p>
            </nav>
    		<p class="license">
    			<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/"><img alt="Creative Commons License" style="border-width: 0;vertical-align: text-bottom;position: relative;bottom: -1px;margin-right: 0.25em;" loading="lazy" src="https://i.creativecommons.org/l/by-nc-sa/3.0/80x15.png"></a> This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a>.
            </p>
        </footer>
    </body>
</html>
