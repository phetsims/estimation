// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model of a cube that can move, change dimensions, and has a color.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import estimation from '../../estimation.js';

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

export default CubeModel;