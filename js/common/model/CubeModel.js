// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model of a cube that can move, change dimensions, and has a color.
 */
define( function( require ) {
  'use strict';

  // modules
  var estimation = require( 'ESTIMATION/estimation' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {Dimension3} initialSize
   * @param {Vector2} initialPosition
   * @param {string} color
   * @param {boolean} showOutline
   * @param {boolean} initiallyVisible
   * @constructor
   */
  function CubeModel( initialSize, initialPosition, color, showOutline, initiallyVisible ) {

    // Fixed attributes
    this.color = color;
    this.showOutline = showOutline;

    // Dynamic attributes
    this.sizeProperty = new Property( initialSize );
    this.positionProperty = new Property( initialPosition );
    this.visibleProperty = new Property( initiallyVisible );
  }

  estimation.register( 'CubeModel', CubeModel );

  return CubeModel;
} );