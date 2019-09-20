// Copyright 2014-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const estimation = require( 'ESTIMATION/estimation' );
  const inherit = require( 'PHET_CORE/inherit' );

  function EstimationGameModel() {
  }

  estimation.register( 'EstimationGameModel', EstimationGameModel );

  return inherit( Object, EstimationGameModel, {
    step: function() {}
  } );
} );