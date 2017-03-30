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
