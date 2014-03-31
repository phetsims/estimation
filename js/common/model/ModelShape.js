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
   * @param initialWidth
   * @param initialHeight
   * @param initialDepth
   * @constructor
   */
  var ModelShape = function( type, color, initialWidth, initialHeight, initialDepth ) {

    // Fixed attributes
    this.type = type; // Valid types are line, rectangle, cube, cylinder, should not be changed.
    this.color = color;

    // Changeable attributes
    this.widthProperty = new Property( initialWidth );
    this.heightProperty = new Property( initialHeight );
    this.depthProperty = new Property( initialDepth );
    this.visibleProperty = new Property( true );
    this.positionProperty = new Property( Vector2.ZERO );
  };

  ModelShape.line = function( initialLength, color ) {
    return new ModelShape( 'line', color, initialLength, null, null );
  };

  ModelShape.rectangle = function( initialWidth, initialHeight, color ) {
    return new ModelShape( 'rectangle', color, initialWidth, initialHeight, null );
  };

  return ModelShape;
} );