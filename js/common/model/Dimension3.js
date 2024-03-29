// Copyright 2014-2024, University of Colorado Boulder

/**
 * @author John Blanco (PhET Interactive Simulations)
 */

import estimation from '../../estimation.js';

function Dimension3( width, height, depth ) {
  this.width = width;
  this.height = height;
  this.depth = depth;
}

estimation.register( 'Dimension3', Dimension3 );

export default Dimension3;