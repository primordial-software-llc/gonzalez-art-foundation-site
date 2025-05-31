(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.5.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( _i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.5
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2020-03-14
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
					dataPriv.get( this, "events" ) || Object.create( null )
				)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px";
				tr.style.height = "1px";
				trChild.style.height = "9px";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = parseInt( trStyle.height ) > 3;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = (
					dataPriv.get( cur, "events" ) || Object.create( null )
				)[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script
			if ( !isSuccess && jQuery.inArray( "script", s.dataTypes ) > -1 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			if ( typeof props.top === "number" ) {
				props.top += "px";
			}
			if ( typeof props.left === "number" ) {
				props.left += "px";
			}
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],2:[function(require,module,exports){
//! moment.js
//! version : 2.29.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return (
            input instanceof Array ||
            Object.prototype.toString.call(input) === '[object Array]'
        );
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return (
            input != null &&
            Object.prototype.toString.call(input) === '[object Object]'
        );
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
        } else {
            var k;
            for (k in obj) {
                if (hasOwnProp(obj, k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return (
            typeof input === 'number' ||
            Object.prototype.toString.call(input) === '[object Number]'
        );
    }

    function isDate(input) {
        return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === '[object Date]'
        );
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false,
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this),
                len = t.length >>> 0,
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m),
                parsedParts = some.call(flags.parsedDateParts, function (i) {
                    return i != null;
                }),
                isNowValid =
                    !isNaN(m._d.getTime()) &&
                    flags.overflow < 0 &&
                    !flags.empty &&
                    !flags.invalidEra &&
                    !flags.invalidMonth &&
                    !flags.invalidWeekday &&
                    !flags.weekdayMismatch &&
                    !flags.nullInput &&
                    !flags.invalidFormat &&
                    !flags.userInvalidated &&
                    (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid =
                    isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = (hooks.momentProperties = []),
        updateInProgress = false;

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return (
            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
        );
    }

    function warn(msg) {
        if (
            hooks.suppressDeprecationWarnings === false &&
            typeof console !== 'undefined' &&
            console.warn
        ) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [],
                    arg,
                    i,
                    key;
                for (i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (key in arguments[0]) {
                            if (hasOwnProp(arguments[0], key)) {
                                arg += key + ': ' + arguments[0][key] + ', ';
                            }
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(
                    msg +
                        '\nArguments: ' +
                        Array.prototype.slice.call(args).join('') +
                        '\n' +
                        new Error().stack
                );
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return (
            (typeof Function !== 'undefined' && input instanceof Function) ||
            Object.prototype.toString.call(input) === '[object Function]'
        );
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            if (hasOwnProp(config, i)) {
                prop = config[i];
                if (isFunction(prop)) {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' +
                /\d{1,2}/.source
        );
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (
                hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])
            ) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (
            (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
            absNumber
        );
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        formatFunctions = {},
        formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(
                    func.apply(this, arguments),
                    token
                );
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i])
                    ? array[i].call(mom, format)
                    : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] =
            formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(
                localFormattingTokens,
                replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper
            .match(formattingTokens)
            .map(function (tok) {
                if (
                    tok === 'MMMM' ||
                    tok === 'MM' ||
                    tok === 'DD' ||
                    tok === 'dddd'
                ) {
                    return tok.slice(1);
                }
                return tok;
            })
            .join('');

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d',
        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        w: 'a week',
        ww: '%d weeks',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output)
            ? output(number, withoutSuffix, string, isFuture)
            : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string'
            ? aliases[units] || aliases[units.toLowerCase()]
            : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [],
            u;
        for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
                units.push({ unit: u, priority: priorities[u] });
            }
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid()
            ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
            : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (
                unit === 'FullYear' &&
                isLeapYear(mom.year()) &&
                mom.month() === 1 &&
                mom.date() === 29
            ) {
                value = toInt(value);
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                    value,
                    mom.month(),
                    daysInMonth(value, mom.month())
                );
            } else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units),
                i;
            for (i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    var match1 = /\d/, //       0 - 9
        match2 = /\d\d/, //      00 - 99
        match3 = /\d{3}/, //     000 - 999
        match4 = /\d{4}/, //    0000 - 9999
        match6 = /[+-]?\d{6}/, // -999999 - 999999
        match1to2 = /\d\d?/, //       0 - 99
        match3to4 = /\d\d\d\d?/, //     999 - 9999
        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
        match1to3 = /\d{1,3}/, //       0 - 999
        match1to4 = /\d{1,4}/, //       0 - 9999
        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
        matchUnsigned = /\d+/, //       0 - inf
        matchSigned = /[+-]?\d+/, //    -inf - inf
        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        // any word (or two) characters or numbers including two/three word month in arabic.
        // includes scottish gaelic two word and hyphenated months
        matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        regexes;

    regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex)
            ? regex
            : function (isStrict, localeData) {
                  return isStrict && strictRegex ? strictRegex : regex;
              };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(
            s
                .replace('\\', '')
                .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                    matched,
                    p1,
                    p2,
                    p3,
                    p4
                ) {
                    return p1 || p2 || p3 || p4;
                })
        );
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        WEEK = 7,
        WEEKDAY = 8;

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1
            ? isLeapYear(year)
                ? 29
                : 28
            : 31 - ((modMonth % 7) % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
        ),
        defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
            '_'
        ),
        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        defaultMonthsShortRegex = matchWord,
        defaultMonthsRegex = matchWord;

    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months)
                ? this._months
                : this._months['standalone'];
        }
        return isArray(this._months)
            ? this._months[m.month()]
            : this._months[
                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                      ? 'format'
                      : 'standalone'
              ][m.month()];
    }

    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort)
            ? this._monthsShort[m.month()]
            : this._monthsShort[
                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
              ][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp(
                    '^' + this.months(mom, '').replace('.', '') + '$',
                    'i'
                );
                this._shortMonthsParse[i] = new RegExp(
                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                    'i'
                );
            }
            if (!strict && !this._monthsParse[i]) {
                regex =
                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'MMMM' &&
                this._longMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'MMM' &&
                this._shortMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
        }
    }

    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._monthsShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] =
            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear,
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear,
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
            '_'
        ),
        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        defaultWeekdaysRegex = matchWord,
        defaultWeekdaysShortRegex = matchWord,
        defaultWeekdaysMinRegex = matchWord;

    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays)
            ? this._weekdays
            : this._weekdays[
                  m && m !== true && this._weekdays.isFormat.test(format)
                      ? 'format'
                      : 'standalone'
              ];
        return m === true
            ? shiftWeekdays(weekdays, this._week.dow)
            : m
            ? weekdays[m.day()]
            : weekdays;
    }

    function localeWeekdaysShort(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort[m.day()]
            : this._weekdaysShort;
    }

    function localeWeekdaysMin(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin[m.day()]
            : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._shortWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._minWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
            }
            if (!this._weekdaysParse[i]) {
                regex =
                    '^' +
                    this.weekdays(mom, '') +
                    '|^' +
                    this.weekdaysShort(mom, '') +
                    '|^' +
                    this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'dddd' &&
                this._fullWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'ddd' &&
                this._shortWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'dd' &&
                this._minWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
        }
    }

    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
        }
    }

    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ''));
            shortp = regexEscape(this.weekdaysShort(mom, ''));
            longp = regexEscape(this.weekdays(mom, ''));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._weekdaysShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
        this._weekdaysMinStrictRegex = new RegExp(
            '^(' + minPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return (
            '' +
            hFormat.apply(this) +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return (
            '' +
            this.hours() +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                lowercase
            );
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
        // Setting the hour should keep the time, because the user explicitly
        // specified which hour they want. So trying to maintain the same hour (in
        // a new timezone) makes sense. Adding/subtracting hours does not follow
        // this rule.
        getSetHour = makeGetSet('Hours', true);

    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse,
    };

    // internal storage for locale config files
    var locales = {},
        localeFamilies = {},
        globalLocale;

    function commonPrefix(arr1, arr2) {
        var i,
            minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return i;
            }
        }
        return minl;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (
                    next &&
                    next.length >= j &&
                    commonPrefix(split, next) >= j - 1
                ) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null,
            aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (
            locales[name] === undefined &&
            typeof module !== 'undefined' &&
            module &&
            module.exports
        ) {
            try {
                oldLocale = globalLocale._abbr;
                aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {
                // mark as not found to avoid repeating expensive file require call causing high CPU
                // when trying to find en-US, en_US, en-us for every format call
                locales[name] = null; // null means not found
            }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            } else {
                if (typeof console !== 'undefined' && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn(
                        'Locale ' + key + ' not found. Did you forget to load it?'
                    );
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var locale,
                parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple(
                    'defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                );
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config,
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                tmpLocale,
                parentConfig = baseConfig;

            if (locales[name] != null && locales[name].parentLocale != null) {
                // Update existing child locale in-place to avoid memory-leaks
                locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) {
                    parentConfig = tmpLocale._config;
                }
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) {
                    // updateLocale is called for creating a new locale
                    // Set abbr so it will have a name (getters return
                    // undefined otherwise).
                    config.abbr = name;
                }
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                    if (name === getSetGlobalLocale()) {
                        getSetGlobalLocale(name);
                    }
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow,
            a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH] < 0 || a[MONTH] > 11
                    ? MONTH
                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                    ? DATE
                    : a[HOUR] < 0 ||
                      a[HOUR] > 24 ||
                      (a[HOUR] === 24 &&
                          (a[MINUTE] !== 0 ||
                              a[SECOND] !== 0 ||
                              a[MILLISECOND] !== 0))
                    ? HOUR
                    : a[MINUTE] < 0 || a[MINUTE] > 59
                    ? MINUTE
                    : a[SECOND] < 0 || a[SECOND] > 59
                    ? SECOND
                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                    ? MILLISECOND
                    : -1;

            if (
                getParsingFlags(m)._overflowDayOfYear &&
                (overflow < YEAR || overflow > DATE)
            ) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
            ['YYYY-DDD', /\d{4}-\d{3}/],
            ['YYYY-MM', /\d{4}-\d\d/, false],
            ['YYYYYYMMDD', /[+-]\d{10}/],
            ['YYYYMMDD', /\d{8}/],
            ['GGGG[W]WWE', /\d{4}W\d{3}/],
            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
            ['YYYYDDD', /\d{7}/],
            ['YYYYMM', /\d{6}/, false],
            ['YYYY', /\d{4}/, false],
        ],
        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
            ['HH:mm', /\d\d:\d\d/],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
            ['HHmmss', /\d\d\d\d\d\d/],
            ['HHmm', /\d\d\d\d/],
            ['HH', /\d\d/],
        ],
        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
        rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
        };

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    function extractFromRFC2822Strings(
        yearStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr
    ) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10),
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s
            .replace(/\([^)]*\)|[\n\t]/g, ' ')
            .replace(/(\s\s+)/g, ' ')
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(
                    parsedInput[0],
                    parsedInput[1],
                    parsedInput[2]
                ).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10),
                m = hm % 100,
                h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)),
            parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(
                match[4],
                match[3],
                match[2],
                match[5],
                match[6],
                match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        if (config._strict) {
            config._isValid = false;
        } else {
            // Final attempt, use Input Fallback
            hooks.createFromInputFallback(config);
        }
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
            'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [
                nowValue.getUTCFullYear(),
                nowValue.getUTCMonth(),
                nowValue.getUTCDate(),
            ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            expectedWeekday,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (
                config._dayOfYear > daysInYear(yearToUse) ||
                config._dayOfYear === 0
            ) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] =
                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (
            config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0
        ) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
        );
        expectedWeekday = config._useUTC
            ? config._d.getUTCDay()
            : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (
            config._w &&
            typeof config._w.d !== 'undefined' &&
            config._w.d !== expectedWeekday
        ) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(
                w.GG,
                config._a[YEAR],
                weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0,
            era;

        tokens =
            expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(
                    string.indexOf(parsedInput) + parsedInput.length
                );
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver =
            stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (
            config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0
        ) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
        );

        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,
            scoreToBeat,
            i,
            currentScore,
            validFormatFound,
            bestFormatIsValid = false;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (isValid(tempConfig)) {
                validFormatFound = true;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (!bestFormatIsValid) {
                if (
                    scoreToBeat == null ||
                    currentScore < scoreToBeat ||
                    validFormatFound
                ) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) {
                        bestFormatIsValid = true;
                    }
                }
            } else {
                if (currentScore < scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                }
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i),
            dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function (obj) {
                return obj && parseInt(obj, 10);
            }
        );

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (
            (isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)
        ) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other < this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        ),
        prototypeMax = deprecate(
            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other > this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];

    function isDurationValid(m) {
        var key,
            unitHasDecimal = false,
            i;
        for (key in m) {
            if (
                hasOwnProp(m, key) &&
                !(
                    indexOf.call(ordering, key) !== -1 &&
                    (m[key] == null || !isNaN(m[key]))
                )
            ) {
                return false;
            }
        }

        for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds =
            +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (
                (dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
            ) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(),
                sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return (
                sign +
                zeroFill(~~(offset / 60), 2) +
                separator +
                zeroFill(~~offset % 60, 2)
            );
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher),
            chunk,
            parts,
            minutes;

        if (matches === null) {
            return null;
        }

        chunk = matches[matches.length - 1] || [];
        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff =
                (isMoment(input) || isDate(input)
                    ? input.valueOf()
                    : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(
                        this,
                        createDuration(input - offset, 'm'),
                        1,
                        false
                    );
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {},
            other;

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted =
                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        // and further modified to allow for strings containing both week and day
        isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months,
            };
        } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
                duration[key] = +input;
            } else {
                duration.milliseconds = +input;
            }
        } else if ((match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
            };
        } else if ((match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign),
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (
            typeof duration === 'object' &&
            ('from' in duration || 'to' in duration)
        ) {
            diffRes = momentsDifference(
                createLocal(duration.from),
                createLocal(duration.to)
            );

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
            ret._isValid = input._isValid;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months =
            other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(
                    name,
                    'moment().' +
                        name +
                        '(period, number) is deprecated. Please use moment().' +
                        name +
                        '(number, period). ' +
                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                );
                tmp = val;
                val = period;
                period = tmp;
            }

            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add'),
        subtract = createAdder(-1, 'subtract');

    function isString(input) {
        return typeof input === 'string' || input instanceof String;
    }

    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return (
            isMoment(input) ||
            isDate(input) ||
            isString(input) ||
            isNumber(input) ||
            isNumberOrStringArray(input) ||
            isMomentInputObject(input) ||
            input === null ||
            input === undefined
        );
    }

    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'years',
                'year',
                'y',
                'months',
                'month',
                'M',
                'days',
                'day',
                'd',
                'dates',
                'date',
                'D',
                'hours',
                'hour',
                'h',
                'minutes',
                'minute',
                'm',
                'seconds',
                'second',
                's',
                'milliseconds',
                'millisecond',
                'ms',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input),
            dataTypeTest = false;
        if (arrayTest) {
            dataTypeTest =
                input.filter(function (item) {
                    return !isNumber(item) && isString(input);
                }).length === 0;
        }
        return arrayTest && dataTypeTest;
    }

    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'sameDay',
                'nextDay',
                'lastDay',
                'nextWeek',
                'lastWeek',
                'sameElse',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6
            ? 'sameElse'
            : diff < -1
            ? 'lastWeek'
            : diff < 0
            ? 'lastDay'
            : diff < 1
            ? 'sameDay'
            : diff < 2
            ? 'nextDay'
            : diff < 7
            ? 'nextWeek'
            : 'sameElse';
    }

    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (!arguments[0]) {
                time = undefined;
                formats = undefined;
            } else if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse',
            output =
                formats &&
                (isFunction(formats[format])
                    ? formats[format].call(this, now)
                    : formats[format]);

        return this.format(
            output || this.localeData().calendar(format, this, createLocal(now))
        );
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (
            (inclusivity[0] === '('
                ? this.isAfter(localFrom, units)
                : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')'
                ? this.isBefore(localTo, units)
                : !this.isAfter(localTo, units))
        );
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return (
                this.clone().startOf(units).valueOf() <= inputMs &&
                inputMs <= this.clone().endOf(units).valueOf()
            );
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1e3;
                break; // 1000
            case 'minute':
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        if (a.date() < b.date()) {
            // end-of-month calculations work correct when the start month has more
            // days than the end month.
            return -monthDiff(b, a);
        }
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true,
            m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
                m,
                utc
                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                    .toISOString()
                    .replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(
            m,
            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
        );
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment',
            zone = '',
            prefix,
            year,
            datetime,
            suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        prefix = '[' + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        datetime = '-MM-DD[T]HH:mm:ss.SSS';
        suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ to: this, from: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ from: this, to: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData() {
        return this._locale;
    }

    var MS_PER_SECOND = 1000,
        MS_PER_MINUTE = 60 * MS_PER_SECOND,
        MS_PER_HOUR = 60 * MS_PER_MINUTE,
        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return ((dividend % divisor) + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(
                    this.year(),
                    this.month() - (this.month() % 3),
                    1
                );
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday()
                );
                break;
            case 'isoWeek':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1)
                );
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(
                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                    MS_PER_HOUR
                );
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time =
                    startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3) + 3,
                        1
                    ) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday() + 7
                    ) - 1;
                break;
            case 'isoWeek':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1) + 7
                    ) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time +=
                    MS_PER_HOUR -
                    mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    ) -
                    1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(),
        ];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds(),
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
        };
    }

    addFormatToken('N', 0, 0, 'eraAbbr');
    addFormatToken('NN', 0, 0, 'eraAbbr');
    addFormatToken('NNN', 0, 0, 'eraAbbr');
    addFormatToken('NNNN', 0, 0, 'eraName');
    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
    addFormatToken('y', ['yy', 2], 0, 'eraYear');
    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

    addRegexToken('N', matchEraAbbr);
    addRegexToken('NN', matchEraAbbr);
    addRegexToken('NNN', matchEraAbbr);
    addRegexToken('NNNN', matchEraName);
    addRegexToken('NNNNN', matchEraNarrow);

    addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
        input,
        array,
        config,
        token
    ) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) {
            getParsingFlags(config).era = era;
        } else {
            getParsingFlags(config).invalidEra = input;
        }
    });

    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);

    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
    addParseToken(['yo'], function (input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
        }

        if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
            array[YEAR] = parseInt(input, 10);
        }
    });

    function localeEras(m, format) {
        var i,
            l,
            date,
            eras = this._eras || getLocale('en')._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }

            switch (typeof eras[i].until) {
                case 'undefined':
                    eras[i].until = +Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }

    function localeErasParse(eraName, format, strict) {
        var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
        eraName = eraName.toUpperCase();

        for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();

            if (strict) {
                switch (format) {
                    case 'N':
                    case 'NN':
                    case 'NNN':
                        if (abbr === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNN':
                        if (name === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNNN':
                        if (narrow === eraName) {
                            return eras[i];
                        }
                        break;
                }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
            }
        }
    }

    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? +1 : -1;
        if (year === undefined) {
            return hooks(era.since).year();
        } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
        }
    }

    function getEraName() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
            }
        }

        return '';
    }

    function getEraNarrow() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
            }
        }

        return '';
    }

    function getEraAbbr() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
            }
        }

        return '';
    }

    function getEraYear() {
        var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;

            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
            ) {
                return (
                    (this.year() - hooks(eras[i].since).year()) * dir +
                    eras[i].offset
                );
            }
        }

        return this.year();
    }

    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }

    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }

    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }

    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }

    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }

    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }

    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }

    function computeErasParse() {
        var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();

        for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));

            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }

        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp(
            '^(' + narrowPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
        );
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
        );
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear =
            Math.round(
                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
            ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token, getSetMillisecond;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }

    getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
            return 'Moment<' + this.format() + '>';
        };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
        'dates accessor is deprecated. Use date instead.',
        getSetDayOfMonth
    );
    proto.months = deprecate(
        'months accessor is deprecated. Use month instead',
        getSetMonth
    );
    proto.years = deprecate(
        'years accessor is deprecated. Use year instead',
        getSetYear
    );
    proto.zone = deprecate(
        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
        getSetZone
    );
    proto.isDSTShifted = deprecate(
        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
        isDaylightSavingTimeShifted
    );

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;

    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale(),
            utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i,
            out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: +Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
            },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    toInt((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                        ? 'st'
                        : b === 2
                        ? 'nd'
                        : b === 3
                        ? 'rd'
                        : 'th';
            return number + output;
        },
    });

    // Side effect imports

    hooks.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        getSetGlobalLocale
    );
    hooks.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        getLocale
    );

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (
            !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
            )
        ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return (days * 4800) / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return (months * 146097) / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days,
            months,
            milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms'),
        asSeconds = makeAs('s'),
        asMinutes = makeAs('m'),
        asHours = makeAs('h'),
        asDays = makeAs('d'),
        asWeeks = makeAs('w'),
        asMonths = makeAs('M'),
        asQuarters = makeAs('Q'),
        asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds'),
        seconds = makeGetter('seconds'),
        minutes = makeGetter('minutes'),
        hours = makeGetter('hours'),
        days = makeGetter('days'),
        months = makeGetter('months'),
        years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round,
        thresholds = {
            ss: 44, // a few seconds to seconds
            s: 45, // seconds to minute
            m: 45, // minutes to hour
            h: 22, // hours to day
            d: 26, // days to month/week
            w: null, // weeks to month
            M: 11, // months to year
        };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            weeks = round(duration.as('w')),
            years = round(duration.as('y')),
            a =
                (seconds <= thresholds.ss && ['s', seconds]) ||
                (seconds < thresholds.s && ['ss', seconds]) ||
                (minutes <= 1 && ['m']) ||
                (minutes < thresholds.m && ['mm', minutes]) ||
                (hours <= 1 && ['h']) ||
                (hours < thresholds.h && ['hh', hours]) ||
                (days <= 1 && ['d']) ||
                (days < thresholds.d && ['dd', days]);

        if (thresholds.w != null) {
            a =
                a ||
                (weeks <= 1 && ['w']) ||
                (weeks < thresholds.w && ['ww', weeks]);
        }
        a = a ||
            (months <= 1 && ['M']) ||
            (months < thresholds.M && ['MM', months]) ||
            (years <= 1 && ['y']) || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var withSuffix = false,
            th = thresholds,
            locale,
            output;

        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') {
            withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === 'object') {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
            }
        }

        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

        totalSign = total < 0 ? '-' : '';
        ymSign = sign(this._months) !== sign(total) ? '-' : '';
        daysSign = sign(this._days) !== sign(total) ? '-' : '';
        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return (
            totalSign +
            'P' +
            (years ? ymSign + years + 'Y' : '') +
            (months ? ymSign + months + 'M' : '') +
            (days ? daysSign + days + 'D' : '') +
            (hours || minutes || seconds ? 'T' : '') +
            (hours ? hmsSign + hours + 'H' : '') +
            (minutes ? hmsSign + minutes + 'M' : '') +
            (seconds ? hmsSign + s + 'S' : '')
        );
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    proto$2.toIsoString = deprecate(
        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
        toISOString$1
    );
    proto$2.lang = lang;

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    //! moment.js

    hooks.version = '2.29.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD', // <input type="date" />
        TIME: 'HH:mm', // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW', // <input type="week" />
        MONTH: 'YYYY-MM', // <input type="month" />
    };

    return hooks;

})));

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const ApiBase = 'https://api.gonzalez-art-foundation.org/';
const ImageBase = 'https://images.gonzalez-art-foundation.org/';

class Api {
  static getImageBase() {
    return ImageBase;
  }

  static getApiBase() {
    return ApiBase;
  }

  static getSearchUrl(maxResults, searchText, source, searchAfter, artistExactMatch) {
    return `${ApiBase}unauthenticated/search` + `?maxResults=${encodeURIComponent(maxResults)}` + `&searchText=${encodeURIComponent(searchText)}` + `&source=${encodeURIComponent(source)}` + `&searchAfter=${searchAfter ? encodeURIComponent(searchAfter) : ''}` + `&artistExactMatch=${!!artistExactMatch}`;
  }

  static assertSuccess(response, json) {
    if (!response || response.status < 200 || response.status > 299) {
      console.log('Request failed:');
      console.log(response);
      console.log(json);
      alert('Failed to get data: ' + JSON.stringify(json, 0, 4));
      throw 'Failed to get data: ' + JSON.stringify(json, 0, 4);
    }
  }

  static async get(url) {
    $('.loader-group').removeClass('hide');
    let json;

    try {
      let response = await fetch(url, {
        credentials: "same-origin"
      });
      json = await response.json();
      this.assertSuccess(response, json);
      return json;
    } finally {
      $('.loader-group').addClass('hide');
    }
  }

}

exports.default = Api;

},{}],4:[function(require,module,exports){
"use strict";

var _artists = _interopRequireDefault(require("./artists"));

var _gallery = _interopRequireDefault(require("./gallery"));

var _homePage = _interopRequireDefault(require("./home-page"));

var _navigation = _interopRequireDefault(require("./navigation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
  let controller;
  $('#main-nav').append(_navigation.default.getNavigation());
  $('head').append(`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-36W54RV64X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-36W54RV64X');
</script>`);
  let path = window.location.pathname.toLowerCase();

  if (path.endsWith('/index.html') || path === '/') {
    controller = new _homePage.default();
  } else if (path.endsWith('/gallery.html')) {
    controller = new _gallery.default();
  } else if (path.endsWith('/artists.html')) {
    controller = new _artists.default();
  }

  if (controller) {
    controller.init();
  }
});

},{"./artists":5,"./gallery":6,"./home-page":7,"./navigation":8}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery.default;
window.jQuery = _jquery.default;
const ApiBase = 'https://api.gonzalez-art-foundation.org/';

class Artists {
  assertSuccess(response, json) {
    if (!response || response.status < 200 || response.status > 299) {
      console.log(response);
      console.log(json);
      alert('Failed to get data: ' + JSON.stringify(json, 0, 4));
      return false;
    }

    return true;
  }

  setCanonicalUrl(url) {
    // Remove existing canonical link if it exists
    const existingCanonical = document.querySelector('link[rel="canonical"]');

    if (existingCanonical) {
      existingCanonical.remove();
    } // Create and add new canonical link


    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = url;
    document.head.appendChild(canonicalLink);
  }

  updateUrl(letter, search) {
    let params = new URLSearchParams(); // Only include letter if search is empty or less than 3 characters

    if (!search || search.length < 3) {
      if (letter) params.set('letter', letter);
    } // Only include search if present


    if (search) params.set('search', search);
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({
      letter,
      search
    }, '', newUrl); // Update canonical URL

    let canonicalUrl;

    if (params.has('letter') && (!search || search.length < 3)) {
      canonicalUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?letter=${params.get('letter')}`;
    } else {
      canonicalUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    }

    this.setCanonicalUrl(canonicalUrl);
  }

  createFilterButtons(selectedLetter, search) {
    const btnGroup = (0, _jquery.default)('.artist-filters .btn-group');
    btnGroup.empty(); // Define letter ranges

    const ranges = [{
      start: 65,
      end: 74
    }, // A-J
    {
      start: 75,
      end: 84
    }, // K-T
    {
      start: 85,
      end: 90
    } // U-Z
    ]; // Only highlight a letter if search is less than 3 characters

    const highlightLetter = !search || search.length < 3; // Create buttons for each range

    ranges.forEach((range, idx) => {
      const rangeGroup = (0, _jquery.default)('<div class="btn-group me-2" role="group"></div>');

      for (let i = range.start; i <= range.end; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const isActive = letter === selectedLetter && highlightLetter;
        const link = (0, _jquery.default)(`<a href="${window.location.pathname}?letter=${letter}" class="btn btn-outline-primary${isActive ? ' active' : ''}" data-letter="${letter}"${isActive ? ' aria-current="page"' : ''}>${letter.toUpperCase()}</a>`);
        rangeGroup.append(link);
      } // If this is the last group (U-Z), append the 'Other' button


      if (idx === ranges.length - 1) {
        const isOtherActive = selectedLetter === 'other' && highlightLetter;
        const otherBtn = (0, _jquery.default)(`<a href="${window.location.pathname}?letter=other" class="btn btn-outline-primary${isOtherActive ? ' active' : ''}" data-letter="other"${isOtherActive ? ' aria-current="page"' : ''}>Other</a>`);
        rangeGroup.append(otherBtn);
      }

      btnGroup.append(rangeGroup);
    }); // Subdue filter if searching

    if (search && search.length >= 3) {
      (0, _jquery.default)('.artist-filters').addClass('subdued');
    } else {
      (0, _jquery.default)('.artist-filters').removeClass('subdued');
    }

    btnGroup.find('a').click(e => {
      e.preventDefault();
      const letter = (0, _jquery.default)(e.target).data('letter');
      const query = (0, _jquery.default)('#artist-search-input').val();

      if (query && query.length >= 3) {
        // If search is active, clear search and switch to letter filtering
        (0, _jquery.default)('#artist-search-input').val('');
        this.updateUrl(letter, '');
        this.loadArtists(this.currentArtists, letter);
        this.createFilterButtons(letter, '');
      } else {
        this.updateUrl(letter, query);

        if (query) {
          this.searchArtists(this.currentArtists, query);
        } else {
          this.loadArtists(this.currentArtists, letter);
        }

        this.createFilterButtons(letter, query);
      }
    });
  }

  loadArtists(artists, letter) {
    let artistList = (0, _jquery.default)('<ul class="artist-list"></ul>');

    for (let artist of artists) {
      const firstChar = artist.originalArtist.charAt(0).toLowerCase();

      if (letter === 'other') {
        if (!/^[a-z]$/.test(firstChar)) {
          artistList.append(`<li><a target="_blank" href='/index.html?search=${encodeURIComponent(artist.artist)}&artistExactMatch=true'>${artist.originalArtist} - ${artist.numberOfWorks} works of art</a></li>`);
        }
      } else if (artist.originalArtist.toLowerCase().startsWith(letter)) {
        artistList.append(`<li><a target="_blank" href='/index.html?search=${encodeURIComponent(artist.artist)}&artistExactMatch=true'>${artist.originalArtist} - ${artist.numberOfWorks} works of art</a></li>`);
      }
    }

    (0, _jquery.default)('.artists-container').empty().append(artistList);
  }

  searchArtists(artists, query) {
    query = query.trim().toLowerCase();
    let artistList = (0, _jquery.default)('<ul class="artist-list"></ul>'); // If query is less than 3 characters, show all artists

    if (query.length < 3) {
      for (let artist of artists) {
        artistList.append(`<li><a target="_blank" href='/index.html?search=${encodeURIComponent(artist.artist)}&artistExactMatch=true'>${artist.originalArtist} - ${artist.numberOfWorks} works of art</a></li>`);
      }
    } else {
      // Only filter when we have 3 or more characters
      for (let artist of artists) {
        if (artist.originalArtist.toLowerCase().includes(query)) {
          artistList.append(`<li><a target="_blank" href='/index.html?search=${encodeURIComponent(artist.artist)}&artistExactMatch=true'>${artist.originalArtist} - ${artist.numberOfWorks} works of art</a></li>`);
        }
      }
    }

    (0, _jquery.default)('.artists-container').empty().append(artistList);
  }

  init() {
    let self = this; // Get params from URL

    const urlParams = new URLSearchParams(window.location.search);
    let letter = urlParams.get('letter') || 'a';
    let search = urlParams.get('search') || ''; // Validate letter is a-z, default to 'a' if not

    if (!/^[a-z]$/.test(letter)) {
      letter = 'a';

      if (urlParams.has('letter')) {
        this.updateUrl(letter, search);
        return;
      }
    } // Set canonical URL


    this.updateUrl(letter, search); // Set search input value

    (0, _jquery.default)('#artist-search-input').val(search); // Create filter buttons

    this.createFilterButtons(letter, search); // Load artists data

    fetch('/static-data/artists.json').then(function (response) {
      response.json().then(json => {
        if (self.assertSuccess(response, json)) {
          self.currentArtists = json;

          if (search) {
            self.searchArtists(json, search);
          } else {
            self.loadArtists(json, letter);
          }
        }
      }).catch(function (error) {
        console.log('Failed to get data:');
        console.log(error);
      });
    }); // Listen for search input

    (0, _jquery.default)('#artist-search-input').on('input', () => {
      const query = (0, _jquery.default)('#artist-search-input').val();

      if (query && query.length >= 3) {
        this.updateUrl(null, query);
        this.searchArtists(this.currentArtists, query);
        this.createFilterButtons(null, query);
      } else {
        // Restore letter filtering
        const urlParams = new URLSearchParams(window.location.search);
        let letter = urlParams.get('letter') || 'a'; // Validate letter is a-z

        if (!/^[a-z]$/.test(letter)) letter = 'a';
        this.updateUrl(letter, query);
        this.loadArtists(this.currentArtists, letter);
        this.createFilterButtons(letter, query);
      }
    });
  }

}

exports.default = Artists;

},{"jquery":1}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _api = _interopRequireDefault(require("./api"));

var _url = _interopRequireDefault(require("./url"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery.default;
window.jQuery = _jquery.default;

class Gallery {
  constructor() {
    this.hasMovedMouseOnImageViewerPage = false;
  }

  assertSuccess(response, json) {
    if (!response || response.status < 200 || response.status > 299) {
      console.log(response);
      console.log(json);
      alert('Failed to get data: ' + JSON.stringify(json, 0, 4));
      return false;
    }

    return true;
  }

  addStructuredData(artwork) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "VisualArtwork",
      "name": artwork.name,
      "artist": {
        "@type": "Person",
        "name": artwork.originalArtist
      },
      "dateCreated": artwork.date,
      "image": `${_api.default.getImageBase()}${artwork.s3Path}`,
      "url": `${window.location.protocol}//${window.location.host}${window.location.pathname}?source=${encodeURIComponent(artwork.source)}&pageId=${encodeURIComponent(artwork.pageId)}`,
      "width": artwork.width ? `${artwork.width}px` : undefined,
      "height": artwork.height ? `${artwork.height}px` : undefined
    };
    (0, _jquery.default)('head').append(`<script id="artwork-structured-data" type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);
  }

  updateMetaTags(artwork) {
    const title = `${artwork.name} (${artwork.date}) - ${artwork.originalArtist} - Gonzalez Art Foundation`;
    document.title = title;
    (0, _jquery.default)('#meta-title').attr('content', title);
    const description = `${artwork.name} (${artwork.date}) by ${artwork.originalArtist}. View high-resolution fine art from the Gonzalez Art Foundation collection.`;
    (0, _jquery.default)('#meta-description').attr('content', description);
    (0, _jquery.default)('#meta-og-description').attr('content', description);
    if (artwork.originalArtist) (0, _jquery.default)('#meta-art-artist').attr('content', artwork.originalArtist);
    if (artwork.date) (0, _jquery.default)('#meta-art-date').attr('content', artwork.date);
    if (artwork.source) (0, _jquery.default)('#meta-art-source').attr('content', artwork.source);
    let keywords = ['art', 'fine art', 'digital gallery', 'painting', 'Gonzalez Art Foundation'];
    (0, _jquery.default)('#meta-keywords').attr('content', keywords.join(', '));

    if (artwork.s3Path) {
      (0, _jquery.default)('#meta-og-image').attr('content', `${_api.default.getImageBase()}${artwork.s3Path}`);
    }

    const source = _url.default.getUrlParameter('source');

    const pageId = _url.default.getUrlParameter('pageId');

    if (source && pageId) {
      const currentUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?source=${encodeURIComponent(source)}&pageId=${encodeURIComponent(pageId)}`;
      (0, _jquery.default)('#meta-og-url').attr('content', currentUrl);
      (0, _jquery.default)('#canonical-link').attr('href', currentUrl);
    }

    this.addStructuredData(artwork);
  }

  showCurrentImage() {
    let jsonSearchResult = JSON.parse(localStorage.getItem('slideshowData'));
    let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex"));

    if (isNaN(slideshowIndex)) {
      location.href = 'https://www.gonzalez-art-foundation.org';
      return;
    }

    let currentImage = jsonSearchResult.items[slideshowIndex]['_source'];
    (0, _jquery.default)('#slideshow-index').html(jsonSearchResult.searchFrom + slideshowIndex + 1);
    let totalItems = `${jsonSearchResult.total}${jsonSearchResult.maxSearchResultsHit ? '+' : ''}`;
    (0, _jquery.default)('#slideshow-count').html(totalItems);
    this.showImage(currentImage);
  }

  showImage(currentImage) {
    (0, _jquery.default)('#slideshow-image').prop('src', `${_api.default.getImageBase()}${currentImage.s3Path}`);
    let link = (currentImage.sourceLink || '').replace('http://', 'https://');
    let linkText;

    if (currentImage.source === 'http://images.nga.gov') {
      linkText = 'National Gallery of Art, Washington DC';
    } else if (currentImage.source === 'http://www.the-athenaeum.org') {
      linkText = "The Athenaeum";
      link = 'https://www.the-athenaeum.org/art/detail.php?ID=' + currentImage.pageId;
    } else if (currentImage.source === 'https://www.rijksmuseum.nl') {
      linkText = 'Rijksmuseum in Amsterdam, Netherlands';
    }

    (0, _jquery.default)('#slideshow-image-info').empty();

    if (currentImage.name) {
      (0, _jquery.default)('#slideshow-image-info').append((0, _jquery.default)('<span>').text(`${currentImage.name} `));
    }

    if (currentImage.date) {
      (0, _jquery.default)('#slideshow-image-info').append((0, _jquery.default)('<span>').text(`(${currentImage.date || ''}) `));
    }

    if (currentImage.originalArtist) {
      (0, _jquery.default)('#slideshow-image-info').append((0, _jquery.default)('<span>').text(`by ${currentImage.originalArtist || ''} - `));
    }

    (0, _jquery.default)('#slideshow-image-info').append((0, _jquery.default)(`<a target="_blank">`).attr('href', link).text(linkText)).append((0, _jquery.default)('<span>').text(` - Image id ${currentImage.pageId}`));

    if (currentImage.price) {
      let formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currentImage.priceCurrency,
        maximumFractionDigits: 2
      }).format(currentImage.price);
      (0, _jquery.default)('#slideshow-image-info').append('<br/>').append((0, _jquery.default)('<span>').text(`Indexed at ${(0, _moment.default)(currentImage['@timestamp']).format("yyyy-M-D h:mm A")} - Price ${formattedPrice}`));
    }
  }

  async nextImage() {
    let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex", 0));
    let jsonSearchResult = JSON.parse(localStorage.getItem('slideshowData'));

    if (slideshowIndex + 2 > jsonSearchResult.items.length) {
      let lastResult = jsonSearchResult.items[jsonSearchResult.items.length - 1];

      let url = _api.default.getSearchUrl(jsonSearchResult.maxResults, jsonSearchResult.searchText, jsonSearchResult.source, JSON.stringify(lastResult.sort));

      let newJsonSearchResult = await _api.default.get(url);
      localStorage.setItem("slideshowData", JSON.stringify(newJsonSearchResult));
      localStorage.setItem("slideshowIndex", 0);
    } else {
      localStorage.setItem("slideshowIndex", slideshowIndex + 1);
    }

    this.showCurrentImage();
  }

  pauseSlideshow() {
    clearInterval(this.slideshowTimer);
    (0, _jquery.default)('#slideshow-pause').hide();
    (0, _jquery.default)('#slideshow-play').show();
  }

  showPlayer() {
    this.hasMovedMouseOnImageViewerPage = true;
    (0, _jquery.default)(".slideshow-player").slideDown("slow", function () {
      (0, _jquery.default)(".slideshow-player").show();
      (0, _jquery.default)('#slideshow-image-container').removeClass('hide-controls');
    });
    (0, _jquery.default)('body').css('cursor', '');
  }

  hidePlayer() {
    (0, _jquery.default)('body').css('cursor', 'none');
    (0, _jquery.default)(".slideshow-player").slideUp("slow", function () {
      (0, _jquery.default)(".slideshow-player").hide();
      (0, _jquery.default)('#slideshow-image-container').addClass('hide-controls');
    });
  }
  /**
   * Chrome requires full-screen mode to be user engaged.
   */


  showFullscreen() {
    this.hidePlayer();
    let element = document.getElementsByTagName('html')[0];

    if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  tryHidePlayer() {
    if (!this.hasMovedMouseOnImageViewerPage) {
      this.hidePlayer();
    }

    this.hasMovedMouseOnImageViewerPage = false;
  }

  isFullScreen() {
    return window.fullScreen || window.innerWidth === screen.width && window.innerHeight === screen.height;
  }

  init() {
    let self = this;

    let source = _url.default.getUrlParameter('source');

    let pageId = _url.default.getUrlParameter('pageId');

    if (source && pageId) {
      (0, _jquery.default)('#slideshow-controls').addClass('hide');
      (0, _jquery.default)('#slideshow-image-container').addClass('single-image-mode');
      fetch(`${_api.default.getApiBase()}unauthenticated/cache-everything/image-classification?source=${encodeURIComponent(source)}&pageId=${encodeURIComponent(pageId)}`, {
        mode: 'cors'
      }).then(function (response) {
        response.json().then(json => {
          if (self.assertSuccess(response, json)) {
            self.showImage(json);
            self.updateMetaTags(json);
          }
        }).catch(function (error) {
          console.log('Failed to get data:');
          console.log(error);
        });
      });
    } else {
      this.showCurrentImage();
    }

    (0, _jquery.default)('#slideshow-return-home').click(() => {
      window.location = "/";
    });
    (0, _jquery.default)('#slideshow-fullscreen').click(() => {
      self.showFullscreen();
    });
    (0, _jquery.default)(document).mousemove(() => {
      if (!self.isFullScreen()) {
        self.showPlayer();
      }
    });
    (0, _jquery.default)(document).keypress(() => {
      if (!self.isFullScreen()) {
        self.showPlayer();
      }
    });
    setInterval(function () {
      self.tryHidePlayer();
    }, 15000);
    let defaultInterval = 6;
    (0, _jquery.default)('#slideshow-interval').val(defaultInterval);
    (0, _jquery.default)('#slideshow-pause').hide().click(() => {
      self.pauseSlideshow();
    });
    (0, _jquery.default)('#slideshow-play').click(function () {
      function slideshowTimerAction() {
        self.nextImage();
      }

      let intervalInMs = parseFloat((0, _jquery.default)('#slideshow-interval').val()) * 1000;
      self.slideshowTimer = setInterval(slideshowTimerAction, intervalInMs);
      (0, _jquery.default)('#slideshow-pause').show();
      (0, _jquery.default)('#slideshow-play').hide();
    });
  }

}

exports.default = Gallery;

},{"./api":3,"./url":9,"jquery":1,"moment":2}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _api = _interopRequireDefault(require("./api"));

var _url = _interopRequireDefault(require("./url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery.default;
window.jQuery = _jquery.default;

class HomePage {
  constructor() {
    this.results = [];
    this.slideIndex = 0;
    let itemsFromSearch = {
      "items": [{
        "_index": "classification",
        "_id": "http://images.nga.gov:88983",
        "_score": 38.778423,
        "_source": {
          "source": "http://images.nga.gov",
          "sourceLink": "http://www.nga.gov/purl/collection/artobject.html/75870",
          "pageId": "88983",
          "artist": "sir lawrence alma-tadema",
          "name": "A Dance in Spring",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "c. 1910",
          "s3Path": "collections/national-gallery-of-art/image-88983.jpg",
          "s3ThumbnailPath": "collections/national-gallery-of-art/thumbnails/image-88983.jpg",
          "height": 3000,
          "width": 1229,
          "orientation": "portrait"
        },
        "sort": [38.778423, "http://images.nga.gov", "88983"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1226",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1226",
          "artist": "sir lawrence alma-tadema",
          "name": "In the Peristyle",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1866",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1226.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1226.jpg",
          "height": 1121,
          "width": 767,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:31:23.4755633Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1226"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1227",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1227",
          "artist": "sir lawrence alma-tadema",
          "name": "A Picture Gallery",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1873",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1227.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1227.jpg",
          "height": 1129,
          "width": 840,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:27:05.1699093Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1227"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1232",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1232",
          "artist": "sir lawrence alma-tadema",
          "name": "Self Portrait",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1852",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1232.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1232.jpg",
          "height": 900,
          "width": 673,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:33:27.1600536Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1232"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1233",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1233",
          "artist": "sir lawrence alma-tadema",
          "name": "The Massacre of the Monks of Tamond",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1855",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1233.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1233.jpg",
          "height": 992,
          "width": 1134,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:32:01.6201995Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1233"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1234",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1234",
          "artist": "sir lawrence alma-tadema",
          "name": "The Inundation of The Biesbosch in 1421",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1856",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1234.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1234.jpg",
          "height": 916,
          "width": 1130,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:34:17.5456145Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1234"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1235",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1235",
          "artist": "sir lawrence alma-tadema",
          "name": "Faust and Marguerite",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1857",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1235.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1235.jpg",
          "height": 1033,
          "width": 1132,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:33:51.5094398Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1235"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1236",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1236",
          "artist": "sir lawrence alma-tadema",
          "name": "The Crossing of the River Berizina - 1812",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1859-1860",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1236.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1236.jpg",
          "height": 603,
          "width": 1135,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:34:35.0626387Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1236"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1237",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1237",
          "artist": "sir lawrence alma-tadema",
          "name": "The Death of Hippolytus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1860",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1237.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1237.jpg",
          "height": 876,
          "width": 1134,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:32:53.5259299Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1237"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1238",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1238",
          "artist": "sir lawrence alma-tadema",
          "name": "The Roman Wine Tasters",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1238.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1238.jpg",
          "height": 1120,
          "width": 508,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:32:58.9107195Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1238"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1239",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1239",
          "artist": "sir lawrence alma-tadema",
          "name": "The Education of the Children of Clovis",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1861",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1239.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1239.jpg",
          "height": 737,
          "width": 1000,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:28:37.651561Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1239"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1240",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1240",
          "artist": "sir lawrence alma-tadema",
          "name": "Venantius Fortunatus Reading His Poems to Radegonda VI: AD 555",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1862",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1240.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1240.jpg",
          "height": 836,
          "width": 1090,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:34:41.6305239Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1240"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1241",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1241",
          "artist": "sir lawrence alma-tadema",
          "name": "Interior of the Church of San Clemente, Rome",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1863",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1241.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1241.jpg",
          "height": 929,
          "width": 728,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:35:12.2605735Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1241"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1242",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1242",
          "artist": "sir lawrence alma-tadema",
          "name": "Pastimes in Ancient Egypt, 3,000 Years Ago",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1863",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1242.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1242.jpg",
          "height": 697,
          "width": 1024,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:35:14.777846Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1242"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1243",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1243",
          "artist": "sir lawrence alma-tadema",
          "name": "Leaving Church in the Fifteenth Century",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1864",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1243.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1243.jpg",
          "height": 1123,
          "width": 790,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:29:18.9789027Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1243"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1244",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1244",
          "artist": "sir lawrence alma-tadema",
          "name": "Gallo-Roman Women",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1865",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1244.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1244.jpg",
          "height": 876,
          "width": 1129,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:35:38.0399393Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1244"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1245",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1245",
          "artist": "sir lawrence alma-tadema",
          "name": "Catullus at Lesbia's",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1865",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1245.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1245.jpg",
          "height": 638,
          "width": 901,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:36:01.0916128Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1245"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1246",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1246",
          "artist": "sir lawrence alma-tadema",
          "name": "Tibullus at Delia's House",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1866",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1246.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1246.jpg",
          "height": 1089,
          "width": 1600,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:33:36.8933324Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1246"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1247",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1247",
          "artist": "sir lawrence alma-tadema",
          "name": "Preparations for the Festivities",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1866",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1247.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1247.jpg",
          "height": 878,
          "width": 1128,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:29:51.0590616Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1247"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1248",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1248",
          "artist": "sir lawrence alma-tadema",
          "name": "Lesbia Weeping over a Sparrow",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1866",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1248.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1248.jpg",
          "height": 1280,
          "width": 961,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:29:54.0405871Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1248"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1249",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1249",
          "artist": "sir lawrence alma-tadema",
          "name": "Proclaiming Claudius Emperor",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1249.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1249.jpg",
          "height": 879,
          "width": 1136,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:36:09.5051987Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1249"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1250",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1250",
          "artist": "sir lawrence alma-tadema",
          "name": "A Collection of Pictures at the Time of Augustus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1250.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1250.jpg",
          "height": 2000,
          "width": 1527,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:34:13.33094Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1250"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1251",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1251",
          "artist": "sir lawrence alma-tadema",
          "name": "Tarquinius Superbus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1251.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1251.jpg",
          "height": 1124,
          "width": 704,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:36:20.5384254Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1251"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1252",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1252",
          "artist": "sir lawrence alma-tadema",
          "name": "My Studio",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1252.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1252.jpg",
          "height": 881,
          "width": 1127,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:34:31.7656274Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1252"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1253",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1253",
          "artist": "sir lawrence alma-tadema",
          "name": "The Mirror",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1253.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1253.jpg",
          "height": 1127,
          "width": 764,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:35:22.0581926Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1253"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1254",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1254",
          "artist": "sir lawrence alma-tadema",
          "name": "A Roman Art Lover",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1254.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1254.jpg",
          "height": 787,
          "width": 1131,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:37:00.4783034Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1254"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1255",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1255",
          "artist": "sir lawrence alma-tadema",
          "name": "The Flower Market",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1255.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1255.jpg",
          "height": 805,
          "width": 1135,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:31:20.7468216Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1255"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1256",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1256",
          "artist": "sir lawrence alma-tadema",
          "name": "The Siesta",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1256.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1256.jpg",
          "height": 418,
          "width": 1137,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:37:06.8527705Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1256"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1257",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1257",
          "artist": "sir lawrence alma-tadema",
          "name": "The Education of the Children of Clotilde and Clovis",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1257.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1257.jpg",
          "height": 797,
          "width": 1130,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:31:46.6073833Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1257"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1258",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1258",
          "artist": "sir lawrence alma-tadema",
          "name": "Boating",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1258.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1258.jpg",
          "height": 1121,
          "width": 748,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:36:01.3723038Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1258"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1261",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1261",
          "artist": "sir lawrence alma-tadema",
          "name": "A Roman Emperor: AD 41",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1261.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1261.jpg",
          "height": 884,
          "width": 1800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:38:07.4939439Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1261"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1262",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1262",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of the Misses Laurense and Anna Alma-Tadema",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1873",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1262.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1262.jpg",
          "height": 1118,
          "width": 906,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:38:16.990081Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1262"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1263",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1263",
          "artist": "sir lawrence alma-tadema",
          "name": "The Death of the Pharaoh’s Firstborn Son",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1872",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1263.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1263.jpg",
          "height": 699,
          "width": 1135,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:32:13.758915Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1263"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1265",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1265",
          "artist": "sir lawrence alma-tadema",
          "name": "Joseph, Overseer of Pharaoh's Granaries",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1265.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1265.jpg",
          "height": 841,
          "width": 1137,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:36:08.7836838Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1265"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1266",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1266",
          "artist": "sir lawrence alma-tadema",
          "name": "A Picture Gallery in Rome",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1266.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1266.jpg",
          "height": 1128,
          "width": 862,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:38:37.8350095Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1266"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1267",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1267",
          "artist": "sir lawrence alma-tadema",
          "name": "The Sculpture Gallery",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1267.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1267.jpg",
          "height": 1125,
          "width": 872,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:39:01.1827463Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1267"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1268",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1268",
          "artist": "sir lawrence alma-tadema",
          "name": "An Audience at Agrippa's",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1268.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1268.jpg",
          "height": 1901,
          "width": 1353,
          "orientation": "portrait",
          "moderationLabels": [{
            "confidence": 73.575005,
            "name": "Suggestive"
          }, {
            "confidence": 73.575005,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }],
          "nudity": false,
          "@timestamp": "2021-04-24T11:33:23.593411Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1268"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1305",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1305",
          "artist": "sir lawrence alma-tadema",
          "name": "Between Hope and Fear",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1305.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1305.jpg",
          "height": 690,
          "width": 1135,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:44:27.0141846Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1305"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:130529",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "130529",
          "artist": "sir lawrence alma-tadema",
          "name": "Phidias and the Frieze of the Parthenon, Athens",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-130529.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-130529.jpg",
          "height": 1119,
          "width": 1701,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:44:11.4244849Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "130529"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1306",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1306",
          "artist": "sir lawrence alma-tadema",
          "name": "Pleading",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1306.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1306.jpg",
          "height": 680,
          "width": 1132,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:42:46.6128326Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1306"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1307",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1307",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Aime-Jules Dalou, His Wife and Daughter",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1307.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1307.jpg",
          "height": 1128,
          "width": 559,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:37:43.6962805Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1307"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1308",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1308",
          "artist": "sir lawrence alma-tadema",
          "name": "Sculpture",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1308.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1308.jpg",
          "height": 800,
          "width": 786,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:44:30.8414294Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1308"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1309",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1309",
          "artist": "sir lawrence alma-tadema",
          "name": "Architecture in Ancient Rome",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1309.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1309.jpg",
          "height": 789,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:38:00.8522397Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1309"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1310",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1310",
          "artist": "sir lawrence alma-tadema",
          "name": "In the Time of Constantine",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1878",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1310.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1310.jpg",
          "height": 1125,
          "width": 561,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:44:57.5207343Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1310"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1311",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1311",
          "artist": "sir lawrence alma-tadema",
          "name": "Strigils and Sponges",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1311.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1311.jpg",
          "height": 1525,
          "width": 724,
          "orientation": "portrait",
          "moderationLabels": [{
            "confidence": 51.075397,
            "name": "Explicit Nudity"
          }, {
            "confidence": 51.075397,
            "name": "Nudity",
            "parentName": "Explicit Nudity"
          }],
          "nudity": true,
          "@timestamp": "2021-04-24T11:45:28.0144047Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1311"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1312",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1312",
          "artist": "sir lawrence alma-tadema",
          "name": "After the Audience",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1312.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1312.jpg",
          "height": 1128,
          "width": 819,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:46:11.1560914Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1312"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1313",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1313",
          "artist": "sir lawrence alma-tadema",
          "name": "The Oaks in Kidbrooke Park",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1878",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1313.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1313.jpg",
          "height": 1050,
          "width": 1680,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:45:18.7811501Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1313"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1314",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1314",
          "artist": "sir lawrence alma-tadema",
          "name": "Prose",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1314.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1314.jpg",
          "height": 1133,
          "width": 774,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:45:25.738475Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1314"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1315",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1315",
          "artist": "sir lawrence alma-tadema",
          "name": "My Sister is Not In",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1315.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1315.jpg",
          "height": 1128,
          "width": 869,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:44:34.1980423Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1315"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1316",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1316",
          "artist": "sir lawrence alma-tadema",
          "name": "Interrupted",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1880",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1316.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1316.jpg",
          "height": 1130,
          "width": 775,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:45:55.7622037Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1316"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1317",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1317",
          "artist": "sir lawrence alma-tadema",
          "name": "Ave, Caesar! Io, Saturnalia!",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1880",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1317.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1317.jpg",
          "height": 548,
          "width": 1129,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:39:01.3224777Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1317"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1318",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1318",
          "artist": "sir lawrence alma-tadema",
          "name": "Pandora",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1318.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1318.jpg",
          "height": 1121,
          "width": 1039,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:46:21.2422657Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1318"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1320",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1320",
          "artist": "sir lawrence alma-tadema",
          "name": "In the Tepidarium",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1320.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1320.jpg",
          "height": 577,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [{
            "confidence": 73.4099,
            "name": "Explicit Nudity"
          }, {
            "confidence": 73.4099,
            "name": "Nudity",
            "parentName": "Explicit Nudity"
          }, {
            "confidence": 56.436504,
            "name": "Suggestive"
          }, {
            "confidence": 56.436504,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }],
          "nudity": true,
          "@timestamp": "2021-04-24T11:47:15.0849363Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1320"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1321",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1321",
          "artist": "sir lawrence alma-tadema",
          "name": "A Parting Kiss",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1882",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1321.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1321.jpg",
          "height": 1132,
          "width": 716,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:45:08.4510523Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1321"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1322",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1322",
          "artist": "sir lawrence alma-tadema",
          "name": "Resting",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1882",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1322.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1322.jpg",
          "height": 1120,
          "width": 788,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:45:10.1221679Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1322"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1323",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1323",
          "artist": "sir lawrence alma-tadema",
          "name": "On the Way to the Temple",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1882",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1323.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1323.jpg",
          "height": 1125,
          "width": 581,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:39:51.7003497Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1323"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1324",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1324",
          "artist": "sir lawrence alma-tadema",
          "name": "Between Venus and Bacchus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1882",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1324.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1324.jpg",
          "height": 1800,
          "width": 890,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:48:00.9582052Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1324"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1325",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1325",
          "artist": "sir lawrence alma-tadema",
          "name": "An Oleander",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1882",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1325.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1325.jpg",
          "height": 2055,
          "width": 1445,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:45:31.2136588Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1325"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1326",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1326",
          "artist": "sir lawrence alma-tadema",
          "name": "Xanthe and Phaon",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1326.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1326.jpg",
          "height": 1296,
          "width": 930,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:47:39.347488Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1326"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1327",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1327",
          "artist": "sir lawrence alma-tadema",
          "name": "A Street Altar",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1327.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1327.jpg",
          "height": 1129,
          "width": 531,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:47:32.3450099Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1327"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1328",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1328",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Miss Anna Alma-Tadema",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1328.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1328.jpg",
          "height": 1280,
          "width": 883,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:40:38.8563642Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1328"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1329",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1329",
          "artist": "sir lawrence alma-tadema",
          "name": "A Declaration: an Old, Old Story",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1329.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1329.jpg",
          "height": 518,
          "width": 1128,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:47:58.0690063Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1329"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1330",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1330",
          "artist": "sir lawrence alma-tadema",
          "name": "A Romano-British Potter",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1884",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1330.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1330.jpg",
          "height": 1129,
          "width": 570,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:47:43.5464929Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1330"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1331",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1331",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Miss Alice Lewis",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1884",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1331.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1331.jpg",
          "height": 1125,
          "width": 741,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:46:01.2744489Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1331"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1332",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1332",
          "artist": "sir lawrence alma-tadema",
          "name": "Emperor Hadrian at a British Pottery",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1884",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1332.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1332.jpg",
          "height": 838,
          "width": 910,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:48:30.1678199Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1332"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1333",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1333",
          "artist": "sir lawrence alma-tadema",
          "name": "Who is It?",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1884",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1333.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1333.jpg",
          "height": 933,
          "width": 719,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:48:45.0902159Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1333"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1334",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1334",
          "artist": "sir lawrence alma-tadema",
          "name": "The Triumph of Titus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1885",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1334.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1334.jpg",
          "height": 1280,
          "width": 802,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:49:31.3278295Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1334"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1336",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1336",
          "artist": "sir lawrence alma-tadema",
          "name": "The Apodyterium",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1886",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1336.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1336.jpg",
          "height": 870,
          "width": 1135,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:49:40.598915Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1336"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1337",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1337",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Mrs. Frank D. Millet",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1886",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1337.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1337.jpg",
          "height": 1023,
          "width": 814,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:49:20.5586063Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1337"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1340",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1340",
          "artist": "sir lawrence alma-tadema",
          "name": "Master John Parsons Millet",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1889",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1340.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1340.jpg",
          "height": 1052,
          "width": 848,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:47:09.4233286Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1340"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1341",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1341",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Mrs. Ralph Sneyd",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1889",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1341.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1341.jpg",
          "height": 700,
          "width": 550,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:49:26.8274272Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1341"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1342",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1342",
          "artist": "sir lawrence alma-tadema",
          "name": "Love's Votaries",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1891",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1342.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1342.jpg",
          "height": 581,
          "width": 1129,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:49:47.7086477Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1342"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1343",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1343",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Ignacy Jan Paderewski",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1891",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1343.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1343.jpg",
          "height": 1011,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:42:39.1140487Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1343"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1344",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1344",
          "artist": "sir lawrence alma-tadema",
          "name": "An Earthly Paradise",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1891",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1344.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1344.jpg",
          "height": 669,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:47:39.0252872Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1344"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1345",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1345",
          "artist": "sir lawrence alma-tadema",
          "name": "The Poet Gallus Dreaming",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1892",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1345.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1345.jpg",
          "height": 1123,
          "width": 737,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:50:41.3396188Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1345"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1346",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1346",
          "artist": "sir lawrence alma-tadema",
          "name": "In the Corner of My Studio",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1893",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1346.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1346.jpg",
          "height": 1130,
          "width": 832,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:47:49.506158Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1346"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1347",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1347",
          "artist": "sir lawrence alma-tadema",
          "name": "Unwelcome Confidence",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1895",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1347.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1347.jpg",
          "height": 728,
          "width": 457,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:50:22.7084121Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1347"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1348",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1348",
          "artist": "sir lawrence alma-tadema",
          "name": "Love's Jewelled Fetter",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1895",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1348.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1348.jpg",
          "height": 1125,
          "width": 784,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:50:35.308414Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1348"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1349",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1349",
          "artist": "sir lawrence alma-tadema",
          "name": "Maurice Sons",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1896",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1349.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1349.jpg",
          "height": 1128,
          "width": 271,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:51:31.8546081Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1349"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1350",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1350",
          "artist": "sir lawrence alma-tadema",
          "name": "The Coliseum",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1896",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1350.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1350.jpg",
          "height": 1125,
          "width": 721,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:51:00.9000082Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1350"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1351",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1351",
          "artist": "sir lawrence alma-tadema",
          "name": "Family Group",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1896",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1351.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1351.jpg",
          "height": 1148,
          "width": 1024,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:43:55.4001855Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1351"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1352",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1352",
          "artist": "sir lawrence alma-tadema",
          "name": "Whispering Noon",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1896",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1352.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1352.jpg",
          "height": 1088,
          "width": 775,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:51:23.6126203Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1352"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1353",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1353",
          "artist": "sir lawrence alma-tadema",
          "name": "A Listener",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1899",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1353.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1353.jpg",
          "height": 1121,
          "width": 826,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:51:27.0292127Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1353"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1354",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1354",
          "artist": "sir lawrence alma-tadema",
          "name": "Courtship - The Proposal",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1892",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1354.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1354.jpg",
          "height": 1122,
          "width": 1044,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:51:27.4491503Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1354"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1355",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1355",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Mrs. George Lewis and Her Daughter Elizabeth",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1899",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1355.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1355.jpg",
          "height": 1134,
          "width": 1037,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:44:19.7603775Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1355"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1356",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1356",
          "artist": "sir lawrence alma-tadema",
          "name": "A Flag of Truce",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1900",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1356.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1356.jpg",
          "height": 1116,
          "width": 530,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:51:43.8590123Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1356"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1357",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1357",
          "artist": "sir lawrence alma-tadema",
          "name": "Interior of Caius Martius House",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1901",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1357.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1357.jpg",
          "height": 687,
          "width": 939,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:52:25.7039341Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1357"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1358",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1358",
          "artist": "sir lawrence alma-tadema",
          "name": "Caracalla, AD 211",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1902",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1358.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1358.jpg",
          "height": 639,
          "width": 1129,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:52:26.1648249Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1358"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1359",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1359",
          "artist": "sir lawrence alma-tadema",
          "name": "Hopeful",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1909",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1359.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1359.jpg",
          "height": 1600,
          "width": 659,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:51:53.4510721Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1359"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1360",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1360",
          "artist": "sir lawrence alma-tadema",
          "name": "The Golden Hour",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1908",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1360.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1360.jpg",
          "height": 1103,
          "width": 1088,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:53:01.4074332Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1360"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1361",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1361",
          "artist": "sir lawrence alma-tadema",
          "name": "When Flowers Return",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1911",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1361.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1361.jpg",
          "height": 764,
          "width": 1135,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:49:12.4236782Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1361"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1362",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1362",
          "artist": "sir lawrence alma-tadema",
          "name": "Summer Offering",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1911",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1362.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1362.jpg",
          "height": 1378,
          "width": 2076,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:53:11.5907968Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1362"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1363",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1363",
          "artist": "sir lawrence alma-tadema",
          "name": "In Beauty's Bloom (unfinished)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1911",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1363.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1363.jpg",
          "height": 889,
          "width": 1126,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:49:34.6332001Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1363"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1364",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1364",
          "artist": "sir lawrence alma-tadema",
          "name": "Midday Slumbers",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1888",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1364.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1364.jpg",
          "height": 1920,
          "width": 739,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:53:45.3157599Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1364"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:1366",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "1366",
          "artist": "sir lawrence alma-tadema",
          "name": "Water Pets",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-1366.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1366.jpg",
          "height": 515,
          "width": 1137,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:50:18.5563186Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "1366"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:136847",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "136847",
          "artist": "sir lawrence alma-tadema",
          "name": "A Difficult Line from Horace",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-136847.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-136847.jpg",
          "height": 775,
          "width": 1240,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T11:54:09.4463347Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "136847"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:153703",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "153703",
          "artist": "sir lawrence alma-tadema",
          "name": "A Bacchante (There he is!)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-153703.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-153703.jpg",
          "height": 944,
          "width": 712,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:19:47.7513278Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "153703"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:153704",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "153704",
          "artist": "sir lawrence alma-tadema",
          "name": "A Garden Altar",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-153704.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-153704.jpg",
          "height": 800,
          "width": 396,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:19:20.9911987Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "153704"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:153705",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "153705",
          "artist": "sir lawrence alma-tadema",
          "name": "Agrippina with the Ashes of Germanicus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1866",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-153705.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-153705.jpg",
          "height": 731,
          "width": 1024,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:15:25.0509747Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "153705"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:153706",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "153706",
          "artist": "sir lawrence alma-tadema",
          "name": "Among the Ruins",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1902-1904",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-153706.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-153706.jpg",
          "height": 482,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:15:31.7712673Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "153706"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:153707",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "153707",
          "artist": "sir lawrence alma-tadema",
          "name": "An Exedra",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1869",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-153707.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-153707.jpg",
          "height": 1080,
          "width": 1708,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:18:54.7308854Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "153707"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:153990",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "153990",
          "artist": "sir lawrence alma-tadema",
          "name": "A Roman Art Lover (The Runner)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1870",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-153990.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-153990.jpg",
          "height": 828,
          "width": 1130,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:22:53.2320575Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "153990"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154180",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154180",
          "artist": "sir lawrence alma-tadema",
          "name": "A Harvest Festival",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1880",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154180.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154180.jpg",
          "height": 1090,
          "width": 817,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:23:21.3543731Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154180"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154181",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154181",
          "artist": "sir lawrence alma-tadema",
          "name": "A Bacchic Dance",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154181.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154181.jpg",
          "height": 514,
          "width": 1021,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:23:20.9725223Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154181"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154182",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154182",
          "artist": "sir lawrence alma-tadema",
          "name": "Bluebells",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1899",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154182.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154182.jpg",
          "height": 1275,
          "width": 2038,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:10:59.4866486Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154182"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154183",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154183",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Alfred Waterhouse, RA, PRIBA",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1891",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154183.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154183.jpg",
          "height": 800,
          "width": 634,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:10:57.1697025Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154183"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154184",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154184",
          "artist": "sir lawrence alma-tadema",
          "name": "Fortune's Favourite",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1895",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154184.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154184.jpg",
          "height": 2501,
          "width": 1701,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:19:51.8179918Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154184"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154185",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154185",
          "artist": "sir lawrence alma-tadema",
          "name": "The Letter: From an Absent One",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154185.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154185.jpg",
          "height": 1000,
          "width": 674,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:19:51.2508085Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154185"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154186",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154186",
          "artist": "sir lawrence alma-tadema",
          "name": "Hero",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1898",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154186.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154186.jpg",
          "height": 1244,
          "width": 800,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:19:58.3294499Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154186"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154187",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154187",
          "artist": "sir lawrence alma-tadema",
          "name": "In the Temple",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154187.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154187.jpg",
          "height": 1530,
          "width": 900,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:20:29.0900636Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154187"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154188",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154188",
          "artist": "sir lawrence alma-tadema",
          "name": "Mary Magdalene (Head study)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1854",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154188.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154188.jpg",
          "height": 960,
          "width": 1078,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:10:38.5601917Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154188"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154189",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154189",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Miss Laura Theresa Epps (Later Lady Alma-Tadema)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154189.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154189.jpg",
          "height": 808,
          "width": 1023,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:10:59.8153051Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154189"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154190",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154190",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Mrs. Charles W. Wyllie",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1893",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154190.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154190.jpg",
          "height": 1361,
          "width": 700,
          "orientation": "portrait",
          "moderationLabels": [{
            "confidence": 58.1903,
            "name": "Suggestive"
          }, {
            "confidence": 58.1903,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }],
          "nudity": false,
          "@timestamp": "2021-04-24T12:19:51.8179918Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154190"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154191",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154191",
          "artist": "sir lawrence alma-tadema",
          "name": "Shy",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154191.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154191.jpg",
          "height": 1000,
          "width": 621,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:15:56.5251345Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154191"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154192",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154192",
          "artist": "sir lawrence alma-tadema",
          "name": "Standing Roman",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "Date unknown",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154192.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154192.jpg",
          "height": 738,
          "width": 500,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:15:59.204923Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154192"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154193",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154193",
          "artist": "sir lawrence alma-tadema",
          "name": "The Blind Beggar",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1856",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154193.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154193.jpg",
          "height": 900,
          "width": 749,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:20:25.9490455Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154193"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154194",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154194",
          "artist": "sir lawrence alma-tadema",
          "name": "The Benediction",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1894",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154194.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154194.jpg",
          "height": 2000,
          "width": 468,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:20:21.363015Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154194"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154195",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154195",
          "artist": "sir lawrence alma-tadema",
          "name": "The Conversion of Paula by Saint Jerome",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1898",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154195.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154195.jpg",
          "height": 437,
          "width": 1000,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:20:36.4245619Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154195"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154196",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154196",
          "artist": "sir lawrence alma-tadema",
          "name": "The Egyptian Widow",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1872",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154196.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154196.jpg",
          "height": 968,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:20:37.1395547Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154196"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154197",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154197",
          "artist": "sir lawrence alma-tadema",
          "name": "The Soldier of Marathon",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1865",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154197.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154197.jpg",
          "height": 1000,
          "width": 665,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:16:00.0616269Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154197"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154198",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154198",
          "artist": "sir lawrence alma-tadema",
          "name": "Flowers",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154198.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154198.jpg",
          "height": 1600,
          "width": 1198,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:15:56.6311615Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154198"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:154276",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "154276",
          "artist": "sir lawrence alma-tadema",
          "name": "The Siesta",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-154276.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-154276.jpg",
          "height": 541,
          "width": 1526,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:11:09.5644656Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "154276"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164297",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164297",
          "artist": "sir lawrence alma-tadema",
          "name": "A Corner of the Gardens of the Villa Borghese",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164297.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164297.jpg",
          "height": 944,
          "width": 597,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:34:47.5200547Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164297"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164299",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164299",
          "artist": "sir lawrence alma-tadema",
          "name": "A Floral Bank",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1870-1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164299.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164299.jpg",
          "height": 504,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:26:46.7096774Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164299"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164303",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164303",
          "artist": "sir lawrence alma-tadema",
          "name": "A Foregone Conclusion",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1885",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164303.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164303.jpg",
          "height": 801,
          "width": 583,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:35:28.9066359Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164303"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164304",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164304",
          "artist": "sir lawrence alma-tadema",
          "name": "A Roman Art Lover (Silver Statue)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164304.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164304.jpg",
          "height": 1574,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:34:52.277708Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164304"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164306",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164306",
          "artist": "sir lawrence alma-tadema",
          "name": "A Priestess of Apollo",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1891",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164306.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164306.jpg",
          "height": 1536,
          "width": 1256,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:35:51.2920705Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164306"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164308",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164308",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Master Ernest Angeley (Angelée)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1870",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164308.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164308.jpg",
          "height": 545,
          "width": 430,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:26:52.2822237Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164308"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164309",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164309",
          "artist": "sir lawrence alma-tadema",
          "name": "Sir Ernest Albert Waterlow, RA",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1889",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164309.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164309.jpg",
          "height": 944,
          "width": 701,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:34:42.200509Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164309"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164310",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164310",
          "artist": "sir lawrence alma-tadema",
          "name": "Arthur James Balfour, 1st Earl of Balfour",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1891",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164310.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164310.jpg",
          "height": 1539,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:37:26.9585005Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164310"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164312",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164312",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Catherine, Duchess of Cleveland",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164312.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164312.jpg",
          "height": 755,
          "width": 600,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:35:36.311335Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164312"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164314",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164314",
          "artist": "sir lawrence alma-tadema",
          "name": "Cleopatra at the Temple of Isis at Philae (unfinished)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1912",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164314.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164314.jpg",
          "height": 800,
          "width": 557,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:32:57.8302002Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164314"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164317",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164317",
          "artist": "sir lawrence alma-tadema",
          "name": "Henry William Banks Davis, RA",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1904",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164317.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164317.jpg",
          "height": 846,
          "width": 1200,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:37:33.15892Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164317"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164318",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164318",
          "artist": "sir lawrence alma-tadema",
          "name": "Improvisatore",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1872",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164318.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164318.jpg",
          "height": 1280,
          "width": 886,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:35:36.1900973Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164318"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164319",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164319",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Dr Felix and Mrs Augusta Redeker Semon",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1880",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164319.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164319.jpg",
          "height": 598,
          "width": 275,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:35:37.0300596Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164319"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164320",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164320",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of John F. Whichcord, FSA, PRIBA",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1882",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164320.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164320.jpg",
          "height": 944,
          "width": 807,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:27:04.3475342Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164320"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164322",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164322",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Lady Kate Fanny Thompson",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164322.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164322.jpg",
          "height": 944,
          "width": 744,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:34:41.5690691Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164322"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164324",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164324",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Miss Thackeray's Elizabeth",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164324.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164324.jpg",
          "height": 782,
          "width": 944,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:34:54.5443347Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164324"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164326",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164326",
          "artist": "sir lawrence alma-tadema",
          "name": "Negro Head",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1858",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164326.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164326.jpg",
          "height": 800,
          "width": 794,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:27:03.1366921Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164326"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164339",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164339",
          "artist": "sir lawrence alma-tadema",
          "name": "Pomona Festival",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164339.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164339.jpg",
          "height": 762,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:33:06.3902483Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164339"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164340",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164340",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Lady Laura Theresa Alma-Tadema",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164340.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164340.jpg",
          "height": 944,
          "width": 738,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:35:37.1158455Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164340"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164341",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164341",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Professor George Aitchison, RA, PRIBA",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1900",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164341.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164341.jpg",
          "height": 944,
          "width": 749,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:35:54.7753998Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164341"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164342",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164342",
          "artist": "sir lawrence alma-tadema",
          "name": "A Sketch",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1890",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164342.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164342.jpg",
          "height": 685,
          "width": 327,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:35:56.3731509Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164342"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164343",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164343",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Myself at Forty-Seven Years Old",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164343.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164343.jpg",
          "height": 800,
          "width": 656,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:26:51.7383878Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164343"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164344",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164344",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Sir Henry Thompson",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1878",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164344.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164344.jpg",
          "height": 685,
          "width": 515,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:27:03.3217724Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164344"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164345",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164345",
          "artist": "sir lawrence alma-tadema",
          "name": "Sir Herbert Thompson",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164345.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164345.jpg",
          "height": 685,
          "width": 464,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:37:36.8919171Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164345"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164346",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164346",
          "artist": "sir lawrence alma-tadema",
          "name": "Study of the Columns in the Temple of Isis at Philae",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1902",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164346.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164346.jpg",
          "height": 1443,
          "width": 2289,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:37:26.8439482Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164346"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164347",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164347",
          "artist": "sir lawrence alma-tadema",
          "name": "The Dinner",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1873",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164347.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164347.jpg",
          "height": 358,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [{
            "confidence": 99.036995,
            "name": "Suggestive"
          }, {
            "confidence": 99.036995,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }],
          "nudity": false,
          "@timestamp": "2021-04-24T12:35:36.8355666Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164347"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164348",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164348",
          "artist": "sir lawrence alma-tadema",
          "name": "The Secret",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1887",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164348.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164348.jpg",
          "height": 535,
          "width": 725,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:35:36.6412753Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164348"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164349",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164349",
          "artist": "sir lawrence alma-tadema",
          "name": "A Nurse, seventeenth century: Sunday Morning",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1870",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164349.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164349.jpg",
          "height": 484,
          "width": 300,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:33:06.3902482Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164349"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164350",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164350",
          "artist": "sir lawrence alma-tadema",
          "name": "Wine and Gossip",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1869",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164350.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164350.jpg",
          "height": 795,
          "width": 1023,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:37:42.6895107Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164350"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:164351",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "164351",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of William Whitaker Thompson",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1911",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-164351.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-164351.jpg",
          "height": 944,
          "width": 735,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T12:37:42.6896237Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "164351"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:213727",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "213727",
          "artist": "sir lawrence alma-tadema",
          "name": "Study of an Oak Tree",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1900",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-213727.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-213727.jpg",
          "height": 975,
          "width": 1203,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T13:28:43.1072151Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "213727"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:213735",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "213735",
          "artist": "sir lawrence alma-tadema",
          "name": "Una Carita",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-213735.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-213735.jpg",
          "height": 1404,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T13:39:30.137031Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "213735"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:21476",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "21476",
          "artist": "sir lawrence alma-tadema",
          "name": "A Roman Artist",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-21476.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-21476.jpg",
          "height": 900,
          "width": 884,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T13:40:56.9006795Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "21476"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:216188",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "216188",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Professor Giovanni Battista Amendola",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-216188.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-216188.jpg",
          "height": 1024,
          "width": 732,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T13:41:24.8717092Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "216188"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:21709",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "21709",
          "artist": "sir lawrence alma-tadema",
          "name": "Study of a head of a woman (unfinished)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1912",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-21709.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-21709.jpg",
          "height": 758,
          "width": 1196,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T13:40:07.6729584Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "21709"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:231723",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "231723",
          "artist": "sir lawrence alma-tadema",
          "name": "On the road to the Temple of Ceres",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-231723.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-231723.jpg",
          "height": 1000,
          "width": 583,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T13:56:53.3918496Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "231723"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:234335",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "234335",
          "artist": "sir lawrence alma-tadema",
          "name": "Bacchante",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1907",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-234335.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-234335.jpg",
          "height": 918,
          "width": 743,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:11:02.5232346Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "234335"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:235919",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "235919",
          "artist": "sir lawrence alma-tadema",
          "name": "Reverie",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-235919.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-235919.jpg",
          "height": 1000,
          "width": 637,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:19:29.877308Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "235919"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:242762",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "242762",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Clothilde Enid, Daughter of Edward Onslow Ford",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1896",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-242762.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-242762.jpg",
          "height": 2498,
          "width": 1828,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:21:02.5968934Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "242762"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:24289",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "24289",
          "artist": "sir lawrence alma-tadema",
          "name": "The Finding of Moses",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1904",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-24289.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-24289.jpg",
          "height": 1274,
          "width": 1997,
          "orientation": "landscape",
          "moderationLabels": [{
            "confidence": 58.5586,
            "name": "Suggestive"
          }, {
            "confidence": 58.5586,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }],
          "nudity": false,
          "@timestamp": "2021-04-24T14:17:23.2889377Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "24289"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:249427",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "249427",
          "artist": "sir lawrence alma-tadema",
          "name": "The Convalescent",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1869",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-249427.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-249427.jpg",
          "height": 1024,
          "width": 661,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:27:56.7525952Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "249427"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:250777",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "250777",
          "artist": "sir lawrence alma-tadema",
          "name": "Sunny Days",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-250777.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-250777.jpg",
          "height": 1179,
          "width": 1920,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:33:04.8626254Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "250777"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:264637",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "264637",
          "artist": "sir lawrence alma-tadema",
          "name": "The Miracle of the Abbot Liauckema",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1849-1851",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-264637.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-264637.jpg",
          "height": 1350,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:50:37.4598673Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "264637"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:264971",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "264971",
          "artist": "sir lawrence alma-tadema",
          "name": "Mary Magdalene (Figure study)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1854",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-264971.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-264971.jpg",
          "height": 1080,
          "width": 1294,
          "orientation": "landscape",
          "moderationLabels": [{
            "confidence": 56.3078,
            "name": "Suggestive"
          }, {
            "confidence": 56.3078,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }],
          "nudity": false,
          "@timestamp": "2021-04-24T14:51:13.7484636Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "264971"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:264987",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "264987",
          "artist": "sir lawrence alma-tadema",
          "name": "Still-life of flowers",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1850",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-264987.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-264987.jpg",
          "height": 1080,
          "width": 1163,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:00:14.1007674Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "264987"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:264988",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "264988",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Rika Reijnders",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1851-1852",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-264988.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-264988.jpg",
          "height": 1050,
          "width": 793,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:00:17.84489Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "264988"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:264989",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "264989",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait sketch of a woman",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1852",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-264989.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-264989.jpg",
          "height": 500,
          "width": 413,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:51:19.430857Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "264989"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:264990",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "264990",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Hinke Dirks Brouwer Tadema",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1852",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-264990.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-264990.jpg",
          "height": 500,
          "width": 429,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:26.0444399Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "264990"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265110",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265110",
          "artist": "sir lawrence alma-tadema",
          "name": "Copy of Peter Paul Rubens \"Descent from the cross\"",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1853-1855",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265110.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265110.jpg",
          "height": 1181,
          "width": 768,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:34.4251318Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265110"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265111",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265111",
          "artist": "sir lawrence alma-tadema",
          "name": "Head of an old man",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1854",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265111.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265111.jpg",
          "height": 470,
          "width": 376,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:49:29.4869969Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265111"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265112",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265112",
          "artist": "sir lawrence alma-tadema",
          "name": "A White Horse",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1854",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265112.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265112.jpg",
          "height": 401,
          "width": 500,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:48:59.1299753Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265112"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265113",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265113",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of a young man",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1854",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265113.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265113.jpg",
          "height": 782,
          "width": 606,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:00:32.6710114Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265113"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265114",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265114",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Dirk Tadema",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1854-1855",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265114.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265114.jpg",
          "height": 500,
          "width": 439,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:00:32.8527906Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265114"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265115",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265115",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Johanna Arnolda Hoeksema Tadema",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1854-1855",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265115.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265115.jpg",
          "height": 500,
          "width": 448,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:00:20.894146Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265115"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265116",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265116",
          "artist": "sir lawrence alma-tadema",
          "name": "Mother dog and her two pups",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1855",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265116.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265116.jpg",
          "height": 556,
          "width": 822,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:00:35.5657326Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265116"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265117",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265117",
          "artist": "sir lawrence alma-tadema",
          "name": "Study of a head of an old man",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1855",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265117.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265117.jpg",
          "height": 500,
          "width": 425,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:28.0271973Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265117"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265118",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265118",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of a man with a ring beard",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1856",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265118.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265118.jpg",
          "height": 623,
          "width": 511,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:25.3914708Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265118"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265119",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265119",
          "artist": "sir lawrence alma-tadema",
          "name": "Head of a man with a moustache",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1856",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265119.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265119.jpg",
          "height": 695,
          "width": 512,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:35.0864312Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265119"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265120",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265120",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Monsieur Soons",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1857",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265120.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265120.jpg",
          "height": 1180,
          "width": 953,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:51:38.5330133Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265120"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265121",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265121",
          "artist": "sir lawrence alma-tadema",
          "name": "Clotilde at the tomb of her grandchildren",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1858",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265121.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265121.jpg",
          "height": 837,
          "width": 1162,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:51:38.8271887Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265121"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265122",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265122",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait study of a negro youth",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1858",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265122.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265122.jpg",
          "height": 936,
          "width": 768,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:49:29.2258624Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265122"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265123",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265123",
          "artist": "sir lawrence alma-tadema",
          "name": "Death of the first-born",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1859",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265123.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265123.jpg",
          "height": 632,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:49:33.877488Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265123"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265125",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265125",
          "artist": "sir lawrence alma-tadema",
          "name": "The Death",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1859",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265125.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265125.jpg",
          "height": 412,
          "width": 600,
          "orientation": "landscape",
          "moderationLabels": [{
            "confidence": 91.7166,
            "name": "Suggestive"
          }, {
            "confidence": 91.7166,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }, {
            "confidence": 89.9265,
            "name": "Explicit Nudity"
          }, {
            "confidence": 89.9265,
            "name": "Nudity",
            "parentName": "Explicit Nudity"
          }],
          "nudity": true,
          "@timestamp": "2021-04-24T14:53:48.0835779Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265125"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265126",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265126",
          "artist": "sir lawrence alma-tadema",
          "name": "Willem van Saeftinghe",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1859",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265126.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265126.jpg",
          "height": 2072,
          "width": 2769,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:49:34.1823695Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265126"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:265127",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "265127",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Lourens Alma Tadema, his mother, his brother Jelte and his sister Artje",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1859",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-265127.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-265127.jpg",
          "height": 679,
          "width": 975,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:49:29.2488308Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "265127"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266243",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266243",
          "artist": "sir lawrence alma-tadema",
          "name": "Triumphal return of Sir Willem van Saeftingen to the Abbey Ter Doest in 1513",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1860",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266243.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266243.jpg",
          "height": 1482,
          "width": 1000,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:06:12.4144254Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266243"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266244",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266244",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Sientje Tadema",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1860",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266244.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266244.jpg",
          "height": 1974,
          "width": 1650,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:06:07.365859Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266244"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266245",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266245",
          "artist": "sir lawrence alma-tadema",
          "name": "A Bargain",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1860",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266245.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266245.jpg",
          "height": 1002,
          "width": 800,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:51.8168104Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266245"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266246",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266246",
          "artist": "sir lawrence alma-tadema",
          "name": "Gunthram Bose and his daughters: AD 572",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1862",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266246.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266246.jpg",
          "height": 1697,
          "width": 2500,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:53.590953Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266246"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266457",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266457",
          "artist": "sir lawrence alma-tadema",
          "name": "Pauline in Pompeii",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1863",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266457.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266457.jpg",
          "height": 812,
          "width": 1048,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:06:28.4322679Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266457"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266459",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266459",
          "artist": "sir lawrence alma-tadema",
          "name": "Queen Fredegonda at the death-bed of Bishop Praetextatus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1864",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266459.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266459.jpg",
          "height": 1490,
          "width": 2070,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:54:01.4788657Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266459"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266461",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266461",
          "artist": "sir lawrence alma-tadema",
          "name": "Entering church in the fourteenth century",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1865",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266461.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266461.jpg",
          "height": 1950,
          "width": 2482,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:02:55.3865244Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266461"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266463",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266463",
          "artist": "sir lawrence alma-tadema",
          "name": "An Egyptian at his doorway in Memphis",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1865",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266463.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266463.jpg",
          "height": 1024,
          "width": 690,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:51:55.8617849Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266463"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266669",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266669",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Marie Joséphine Jacoba van Marcke de Lumme",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1865",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266669.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266669.jpg",
          "height": 995,
          "width": 768,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:52:20.7376428Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266669"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266670",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266670",
          "artist": "sir lawrence alma-tadema",
          "name": "The Discourse",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1865",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266670.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266670.jpg",
          "height": 2000,
          "width": 1267,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:58:16.7545801Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266670"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266671",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266671",
          "artist": "sir lawrence alma-tadema",
          "name": "The death of Galeswintha: AD 567",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1865",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266671.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266671.jpg",
          "height": 1357,
          "width": 1037,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:58:31.0081397Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266671"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266676",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266676",
          "artist": "sir lawrence alma-tadema",
          "name": "A Roman dance",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1866",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266676.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266676.jpg",
          "height": 432,
          "width": 600,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:03:20.9452334Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266676"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266677",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266677",
          "artist": "sir lawrence alma-tadema",
          "name": "The Armourer's shop in ancient Rome",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1866",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266677.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266677.jpg",
          "height": 348,
          "width": 498,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:03:29.5315923Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266677"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266678",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266678",
          "artist": "sir lawrence alma-tadema",
          "name": "The honeymoon (reign of Augustus)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266678.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266678.jpg",
          "height": 600,
          "width": 405,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:07:23.8770011Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266678"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266679",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266679",
          "artist": "sir lawrence alma-tadema",
          "name": "Glaucus and Nydia",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266679.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266679.jpg",
          "height": 776,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:07:23.8127858Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266679"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266680",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266680",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Mme Bonnefoy and her son",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266680.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266680.jpg",
          "height": 1198,
          "width": 977,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:54:39.6270809Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266680"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266681",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266681",
          "artist": "sir lawrence alma-tadema",
          "name": "A Roman family",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266681.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266681.jpg",
          "height": 917,
          "width": 649,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:56:11.9082945Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266681"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266835",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266835",
          "artist": "sir lawrence alma-tadema",
          "name": "Italian Women",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266835.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266835.jpg",
          "height": 1659,
          "width": 1077,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:07:40.4659874Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266835"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266839",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266839",
          "artist": "sir lawrence alma-tadema",
          "name": "Italian Girl",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266839.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266839.jpg",
          "height": 500,
          "width": 352,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:54:48.9506262Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266839"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266842",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266842",
          "artist": "sir lawrence alma-tadema",
          "name": "Egyptians 3000 Years Ago",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1867-1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266842.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266842.jpg",
          "height": 341,
          "width": 480,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:58:39.031459Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266842"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266859",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266859",
          "artist": "sir lawrence alma-tadema",
          "name": "An Egyptian Game",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266859.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266859.jpg",
          "height": 711,
          "width": 1037,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:07:40.092658Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266859"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266865",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266865",
          "artist": "sir lawrence alma-tadema",
          "name": "Egyptian Dancing Girls",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266865.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266865.jpg",
          "height": 332,
          "width": 235,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:52:42.1424228Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266865"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:266874",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "266874",
          "artist": "sir lawrence alma-tadema",
          "name": "The Grand Chamberlain to Sesostris the Great",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1869",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-266874.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-266874.jpg",
          "height": 1008,
          "width": 700,
          "orientation": "portrait",
          "moderationLabels": [{
            "confidence": 81.292496,
            "name": "Suggestive"
          }, {
            "confidence": 81.292496,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }],
          "nudity": false,
          "@timestamp": "2021-04-24T15:03:29.4852966Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "266874"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267100",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267100",
          "artist": "sir lawrence alma-tadema",
          "name": "Catullus Reading his Poems at Lesbia's House",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1870",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267100.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267100.jpg",
          "height": 625,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:08:11.3127317Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267100"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267101",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267101",
          "artist": "sir lawrence alma-tadema",
          "name": "A Staircase",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1870",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267101.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267101.jpg",
          "height": 1280,
          "width": 238,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:01.3995611Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267101"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267102",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267102",
          "artist": "sir lawrence alma-tadema",
          "name": "Alma-Tadema's Painting Lesson",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1870-1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267102.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267102.jpg",
          "height": 407,
          "width": 1000,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:56:53.8395789Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267102"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267104",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267104",
          "artist": "sir lawrence alma-tadema",
          "name": "The Vintage Festival",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267104.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267104.jpg",
          "height": 784,
          "width": 1920,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:15.5895551Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267104"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267242",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267242",
          "artist": "sir lawrence alma-tadema",
          "name": "Portraits of Lawrence Alma-Tadema and Miss Laura Theresa Epps",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267242.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267242.jpg",
          "height": 1080,
          "width": 1852,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:24.1182563Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267242"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267243",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267243",
          "artist": "sir lawrence alma-tadema",
          "name": "Fredegonda and Praetextatus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267243.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267243.jpg",
          "height": 573,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:24.2574292Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267243"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267244",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267244",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Laura Theresa Epps Alma-Tadema",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267244.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267244.jpg",
          "height": 2489,
          "width": 994,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:53:21.1384797Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267244"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267245",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267245",
          "artist": "sir lawrence alma-tadema",
          "name": "An Exedra",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1871",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267245.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267245.jpg",
          "height": 824,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:53:21.9271455Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267245"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267246",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267246",
          "artist": "sir lawrence alma-tadema",
          "name": "In the Temple",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1872",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267246.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267246.jpg",
          "height": 500,
          "width": 282,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:37.6052565Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267246"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267247",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267247",
          "artist": "sir lawrence alma-tadema",
          "name": "The First Reproach",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1872",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267247.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267247.jpg",
          "height": 600,
          "width": 421,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:38.0173891Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267247"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267248",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267248",
          "artist": "sir lawrence alma-tadema",
          "name": "The Nurse",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1872",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267248.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267248.jpg",
          "height": 648,
          "width": 801,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:00:10.846806Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267248"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267249",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267249",
          "artist": "sir lawrence alma-tadema",
          "name": "View of Backyard and Houses",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1872",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267249.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267249.jpg",
          "height": 2141,
          "width": 971,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:06.3712253Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267249"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267250",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267250",
          "artist": "sir lawrence alma-tadema",
          "name": "A Visit to the Studio",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1872",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267250.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267250.jpg",
          "height": 791,
          "width": 450,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:08:25.8773995Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267250"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267251",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267251",
          "artist": "sir lawrence alma-tadema",
          "name": "Greek Wine",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1873",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267251.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267251.jpg",
          "height": 465,
          "width": 1000,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:03:59.2714626Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267251"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267256",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267256",
          "artist": "sir lawrence alma-tadema",
          "name": "The Last Roses",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1873",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267256.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267256.jpg",
          "height": 1000,
          "width": 818,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:45.548465Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267256"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267258",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267258",
          "artist": "sir lawrence alma-tadema",
          "name": "Fishing",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1873",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267258.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267258.jpg",
          "height": 946,
          "width": 2184,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:08:25.7933077Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267258"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267259",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267259",
          "artist": "sir lawrence alma-tadema",
          "name": "Panels from Alma-Tadema's Cupboard",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1873",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267259.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267259.jpg",
          "height": 1340,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:23.4340738Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267259"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267261",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267261",
          "artist": "sir lawrence alma-tadema",
          "name": "Music Has Charms",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1873",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267261.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267261.jpg",
          "height": 406,
          "width": 288,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:53:31.2806648Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267261"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267263",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267263",
          "artist": "sir lawrence alma-tadema",
          "name": "Counting the Passers-by",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1873",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267263.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267263.jpg",
          "height": 337,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:04.7567792Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267263"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267265",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267265",
          "artist": "sir lawrence alma-tadema",
          "name": "The Embarkation on the Barge",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1868-1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267265.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267265.jpg",
          "height": 587,
          "width": 772,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:49.2992452Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267265"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267267",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267267",
          "artist": "sir lawrence alma-tadema",
          "name": "Two Heads from \"The Picture Gallery\"",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267267.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267267.jpg",
          "height": 930,
          "width": 1110,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:53:31.6273965Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267267"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267268",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267268",
          "artist": "sir lawrence alma-tadema",
          "name": "Autumn",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267268.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267268.jpg",
          "height": 330,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:25.0494484Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267268"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267269",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267269",
          "artist": "sir lawrence alma-tadema",
          "name": "Reflections",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267269.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267269.jpg",
          "height": 557,
          "width": 493,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:00:10.0248859Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267269"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267270",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267270",
          "artist": "sir lawrence alma-tadema",
          "name": "Summer Hours",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267270.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267270.jpg",
          "height": 461,
          "width": 750,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:16.5865441Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267270"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267296",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267296",
          "artist": "sir lawrence alma-tadema",
          "name": "Antistius Labeon: AD 75",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267296.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267296.jpg",
          "height": 1371,
          "width": 2000,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:45.9909598Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267296"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267304",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267304",
          "artist": "sir lawrence alma-tadema",
          "name": "Spring Flowers: Garland Seller on the Steps of the Capitol",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267304.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267304.jpg",
          "height": 650,
          "width": 1332,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:00:11.2438126Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267304"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267307",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267307",
          "artist": "sir lawrence alma-tadema",
          "name": "Fredegonda at the death-bed of Praetextatus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1864",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267307.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267307.jpg",
          "height": 1080,
          "width": 1429,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:53:34.6164491Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267307"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267308",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267308",
          "artist": "sir lawrence alma-tadema",
          "name": "Through a Roman Archway",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267308.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267308.jpg",
          "height": 1225,
          "width": 972,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:53:34.8347732Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267308"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267309",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267309",
          "artist": "sir lawrence alma-tadema",
          "name": "The Roman Architect",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267309.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267309.jpg",
          "height": 1447,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:02.4721079Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267309"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267310",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267310",
          "artist": "sir lawrence alma-tadema",
          "name": "Sunflowers",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267310.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267310.jpg",
          "height": 1196,
          "width": 450,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:49.47336Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267310"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267311",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267311",
          "artist": "sir lawrence alma-tadema",
          "name": "A Peep through the Trees",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267311.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267311.jpg",
          "height": 550,
          "width": 902,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:49.9997225Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267311"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267348",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267348",
          "artist": "sir lawrence alma-tadema",
          "name": "Tragedy of an Honest Wife",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267348.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267348.jpg",
          "height": 538,
          "width": 1024,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:05.7726319Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267348"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267350",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267350",
          "artist": "sir lawrence alma-tadema",
          "name": "The Architect of the Coliseum",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267350.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267350.jpg",
          "height": 1179,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:53:40.0704958Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267350"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267351",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267351",
          "artist": "sir lawrence alma-tadema",
          "name": "Fishing",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267351.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267351.jpg",
          "height": 310,
          "width": 594,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:53:40.4149877Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267351"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267352",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267352",
          "artist": "sir lawrence alma-tadema",
          "name": "Cherry Blossoms",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267352.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267352.jpg",
          "height": 1200,
          "width": 711,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:26.6837646Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267352"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267353",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267353",
          "artist": "sir lawrence alma-tadema",
          "name": "Play Garden",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267353.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267353.jpg",
          "height": 345,
          "width": 1200,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:29.494865Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267353"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267354",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267354",
          "artist": "sir lawrence alma-tadema",
          "name": "A Sculpture Gallery",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267354.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267354.jpg",
          "height": 801,
          "width": 605,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:08:26.6464398Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267354"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267355",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267355",
          "artist": "sir lawrence alma-tadema",
          "name": "Venice, Grand Canal",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267355.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267355.jpg",
          "height": 650,
          "width": 406,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:08:25.7724489Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267355"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267356",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267356",
          "artist": "sir lawrence alma-tadema",
          "name": "The Three Graces",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267356.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267356.jpg",
          "height": 1080,
          "width": 1082,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:42.6870565Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267356"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267357",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267357",
          "artist": "sir lawrence alma-tadema",
          "name": "Pine Trees in a Roman Park",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267357.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267357.jpg",
          "height": 1004,
          "width": 1600,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:51.496527Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267357"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267359",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267359",
          "artist": "sir lawrence alma-tadema",
          "name": "Balneatrix",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267359.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267359.jpg",
          "height": 934,
          "width": 667,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:53:39.8956354Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267359"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267360",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267360",
          "artist": "sir lawrence alma-tadema",
          "name": "Painters",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267360.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267360.jpg",
          "height": 549,
          "width": 537,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:08:35.668367Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267360"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267361",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267361",
          "artist": "sir lawrence alma-tadema",
          "name": "Painters (Study)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267361.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267361.jpg",
          "height": 275,
          "width": 400,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:26.7164367Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267361"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267362",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267362",
          "artist": "sir lawrence alma-tadema",
          "name": "Cleopatra",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267362.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267362.jpg",
          "height": 506,
          "width": 736,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:26.2546052Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267362"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267363",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267363",
          "artist": "sir lawrence alma-tadema",
          "name": "Spring in the Gardens of the Villa Borghese",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267363.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267363.jpg",
          "height": 1080,
          "width": 1769,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:27.0104764Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267363"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267364",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267364",
          "artist": "sir lawrence alma-tadema",
          "name": "Panel in HW Mesdag's Studio Door",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267364.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267364.jpg",
          "height": 276,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:31.1394447Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267364"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267365",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267365",
          "artist": "sir lawrence alma-tadema",
          "name": "A Question",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267365.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267365.jpg",
          "height": 403,
          "width": 1024,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:08:36.1868543Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267365"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267366",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267366",
          "artist": "sir lawrence alma-tadema",
          "name": "A Kitchen Garden",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267366.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267366.jpg",
          "height": 479,
          "width": 273,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:08:35.5885842Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267366"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267367",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267367",
          "artist": "sir lawrence alma-tadema",
          "name": "A Silent Counsellor",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1878",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267367.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267367.jpg",
          "height": 936,
          "width": 1920,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:29.4210479Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267367"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267368",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267368",
          "artist": "sir lawrence alma-tadema",
          "name": "Fredegonda and Galswintha: AD 566",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1878",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267368.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267368.jpg",
          "height": 800,
          "width": 742,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:29.6884956Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267368"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267369",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267369",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of the Singer George Henschel",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267369.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267369.jpg",
          "height": 1721,
          "width": 1283,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:57.454144Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267369"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267370",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267370",
          "artist": "sir lawrence alma-tadema",
          "name": "Beauties",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267370.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267370.jpg",
          "height": 694,
          "width": 600,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:53:41.3853383Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267370"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267592",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267592",
          "artist": "sir lawrence alma-tadema",
          "name": "A Solicitation",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1878",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267592.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267592.jpg",
          "height": 1075,
          "width": 2083,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:58.1851389Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267592"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267614",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267614",
          "artist": "sir lawrence alma-tadema",
          "name": "A Prize for the Artist's Corp",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1880",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267614.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267614.jpg",
          "height": 1394,
          "width": 700,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:53.8253977Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267614"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267618",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267618",
          "artist": "sir lawrence alma-tadema",
          "name": "Your Carriage Stops the Way",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1880",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267618.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267618.jpg",
          "height": 587,
          "width": 269,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:54.3924154Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267618"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267654",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267654",
          "artist": "sir lawrence alma-tadema",
          "name": "A Kiss",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267654.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267654.jpg",
          "height": 755,
          "width": 931,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:08:52.6606694Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267654"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267731",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267731",
          "artist": "sir lawrence alma-tadema",
          "name": "A Bacchante Dancing Before the Thymele",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267731.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267731.jpg",
          "height": 718,
          "width": 468,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:48.4113504Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267731"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267732",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267732",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Dr Hans Richter",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267732.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267732.jpg",
          "height": 500,
          "width": 423,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:57.5407445Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267732"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267733",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267733",
          "artist": "sir lawrence alma-tadema",
          "name": "Amo Te Ama Me",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267733.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267733.jpg",
          "height": 890,
          "width": 1853,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:58.2155193Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267733"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267735",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267735",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of His Excellency Charles Malcolm Ernest George, Count of Bylandt",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267735.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267735.jpg",
          "height": 1482,
          "width": 1200,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:54:21.6927477Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267735"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267736",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267736",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Leopold Löwenstam, the Etcher",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267736.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267736.jpg",
          "height": 1080,
          "width": 1371,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:56:31.2060166Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267736"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267737",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267737",
          "artist": "sir lawrence alma-tadema",
          "name": "Portraits of Laura and Anna Alma-Tadema",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1884",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267737.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267737.jpg",
          "height": 555,
          "width": 750,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:56:31.1641834Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267737"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267738",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267738",
          "artist": "sir lawrence alma-tadema",
          "name": "The Roman Potters in Britain",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1884",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267738.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267738.jpg",
          "height": 1023,
          "width": 1600,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:56.3106706Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267738"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267739",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267739",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Dr Washington Epps",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1885",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267739.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267739.jpg",
          "height": 1600,
          "width": 1264,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:58.4966069Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267739"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267740",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267740",
          "artist": "sir lawrence alma-tadema",
          "name": "Self-portrait with daughters Anna and Laurense and cousin Pieter Rodeck",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1885-1887",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267740.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267740.jpg",
          "height": 2246,
          "width": 1827,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:08:52.6139085Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267740"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267741",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267741",
          "artist": "sir lawrence alma-tadema",
          "name": "A New Dress",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1887",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267741.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267741.jpg",
          "height": 1516,
          "width": 1997,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:58:03.0547847Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267741"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267742",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267742",
          "artist": "sir lawrence alma-tadema",
          "name": "Drawing Room, Holland Park",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1887",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267742.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267742.jpg",
          "height": 1000,
          "width": 661,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:58:04.1344714Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267742"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267743",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267743",
          "artist": "sir lawrence alma-tadema",
          "name": "Study for \"The Roses of Heliogabalus\"",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1888",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267743.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267743.jpg",
          "height": 959,
          "width": 1600,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:51.0434684Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267743"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267744",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267744",
          "artist": "sir lawrence alma-tadema",
          "name": "Venus and Mars",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1888",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267744.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267744.jpg",
          "height": 600,
          "width": 275,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:51.253782Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267744"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267745",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267745",
          "artist": "sir lawrence alma-tadema",
          "name": "At the Shrine of Venus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1888",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267745.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267745.jpg",
          "height": 1152,
          "width": 1536,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:53.072743Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267745"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267746",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267746",
          "artist": "sir lawrence alma-tadema",
          "name": "Sisters",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1889",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267746.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267746.jpg",
          "height": 466,
          "width": 587,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:58:04.0508185Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267746"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267747",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267747",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Miss Mac Whirter",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1889",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267747.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267747.jpg",
          "height": 1200,
          "width": 374,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:54:22.0108474Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267747"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267978",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267978",
          "artist": "sir lawrence alma-tadema",
          "name": "A Lake in Bavaria",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1890",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267978.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267978.jpg",
          "height": 504,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:58:12.3983157Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267978"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267997",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267997",
          "artist": "sir lawrence alma-tadema",
          "name": "\"Nobody Asked You, Sir!\" She Said",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1896",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267997.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267997.jpg",
          "height": 912,
          "width": 667,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:54:34.3654171Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267997"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267998",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267998",
          "artist": "sir lawrence alma-tadema",
          "name": "Watching and Waiting",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1897",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267998.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267998.jpg",
          "height": 831,
          "width": 564,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:09:13.0381637Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267998"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:267999",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "267999",
          "artist": "sir lawrence alma-tadema",
          "name": "Melody on a Mediterranean Terrace",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1897",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-267999.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-267999.jpg",
          "height": 549,
          "width": 800,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:09:21.677567Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "267999"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268168",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268168",
          "artist": "sir lawrence alma-tadema",
          "name": "Goldfish",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1900",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268168.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268168.jpg",
          "height": 529,
          "width": 1126,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:09:43.4734425Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268168"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268170",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268170",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Mrs George Armour of Princeton, New Jersey",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1900",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268170.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268170.jpg",
          "height": 1461,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:05:52.8656093Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268170"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268175",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268175",
          "artist": "sir lawrence alma-tadema",
          "name": "A Priestess of Hymen",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1901",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268175.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268175.jpg",
          "height": 800,
          "width": 390,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:54:56.5789851Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268175"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268176",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268176",
          "artist": "sir lawrence alma-tadema",
          "name": "Impatient",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1901",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268176.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268176.jpg",
          "height": 1522,
          "width": 1101,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:54:56.3492874Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268176"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268177",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268177",
          "artist": "sir lawrence alma-tadema",
          "name": "Design for a Backcloth for Coriolanus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1901",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268177.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268177.jpg",
          "height": 576,
          "width": 768,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:05:52.821657Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268177"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268178",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268178",
          "artist": "sir lawrence alma-tadema",
          "name": "Antium Seen From Outside the City Walls",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1901",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268178.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268178.jpg",
          "height": 573,
          "width": 799,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:05:53.1922792Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268178"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268420",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268420",
          "artist": "sir lawrence alma-tadema",
          "name": "A Crown",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1902",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268420.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268420.jpg",
          "height": 1195,
          "width": 787,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:19.642405Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268420"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268431",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268431",
          "artist": "sir lawrence alma-tadema",
          "name": "Thalia's Homage to Aesculapius",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1903",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268431.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268431.jpg",
          "height": 460,
          "width": 642,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:01:14.072881Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268431"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268432",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268432",
          "artist": "sir lawrence alma-tadema",
          "name": "Orante",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1907",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268432.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268432.jpg",
          "height": 800,
          "width": 678,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:19.9644112Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268432"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268433",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268433",
          "artist": "sir lawrence alma-tadema",
          "name": "Youth",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1907",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268433.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268433.jpg",
          "height": 345,
          "width": 600,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:19.5502271Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268433"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268434",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268434",
          "artist": "sir lawrence alma-tadema",
          "name": "A Message of Love",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1909",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268434.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268434.jpg",
          "height": 1432,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:06:14.3921032Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268434"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268435",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268435",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Ilona Eibenschutz",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1910",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268435.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268435.jpg",
          "height": 1080,
          "width": 1363,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:06:13.9125501Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268435"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268436",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268436",
          "artist": "sir lawrence alma-tadema",
          "name": "The Voice of Spring",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1910",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268436.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268436.jpg",
          "height": 803,
          "width": 1754,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:01:13.1701924Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268436"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268437",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268437",
          "artist": "sir lawrence alma-tadema",
          "name": "Heading: The Royal Academy Address to H.M. King George V on His Accession to the Throne",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1911",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268437.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268437.jpg",
          "height": 2000,
          "width": 1363,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:01:22.5761937Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268437"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268438",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268438",
          "artist": "sir lawrence alma-tadema",
          "name": "Spring Flowers",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1911",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268438.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268438.jpg",
          "height": 2000,
          "width": 1517,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:58:51.9458648Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268438"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268439",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268439",
          "artist": "sir lawrence alma-tadema",
          "name": "A Border for the King's Letter to the Nation",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1911",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268439.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268439.jpg",
          "height": 1869,
          "width": 2271,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:23.6132723Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268439"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268440",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268440",
          "artist": "sir lawrence alma-tadema",
          "name": "Young Girl with Roses",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1911",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268440.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268440.jpg",
          "height": 946,
          "width": 477,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:10:28.6969311Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268440"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268441",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268441",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Myself for the Royal Accademia Romana di San Luca",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1912",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268441.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268441.jpg",
          "height": 1862,
          "width": 2456,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:40.522297Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268441"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268442",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268442",
          "artist": "sir lawrence alma-tadema",
          "name": "Female Nude Seated on a Couch in Alma-Tadema's Studio (unfinished)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1912",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268442.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268442.jpg",
          "height": 448,
          "width": 262,
          "orientation": "portrait",
          "moderationLabels": [{
            "confidence": 50.6183,
            "name": "Suggestive"
          }, {
            "confidence": 50.6183,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }],
          "nudity": false,
          "@timestamp": "2021-04-24T14:57:47.2645087Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268442"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:268443",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "268443",
          "artist": "sir lawrence alma-tadema",
          "name": "A Bunch of Peonies",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1912",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-268443.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-268443.jpg",
          "height": 1080,
          "width": 1340,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:55:29.0102476Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "268443"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270210",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270210",
          "artist": "sir lawrence alma-tadema",
          "name": "Young Woman with Lute",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1876-1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270210.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270210.jpg",
          "height": 1276,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:02:26.6264008Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270210"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270322",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270322",
          "artist": "sir lawrence alma-tadema",
          "name": "The Education of the Children of Clotilde and Clovis",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270322.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270322.jpg",
          "height": 1080,
          "width": 1461,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:13:20.4381739Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270322"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270327",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270327",
          "artist": "sir lawrence alma-tadema",
          "name": "Pastimes in Ancient Egypt, 3000 Years Ago",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1874",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270327.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270327.jpg",
          "height": 1080,
          "width": 1427,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:09:18.3335905Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270327"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270340",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270340",
          "artist": "sir lawrence alma-tadema",
          "name": "The Mummy in the Roman Period",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1880",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270340.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270340.jpg",
          "height": 1080,
          "width": 1819,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:13:20.0467432Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270340"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270358",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270358",
          "artist": "sir lawrence alma-tadema",
          "name": "The First Whisper of Love",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270358.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270358.jpg",
          "height": 1502,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:09:25.4772679Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270358"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270415",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270415",
          "artist": "sir lawrence alma-tadema",
          "name": "The Siësta",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270415.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270415.jpg",
          "height": 779,
          "width": 1920,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:13:21.9227773Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270415"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270708",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270708",
          "artist": "sir lawrence alma-tadema",
          "name": "Spring",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270708.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270708.jpg",
          "height": 2656,
          "width": 1335,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:56.4463575Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270708"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270711",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270711",
          "artist": "sir lawrence alma-tadema",
          "name": "The Silent Counsellor",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1878",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270711.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270711.jpg",
          "height": 1352,
          "width": 2690,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T14:59:22.3066304Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270711"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270733",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270733",
          "artist": "sir lawrence alma-tadema",
          "name": "Pleading",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1878",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270733.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270733.jpg",
          "height": 1080,
          "width": 1506,
          "orientation": "landscape",
          "moderationLabels": [{
            "confidence": 53.100597,
            "name": "Explicit Nudity"
          }, {
            "confidence": 53.100597,
            "name": "Illustrated Explicit Nudity",
            "parentName": "Explicit Nudity"
          }],
          "nudity": true,
          "@timestamp": "2021-04-24T15:03:37.4042673Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270733"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270734",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270734",
          "artist": "sir lawrence alma-tadema",
          "name": "Hide and Seek",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1891",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270734.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270734.jpg",
          "height": 1750,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:51.4405495Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270734"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270739",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270739",
          "artist": "sir lawrence alma-tadema",
          "name": "Strigils and Sponges",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1880",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270739.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270739.jpg",
          "height": 1270,
          "width": 750,
          "orientation": "portrait",
          "moderationLabels": [{
            "confidence": 97.5973,
            "name": "Explicit Nudity"
          }, {
            "confidence": 97.5973,
            "name": "Illustrated Explicit Nudity",
            "parentName": "Explicit Nudity"
          }],
          "nudity": true,
          "@timestamp": "2021-04-24T14:59:33.3337277Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270739"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270744",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270744",
          "artist": "sir lawrence alma-tadema",
          "name": "The First Course",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270744.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270744.jpg",
          "height": 990,
          "width": 1920,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:03:37.6488231Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270744"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270745",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270745",
          "artist": "sir lawrence alma-tadema",
          "name": "The Torch Dance",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1882",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270745.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270745.jpg",
          "height": 1245,
          "width": 950,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:56.5642674Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270745"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270746",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270746",
          "artist": "sir lawrence alma-tadema",
          "name": "Early Affections",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1882",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270746.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270746.jpg",
          "height": 2602,
          "width": 1624,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:57.4435538Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270746"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:270747",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "270747",
          "artist": "sir lawrence alma-tadema",
          "name": "Welcome Footsteps",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-270747.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-270747.jpg",
          "height": 1080,
          "width": 1356,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:09:57.1374612Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "270747"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:271000",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "271000",
          "artist": "sir lawrence alma-tadema",
          "name": "At the Shrine of Venus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1889",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-271000.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-271000.jpg",
          "height": 1080,
          "width": 1314,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:10:03.1536335Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "271000"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:274653",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "274653",
          "artist": "sir lawrence alma-tadema",
          "name": "Portrait of Frederika Reijnders",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1850-1854",
          "s3Path": "collections/the-athenaeum/page-id-274653.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-274653.jpg",
          "height": 1280,
          "width": 961,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:36.41385Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "274653"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:274654",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "274654",
          "artist": "sir lawrence alma-tadema",
          "name": "Triumphal return of Sir Willem van Saeftingen to the Abbey Ter Doest in 1513",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1859",
          "s3Path": "collections/the-athenaeum/page-id-274654.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-274654.jpg",
          "height": 759,
          "width": 1024,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:04:28.0917752Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "274654"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:274655",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "274655",
          "artist": "sir lawrence alma-tadema",
          "name": "The Visit: A Dutch Interior",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1868",
          "s3Path": "collections/the-athenaeum/page-id-274655.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-274655.jpg",
          "height": 578,
          "width": 801,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:15:36.9003304Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "274655"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:274661",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "274661",
          "artist": "sir lawrence alma-tadema",
          "name": "Roman Gardens",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Path": "collections/the-athenaeum/page-id-274661.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-274661.jpg",
          "height": 456,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:15:38.0418147Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "274661"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:275940",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "275940",
          "artist": "sir lawrence alma-tadema",
          "name": "Promise of Spring",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1890",
          "s3Bucket": "images.gonzalez-art-foundation.org",
          "s3Path": "collections/the-athenaeum/page-id-275940.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-275940.jpg",
          "height": 1600,
          "width": 954,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:20:59.9478857Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "275940"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:28093",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "28093",
          "artist": "sir lawrence alma-tadema",
          "name": "Preparation in the Coliseum",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1912",
          "s3Path": "collections/the-athenaeum/page-id-28093.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-28093.jpg",
          "height": 962,
          "width": 503,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:25:29.9966486Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "28093"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:28474",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "28474",
          "artist": "sir lawrence alma-tadema",
          "name": "A Love Missile",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1878",
          "s3Path": "collections/the-athenaeum/page-id-28474.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-28474.jpg",
          "height": 987,
          "width": 645,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:30:54.7021858Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "28474"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:28580",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "28580",
          "artist": "sir lawrence alma-tadema",
          "name": "Vespasian Hearing from One of His Generals of the Taking of Jerusalem by Titus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1866",
          "s3Path": "collections/the-athenaeum/page-id-28580.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-28580.jpg",
          "height": 961,
          "width": 754,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:35:33.4495938Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "28580"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:29126",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "29126",
          "artist": "sir lawrence alma-tadema",
          "name": "Figures on a Terrace",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1873-1878",
          "s3Path": "collections/the-athenaeum/page-id-29126.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-29126.jpg",
          "height": 571,
          "width": 1145,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:37:46.0237605Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "29126"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:325",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "325",
          "artist": "sir lawrence alma-tadema",
          "name": "A Sculpture Gallery in Rome at the Time of Augustus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1867",
          "s3Path": "collections/the-athenaeum/page-id-325.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-325.jpg",
          "height": 1070,
          "width": 813,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:33:43.8941869Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "325"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:326",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "326",
          "artist": "sir lawrence alma-tadema",
          "name": "Autumn Vintage Festival",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Path": "collections/the-athenaeum/page-id-326.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-326.jpg",
          "height": 1129,
          "width": 553,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:33:49.6288436Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "326"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:327",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "327",
          "artist": "sir lawrence alma-tadema",
          "name": "A Hearty Welcome",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1878",
          "s3Path": "collections/the-athenaeum/page-id-327.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-327.jpg",
          "height": 852,
          "width": 2455,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:31:43.6532575Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "327"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:328",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "328",
          "artist": "sir lawrence alma-tadema",
          "name": "Welcome Footsteps",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Path": "collections/the-athenaeum/page-id-328.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-328.jpg",
          "height": 725,
          "width": 1000,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:34:03.7428321Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "328"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:330",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "330",
          "artist": "sir lawrence alma-tadema",
          "name": "The Women of Amphissa",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1887",
          "s3Path": "collections/the-athenaeum/page-id-330.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-330.jpg",
          "height": 1310,
          "width": 1971,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:39:17.1383551Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "330"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:331",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "331",
          "artist": "sir lawrence alma-tadema",
          "name": "The Favourite Poet",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1888",
          "s3Path": "collections/the-athenaeum/page-id-331.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-331.jpg",
          "height": 513,
          "width": 700,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:31:58.5764307Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "331"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:332",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "332",
          "artist": "sir lawrence alma-tadema",
          "name": "Promise of Spring",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1890",
          "s3Path": "collections/the-athenaeum/page-id-332.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-332.jpg",
          "height": 1588,
          "width": 943,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:43:57.593666Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "332"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:333",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "333",
          "artist": "sir lawrence alma-tadema",
          "name": "Unconscious Rivals",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1893",
          "s3Path": "collections/the-athenaeum/page-id-333.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-333.jpg",
          "height": 710,
          "width": 1000,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:40:16.3496284Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "333"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:334",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "334",
          "artist": "sir lawrence alma-tadema",
          "name": "Spring",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1894",
          "s3Path": "collections/the-athenaeum/page-id-334.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-334.jpg",
          "height": 1689,
          "width": 790,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:39:46.1358069Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "334"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:335",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "335",
          "artist": "sir lawrence alma-tadema",
          "name": "Coign of Vantage",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1895",
          "s3Path": "collections/the-athenaeum/page-id-335.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-335.jpg",
          "height": 2407,
          "width": 1655,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:34:57.2147404Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "335"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:336",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "336",
          "artist": "sir lawrence alma-tadema",
          "name": "The Baths of Caracalla",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1899",
          "s3Path": "collections/the-athenaeum/page-id-336.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-336.jpg",
          "height": 948,
          "width": 619,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:32:42.3148689Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "336"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:337",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "337",
          "artist": "sir lawrence alma-tadema",
          "name": "Vain Courtship",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1900",
          "s3Path": "collections/the-athenaeum/page-id-337.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-337.jpg",
          "height": 1884,
          "width": 1004,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:32:42.7532532Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "337"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:338",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "338",
          "artist": "sir lawrence alma-tadema",
          "name": "Silver Favourites",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1903",
          "s3Path": "collections/the-athenaeum/page-id-338.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-338.jpg",
          "height": 1024,
          "width": 598,
          "orientation": "portrait",
          "moderationLabels": [{
            "confidence": 96.8581,
            "name": "Graphic Violence Or Gore",
            "parentName": "Violence"
          }, {
            "confidence": 96.8581,
            "name": "Violence"
          }],
          "nudity": false,
          "@timestamp": "2021-04-24T15:35:38.7896319Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "338"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:339",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "339",
          "artist": "sir lawrence alma-tadema",
          "name": "Sunday Morning",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1871",
          "s3Path": "collections/the-athenaeum/page-id-339.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-339.jpg",
          "height": 1536,
          "width": 1291,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:41:43.292804Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "339"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:340",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "340",
          "artist": "sir lawrence alma-tadema",
          "name": "Ask Me No More... For at a Touch I Yield",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1906",
          "s3Path": "collections/the-athenaeum/page-id-340.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-340.jpg",
          "height": 1080,
          "width": 1565,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:44:51.4201215Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "340"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:350",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "350",
          "artist": "sir lawrence alma-tadema",
          "name": "The Vintage Festival",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1870",
          "s3Path": "collections/the-athenaeum/page-id-350.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-350.jpg",
          "height": 896,
          "width": 1920,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:46:08.5282976Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "350"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:351",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "351",
          "artist": "sir lawrence alma-tadema",
          "name": "Poetry",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1879",
          "s3Path": "collections/the-athenaeum/page-id-351.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-351.jpg",
          "height": 800,
          "width": 548,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:47:58.2621283Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "351"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:352",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "352",
          "artist": "sir lawrence alma-tadema",
          "name": "Sappho and Alcaeus",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Path": "collections/the-athenaeum/page-id-352.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-352.jpg",
          "height": 984,
          "width": 1799,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:42:21.4534113Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "352"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:353",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "353",
          "artist": "sir lawrence alma-tadema",
          "name": "The Meeting of Anthony and Cleopatra: 41 BC",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1883",
          "s3Path": "collections/the-athenaeum/page-id-353.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-353.jpg",
          "height": 908,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:43:37.1344005Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "353"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:357",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "357",
          "artist": "sir lawrence alma-tadema",
          "name": "The Frigidarium",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1890",
          "s3Path": "collections/the-athenaeum/page-id-357.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-357.jpg",
          "height": 521,
          "width": 700,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:47:20.132377Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "357"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:358",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "358",
          "artist": "sir lawrence alma-tadema",
          "name": "The Kiss",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1891",
          "s3Path": "collections/the-athenaeum/page-id-358.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-358.jpg",
          "height": 1720,
          "width": 2449,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:47:16.5759176Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "358"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:359",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "359",
          "artist": "sir lawrence alma-tadema",
          "name": "God Speed",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1893",
          "s3Path": "collections/the-athenaeum/page-id-359.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-359.jpg",
          "height": 700,
          "width": 393,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:44:28.4425603Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "359"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:360",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "360",
          "artist": "sir lawrence alma-tadema",
          "name": "A Difference of Opinion",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1896",
          "s3Path": "collections/the-athenaeum/page-id-360.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-360.jpg",
          "height": 700,
          "width": 399,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:49:08.7559563Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "360"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:361",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "361",
          "artist": "sir lawrence alma-tadema",
          "name": "Her Eyes are with Her Thoughts and They are Far Away",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1897",
          "s3Path": "collections/the-athenaeum/page-id-361.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-361.jpg",
          "height": 1262,
          "width": 2048,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:44:40.613945Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "361"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:362",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "362",
          "artist": "sir lawrence alma-tadema",
          "name": "The Year's at the Spring,  All's Right with the World",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1902",
          "s3Path": "collections/the-athenaeum/page-id-362.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-362.jpg",
          "height": 700,
          "width": 503,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:49:26.6012009Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "362"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:363",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "363",
          "artist": "sir lawrence alma-tadema",
          "name": "Caracalla and Geta",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1907",
          "s3Path": "collections/the-athenaeum/page-id-363.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-363.jpg",
          "height": 1644,
          "width": 2366,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:35:10.2984219Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "363"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:364",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "364",
          "artist": "sir lawrence alma-tadema",
          "name": "At Aphrodite's Cradle",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1908",
          "s3Path": "collections/the-athenaeum/page-id-364.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-364.jpg",
          "height": 1024,
          "width": 769,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:35:39.0147702Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "364"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:365",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "365",
          "artist": "sir lawrence alma-tadema",
          "name": "A Favourite Custom",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1909",
          "s3Path": "collections/the-athenaeum/page-id-365.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-365.jpg",
          "height": 1536,
          "width": 1040,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:41:04.7670063Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "365"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:366",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "366",
          "artist": "sir lawrence alma-tadema",
          "name": "Under the Roof of Blue Ionian Weather",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1901",
          "s3Path": "collections/the-athenaeum/page-id-366.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-366.jpg",
          "height": 1396,
          "width": 3082,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:48:57.5372315Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "366"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:367",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "367",
          "artist": "sir lawrence alma-tadema",
          "name": "A Greek Woman",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1869",
          "s3Path": "collections/the-athenaeum/page-id-367.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-367.jpg",
          "height": 1280,
          "width": 990,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:41:08.1174858Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "367"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:368",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "368",
          "artist": "sir lawrence alma-tadema",
          "name": "Flora: Spring in the Gardens of the Villa Borghese",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Path": "collections/the-athenaeum/page-id-368.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-368.jpg",
          "height": 2330,
          "width": 1529,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:49:08.0751012Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "368"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:370",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "370",
          "artist": "sir lawrence alma-tadema",
          "name": "Thou Rose of All the Roses",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1885",
          "s3Path": "collections/the-athenaeum/page-id-370.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-370.jpg",
          "height": 950,
          "width": 560,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:36:31.8116297Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "370"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:371",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "371",
          "artist": "sir lawrence alma-tadema",
          "name": "Ninety-Four Degrees in the Shade",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Path": "collections/the-athenaeum/page-id-371.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-371.jpg",
          "height": 1280,
          "width": 818,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:46:03.0113724Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "371"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:372",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "372",
          "artist": "sir lawrence alma-tadema",
          "name": "An Antique Custom (The Bath)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1876",
          "s3Path": "collections/the-athenaeum/page-id-372.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-372.jpg",
          "height": 2643,
          "width": 720,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:41:53.3574737Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "372"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:373",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "373",
          "artist": "sir lawrence alma-tadema",
          "name": "A Birth Chamber, Seventeenth Century",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1869",
          "s3Path": "collections/the-athenaeum/page-id-373.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-373.jpg",
          "height": 1720,
          "width": 2316,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:42:09.5431854Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "373"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:374",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "374",
          "artist": "sir lawrence alma-tadema",
          "name": "Dolce far Niente",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1882",
          "s3Path": "collections/the-athenaeum/page-id-374.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-374.jpg",
          "height": 1000,
          "width": 671,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:42:19.0298822Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "374"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:376",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "376",
          "artist": "sir lawrence alma-tadema",
          "name": "A Roman Scribe Writing Dispatches",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1865",
          "s3Path": "collections/the-athenaeum/page-id-376.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-376.jpg",
          "height": 1527,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:42:33.8561445Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "376"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:377",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "377",
          "artist": "sir lawrence alma-tadema",
          "name": "The Sculptor's Model",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Path": "collections/the-athenaeum/page-id-377.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-377.jpg",
          "height": 2000,
          "width": 864,
          "orientation": "portrait",
          "moderationLabels": [{
            "confidence": 89.8341,
            "name": "Explicit Nudity"
          }, {
            "confidence": 89.8341,
            "name": "Nudity",
            "parentName": "Explicit Nudity"
          }, {
            "confidence": 80.2987,
            "name": "Graphic Female Nudity",
            "parentName": "Explicit Nudity"
          }],
          "nudity": true,
          "@timestamp": "2021-04-24T15:50:51.6264564Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "377"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:378",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "378",
          "artist": "sir lawrence alma-tadema",
          "name": "A Silent Greeting",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1889",
          "s3Path": "collections/the-athenaeum/page-id-378.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-378.jpg",
          "height": 1536,
          "width": 1118,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:37:24.9714665Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "378"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:379",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "379",
          "artist": "sir lawrence alma-tadema",
          "name": "A World of Their Own",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1905",
          "s3Path": "collections/the-athenaeum/page-id-379.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-379.jpg",
          "height": 1140,
          "width": 3608,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:51:41.9823135Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "379"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:380",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "380",
          "artist": "sir lawrence alma-tadema",
          "name": "Cherries",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1873",
          "s3Path": "collections/the-athenaeum/page-id-380.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-380.jpg",
          "height": 782,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:51:47.5824217Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "380"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:381",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "381",
          "artist": "sir lawrence alma-tadema",
          "name": "Comparisons",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1892",
          "s3Path": "collections/the-athenaeum/page-id-381.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-381.jpg",
          "height": 1080,
          "width": 1437,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:42:57.1784904Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "381"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:382",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "382",
          "artist": "sir lawrence alma-tadema",
          "name": "Confidences",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1869",
          "s3Path": "collections/the-athenaeum/page-id-382.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-382.jpg",
          "height": 1404,
          "width": 947,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:43:16.4653912Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "382"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:383",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "383",
          "artist": "sir lawrence alma-tadema",
          "name": "A Peaceful Roman Wooing",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1903",
          "s3Path": "collections/the-athenaeum/page-id-383.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-383.jpg",
          "height": 1200,
          "width": 559,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:38:13.4578264Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "383"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:384",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "384",
          "artist": "sir lawrence alma-tadema",
          "name": "Egyptian Chess Players",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1865",
          "s3Path": "collections/the-athenaeum/page-id-384.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-384.jpg",
          "height": 694,
          "width": 1000,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:38:30.7356834Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "384"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:385",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "385",
          "artist": "sir lawrence alma-tadema",
          "name": "The Juggler",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1870",
          "s3Path": "collections/the-athenaeum/page-id-385.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-385.jpg",
          "height": 800,
          "width": 523,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:38:49.93096Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "385"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:386",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "386",
          "artist": "sir lawrence alma-tadema",
          "name": "Entrance to a Roman Theatre",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1866",
          "s3Path": "collections/the-athenaeum/page-id-386.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-386.jpg",
          "height": 1492,
          "width": 2098,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:52:27.1918729Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "386"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:387",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "387",
          "artist": "sir lawrence alma-tadema",
          "name": "Exhausted Maenides after the Dance (unfinished)",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "circa 1873-1874",
          "s3Path": "collections/the-athenaeum/page-id-387.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-387.jpg",
          "height": 556,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [{
            "confidence": 71.9947,
            "name": "Explicit Nudity"
          }, {
            "confidence": 71.9947,
            "name": "Illustrated Explicit Nudity",
            "parentName": "Explicit Nudity"
          }, {
            "confidence": 69.567604,
            "name": "Suggestive"
          }, {
            "confidence": 69.567604,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }],
          "nudity": true,
          "@timestamp": "2021-04-24T15:43:42.597439Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "387"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:393",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "393",
          "artist": "sir lawrence alma-tadema",
          "name": "Self-Portrait of Lawrence Alma-Tadema, RA",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1896",
          "s3Path": "collections/the-athenaeum/page-id-393.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-393.jpg",
          "height": 619,
          "width": 537,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:48:29.5022819Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "393"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:39664",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "39664",
          "artist": "sir lawrence alma-tadema",
          "name": "The Last Roses",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1872",
          "s3Path": "collections/the-athenaeum/page-id-39664.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-39664.jpg",
          "height": 819,
          "width": 672,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T15:53:38.8331834Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "39664"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:53154",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "53154",
          "artist": "sir lawrence alma-tadema",
          "name": "An Audience",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1881",
          "s3Path": "collections/the-athenaeum/page-id-53154.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-53154.jpg",
          "height": 1000,
          "width": 628,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T16:14:43.5735381Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "53154"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:57960",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "57960",
          "artist": "sir lawrence alma-tadema",
          "name": "An Eloquent Silence",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1890",
          "s3Path": "collections/the-athenaeum/page-id-57960.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-57960.jpg",
          "height": 1368,
          "width": 1080,
          "orientation": "portrait",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T16:21:42.0083661Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "57960"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:58126",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "58126",
          "artist": "sir lawrence alma-tadema",
          "name": "In a Rose Garden",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1889",
          "s3Path": "collections/the-athenaeum/page-id-58126.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-58126.jpg",
          "height": 946,
          "width": 1280,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T16:08:21.8966372Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "58126"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:69296",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "69296",
          "artist": "sir lawrence alma-tadema",
          "name": "Cleopatra",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1875",
          "s3Path": "collections/the-athenaeum/page-id-69296.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-69296.jpg",
          "height": 499,
          "width": 600,
          "orientation": "landscape",
          "moderationLabels": [{
            "confidence": 54.066803,
            "name": "Suggestive"
          }, {
            "confidence": 54.066803,
            "name": "Revealing Clothes",
            "parentName": "Suggestive"
          }],
          "nudity": false,
          "@timestamp": "2021-04-24T16:32:04.5661992Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "69296"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:72823",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "72823",
          "artist": "sir lawrence alma-tadema",
          "name": "Home from market",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1865",
          "s3Path": "collections/the-athenaeum/page-id-72823.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-72823.jpg",
          "height": 703,
          "width": 983,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T16:27:05.5324116Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "72823"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:72875",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "72875",
          "artist": "sir lawrence alma-tadema",
          "name": "A Balneator",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "1877",
          "s3Path": "collections/the-athenaeum/page-id-72875.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-72875.jpg",
          "height": 800,
          "width": 574,
          "orientation": "portrait",
          "moderationLabels": [{
            "confidence": 93.7419,
            "name": "Suggestive"
          }, {
            "confidence": 93.7419,
            "name": "Barechested Male",
            "parentName": "Suggestive"
          }],
          "nudity": false,
          "@timestamp": "2021-04-24T16:36:09.2559201Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "72875"]
      }, {
        "_index": "classification",
        "_id": "http://www.the-athenaeum.org:82698",
        "_score": 38.778423,
        "_source": {
          "source": "http://www.the-athenaeum.org",
          "pageId": "82698",
          "artist": "sir lawrence alma-tadema",
          "name": "The Boating Pool",
          "originalArtist": "Sir Lawrence Alma-Tadema",
          "date": "Date unknown",
          "s3Path": "collections/the-athenaeum/page-id-82698.jpg",
          "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-82698.jpg",
          "height": 476,
          "width": 750,
          "orientation": "landscape",
          "moderationLabels": [],
          "nudity": false,
          "@timestamp": "2021-04-24T16:55:31.5222472Z"
        },
        "sort": [38.778423, "http://www.the-athenaeum.org", "82698"]
      }],
      "total": 8374,
      "source": "",
      "searchText": "Sir Lawrence Alma-Tadema",
      "searchAfter": null,
      "maxResults": 400
    };
    let parsedItemsFromSearch = itemsFromSearch.items.map(x => x['_source']);
    this.slideShowData = [{
      "artist": "sir lawrence alma-tadema",
      "pageId": "355",
      "nudity": false,
      "source": "http://www.the-athenaeum.org",
      "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-355.jpg",
      "orientation": "landscape",
      "name": "The Roses of Heliogabalus",
      "date": "1888",
      "width": 1754,
      "height": 1080,
      "originalArtist": "Sir Lawrence Alma-Tadema",
      "moderationLabels": [],
      "@timestamp": "2021-04-24T15:48:36.1113035Z",
      "s3Path": "collections/the-athenaeum/page-id-355.jpg"
    }, {
      "artist": "sir lawrence alma-tadema",
      "pageId": "329",
      "nudity": false,
      "source": "http://www.the-athenaeum.org",
      "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-329.jpg",
      "orientation": "landscape",
      "name": "Expectations",
      "date": "1885",
      "width": 750,
      "height": 370,
      "originalArtist": "Sir Lawrence Alma-Tadema",
      "moderationLabels": [],
      "@timestamp": "2021-04-24T15:39:05.1725790Z",
      "s3Path": "collections/the-athenaeum/page-id-329.jpg"
    }, {
      "artist": "sir lawrence alma-tadema",
      "pageId": "354",
      "nudity": false,
      "source": "http://www.the-athenaeum.org",
      "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-354.jpg",
      "orientation": "landscape",
      "name": "A Reading from Homer",
      "date": "1885",
      "width": 1600,
      "height": 797,
      "originalArtist": "Sir Lawrence Alma-Tadema",
      "moderationLabels": [],
      "@timestamp": "2021-04-24T15:38:35.1033823Z",
      "s3Path": "collections/the-athenaeum/page-id-354.jpg"
    }, {
      "artist": "sir lawrence alma-tadema",
      "pageId": "356",
      "nudity": false,
      "source": "http://www.the-athenaeum.org",
      "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-356.jpg",
      "orientation": "landscape",
      "name": "A Dedication to Bacchus",
      "date": "1889",
      "width": 2629,
      "height": 1201,
      "originalArtist": "Sir Lawrence Alma-Tadema",
      "moderationLabels": [],
      "@timestamp": "2021-04-24T15:47:18.7961913Z",
      "s3Path": "collections/the-athenaeum/page-id-356.jpg"
    }, {
      "artist": "sir lawrence alma-tadema",
      "pageId": "375",
      "nudity": false,
      "source": "http://www.the-athenaeum.org",
      "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-375.jpg",
      "orientation": "landscape",
      "name": "A Pyhrric Dance",
      "date": "1869",
      "width": 1280,
      "height": 632,
      "originalArtist": "Sir Lawrence Alma-Tadema",
      "moderationLabels": [],
      "@timestamp": "2021-04-24T15:46:23.0915846Z",
      "s3Path": "collections/the-athenaeum/page-id-375.jpg"
    }, {
      "artist": "sir lawrence alma-tadema",
      "s3Bucket": "images.gonzalez-art-foundation.org",
      "pageId": "1260",
      "nudity": false,
      "source": "http://www.the-athenaeum.org",
      "s3ThumbnailPath": "collections/the-athenaeum/thumbnails/page-id-1260.jpg",
      "orientation": "portrait",
      "name": "Greek Potters",
      "date": "1871",
      "width": 793,
      "height": 1133,
      "originalArtist": "Sir Lawrence Alma-Tadema",
      "moderationLabels": [],
      "@timestamp": "2021-04-24T11:35:32.0635646Z",
      "s3Path": "collections/the-athenaeum/page-id-1260.jpg"
    }];
    this.slideShowData = this.slideShowData.concat(parsedItemsFromSearch);
  }

  showSlides(n) {
    if (n >= this.slideShowData.length) {
      this.slideIndex = 0;
    } else if (n < 0) {
      this.slideIndex = this.slideShowData.length - 1;
    } else {
      this.slideIndex = n;
    }

    let item = this.slideShowData[this.slideIndex];
    let workName = '';

    if (item.name) {
      workName = `${item.name} `;
    }

    if (item.date) {
      workName += `(${item.date || ''}) `;
    }

    if (item.originalArtist) {
      workName += `by ${item.originalArtist || ''}`;
    }

    (0, _jquery.default)('.slideshow-slide > img').attr('alt', workName);
    (0, _jquery.default)('.slideshow-slide > img').prop('src', `${_api.default.getImageBase()}${item.s3Path}`);
    (0, _jquery.default)('.slideshow-numbertext').text(`${this.slideIndex + 1} / ${this.slideShowData.length}`);
    let link = (item.sourceLink || '').replace('http://', 'https://');
    let linkText;

    if (item.source === 'http://images.nga.gov') {
      linkText = 'National Gallery of Art, Washington DC';
    } else if (item.source === 'http://www.musee-orsay.fr') {
      linkText = 'Musée d\'Orsay in Paris, France';
    } else if (item.source === 'https://www.pop.culture.gouv.fr/notice/museo/M5031') {
      linkText = 'Musée du Louvre in Paris, France';
    } else if (item.source === 'https://www.pop.culture.gouv.fr') {
      linkText = 'Ministère de la Culture in France';
    } else if (item.source === 'https://www.moma.org') {
      linkText = 'The Museum of Modern Art in New York, United States';
    } else if (item.source === 'http://www.the-athenaeum.org') {
      linkText = "The Athenaeum";
      link = 'https://www.the-athenaeum.org/art/detail.php?ID=' + item.pageId;
    } else if (item.source === 'https://www.rijksmuseum.nl') {
      linkText = 'Rijksmuseum in Amsterdam, Netherlands';
    }

    (0, _jquery.default)('#slideshow-image-link').text(workName);
    (0, _jquery.default)('#slideshow-image-link').attr('href', `/gallery.html?source=${encodeURIComponent(item.source)}&pageId=${encodeURIComponent(item.pageId)}`);
    (0, _jquery.default)('#slideshow-image-source-link').text(linkText);
    (0, _jquery.default)('#slideshow-image-source-link').attr('href', link);
  }

  loadSearchResults(jsonSearchResult) {
    let resultRow;

    for (let ct = 0; ct < jsonSearchResult.items.length; ct++) {
      let result = jsonSearchResult.items[ct]['_source'];
      this.results.push(jsonSearchResult.items[ct]);

      if (ct === 0 || ct % 3 == 0 || ct === jsonSearchResult.items.length) {
        resultRow = (0, _jquery.default)('<div class="row image-search-row"></div>');
        (0, _jquery.default)('#search-result-items').append(resultRow);
      }

      let imageLinkContainer = (0, _jquery.default)('<div class="col-4 text-center"></div>');
      let image = (0, _jquery.default)(`<img id="slideshow-image" class="image-search-item" />`).prop('src', `${_api.default.getImageBase()}${result.s3ThumbnailPath || result.s3Path}`);
      let imageWrapper = (0, _jquery.default)('<div class="image-search-item-image-wrapper"></div>');
      imageWrapper.append(image);
      let imageUrl = `/gallery.html?source=${encodeURIComponent(result.source)}&pageId=${encodeURIComponent(result.pageId)}`;
      image.click(function () {
        window.open(imageUrl, "_blank");
      });
      imageLinkContainer.append(imageWrapper);
      let imageLink = (0, _jquery.default)('<a target="_blank"></a>');
      imageLink.attr('href', imageUrl);
      imageLink.attr('title', result.source + ' - ' + result.pageId);
      imageLink.text(result.name + ' (' + result.date + ') by ' + result.originalArtist);
      let imageLinkWrapper = (0, _jquery.default)('<div></div>');
      imageLinkWrapper.append(imageLink);
      imageLinkContainer.append(imageLinkWrapper);
      resultRow.append(imageLinkContainer);
    }

    (0, _jquery.default)('.current-matches').text(this.results.length);
    (0, _jquery.default)('.total-matches').text(jsonSearchResult.total);
    (0, _jquery.default)('.slideshow-start').unbind();
    (0, _jquery.default)('.slideshow-start').click(function () {
      localStorage.setItem("slideshowData", JSON.stringify(jsonSearchResult));
      localStorage.setItem("slideshowIndex", 0);
      window.location = "/gallery.html";
    });
  }

  getSiteOptions() {
    return `
            <option value="http://www.the-athenaeum.org">The Athenaeum</option>
            <option value="http://images.nga.gov">National Gallery of Art in Washington D.C., United States</option>
            <option value="https://www.rijksmuseum.nl">Rijksmuseum in Amsterdam, Netherlands</option>`;
  }

  setCanonicalUrl(url) {
    // Remove existing canonical link if it exists
    const existingCanonical = document.querySelector('link[rel="canonical"]');

    if (existingCanonical) {
      existingCanonical.remove();
    } // Create and add new canonical link


    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = url;
    document.head.appendChild(canonicalLink);
  }

  init() {
    const self = this;
    const defaultSearchText = 'Sir Lawrence Alma-Tadema';

    const onLoadSearchText = _url.default.getUrlParameter('search');

    let searchText = onLoadSearchText || defaultSearchText;
    (0, _jquery.default)('#siteSelection').append(`<option value="">All</option>`);
    (0, _jquery.default)('#siteSelection').append(self.getSiteOptions());
    (0, _jquery.default)('.last-id-input-group').hide();
    (0, _jquery.default)('.search-text-input-group').show();
    (0, _jquery.default)('#search-text').val(searchText);
    (0, _jquery.default)('#run-search').click(function () {
      self.runSearch(false);
    });
    (0, _jquery.default)('.view-more').click(async function () {
      let lastResult = self.results[self.results.length - 1];

      let moreUrl = _api.default.getSearchUrl((0, _jquery.default)('#max-results').val(), (0, _jquery.default)('#search-text').val(), (0, _jquery.default)('#siteSelection').val(), JSON.stringify(lastResult.sort));

      let moreJson = await _api.default.get(moreUrl);
      self.loadSearchResults(moreJson);
    });
    (0, _jquery.default)('.view-more-works-by-featured-artist').click(function () {
      window.location.href = `/index.html?search=${encodeURIComponent('sir lawrence alma-tadema')}&artistExactMatch=true`;
    });

    if (onLoadSearchText) {
      const artistExactMatch = _url.default.getUrlParameter('artistExactMatch') === 'true';

      if (artistExactMatch) {
        self.setCanonicalUrl(window.location.href);
        (0, _jquery.default)('.featured-artist-container').hide();
      }

      this.runSearch(artistExactMatch);
    }

    self.showSlides(0);
    (0, _jquery.default)('.home .slideshow-button-container-prev').click(function () {
      self.showSlides(self.slideIndex - 1);
    });
    (0, _jquery.default)('.home .slideshow-button-container-next').click(function () {
      self.showSlides(self.slideIndex + 1);
    });
  }

  async runSearch(artistExactMatch) {
    (0, _jquery.default)('#search-result-items').empty();
    this.results = [];
    let self = this;

    let url = _api.default.getSearchUrl((0, _jquery.default)('#max-results').val(), (0, _jquery.default)('#search-text').val(), (0, _jquery.default)('#siteSelection').val(), JSON.stringify(self.searchAfter), artistExactMatch);

    (0, _jquery.default)('.search-result-controls').show();
    let json = await _api.default.get(url);
    this.loadSearchResults(json);
  }

}

exports.default = HomePage;

},{"./api":3,"./url":9,"jquery":1}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Navigation {
  static getNavigation() {
    return `<div class="container">
            <nav class="navbar navbar-light">
                <a class="navbar-brand" href="index.html">Gonzalez Art Foundation</a>
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="gallery.html">Gallery</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="artists.html?letter=a">Artists</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about.html">About</a>
                    </li>
                </ul>
            </nav>
        </div>`;
  }

}

exports.default = Navigation;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Url {
  static getUrlParameter(name) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === name) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  }

}

exports.default = Url;

},{}]},{},[4]);
