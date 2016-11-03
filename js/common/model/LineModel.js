// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model of a horizontal line that can move, change its length, and has a color.
 */
define( function( require ) {
  'use strict';

  // modules
  var Property = require( 'AXON/Property' );
  var estimation = require( 'ESTIMATION/estimation' );

  /**
   * @param {number} initialLength
   * @param {Vector2} initialPosition
   * @param {string} color
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

  estimation.register( 'LineModel', LineModel );

  return LineModel;
} );