// Copyright 2014-2020, University of Colorado Boulder

/**
 * View representation of a rectangle used within the Estimation simulation.
 * The rectangle is defined by a position, size, and color.  Some of these
 * attributes may change.
 */

import Shape from '../../../../kite/js/Shape.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import estimation from '../../estimation.js';

/**
 * @param {ModelShape} rectangleModel
 * @param {ModelViewTransform2} modelViewTransform
 * @constructor
 */
function RectangleView( rectangleModel, modelViewTransform ) {
  Node.call( this );
  const self = this;
  const path = new Path( null, {
    fill: rectangleModel.color,
    stroke: ( rectangleModel.showOutline ? 'white' : null )
  } );
  this.addChild( path );

  function updatePosition() {
    const transformedPosition = modelViewTransform.modelToViewPosition( rectangleModel.positionProperty.value );
    // Position is defined as the bottom left in this sim.
    self.left = transformedPosition.x;
    self.bottom = transformedPosition.y;
  }

  // Hook up the update functions
  rectangleModel.sizeProperty.link( function() {
    path.setShape( Shape.rectangle( 0, 0, modelViewTransform.modelToViewDeltaX( rectangleModel.sizeProperty.value.width ),
      -modelViewTransform.modelToViewDeltaY( rectangleModel.sizeProperty.value.height ) ) );
    updatePosition();
  } );
  rectangleModel.positionProperty.link( updatePosition );
  rectangleModel.visibleProperty.link( function( visible ) {
    self.visible = visible;
  } );
}

estimation.register( 'RectangleView', RectangleView );

inherit( Node, RectangleView );
export default RectangleView;