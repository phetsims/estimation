// Copyright 2014-2023, University of Colorado Boulder

/**
 * @author John Blanco (PhET Interactive Simulations)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import Range from '../../../dot/js/Range.js';
import estimation from '../estimation.js';

const EstimationConstants = {

  // A PhET wide decision was made to not update custom layout bounds even if they do not match the
  // default layout bounds in ScreenView. Do not change these bounds as changes could break or disturb
  // any phet-io instrumention. https://github.com/phetsims/phet-io/issues/1939
  LAYOUT_BOUNDS: new Bounds2( 0, 0, 768, 504 ),

  RANGE_1_TO_10: new Range( 1, 10 ),
  RANGE_10_TO_100: new Range( 10, 100 ),
  RANGE_100_TO_1000: new Range( 100, 1000 ),
  REFERENCE_OBJECT_COLOR: 'blue',
  COMPARISON_OBJECT_COLOR: '#ff6633',

  // Proportion of depth (z dimension) projected into the 2D representation.
  DEPTH_PROJECTION_PROPORTION: 0.3,

  // Angle of depth projection for cubes, in radians
  CUBE_PROJECTION_ANGLE: Math.PI / 4
};

estimation.register( 'EstimationConstants', EstimationConstants );

export default EstimationConstants;