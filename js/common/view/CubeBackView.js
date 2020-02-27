// Copyright 2014-2020, University of Colorado Boulder

/**
 * View representation of the back portion of a cube, which is to say the
 * dotted lines that represent the back edges that are obscured by the front
 * surfaces.
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import estimation from '../../estimation.js';
import EstimationConstants from '../EstimationConstants.js';

/**
 * @param {ModelShape} cubeModel
 * @param {ModelViewTransform2} modelViewTransform
 * @constructor
 */
function CubeBackView( cubeModel, modelViewTransform ) {
  Node.call( this );
  const self = this;

  const dottedLineBack = new Path( null, { stroke: '#8b7d6b', lineDash: [ 4, 5 ] } );
  this.addChild( dottedLineBack );

  function updatePosition() {
    const transformedPosition = modelViewTransform.modelToViewPosition( cubeModel.positionProperty.value );
    // Position is defined as the bottom left in this sim.
    self.left = transformedPosition.x;
    self.bottom = transformedPosition.y;
  }

  // Hook up the update functions
  cubeModel.sizeProperty.link( function() {
    const faceWidth = modelViewTransform.modelToViewDeltaX( cubeModel.sizeProperty.value.width );
    const projectedDepth = modelViewTransform.modelToViewDeltaX( cubeModel.sizeProperty.value.depth ) * EstimationConstants.DEPTH_PROJECTION_PROPORTION; // Assumes x & y scales are the same.
    const projectionVector = Vector2.createPolar( projectedDepth, -EstimationConstants.CUBE_PROJECTION_ANGLE );
    const height = -modelViewTransform.modelToViewDeltaY( cubeModel.sizeProperty.value.height );
    const origin = new Vector2( projectionVector.x, height + projectionVector.y );
    dottedLineBack.setShape( new Shape()
      .moveTo( origin.x, origin.y )
      .lineToRelative( 0, -height )
      .moveTo( origin.x, origin.y )
      .lineToRelative( -projectionVector.x, -projectionVector.y )
      .moveTo( origin.x, origin.y )
      .lineToRelative( faceWidth, 0 )
    );
    updatePosition();
  } );

  cubeModel.positionProperty.link( updatePosition );

  cubeModel.visibleProperty.link( function( visible ) {
    self.visible = visible;
  } );
}

estimation.register( 'CubeBackView', CubeBackView );

inherit( Node, CubeBackView );
export default CubeBackView;