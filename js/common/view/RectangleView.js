// Copyright 2014-2020, University of Colorado Boulder

/**
 * View representation of a rectangle used within the Estimation simulation.
 * The rectangle is defined by a position, size, and color.  Some of these
 * attributes may change.
 */

import Shape from '../../../../kite/js/Shape.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import estimation from '../../estimation.js';

class RectangleView extends Node {

  /**
   * @param {RectangleModel} rectangleModel
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( rectangleModel, modelViewTransform ) {
    super();
    const path = new Path( null, {
      fill: rectangleModel.color,
      stroke: ( rectangleModel.showOutline ? 'white' : null )
    } );
    this.addChild( path );

    const updatePosition = () => {
      const transformedPosition = modelViewTransform.modelToViewPosition( rectangleModel.positionProperty.value );
      // Position is defined as the bottom left in this sim.
      this.left = transformedPosition.x;
      this.bottom = transformedPosition.y;
    };

    // Hook up the update functions
    rectangleModel.sizeProperty.link( () => {
      path.setShape( Shape.rectangle( 0, 0, modelViewTransform.modelToViewDeltaX( rectangleModel.sizeProperty.value.width ),
        -modelViewTransform.modelToViewDeltaY( rectangleModel.sizeProperty.value.height ) ) );
      updatePosition();
    } );
    rectangleModel.positionProperty.link( updatePosition );
    rectangleModel.visibleProperty.link( visible => {
      this.visible = visible;
    } );
  }
}

estimation.register( 'RectangleView', RectangleView );

export default RectangleView;