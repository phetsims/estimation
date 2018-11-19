// Copyright 2014-2018, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var estimation = require( 'ESTIMATION/estimation' );
  var Range = require( 'DOT/Range' );

  var EstimationConstants = {

    LAYOUT_BOUNDS: new Bounds2( 0, 0, 768, 504 ),

    RANGE_1_TO_10: new Range( 1, 10 ),
    RANGE_10_TO_100: new Range( 10, 100 ),
    RANGE_100_TO_1000: new Range( 100, 1000 ),
    REFERENCE_OBJECT_COLOR: 'blue',
    COMPARISON_OBJECT_COLOR: '#ff6633',

    // Proportion of depth (z dimension) projected into the 2D representation.
    DEPTH_PROJECTION_PROPORTION: 0.3,

    // Angle of depth projection for cubes, in radians
    CUBE_PROJECTION_ANGLE: Math.PI / 4
  };

  estimation.register( 'EstimationConstants', EstimationConstants );

  return EstimationConstants;
} );