// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model of a horizontal line that can move, change its length, and has a color.
 */
define( function( require ) {
  'use strict';

  // modules
  var Property = require( 'AXON/Property' );

  /**
   * @param {Number} initialLength
   * @param {Vector2} initialPosition
   * @param {String} color
   * @param {boolean} initiallyVisible
   * @constructor
   */
  function LineModel( initialLength, initialPosition, color, initiallyVisible ) {

    // Fixed attributes
    this.color = color;

    // Dynamic attributes
    this.lengthProperty = new Property( initialLength );
    this.positionProperty = new Property( initialPosition );
    this.visibleProperty = new Property( initiallyVisible );
  }

  return LineModel;
} );