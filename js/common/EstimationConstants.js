// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );

  return {

    LAYOUT_BOUNDS: new Bounds2( 0, 0, 768, 504 ),

    RANGE_1_TO_10: { min: 1, max: 10 },
    RANGE_10_TO_100: { min: 10, max: 100 },
    RANGE_100_TO_1000: { min: 100, max: 1000 },
    REFERENCE_OBJECT_COLOR: 'blue',
    COMPARISON_OBJECT_COLOR: '#ff6633',

    // Proportion of depth (z dimension) projected into the 2D representation.
    DEPTH_PROJECTION_PROPORTION: 0.3,

    // Angle of depth projection for cubes, in radians
    CUBE_PROJECTION_ANGLE: Math.PI / 4
  };
} );