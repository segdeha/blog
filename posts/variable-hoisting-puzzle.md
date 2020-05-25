{
  "title": "Variable Hoisting Puzzle",
  "slug": "variable-hoisting-puzzle",
  "topics": ["JavaScript"],
  "keywords": "javascript, hoisting, execution context, function",
  "created_date": "2012-11-27 12:28:13",
  "short_url": "http://ahedg.es/102",
  "published": false
}

========

My colleague, <a href="http://kyleolsondesign.com/">Kyle</a>, recently sent around an excellent article on <a href="http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/">execution contexts in JavaScript</a>. I&#8217;m a big fan of esoteric JavaScript puzzles, so here&#8217;s one for you. <em>Hint: the answer is in the above-linked article!</em>

========

<p>Given the following&#8230;</p>
<pre class="sh_javascript">(function(){
    alert(a)
}())</pre>
<p style="margin-top:-1em;"><a target="_alert" href="/blog/assets/files/hoisting-1.html">Run it</a></p>

<p>And&#8230;</p>
<pre class="sh_javascript">(function(a){
    alert(a)
}(1))</pre>
<p style="margin-top:-1em;"><a target="_alert" href="/blog/assets/files/hoisting-2.html">Run it</a></p>

<p>And&#8230;</p>
<pre class="sh_javascript">(function(){
    var a
    alert(a)
    a = 2
    alert(a)
}())</pre>
<p style="margin-top:-1em;"><a target="_alert" href="/blog/assets/files/hoisting-3.html">Run it</a></p>

<p>What do we expect the following to do, and why?</p>
<pre class="sh_javascript">(function(a){
    var a
    alert(a)
    a = 2
    alert(a)
}(1))</pre>
<p style="margin-top:-1em;"><a target="_alert" href="/blog/assets/files/hoisting-4.html">Run it</a></p>

<iframe style="position:absolute;width:0;height:0;" name="_alert"></iframe>

<p>I wasn&#8217;t surprised that Kyle&#8212;the person who sent around the article that prompted all of this&#8212;was also the first to answer this puzzle I sent in response. The following was his answer (hidden for suspense, <a href="#" onclick="var el=document.getElementById('response');el.style.display='none'===el.style.display?'':'none';return false;">click here to reveal</a>!):</p>

<div style="padding:10px;margin:0 -10px 1.5em;background:#f0f0f0;">
    <div id="response" style="display:none">
        <p>
            `a` is defined in the creation stage by the argument passed in (i.e. 1)<br>
            `a` then is redefined as 2 during the execution stage after the first console.log
        </p>
        <p>And the `var` is ignored since the variable was already defined previously by the argument name. <em>From the article:</em></p>
        <blockquote style="margin-bottom:0.5em">if the property name already exists on the activation object, we simply bypass the decleration[sic]</blockquote>
    </div>
</div>
