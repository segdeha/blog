// Code by Andrew Hedges, andrew(at)hedges(dot)name
// If you use my code, I'd appreciate a link back to http://andrew.hedges.name/
(function () {
	var iters, loader, string, html, node, timer;
	iters   = 10000;
	string  = 'Chubby bunny.';
	htmlDiv = '<div>' + string + '</div>';
	nodeDiv = document.createElement('DIV');
	nodeDiv.appendChild(document.createTextNode(string));
	timer   = (function () {
		var _values;
		_values = {
			start  : undefined,
			finish : undefined
		};
		return {
			start: function (timeDiv) {
				timeDiv.innerHTML = 'Please wait&#8230;';
				_values.start = (new Date()).getTime();
			},
			stop: function (timeDiv) {
				_values.finish = (new Date()).getTime();
				timeDiv.innerHTML = (_values.finish - _values.start) + 'ms';
			}
		};
	})();
	document.getElementById('button-innerhtml').onclick = function () {
		var resultDiv, timeDiv, innerHTML, iterations;
		resultDiv = document.getElementById('result-innerhtml');
		timeDiv   = document.getElementById('time-innerhtml');
		resultDiv.innerHTML = '';
		timer.start(timeDiv);
		
		///////////////////
		// START TEST CODE
		
		// Start 1st pass
		innerHTML  = [];
		iterations = iters + 1;
		while (--iterations > 0) {
			innerHTML[innerHTML.length] = htmlDiv;
		}
		resultDiv.innerHTML = innerHTML.join('');
		resultDiv.innerHTML = '';
		
		// Start 2nd pass
		innerHTML  = [];
		iterations = iters + 1;
		while (--iterations > 0) {
			innerHTML[innerHTML.length] = htmlDiv;
		}
		resultDiv.innerHTML = innerHTML.join('');
		
		// FINISH TEST CODE
		///////////////////
		
		timer.stop(timeDiv);
	};
	document.getElementById('button-domreplace').onclick = function () {
		var resultDiv, timeDiv, cloneDiv, container, iterations;
		resultDiv   = document.getElementById('result-domreplace');
		timeDiv     = document.getElementById('time-domreplace');
		cloneDiv    = resultDiv.cloneNode(false);
		cloneDiv.id = 'result-domreplace';
		resultDiv.parentNode.replaceChild(cloneDiv, resultDiv);
		resultDiv   = cloneDiv;
		timer.start(timeDiv);
		
		///////////////////
		// START TEST CODE
		
		// Start 1st pass
		container  = document.createDocumentFragment();
		iterations = iters;
		container.appendChild(nodeDiv);
		while (--iterations > 0) {
			container.appendChild(container.firstChild.cloneNode(true));
		}
		resultDiv.appendChild(container);
		
		// Start 2nd pass
		cloneDiv    = resultDiv.cloneNode(false);
		cloneDiv.id = 'result-domreplace';
		container   = document.createDocumentFragment();
		iterations  = iters;
		container.appendChild(nodeDiv);
		while (--iterations > 0) {
			container.appendChild(container.firstChild.cloneNode(true));
		}
		resultDiv.parentNode.replaceChild(cloneDiv, resultDiv);
		cloneDiv.appendChild(container);
		
		// FINISH TEST CODE
		///////////////////
		
		timer.stop(timeDiv);
	};
	document.getElementById('button-domdestroy').onclick = function () {
		var resultDiv, timeDiv, innerHTML, iterations, container;
		resultDiv = document.getElementById('result-domdestroy');
		timeDiv   = document.getElementById('time-domdestroy');
		resultDiv.innerHTML = '';
		timer.start(timeDiv);
		
		///////////////////
		// START TEST CODE
		
		// Start 1st pass
		innerHTML  = [];
		iterations = iters + 1;
		while (--iterations > 0) {
			innerHTML[innerHTML.length] = htmlDiv;
		}
		resultDiv.innerHTML = innerHTML.join('');
		
		// Start 2nd pass
		container    = resultDiv.cloneNode(false);
		container.id = 'result-domdestroy';
		innerHTML  = [];
		iterations = iters + 1;
		while (--iterations > 0) {
			innerHTML[innerHTML.length] = htmlDiv;
		}
		container.innerHTML = innerHTML.join('');
		resultDiv.parentNode.replaceChild(container, resultDiv);
		
		// FINISH TEST CODE
		///////////////////
		
		timer.stop(timeDiv);
	};
})();
