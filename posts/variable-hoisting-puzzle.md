{
  "title": "Variable Hoisting Puzzle",
  "slug": "variable-hoisting-puzzle",
  "topics": ["JavaScript"],
  "keywords": "javascript, hoisting, execution context, function",
  "created_date": "2012-11-27 12:28:13",
  "short_url": "http://ahedg.es/102",
  "published": true
}

========

My colleague, [Kyle](http://kyleolsondesign.com), recently sent around an excellent article on [execution contexts in JavaScript](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/). I’m a big fan of esoteric JavaScript puzzles, so here’s one for you. _Hint: the answer is in the above-linked article!_

========

Given the following…

<pre class="sh_javascript">(function(){
    alert(a)
}())</pre>
<p style="margin-top:-1em;"><a target="_alert" href="/blog/assets/files/hoisting-1.html">Run it</a></p>

And…

<pre class="sh_javascript">(function(a){
    alert(a)
}(1))</pre>

<p style="margin-top:-1em;"><a target="_alert" href="/blog/assets/files/hoisting-2.html">Run it</a></p>

And…

<pre class="sh_javascript">(function(){
    var a
    alert(a)
    a = 2
    alert(a)
}())</pre>

<p style="margin-top:-1em;"><a target="_alert" href="/blog/assets/files/hoisting-3.html">Run it</a></p>

What do we expect the following to do, and why?

<pre class="sh_javascript">(function(a){
    var a
    alert(a)
    a = 2
    alert(a)
}(1))</pre>

<p style="margin-top:-1em;"><a target="_alert" href="/blog/assets/files/hoisting-4.html">Run it</a></p>

<iframe style="position:absolute;width:0;height:0;" name="_alert"></iframe>

I wasn’t surprised that Kyle—the person who sent around the article that prompted all of this—was also the first to answer this puzzle I sent in response. The following was his answer:

<details>
    <summary>Click here to reveal</summary>
      <p>
          <code>a</code> is defined in the creation stage by the argument passed in (i.e. 1)<br>
          <code>a</code> then is redefined as 2 during the execution stage after the first console.log
      </p>
      <p>And the <code>var</code> is ignored since the variable was already defined previously by the argument name. <em>From the article:</em></p>
      <blockquote style="margin-bottom:0.5em">if the property name already exists on the activation object, we simply bypass the declaration</blockquote>
</details>
