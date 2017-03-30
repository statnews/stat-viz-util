var csvToJson = require( 'csvtojson' );
require( 'whatwg-fetch' );

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
