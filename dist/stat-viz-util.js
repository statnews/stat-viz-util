/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// Teal, red, and shades of gray correspond to variables in _base.scss, in the STAT WordPress theme.
module.exports = {
  teal: 'rgba(31,173,182, 0.8)',
  yellow: 'rgb(245,178,26, 0.8)',
  red: 'rgb(223,76,81, 0.8)',
  black: '#000',
  white: '#fff',
  grayLighter: '#eee'
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var csvToJson = __webpack_require__( 5 );
__webpack_require__( 6 );

// TODO: Perform this conversion when a Brunch build runs, so that we don't have
// to do this work on the client. Ideally, combine the result with other JS.
module.exports = function( url, callback, isTyped ) {
  isTyped = ( typeof isTyped === 'undefined' ) ? true : isTyped;
  var labels = [];
  // Google Docs exports include the variable type on the second row (index = 1).
  // If types are not provided, we assume all values are numbers.
  var types = []; // Will only be populated if isTyped = true.
  var seriesGroup = [];
  fetch( url )
    .then( function( response ) {
      return response.text();
    } )
    .then( function( text ) {
      parseCsv( text );
    } )
    .catch( function( error ) {
      console.log( error );
    } );

  function parseCsv( text ) {
    // The CSV probably will have headers, but we want to parse them like any other data.
    csvToJson( { noheader: true } )
      .fromString( text )
      .on( 'csv', function( csvRow, rowIndex ) {
        if ( rowIndex === 0 ) {
          labels = csvRow;
        } else if ( rowIndex === 1 && isTyped ) {
          types = csvRow;
        } else {
          for ( var col = 0; col < csvRow.length; col++ ) {
            var cell = csvRow[col];
            if ( ! isTyped || types[col] === 'number' ) {
              cell = parseFloat( csvRow[col] );
            }
            // Don't forget: length starts at 1; col starts at 0!
            if ( col >= seriesGroup.length ) {
              // Create a new series
              seriesGroup.push( [cell] );
            } else {
              // Add to an existing series
              seriesGroup[col].push( cell );
            }
          }
        }
      } )
      .on( 'done', function( error ) {
        var result = {};
        var label = '';
        for ( var i = 0; i < seriesGroup.length; i++ ) {
          label = labels[ i ].replace( /[\s_\-//]*/g, '' ).toLowerCase();
          if ( /\d/.exec( label[0] ) ) {
            // Label starts with a digit. Preface a 'd' so that it can be easily accessed in JS.
            label = 'd' + label;
          }
          result[ label ] = seriesGroup[i];
        }
        callback( result );
      } );
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function( Chart ) {
  // In the future, we could use an .extend() function to write this config in JSON.
  var opts = Chart.defaults.global;
  opts.responsive = true;
  opts.defaultFontFamily = 'Circular, sans-serif';
  opts.defaultFontColor = '#999';
  opts.tooltips.xPadding = 10;
  opts.tooltips.yPadding = 10;
  opts.tooltips.cornerRadius = 0;
  opts.tooltips.titleFontColor = '#d5d5d5';
  opts.tooltips.bodyFontSize = 14;
  opts.tooltips.displayColors = false;
  opts.tooltips.backgroundColor = '#333';
  opts.hover.animationDuration = 0;
  opts.elements.line.borderWidth = 2;
  opts.elements.point.radius = 3;
  opts.elements.point.backgroundColor = '#fff';
  opts.elements.point.hoverBackgroundColor = '#fff';
  opts.elements.point.borderWidth = 0;
  opts.elements.point.hoverRadius = 4;
  opts.elements.point.hitRadius = 4;
  // We'll render the legend to HTML and style it ourselves.
  opts.legend.display = false;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function toPercentage( input, sigFigures ) {
  var val;
  var decimalHelper;
  sigFigures = ( sigFigures === undefined ) ? 2 : sigFigures;
  decimalHelper = Math.pow( 10, sigFigures );
  if ( typeof input === 'number' ) {
    val = input;
  } else {
    val = parseFloat( input );
  }
  if ( typeof input === 'NaN' ) {
    throw new Error( input + ' cannot be converted to a percentage.' );
  }
  return ( Math.round( val * 100 * decimalHelper ) / decimalHelper ) + '%';
}

function toTitleCase( string ) {
  return string.replace( /\w\S*/g, function( text ){ return text.charAt( 0 ).toUpperCase() + text.substr( 1 ).toLowerCase(); } );
}

module.exports = {
  toPercentage: toPercentage,
  toTitleCase: toTitleCase
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var csvLoader = __webpack_require__( 1 );
var setDefaults = __webpack_require__( 2 );
var colors = __webpack_require__( 0 );
var text = __webpack_require__( 3 );

module.exports = {
  csvLoader: csvLoader,
  setDefaults: setDefaults,
  colors: colors,
  text: text
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("csvtojson");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ })
/******/ ]);