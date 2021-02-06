/* Common methods
   Author:		Andrew Hedges, andrew@bookabach.co.nz
   Date:		15/7/08
   Requires:	jquery.js
*/

if ('undefined' === typeof BOOKABACH) {
	BOOKABACH = {};
}

BOOKABACH.is = (function () {
	// private variables
	var
		// constants
		UNDEFINED = 'undefined',
		// values
		_rgxps,
		_safaris
	;
	
	_rgxps = {
		numeric : /^-?[0-9]+(\.?[0-9]*)$/
	};
	
	_safaris = [
		// Safari 0.x
		['48', '73'],
		// Safari 1.x
		['85', '85.8.5', '100', '125', '312', '312.3', '312.5'],
		// Safari 2.x
		['412', '416.11', '419.3']
	];
	
	// public methods
	return {
		numeric: function (val) {
			return _rgxps.numeric.test(val);
		},
		/*	All BOOKABACH.is.<browser> methods (except BOOKABACH.is.safari, see comment accompanying that method)
			can find versions of whatever precision is needed. Examples:
			
				BOOKABACH.is.ie()
				BOOKABACH.is.ie(5)
				BOOKABACH.is.ie(5.0)
				BOOKABACH.is.ie(5.01)
			
			Versions with minor point releases must be enclosed in quotes:
			
				BOOKABACH.is.firefox('2.0.0.16')
			
		*/
		ie: function (version) {
			var isIE;
			isIE = (document.all && !window.opera);
			if (UNDEFINED !== typeof version) {
				isIE = (isIE && navigator.userAgent.indexOf('MSIE ' + version) > -1);
			}
			return isIE;
		},
		firefox: function (version) {
			var isFirefox;
			isFirefox = (navigator.userAgent.indexOf('Firefox') > -1);
			if (UNDEFINED !== typeof version) {
				isFirefox = (isFirefox && navigator.userAgent.indexOf('Firefox/' + version) > -1);
			}
			return isFirefox;
		},
		// only finds point releases above 3.0 (ie. can find Safari 1, but not Safari 1.1)
		safari: function (version) {
			var isSafari;
			isSafari = (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') < 0);
			if (isSafari && UNDEFINED !== typeof version) {
				if (navigator.userAgent.indexOf('Version/') > -1) {
					isSafari = (navigator.userAgent.indexOf('Version/' + version) > -1);
				} else {
					version = Math.floor(version); // cast as int and truncate anything after decimals
					// don't do a jQuery loop here because jQuery isn't supported(?) by some of the older browsers
					if (UNDEFINED === typeof _safaris[version]) {
						isSafari = false;
					} else {
						for (var i = 0, len = _safaris[version].length; i < len; ++i) {
							if (navigator.userAgent.indexOf('Safari/' + _safaris[version][i]) > -1) {
								isSafari = true;
								break;
							} else {
								isSafari = false;
							}
						}
					}
				}
			}
			return isSafari;
		},
		chrome: function (version) {
			var isChrome;
			isChrome = (navigator.userAgent.indexOf('Chrome') > -1);
			if (UNDEFINED !== typeof version) {
				isChrome = (isChrome && navigator.userAgent.indexOf('Chrome/' + version) > -1);
			}
			return isChrome;
		},
		opera: function (version) {
			var isOpera;
			isOpera = (window.opera);
			if (UNDEFINED !== typeof version) {
				isOpera = (isOpera && navigator.userAgent.indexOf('Opera/' + version) > -1);
			}
			return isOpera;
		},
		/*	Return true or false depending on whether the current browser supports full functionality for the given method
			@param string methodName Name of the method to test
			@return boolean Return false if the browser is not supported, otherwise true
		*/
		supported: function (methodName) {
			switch (methodName) {
				case 'BOOKABACH.ui.toggle':
					if (BOOKABACH.is.safari(2)) return false;
					if (BOOKABACH.is.safari(1)) return false;
					if (BOOKABACH.is.safari(0)) return false;
			}
			return true;
		}
	};
})();

BOOKABACH.fixes = (function () {
	// private members
	// public members
	return {
		/*	Set all DIVs with IDs matching the regular expression to display: block
			@param regular expression rgxp Regular expression object matching DIV IDs to manipulate
		*/
		showDivs: function (rgxp) {
			var divs;
			divs = document.getElementsByTagName('DIV');
			for (var i = 0, len = divs.length; i < len; ++i) {
				if (rgxp.test(divs[i].id)) {
					divs[i].style.display = 'block';
				}
			}
		}
	};
})();

/*	Simple templating, based on the API for Prototype's templating system
*/
BOOKABACH.templates = (function () {
	// private members
	var
		// values
		_rgxp,
		_repr,
		_vals
	;
	
	// regular expression for matching our placeholders; e.g., #{my-cL@Ss_name77}
	_rgxp = /#\{([^{}]*)}/g;
	
	/*	Function for making replacements
		@param string str   Full string
		@param string match Matched substring
		@return string
	*/
	_repr = function (str, match) {
		return typeof _vals[match] === 'string' || typeof _vals[match] === 'number' ? _vals[match] : str;
	};
	
	/*	Template constructor
		@param string str String to be saved as a template
		@return object New template object
	*/
	function Template(str) {
		this.str = str || '';
	};
	
	/*	Evaluate the template and return the result
		@param object vals Object literal with values to be merged with the template
		@return string
	*/
	Template.prototype.evaluate = function (vals) {
		_vals = vals || {};
		return this.str.replace(_rgxp, _repr);
	};
	
	// public members
	return {
		/*	Construct a new template
			@param string str String for the template (e.g., '<div id="#{id}">#{content}</div>')
			@return object New template object
		*/
		make : function (str) {
			return new Template(str);
		}
	};
})();

BOOKABACH.dates = (function () {
	// private members
	var _daysInMonths, _tmpls, _rgxps;
	_daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	_tmpls = {
//		ymd : [0, '-', 0, '-', 0]
		ymd : BOOKABACH.templates.make('#{y}-#{m}-#{d}')
	};
	_rgxps = {
		ymd : /\d{4}-\d{2}-\d{2}/
	};
	// public members
	return {
		daysOfTheWeek : ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
		months        : ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
		/*	Get the number of days in any given month
			Based on: http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html
			@param int month Month (e.g., January = 0)
			@param int year  Year (e.g., 2008)
			@return int
		*/
        getDaysInMonth: function (month, year) {
            month = +month; // cast as int
            year  = +year; // cast as int
            // if the month is February and it's a leap year, return 29
            // test for 1 === m first to short-circuit the more expensive tests
            if (1 === month && ((0 === year % 4 && 0 !== year % 100) || 0 === year % 400)) {
                return 29;
            } else {
                return _daysInMonths[month];
            }
		},
		/*	Get the number of days in any given year
			@param int year Year (e.g., 2008)
			@return int Number of days (e.g., 366)
		*/
		getDaysInYear: function (year) {
			year = +year; // cast as int
			return 29 === BOOKABACH.dates.getDaysInMonth(1, year)? 366 : 365;
		},
		/*	Get the number of days between two dates
			@param object date1 JavaScript date object
			@param object date2 JavaScript date object
			@return int Number of days from one date to the other
		*/
		getDiff: function (date1, date2) {
			var timeDiff;
			if ('number' !== typeof date1) date1 = date1.getTime();
			if ('number' !== typeof date2) date2 = date2.getTime();
			timeDiff = Math.abs(date1 - date2);
			return Math.floor(timeDiff / 86400000);
		},
		/*	Convert a number of days since epoch to a UNIX timestamp
			@param int days Number of days since epoch (January 1, 1970)
			@return int UNIX timestamp
		*/
		daysToTimestamp: function (days) {
			return Math.round(+days * 86400);
		},
		/*	Convert a number of days since epoch to a JavaScript time value
			@param int days Number of days since epoch (January 1, 1970)
			@return int JavaScript time value
		*/
		daysToJsTime: function (days) {
			return Math.round(+days * 86400000);
		},
		/*	Convert a UNIX timestamp to a number of days since epoch
			@param int UNIX timestamp
			@return int Number of days since epoch (January 1, 1970)
		*/
		timestampToDays: function (ts) {
			return Math.round(+ts / 86400);
		},
		/*	Convert a JavaScript time value to a number of days since epoch
			@param int js JavaScript time value
			@return int Number of days since epoch (January 1, 1970)
		*/
		jsTimeToDays: function (js) {
			return Math.round(+js / 86400000);
		},
		/*	Convert a JavaScript date object to YYYY-MM-DD format
			@param object obj JavaScript date object
			@return string YYYY-MM-DD formatted date
		*/
		objToYmd: function (obj) {
			var y, m, d;
			
			if ('number' === typeof obj) {
				obj = new Date(obj);
			}
			
			y = obj.getFullYear();
			m = (obj.getMonth() + 1).toString();
			d = (obj.getDate()).toString();
			
			if (m.length < 2) m = '0' + m;
			if (d.length < 2) d = '0' + d;
			
			return _tmpls.ymd.evaluate({y : y, m : m, d : d});
		},
		/*	Convert a YYYY-MM-DD formatted date string to a JavaScript object
			@param string YYYY-MM-DD formatted date
			@return object obj JavaScript date object
		*/
		ymdToObj: function (ymd) {
			var ymds;
			if (!_rgxps.ymd.test(ymd)) {
				throw 'PEBKAC: date string must be in "YYYY-MM-DD" format';
			}
            ymds = ymd.split('-');
            return new Date(+ymds[0], +ymds[1] - 1, +ymds[2]);
		},
		/*	Add days to a date object
			@param object dateObj JavaScript date object
			@param int    numDays The number of days to add to the date (e.g., 7 or -12)
			@return object Altered JavaScript date object
		*/
		addDays: function (dateObj, numDays) {
			// work on a copy of the dateObj
			var date;
			date = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
			return new Date(date.setDate(date.getDate() + numDays));
		},
		/*	Add months to a date object
			@param object dateObj   JavaScript date object
			@param int    numMonths The number of months to add to the date (e.g., 7 or -12)
			@return object Altered JavaScript date object
		*/
		addMonths: function (dateObj, numMonths) {
			return new Date(dateObj.getFullYear(), (dateObj.getMonth() + numMonths), dateObj.getDate());
		},
		/*	Add years to a date object
			@param object dateObj  JavaScript date object
			@param int    numYears The number of years to add to the date (e.g., 7 or -12)
			@return object Altered JavaScript date object
		*/
		addYears: function (dateObj, numYears) {
			return new Date((dateObj.getFullYear() + numYears), dateObj.getMonth(), dateObj.getDate());
		}
	};
})();

BOOKABACH.utils = (function () {
	// private members
	// public members
	return {
		/*	Sort an array numerically (sorts in-place)
			@param array array Array to be sorted (must contain only numerical values)
		*/
		numericalSort: function (array) {
			array.sort(function (a, b) {
				return a > b ? 1 : a < b ? -1 : 0;
			});
		},
		/*	Limit a number to the bounds given
			@param int upper  Upper limit
			@param int lower  Lower limit
			@param int number Number to be limited
			@return int Number that falls within the bounds
		*/
		limit: function (upper, lower, number) {
			return number > upper ? upper : number < lower ? lower : number;
		},
		/*	Return a random integer from the min and max values passed in
			(based on the script here: http://mattsnider.com/languages/javascript/random-integers/)
			@param int min
			@param int max
			@return int
		*/
		rnd: function (min, max) {
			var mn, mx, dist;
			
			if (!BOOKABACH.is.numeric(min) || !BOOKABACH.is.numeric(max)) {
				throw 'min and max must be numbers';
			}
			
			mx   = min > max ?  min : max;
			mn   = min === mx ? max : min;
			dist = mx - mn + 1;
			
			return Math.floor(Math.random() * dist + mn);
		},
		/*	Get the cumulative offset for a DOM object
			Based on: http://www.quirksmode.org/js/findpos.html
			@param object obj DOM object
			@return object Object literal with x and y values, expressed in pixels
		*/
		getCumulativeOffset: function (obj) {
			var left, top;
			left = top = 0;
			if (obj.offsetParent) {
				do {
					left += obj.offsetLeft;
					top  += obj.offsetTop;
				} while (obj = obj.offsetParent);
			}
			return {
				x : left,
				y : top
			};
		},
		/*	Return the distance in pixels the user has scrolled from the top and left
			@return object literal
		*/
		getScroll: function () {
			var scroll;
			
			if ('number' === typeof window.pageYOffset) {
				// Mozilla
				scroll = {
					x : window.pageXOffset,
					y : window.pageYOffset
				};
			} else if ('undefined' !== document.documentElement && 'undefined' !== typeof document.documentElement.scrollTop) {
				// IE 6/7 (standards mode)
				scroll = {
					x : document.documentElement.scrollLeft,
					y : document.documentElement.scrollTop
				};
			} else if ('undefined' !== document.body && 'undefined' !== typeof document.body.scrollTop) {
				// DOM compliant
				scroll = {
					x : document.body.scrollLeft,
					y : document.body.scrollTop
				};
			} else {
				scroll = undefined;
			}
			
			return scroll;
		},
		/*	Return the hash from the window.location or undefined if there is none
			@return string or undefined
		*/
		getHash: function () {
			return ('' !== window.location.hash && '#' !== window.location.hash)? window.location.hash.slice(1): undefined;
		},
		/*	Return an object literal with keys and values from an URL's query string
			@param string url URL or fragment (optional, defaults to location.href)
			@return object literal
		*/
		getKeysAndValuesFromUrl: function (url) {
			var returnObj, urlPieces;
			url       = url || location.href;
			returnObj = {};
			urlPieces = url.split('?');
			if ('undefined' !== typeof urlPieces[1]) {
				urlPieces = urlPieces[1].split('#')[0];
				urlPieces = urlPieces.split('&');
				if (urlPieces.length > 1) {
					$.each(urlPieces, function () {
						var pieces;
						pieces = this.split('=');
						if (pieces.length > 1) {
							// cast as number, if appropriate
							returnObj[pieces[0]] = BOOKABACH.is.numeric(pieces[1])? +pieces[1] : BOOKABACH.utils.urlDecode(pieces[1]);
						}
					});
				}
			}
			return returnObj;
		},
		/*	Decode an URL parameter value (e.g., "a+b" becomes "a b") (UTF-8 safe!)
			Based on the script at: http://www.webtoolkit.info/javascript-url-decode-encode.html
			@param string str Any URL-encoded string
			@return string
		*/
		urlDecode: function (str) {
			var s, i, c, c1, c2;
			
			if ('undefined' === typeof str) {
				throw 'PEBKAC: no string specified';
			}
			
			s   = '';
			i   = 0;
			str = str.replace(/\++/g, ' ');
			str = unescape(str);
			
			while (i < str.length) {
				c = str.charCodeAt(i);
				if (c < 128) {
					s += String.fromCharCode(c);
					i += 1;
				} else if (c > 191 && c < 224) {
					c2 = str.charCodeAt(i + 1);
					s += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = str.charCodeAt(i + 1);
					c3 = str.charCodeAt(i + 2);
					s += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			
			return s;
		},
		/*	Compare 2 arrays for whether they contain the same values (not for whether they are the same array!)
			@param array array1
			@param array array2
			@return boolean
		*/
		compareArrays: function (array1, array2) {
			if (array1.length != array2.length) return false;
			for (var i = 0; i < array2.length; i++) {
				if (Array == array1[i].constructor) { // likely nested array
					if (!BOOKABACH.utils.compareArrays(array1[i], array2[i])) return false;
					else continue;
				}
				if (array1[i] != array2[i]) return false;
			}
			return true;
		},
		/*	Trim whitespace from a string
			@param string str The string to trim
			@return string
		*/
		trim: function (str) {
			return (str.replace(/^\s+/, '').replace(/\s+$/, ''));
		},
		/*	Return a number value formatted in NZD
			@param float value  Number value
			@param int   digits Number of digits after the decimal (optional, defaults to 0)
			@return string
		*/
		dollarFormat: function (value, digits, commas) {
			var goal;
			
			// default to no cents
			digits = BOOKABACH.is.numeric(digits)? digits : 0;
			commas = commas || false;
			
			if (!BOOKABACH.is.numeric(value)) throw 'PEBKAC: value is not numeric';
			
			value = value.toString();
			
			// short-circuit more expensive while routine
			if (0 === digits) {
				return '$' + value.split('.')[0];
			}
			
			// short-circuit again, this time adding the dot and zero padding
			if (digits > 0 && value.indexOf('.') < 0) {
				value = +value;
				return '$' + value.toFixed(digits);
			}
			
			// otherwise, trim the value string down to the right length
			goal  = value.indexOf('.') + digits + 1;
			value = value.split('');
			
			// pad the array first to make sure we can always trim
			for (var i = 0; i < digits; ++i) {
				value[value.length] = 0;
			}
			
			// trim unneeded array members
			while (goal < value.length) {
				value.length--;
			}
			
			value = value.join('');
			
			if (commas) {
				// TODO implemenet display of commas, e.g., $1,234,567.00
			}
			
			return '$' + value;
		},
		/*	Convert any string into one usable as a DOM ID (only letters, numbers, underscores, and hypens)
			@param string str
			@return string
		*/
		stringToId: function (str) {
			var rgxp, strings;
			rgxp    = /[0-9a-zA-Z\_-]/;
			strings = str.split('');
			
			strings = $.grep(strings, function (val, idx) {
				return rgxp.test(val);
			});
			
			return strings.join('');
		},
		/*	Change a string to Title Case
			Based on the script here: http://individed.com/code/to-title-case/js/to-title-case.js
			@param string str
			@return string
		*/
		toTitleCase: function (str) {
			return str.replace(/([\w&`'‘’"“.@:\/\{\(\[<>_]+-? *)/g, function(match, p1, index, title){ // ' fix syntax highlighting
				if (index > 0 && title.charAt(index - 2) != ":" && 
					match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ -]/i) > -1)
					return match.toLowerCase();
				if (title.substring(index - 1, index + 1).search(/['"_{([]/) > -1)
					return match.charAt(0) + match.charAt(1).toUpperCase() + match.substr(2);
				if (match.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/) > -1 ||
					title.substring(index - 1, index + 1).search(/[\])}]/) > -1)
					return match;
				return match.charAt(0).toUpperCase() + match.substr(1);
			});
        }
	};
})();

BOOKABACH.ui = (function () {
	// private members
	var
		// constants
		COLS				= 'cols',
		NAME				= 'name',
		ROWS				= 'rows',
		SAVE				= 'Save',
		SIZE				= 'size',
		TYPE				= 'type',
		CANCEL				= 'Cancel',
		HIDDEN				= 'hidden',
		EDITING				= 'editing',
		OPTIONS				= 'options',
		MAXLENGTH			= 'maxlength',
		UNDEFINED			= 'undefined',
		PADDINGLEFT			= 'padding-left',
		PADDINGRIGHT		= 'padding-right',
		BACKGROUNDCOLOR		= 'background-color',
		BORDERLEFTWIDTH		= 'border-left-width',
		BORDERRIGHTWIDTH	= 'border-right-width',
		// values
		_sliderParams
	;
	
	// public members
	return {
		/*	Get the "true" width of an element (width + padding + borders)
			@param object element DOM element
			@return int Width of the element, expressed in pixels
		*/
		getTrueWidth: function (element) {
			var width;
			width  = parseInt($(element).width(), 10);
			width += parseInt($(element).css(PADDINGLEFT), 10);
			width += parseInt($(element).css(PADDINGRIGHT), 10);
			width += parseInt($(element).css(BORDERLEFTWIDTH), 10);
			width += parseInt($(element).css(BORDERRIGHTWIDTH), 10);
			return width;
		},
		// Used for deferring execution of scripts to allow better parallelization and quick page paints
		deferValue: (function () {
			return BOOKABACH.is.firefox() ? 251 : 0;
		})(),
		/*	Apply a fading yellow colour to an element
			@param string selector CSS selector for the element(s) that will be yellowed, then faded
		*/
		yellowFade: function (selector) {
			$.each($(selector), function () {
				var oldBgColour;
				oldBgColour = $(this).css(BACKGROUNDCOLOR);
				$(this).css({BACKGROUNDCOLOR : '#fc0'});
				
				// TODO finish this!
				
			});
		},
		/*	Edit in place
			@param object params Object literal with the following members:
									- selector       CSS selector for the element containing the editable region(s)
									- url            URL to which to post the edited content (optional, defaults to current page)
									- saveLabel      Text to show on save button (optional, defaults to "Save")
									- cancelLabel    Text to show on cancel button (optional, defaults to "Cancel")
									- errorContainer CSS selector for the element that will take any error return HTML (optional, defaults to "#error-container")
		*/
		editInPlace: function (params) {
			var tmpls, container, editables, hidables, buttons, form;
			
			if (UNDEFINED === typeof params.selector) {
				throw 'PEBKAC: no selector specified';
			}
			
			params.url            = params.url            || location.href;
			params.saveLabel      = params.saveLabel      || SAVE;
			params.cancelLabel    = params.cancelLabel    || CANCEL;
			params.errorContainer = params.errorContainer || '#error-container';
			
			tmpls = {
				save     : BOOKABACH.templates.make('<input class="button-save" type="button" value="#{value}" />'),
				cancel   : BOOKABACH.templates.make('<input class="button-cancel" type="button" value="#{value}" />'),
				text     : BOOKABACH.templates.make('<input type="text" name="#{name}" value="#{value}"#{size}#{maxlength} />'),
				hidden   : BOOKABACH.templates.make('<input type="hidden" name="#{name}" value="#{value}" />'),
				textarea : BOOKABACH.templates.make('<textarea name="#{name}"#{rows}#{cols}>#{value}</textarea>'),
				select   : BOOKABACH.templates.make('<select name="#{name}">#{options}</select>'),
				option   : BOOKABACH.templates.make('<option value="#{value}"#{selected}>#{text}</option>')
			};
			
			container = $(params.selector);
			editables = $('.editable', container);
			hidables  = $('.hideable', container);
			buttons   = $('.buttonable', container);
			
			form = {};
			
			form.show = function () {
				// hide original elements
				$.each(editables, function () {
					$(this).hide();
				});
				$.each(hidables, function () {
					$(this).hide();
				});
				
				// add fields
				// <span class="editable" name="base-price-night" size="6" maxlength="12" type="text">
				// <span class="editable" name="for-up-to" type="select" options="1-20">
				$.each(editables, function () {
					var attrs, html, options;
					attrs = {};
					attrs.type  = $(this).attr(TYPE);
					attrs.name  = $(this).attr(NAME);
					attrs.value = $.trim($(this).html());
					
					if (UNDEFINED === typeof attrs.name) throw 'PEBKAC: missing "name" attribute';
					if (UNDEFINED === typeof attrs.type) throw 'PEBKAC: missing "type" attribute';
					
					switch (attrs.type) {
						case 'select':
							// get attributes
							attrs.options = $(this).attr(OPTIONS);
							
							// set template values
							options = '';
							
							if (UNDEFINED !== typeof attrs.options) {
								if (/-{1}/.test(attrs.options)) {
									attrs.value   = +attrs.value;
									attrs.options = attrs.options.split('-');
									// range (only works with numerical values)
									if (
										!BOOKABACH.is.numeric(attrs.value)      || 
										!BOOKABACH.is.numeric(attrs.options[0]) || 
										!BOOKABACH.is.numeric(attrs.options[1])
										) {
										throw 'PEBKAC: ranges only work for numerical values';
									}
									for (var i = +attrs.options[0], len = +attrs.options[1] + 1; i < len; ++i) {
										options += tmpls.option.evaluate({
											value    : i,
											selected : (attrs.value === i)? ' selected="selected"' : '',
											text     : i
										});
									}
								} else if (attrs.options.indexOf(',') > -1) {
									// comma-delimited list
									attrs.options = attrs.options.split(',');
									$.each(attrs.options, function () {
										options += tmpls.option.evaluate({
											value    : this,
											selected : (attrs.value === this)? ' selected="selected"' : '',
											text     : this
										});
									});
								} else {
									// single value
									options += tmpls.option.evaluate({
										value    : attrs.options,
										selected : '',
										text     : attrs.options
									});
								}
							}
							
							html = tmpls.select.evaluate({
								name    : attrs.name,
								options : options
							});
							break;
						case 'textarea':
							// get attributes
							attrs.rows      = $(this).attr(ROWS);
							attrs.cols      = $(this).attr(COLS);
							
							html = tmpls.textarea.evaluate({
								name  : attrs.name,
								value : attrs.value,
								rows  : (UNDEFINED === typeof attrs.rows)? '' : ' rows="' + attrs.rows + '"',
								cols  : (UNDEFINED === typeof attrs.cols)? '' : ' cols="' + attrs.cols + '"'
							});
							break;
						case 'hidden':
							html = tmpls.hidden.evaluate({
								name  : attrs.name,
								value : attrs.value
							});
							break;
						case 'text': // deliberate fall-through
						default:
							// get attributes
							attrs.size      = $(this).attr(SIZE);
							attrs.maxlength = $(this).attr(MAXLENGTH);
							
							html = tmpls.text.evaluate({
								name      : attrs.name,
								value     : attrs.value,
								size      : (UNDEFINED === typeof attrs.size)?      '' : ' size="' + attrs.size + '"',
								maxlength : (UNDEFINED === typeof attrs.maxlength)? '' : ' maxlength="' + attrs.maxlength + '"'
							});
							break;
					}
					
					$(this).after(html);
				});
				
				// add buttons
				$(buttons).html(
					tmpls.save.evaluate({value: params.saveLabel}) + ' ' + 
					tmpls.cancel.evaluate({value: params.cancelLabel})
				);
				// activate buttons
				$('.button-save', container).click(function () {
					form.save();
				});
				$('.button-cancel', container).click(function () {
					form.hide();
				});
				
				// add "editing" class name to container
				$(container).addClass(EDITING);
			};
			
			form.hide = function (save) {
				// get values from fields and replace editable span innerHTMLs
				if (true === save) {
					$.each($('input,select,textarea', container), function () {
						$(this).siblings('.editable').html($(this).val());
					});
				}
				
				// destroy form elements
				$('input,select,textarea', container).remove();
				
				// show original elements
				$.each(editables, function () {
					if (HIDDEN !== $(this).attr(TYPE)) {
						$(this).show();
					}
				});
				$.each(hidables, function () {
					$(this).show();
				});
				
				// add "editing" class name to container
				$(container).removeClass(EDITING);
				
				// remove error or notification messages
				$(params.errorContainer).empty().removeClass();
			};
			
			form.save = function () {
				var data;
				data = {};
				$.each($('input,select,textarea', container), function () {
					var name, value;
					name  = $(this).attr(NAME);
					value = $(this).val();
					if (UNDEFINED !== typeof name) data[name] = value;
				});
				$.ajax({
					url     : params.url,
					type    : 'POST',
					data    : data,
					success : function (msg) {
						form.hide(true);
						$(params.errorContainer).addClass('notification').html(msg);
						
						// TODO make this handle error / success codes in a JSON structure
						/*
						
						if ('error' === msg.status) {
							// do error stuff
						} else {
							// do success stuff
						}
						
						*/
					},
					error   : function (msg) {
						$(params.errorContainer).addClass('error').html(msg);
					}
				});
			};
			
			$('.link-edit', container).click(function () {
				form.show();
				return false;
			});
			
			$('.link-delete', container).click(function () {
				if (confirm('Are you sure you want to delete this item? This cannot be undone.')) {
					$.ajax({
						url : this.href,
						success : function () {
							$(container).remove();
						},
						error : function () {
							alert('There was a problem deleting the item.');
						}
					});
				}
				return false;
			});
		},
		/*	Pin an element in place when the user scrolls (does not apply to IE6 and below)
			@param object params Object literal with the following members:
									- selector  CSS selector for the element(s) to pin
									- scrollPx  Number of pixels to allow the page to scroll before pinning the element (optional, defaults to 255)
									- marginTop Value for margin-top when the element is pinned (optional, defaults to "10px")
		*/
		pinElement: function (params) {
			var element;
			
			if (UNDEFINED === typeof params.selector) {
				throw 'PEBKAC: no selector specified';
			}
			
			element = $(params.selector);
			
			params.scrollPx  = params.scrollPx  || 255;
			params.marginTop = params.marginTop || '10px';
			params.marginOld = element.css('margin-top');
			
			if (!BOOKABACH.is.ie(6) && !BOOKABACH.is.ie(5)) {
				$(window).scroll(function () {
					var scroll, css;
					scroll = BOOKABACH.utils.getScroll();
					if (scroll.y > params.scrollPx) {
						css = {
							'position'   : 'fixed', 
							'top'        : '0px', 
							'margin-top' : params.marginTop
						};
					} else {
						css = {
							'position'   : 'static', 
							'top'        : 'auto', 
							'margin-top' : params.marginOld
						};
					}
					element.css(css);
				});
			}
		},
		/*	Initialise a character count
			@param object params Object literal with the following members:
									- selector  CSS selector for the element(s) to track
									- max       Maximum number of characters (optional, defaults to 500)
									- classname CSS class to apply to the error element (optional, defaults to "error-charcount")
									- errorMsg  Array with error message pieces to display if user has exceeded max chars (optional, see below for default)
		*/
		charCount: function (params) {
			if (UNDEFINED === typeof params) {
				throw 'PEBKAC: no parameters specified';
			}
			
			if (UNDEFINED === typeof params.selector) {
				throw 'PEBKAC: no textarea specified';
			}
			
			params.max       = params.max       || 500;
			params.classname = params.classname || 'error-charcount';
			params.errorMsg  = params.errorMsg  || [
				'<span id="',
				undefined, // [1] DOM ID
				'" class="',
				undefined, // [3] CSS classname
				'">You have entered ',
				undefined, // [5] number of chars user has entered
				' characters; the maximum is ',
				undefined, // [7] max chars allowed
				'.</span>'
			];
			
			// set CSS class and max value for all error messages
			params.errorMsg[3] = params.classname;
			params.errorMsg[7] = params.max;
			
			$(params.selector).keyup(function () {
				var len, errorId;
				len     = $(this).val().length;
				errorId = 'error-' + this.name;
				if (len > params.max) {
					params.errorMsg[1] = errorId;
					params.errorMsg[5] = len;
					if (0 === $('#' + errorId).length) {
						$(this).after(params.errorMsg.join(''));
					} else {
						$('#' + errorId).replaceWith(params.errorMsg.join(''));
					}
				} else {
					$('#' + errorId).remove();
				}
			});
		},
		/*	Register a set of fields to auto-tab from one to the next once the value for maxlength is reached
			@param object params Object literal with the following members:
									- container DOM object containing the fields in question
		*/
		autoTab: function (params) {
			var inputs;
			inputs = $('input[type=text]', params.container);
			$.each(inputs, function (idx, val) {
				var maxlength;
				maxlength = +($(this).attr('maxlength'));
				if (idx < inputs.length - 1) {
					$(this).keyup(function () {
						if (!(this.value.length < maxlength)) {
							inputs[idx + 1].focus();
						}
					});
				}
			});
		},
		/*	Register a text input or textarea to show / hide default text
			@param object params Object literal with the following members:
									- field         DOM object
									- defaultColour Hex colour value for default text (optional, defaults to #999)
									- defaultText   String to be displayed by default (optional, defaults to "Enter a search term")
		*/
		defaultText: function (params) {
			params.defaultColour = params.defaultColour || '#999';
			params.defaultText   = params.defaultText || 'Enter a search term';
			if (UNDEFINED === typeof params.field) {
				throw 'PEBKAC: no field defined';
			} else {
				if (params.defaultText === $.trim(params.field.val())) {
					$(params.field).css({'color': params.defaultColour});
				}
				$(params.field).focus(function () {
					if (params.defaultText === $.trim(this.value)) {
						$(this).css({'color': '#666'});
						this.value = '';
					}
				}).blur(function () {
					if ('' === $.trim(this.value)) {
						$(this).css({'color': params.defaultColour});
						this.value = params.defaultText;
					}
				});
			}
		},
		/*	For links that have a "rel" attribute of "external", add a "target" attribute of "_blank".
		*/
		externalLinks: function () {
			$('a').each(function () {
				var href, rel;
				href = $(this).attr('href');
				rel  = $(this).attr('rel');
				if (UNDEFINED !== typeof href && 'external' === rel) {
					$(this).attr('target', '_blank');
				}
			});
		},
		/*	Simple toggle of CSS display attribute (replaces old "showHide" function)
			@param object params Object literal with the following members:
									- selector    CSS selector (e.g., "#myDiv > img.arrow")
									- display     none | block (optional, defaults to toggling based on current value)
									- speed       String representing speed of toggle animation (optional, defaults to 'normal')
									- imgSelector CSS selector for the element displaying a toggle arrow, either an IMG or an element with a background image set (optional)
		*/
		toggle: function (params) {
			var toggleArrow;
			toggleArrow = function (src) {
				return src.indexOf('-closed') > -1 ? src.replace(/-closed/, '-open') : src.replace(/-open/, '-closed');
			};
			if (UNDEFINED === typeof params.selector) {
				throw 'PEBKAC: no selector specified';
			} else {
				// _safe_setInterval is a function used by Computer Associates' "Security Center"
				if (!BOOKABACH.is.supported('BOOKABACH.ui.toggle') || 'function' === typeof _safe_setInterval) {
					if (UNDEFINED !== typeof params.display) {
						// set display explicitly
						$(params.selector).each(function () {
							$(this).css('display', params.display);
						});
					} else {
						// toggle based on current value
						$(params.selector).each(function () {
							$(this).css('display', ('none' === $(this).css('display'))? 'block': 'none');
						});
					}
				} else {
					params.speed = params.speed || 'normal';
					$(params.selector).toggle(params.speed);
				}
				
				if (UNDEFINED !== typeof params.imgSelector) {
					$(params.imgSelector).each(function () {
						if ('IMG' === this.tagName.toUpperCase()) {
							this.src = toggleArrow(this.src);
						} else if ('none' !== typeof $(this).css('background-image')) {
							$(this).css('background-image', toggleArrow($(this).css('background-image')));
						}
					});
				}
			}
		},
		/*	Display a modal dialog (requires the SimpleModal plugin)
			@param object params Object literal with the following members:
									- content      Content to be shown in the modal
									- overlay      Opacity of the overlay (optional, defaults to 50)
									- close        Boolean for whether or not to show the close "X" (optional, defaults to false)
									- other attributes can be specified, and default to the SimpleModal defaults (see: http://www.ericmmartin.com/projects/simplemodal/)
		*/
		modal: function (params) {
			// set-up default values
			params.overlay      = params.overlay      || 60;
			params.close        = params.close        || false;
			
			if (UNDEFINED === typeof params.content) {
				throw 'PEBKAC: no content specified';
			} else {
				$.modal(params.content, params);
			}
		},
		/*	Initialise a slider control on the page (requires YUI slider scripts)
			@param object params Object literal with the following members:
									- width      Width, in pixels, of the slider track (optional, defaults to 330)
									- minValue   Minimum value the slider is to represent (optional, defaults to 0)
									- maxValue   Maximum value the slider is to represent (optional, defaults to 100)
									- increment  Value the slider is to increment for each "tick" (optional, defaults to 10)
									- startValue The starting value of the slider (optional, defaults to 0)
									- labels     Text to be displayed under the slider track (optional)
									- callback   Function to execute when the user moves the slider (optional)
									- bg         DOM ID for the slider background element (optional, defaults to "slider-bg")
									- thumb      DOM ID for the slider thumb element (optional, defaults to "slider-thumb")
									- value      DOM ID for the slider value element (optional, defaults to "slider-value")
		*/
		slider: function (params) {
			var incrementPx, startPx, label, tick, step;
			
			// save the params so they can be retrieved by the getSliderParams method
			_sliderParams = params;
			
			// set-up default values
			params.width      = params.width      || 344;
			params.minValue   = params.minValue   || 0;
			params.maxValue   = params.maxValue   || 100;
			params.increment  = params.increment  || 10;
			params.startValue = params.startValue || 0;
			params.labels     = params.labels     || [];
			params.callback   = params.callback   || function () {};
			params.bg         = params.bg         || 'slider-bg';
			params.thumb      = params.thumb      || 'slider-thumb';
			params.value      = params.value      || 'slider-value';
			
			// insert track pieces
			$('#' + params.bg)
				.prepend('<div class="slider-track" id="slider-track-l"></div>')
				.prepend('<div class="slider-track" id="slider-track-m" style="width: ' + (params.width - 14) + 'px"></div>')
				.prepend('<div class="slider-track" id="slider-track-r" style="left: ' + (params.width - 7) + 'px"></div>')
			;
			
			label = ['<div class="slider-label" style="left: ', undefined, 'px;">', undefined, '</div>'];
			tick  = ['<div class="slider-tick" style="left: ', undefined, 'px;"></div>'];
			step  = (params.width - 14) / (params.labels.length - 1);
			
			// add tick marks and labels
			$.each(params.labels, function (idx, val) {
				var el, px;
				el = $('#slider-track-l');
				px = step * idx;
				label[1] = px + 4;
				label[3] = val;
				tick[1] = px + 8;
				el.after(label.join(''));
				if (idx > 0 && idx < params.labels.length - 1) {
					el.after(tick.join(''));
				}
			});
			
			// figure pixel equivalents
			incrementPx = (params.width - 14) / ((params.maxValue - params.minValue) / params.increment);
			startPx     = ((((100 *params.startValue) - (100 * params.minValue)) / 100) / params.increment) * incrementPx;
			
			// initalise the slider
			YAHOO.util.Event.onDOMReady(function () {
				var slider;
				slider = YAHOO.widget.Slider.getHorizSlider(params.bg, params.thumb, 0, (params.width - 14), incrementPx);
				slider.setValue(startPx, true, true, true);
				slider.subscribe('change', params.callback);
			});
		},
		/*	Return the parameters that were passed in to the slider constructor
			@return object
		*/
		getSliderParams: function () {
			return _sliderParams;
		},
		/*	Prevent text from being selected within a particular set of elements
			Based on: http://support.microsoft.com/kb/318086
			@param string selector CSS selector
		*/
		preventTextSelection: function (selector) {
			$.each($(selector), function () {
				if (BOOKABACH.is.ie()) {
					this.onselectstart = function () { return false; };
				} else {
					this.onmousedown   = function () { return false; };
					this.onclick       = function () { return true;  };
				}
			});
		}
	};
})();

BOOKABACH.cookies = (function () {
	// private variables
	
	// private methods
	var _setCookie;
	
	_setCookie = function (params) {
		var cookie;
		if ('undefined' === typeof params.name) {
			throw 'PEBCAK: no name specified';
		} else {
			cookie  = params.name + "=";
			cookie += params.value   ? escape(params.value)          : '';
			cookie += params.expires ? '; expires=' + params.expires : '';
			cookie += params.path    ? '; path=' + params.path       : '';
			cookie += params.domain  ? '; domain=' + params.domain   : '';
			document.cookie = cookie;
		}
	};
	
	// public methods
	return {
		/*	Set a cookie
			@param object params Object literal with the following members:
									- name    Name of cookie
									- value   String to be saved
									- expires Number of days before cookie is to expire (optional, defaults to 365)
									- path    Path for which the cookie applies (optional, defaults to '/')
									- domain  Domain for which the cookie applies (optional)
									- secure  Boolean indicating whether or not the cookie is secure (optional, defaults to false)
		*/
		set: function (params) {
			params.expires = params.expires || 365;
			params.expires = new Date((new Date()).getTime() + (+params.expires * 1000 * 60 * 60 * 24));
			params.path    = params.path || '/';
			_setCookie(params);
		},
		/*	Return the value of a named cookie
			@param string name Name of the cookie
			@return string
		*/
		get: function (name) {
			var start, end, len;
			
			start = document.cookie.indexOf( name + "=" );
			len   = start + name.length + 1;
			
			if ((!start) && (name !== document.cookie.substring(0, name.length))) {
				return undefined;
			} else if (-1 === start) {
				return undefined;
			} else {
				end = document.cookie.indexOf(';', len);
				
				if (-1 === end) {
					end = document.cookie.length;
				}
			}
			
			return unescape(document.cookie.substring(len, end));
		},
		/*	Delete a cookie
			@param object params Object literal with the following members:
									- name   Name of cookie
									- path   Path for which the cookie applies (optional, defaults to '/')
									- domain Domain for which the cookie applies (optional)
		*/
		del: function (params) {
			params.path    = params.path || '/';
			params.expires = 'Thu, 1 Jan 1970 00:00:01 GMT';
			_setCookie(params);
		}
	};
})();

// Add anything that should get called on DOM-ready to the following function
$(function () {
	BOOKABACH.ui.externalLinks();
});

// legacy functions ... remove at your own risk! ;-)

function openPlainWindow(title,url,width,height) 
{
	 var plainWindow;
	 plainWindow = window.open(url,title,"width="+width+",height="+height+", toolbar=no, header=no, location=no, resizable=no, scrollbars=yes, status=no");
	 plainWindow.opener=self;
	 plainWindow.focus();
}

function showHide(id,disp) {
	var target = document.getElementById(id);
	if(disp == undefined)
		disp = target.style.display=="none";
	if (disp)
	{
		target.style.display = "block";
		return true;
		
	} else {
		target.style.display = "none";
		return false;
	}
}

function deleteConfirm(url,message)
  {
  	if(confirm(message))
	{
		document.location = url;
	}
	return false;
  }
