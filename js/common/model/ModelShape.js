// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model shape, which is a limited set of shapes that
 */
define( function( require ) {
  'use strict';

  // Imports
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param type
   * @param color
   * @param width
   * @param height
   * @param depth
   * @constructor
   */
  var ModelShape = function( type, color, width, height, depth ) {
    this.type = type; // Valid types are line, rectangle, cube, cylinder, should not be changed.
    this.color = color;
    this.width = width;
    this.height = height;
    this.depth = depth;

    // Changable attributes
    this.visibleProperty = new Property( true );
    this.positionProperty = new Property( Vector2.ZERO );
  };

  ModelShape.line = function( lineLength, color ) {
    return new ModelShape( 'line', color, lineLength, null, null );
  };

  return ModelShape;
} );