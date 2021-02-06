/* Debugging functions
*/

var DEBUG = (function () {
    var _defaultHTML, _divCSS, _init;
	
    _defaultHTML = '<a href="#" onclick="DEBUG.clear();return false;">Clear</a><hr/>';
    
	_divCSS = {
        position   : 'fixed',
        top        : '30px',
        right      : '10px',
        width      : '400px',
        border     : 'solid 1px black',
        background : '#ccc',
        padding    : '10px',
        font       : '11px/1.2em verdana',
        textAlign  : 'left',
        zIndex     : 9999
    };

    _init = function () {
        var debugDiv;
        debugDiv = document.getElementById('debug');
        if (null === debugDiv) {
            debugDiv    = document.createElement('DIV');
            debugDiv.id = 'debug';
            for (var prop in _divCSS) {
                debugDiv.style[prop] = _divCSS[prop];
            }
            document.body.insertBefore(debugDiv, document.body.firstChild);
            DEBUG.clear();
        }
    };

    return {
        write: function (s) {
            _init();
            s = s || '';
            document.getElementById('debug').innerHTML += s + '<br />';
        },
		
        reveal: function (obj, showFunctions) {
            for (prop in obj) {
                if (showFunctions || 'function' !== typeof obj[prop]) {
                    this.write(prop + ': ' + obj[prop]);
                }
            }
        },
		
        clear: function () {
            document.getElementById('debug').innerHTML = _defaultHTML;
        }
    }
})();
