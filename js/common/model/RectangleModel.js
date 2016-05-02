// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model of a rectangle that can move, change dimensions, and has a color.
 */
define( function( require ) {
  'use strict';

  // modules
  var Property = require( 'AXON/Property' );
  var estimation = require( 'ESTIMATION/estimation' );

  /**
   * @param {Dimension2} initialSize
   * @param {Vector2} initialPosition
   * @param {String} color
   * @param {boolean} showOutline
   * @param {boolean} initiallyVisible
   * @constructor
   */
  function RectangleModel( initialSize, initialPosition, color, showOutline, initiallyVisible ) {

    // Fixed attributes
    this.color = color;
    this.showOutline = showOutline;

    // Dynamic attributes
    this.sizeProperty = new Property( initialSize );
    this.positionProperty = new Property( initialPosition );
    this.visibleProperty = new Property( initiallyVisible );
  }

  estimation.register( 'RectangleModel', RectangleModel );
  
  return RectangleModel;
} );