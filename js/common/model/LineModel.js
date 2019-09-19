// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model of a horizontal line that can move, change its length, and has a color.
 */
define( require => {
  'use strict';

  // modules
  const estimation = require( 'ESTIMATION/estimation' );
  const Property = require( 'AXON/Property' );

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