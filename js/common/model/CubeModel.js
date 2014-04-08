// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model of a cube that can move, change dimensions, and has a color.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Dimension3} initialSize
   * @param {Vector2} initialPosition
   * @param {String} color
   * @param {boolean} showOutline
   * @constructor
   */
  function CubeModel( initialSize, initialPosition, color, showOutline ) {

    // Fixed attributes
    this.color = color;
    this.showOutline = showOutline;

    // Dynamic attributes
    this.sizeProperty = new Property( initialSize );
    this.positionProperty = new Property( initialPosition );
  }

  return CubeModel;
} );