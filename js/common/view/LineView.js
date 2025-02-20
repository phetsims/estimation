// Copyright 2014-2025, University of Colorado Boulder

/**
 * View representation of a line used within the Estimation simulation.  The
 * line is defined by a position, width, and color.  Some of these attributes
 * may change.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import estimation from '../../estimation.js';

class LineView extends Node {

  /**
   * @param {LineModel} lineModel
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( lineModel, modelViewTransform ) {
    super();
    const path = new Path( null, { stroke: lineModel.color, lineWidth: 3 } );
    this.addChild( path );
    lineModel.lengthProperty.link( width => {
      const transformedOrigin = modelViewTransform.modelToViewPosition( lineModel.positionProperty.value );
      const transformedEndpoint = transformedOrigin.plus( new Vector2( modelViewTransform.modelToViewDeltaX( lineModel.lengthProperty.value, 0 ), 0 ) );
      path.setShape( Shape.lineSegment( transformedOrigin.x, transformedOrigin.y, transformedEndpoint.x, transformedEndpoint.y ) );
    } );
    lineModel.visibleProperty.link( visible => {
      this.visible = visible;
    } );
  }
}

estimation.register( 'LineView', LineView );

export default LineView;