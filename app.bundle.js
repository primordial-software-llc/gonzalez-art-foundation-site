(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

  static getSearchUrl(maxResults, searchText, source, searchAfter, exactArtistMatch) {
    return `${ApiBase}unauthenticated/search` + `?maxResults=${encodeURIComponent(maxResults)}` + `&searchText=${encodeURIComponent(searchText)}` + `&source=${encodeURIComponent(source)}` + `&searchAfter=${searchAfter ? encodeURIComponent(searchAfter) : ''}` + `&exactArtistMatch=${!!exactArtistMatch}`;
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

},{}],3:[function(require,module,exports){
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

},{"./artists":4,"./gallery":5,"./home-page":6,"./navigation":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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

  loadArtists(artists) {
    let artistList = $('<ul class="artist-list"></ul>');

    for (let artist of artists) {
      artistList.append(`<li><a target="_blank" href='/index.html?search=${encodeURIComponent(artist.artist)}&exactArtistMatch=true'>${artist.originalArtist} - ${artist.numberOfWorks} works of art</a></li>`);
    }

    $('.artists-container').empty().append(artistList);
  }

  init() {
    let self = this;
    fetch(`${ApiBase}unauthenticated/cache-everything/artist`, {
      mode: 'cors'
    }).then(function (response) {
      response.json().then(json => {
        if (self.assertSuccess(response, json)) {
          self.loadArtists(json);
        }
      }).catch(function (error) {
        console.log('Failed to get data:');
        console.log(error);
      });
    });
  }

}

exports.default = Artists;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = _interopRequireDefault(require("./api"));

var _url = _interopRequireDefault(require("./url"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  showCurrentImage() {
    let jsonSearchResult = JSON.parse(localStorage.getItem('slideshowData'));
    let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex"));

    if (isNaN(slideshowIndex)) {
      location.href = 'https://www.gonzalez-art-foundation.org';
      return;
    }

    let currentImage = jsonSearchResult.items[slideshowIndex]['_source'];
    $('#slideshow-index').html(jsonSearchResult.searchFrom + slideshowIndex + 1);
    let totalItems = `${jsonSearchResult.total}${jsonSearchResult.maxSearchResultsHit ? '+' : ''}`;
    $('#slideshow-count').html(totalItems);
    this.showImage(currentImage);
  }

  showImage(currentImage) {
    $('#slideshow-image').prop('src', `${_api.default.getImageBase()}${currentImage.s3Path}`);
    let link = (currentImage.sourceLink || '').replace('http://', 'https://');
    let linkText;

    if (currentImage.source === 'http://images.nga.gov') {
      linkText = 'National Gallery of Art, Washington DC';
    } else if (currentImage.source === 'http://www.musee-orsay.fr') {
      linkText = 'Musée d\'Orsay in Paris, France';
    } else if (currentImage.source === 'https://www.pop.culture.gouv.fr/notice/museo/M5031') {
      linkText = 'Musée du Louvre in Paris, France';
    } else if (currentImage.source === 'https://www.pop.culture.gouv.fr') {
      linkText = 'Ministère de la Culture in France';
    } else if (currentImage.source === 'https://www.moma.org') {
      linkText = 'The Museum of Modern Art in New York, United States';
    } else if (currentImage.source === 'http://www.the-athenaeum.org') {
      linkText = "The Athenaeum";
      link = 'https://www.the-athenaeum.org/art/detail.php?ID=' + currentImage.pageId;
    } else if (currentImage.source === 'https://www.rijksmuseum.nl') {
      linkText = 'Rijksmuseum in Amsterdam, Netherlands';
    }

    $('#slideshow-image-info').empty();

    if (currentImage.name) {
      $('#slideshow-image-info').append($('<span>').text(`${currentImage.name} `));
    }

    if (currentImage.date) {
      $('#slideshow-image-info').append($('<span>').text(`(${currentImage.date || ''}) `));
    }

    if (currentImage.originalArtist) {
      $('#slideshow-image-info').append($('<span>').text(`by ${currentImage.originalArtist || ''} - `));
    }

    $('#slideshow-image-info').append($(`<a target="_blank">`).attr('href', link).text(linkText)).append($('<span>').text(` - Image id ${currentImage.pageId}`));

    if (currentImage.price) {
      let formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currentImage.priceCurrency,
        maximumFractionDigits: 2
      }).format(currentImage.price);
      $('#slideshow-image-info').append('<br/>').append($('<span>').text(`Indexed at ${(0, _moment.default)(currentImage['@timestamp']).format("yyyy-M-D h:mm A")} - Price ${formattedPrice}`));
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
    $('#slideshow-pause').hide();
    $('#slideshow-play').show();
  }

  showPlayer() {
    this.hasMovedMouseOnImageViewerPage = true;
    $(".slideshow-player").slideDown("slow", function () {
      $(".slideshow-player").show();
      $('#slideshow-image-container').removeClass('hide-controls');
    });
    $('body').css('cursor', '');
  }

  hidePlayer() {
    $('body').css('cursor', 'none');
    $(".slideshow-player").slideUp("slow", function () {
      $(".slideshow-player").hide();
      $('#slideshow-image-container').addClass('hide-controls');
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
      $('#slideshow-controls').addClass('hide');
      $('#slideshow-image-container').addClass('single-image-mode');
      fetch(`${_api.default.getApiBase()}unauthenticated/cache-everything/image-classification?source=${encodeURIComponent(source)}&pageId=${encodeURIComponent(pageId)}`, {
        mode: 'cors'
      }).then(function (response) {
        response.json().then(json => {
          if (self.assertSuccess(response, json)) {
            self.showImage(json);
          }
        }).catch(function (error) {
          console.log('Failed to get data:');
          console.log(error);
        });
      });
    } else {
      this.showCurrentImage();
    }

    $('#slideshow-return-home').click(() => {
      window.location = "/";
    });
    $('#slideshow-fullscreen').click(() => {
      self.showFullscreen();
    });
    $(document).mousemove(() => {
      if (!self.isFullScreen()) {
        self.showPlayer();
      }
    });
    $(document).keypress(() => {
      if (!self.isFullScreen()) {
        self.showPlayer();
      }
    });
    setInterval(function () {
      self.tryHidePlayer();
    }, 15000);
    let defaultInterval = 6;
    $('#slideshow-interval').val(defaultInterval);
    $('#slideshow-pause').hide().click(() => {
      self.pauseSlideshow();
    });
    $('#slideshow-play').click(function () {
      function slideshowTimerAction() {
        self.nextImage();
      }

      let intervalInMs = parseFloat($('#slideshow-interval').val()) * 1000;
      self.slideshowTimer = setInterval(slideshowTimerAction, intervalInMs);
      $('#slideshow-pause').show();
      $('#slideshow-play').hide();
    });
  }

}

exports.default = Gallery;

},{"./api":2,"./url":8,"moment":1}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = _interopRequireDefault(require("./api"));

var _url = _interopRequireDefault(require("./url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    $('.slideshow-slide > img').attr('alt', workName);
    $('.slideshow-slide > img').prop('src', `${_api.default.getImageBase()}${item.s3Path}`);
    $('.slideshow-numbertext').text(`${this.slideIndex + 1} / ${this.slideShowData.length}`);
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

    $('#slideshow-image-link').text(workName);
    $('#slideshow-image-link').attr('href', `/gallery.html?source=${encodeURIComponent(item.source)}&pageId=${encodeURIComponent(item.pageId)}`);
    $('#slideshow-image-source-link').text(linkText);
    $('#slideshow-image-source-link').attr('href', link);
  }

  loadSearchResults(jsonSearchResult) {
    let resultRow;

    for (let ct = 0; ct < jsonSearchResult.items.length; ct++) {
      let result = jsonSearchResult.items[ct]['_source'];
      this.results.push(jsonSearchResult.items[ct]);

      if (ct === 0 || ct % 3 == 0 || ct === jsonSearchResult.items.length) {
        resultRow = $('<div class="row image-search-row"></div>');
        $('#search-result-items').append(resultRow);
      }

      let imageLinkContainer = $('<div class="col-4 text-center"></div>');
      let image = $(`<img id="slideshow-image" class="image-search-item" />`).prop('src', `${_api.default.getImageBase()}${result.s3ThumbnailPath || result.s3Path}`);
      let imageWrapper = $('<div class="image-search-item-image-wrapper"></div>');
      imageWrapper.append(image);
      let imageUrl = `/gallery.html?source=${encodeURIComponent(result.source)}&pageId=${encodeURIComponent(result.pageId)}`;
      image.click(function () {
        window.open(imageUrl, "_blank");
      });
      imageLinkContainer.append(imageWrapper);
      let imageLink = $('<a target="_blank"></a>');
      imageLink.attr('href', imageUrl);
      imageLink.attr('title', result.source + ' - ' + result.pageId);
      imageLink.text(result.name + ' (' + result.date + ') by ' + result.originalArtist);
      let imageLinkWrapper = $('<div></div>');
      imageLinkWrapper.append(imageLink);
      imageLinkContainer.append(imageLinkWrapper);
      resultRow.append(imageLinkContainer);
    }

    $('.current-matches').text(this.results.length);
    $('.total-matches').text(jsonSearchResult.total);
    $('.slideshow-start').unbind();
    $('.slideshow-start').click(function () {
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

  init() {
    const self = this;
    const defaultSearchText = 'Sir Lawrence Alma-Tadema';

    const onLoadSearchText = _url.default.getUrlParameter('search');

    let searchText = onLoadSearchText || defaultSearchText;
    $('#siteSelection').append(`<option value="">All</option>`);
    $('#siteSelection').append(self.getSiteOptions());
    $('.last-id-input-group').hide();
    $('.search-text-input-group').show();
    $('#search-text').val(searchText);
    $('#run-search').click(this.runSearch.bind(this));
    $('.view-more').click(async function () {
      let lastResult = self.results[self.results.length - 1];

      let moreUrl = _api.default.getSearchUrl($('#max-results').val(), $('#search-text').val(), $('#siteSelection').val(), JSON.stringify(lastResult.sort));

      let moreJson = await _api.default.get(moreUrl);
      self.loadSearchResults(moreJson);
    });
    $('.view-more-works-by-featured-artist').click(function () {
      window.location.href = `/index.html?search=${encodeURIComponent('sir lawrence alma-tadema')}&exactArtistMatch=true`;
    });

    if (onLoadSearchText) {
      const exactArtistMatch = _url.default.getUrlParameter('exactArtistMatch') === 'true';
      this.runSearch(exactArtistMatch);
    }

    self.showSlides(0);
    $('.home .slideshow-button-container-prev').click(function () {
      self.showSlides(self.slideIndex - 1);
    });
    $('.home .slideshow-button-container-next').click(function () {
      self.showSlides(self.slideIndex + 1);
    });
  }

  async runSearch(exactArtistMatch) {
    $('#search-result-items').empty();
    this.results = [];
    let self = this;

    let url = _api.default.getSearchUrl($('#max-results').val(), $('#search-text').val(), $('#siteSelection').val(), JSON.stringify(self.searchAfter), exactArtistMatch);

    $('.search-result-controls').show();
    let json = await _api.default.get(url);
    this.loadSearchResults(json);
  }

}

exports.default = HomePage;

},{"./api":2,"./url":8}],7:[function(require,module,exports){
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
                        <a class="nav-link" href="artists.html">Artists</a>
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

},{}],8:[function(require,module,exports){
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

},{}]},{},[3]);
