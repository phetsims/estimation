// Copyright 2014-2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var estimation = require( 'ESTIMATION/estimation' );

  function EstimationGameModel() {
  }

  estimation.register( 'EstimationGameModel', EstimationGameModel );

  return inherit( Object, EstimationGameModel, {
    step: function() {}
  } );
} );