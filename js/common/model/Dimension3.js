// Copyright 2014-2017, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const estimation = require( 'ESTIMATION/estimation' );

  function Dimension3( width, height, depth ) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  estimation.register( 'Dimension3', Dimension3 );

  return Dimension3;
} );