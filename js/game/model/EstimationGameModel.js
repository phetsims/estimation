// Copyright 2014-2017, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var estimation = require( 'ESTIMATION/estimation' );
  var inherit = require( 'PHET_CORE/inherit' );

  function EstimationGameModel() {
  }

  estimation.register( 'EstimationGameModel', EstimationGameModel );

  return inherit( Object, EstimationGameModel, {
    step: function() {}
  } );
} );