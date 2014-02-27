// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  var Property = require( 'AXON/Property' );

  function EstimationModel() {
    this.soundEnabled = new Property( true );
  }

  return EstimationModel;
} );