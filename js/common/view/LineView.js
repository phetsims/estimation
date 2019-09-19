// Copyright 2014-2019, University of Colorado Boulder

/**
 * View representation of a line used within the Estimation simulation.  The
 * line is defined by a position, width, and color.  Some of these attributes
 * may change.
 */
define( require => {
  'use strict';

  // modules
  const estimation = require( 'ESTIMATION/estimation' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {LineModel} lineModel
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function LineView( lineModel, mvt ) {
    Node.call( this );
    var self = this;
    var path = new Path( null, { stroke: lineModel.color, lineWidth: 3 } );
    this.addChild( path );
    lineModel.lengthProperty.link( function( width ) {
      var transformedOrigin = mvt.modelToViewPosition( lineModel.positionProperty.value );
      var transformedEndpoint = transformedOrigin.plus( new Vector2( mvt.modelToViewDeltaX( lineModel.lengthProperty.value, 0 ), 0 ) );
      path.setShape( Shape.lineSegment( transformedOrigin.x, transformedOrigin.y, transformedEndpoint.x, transformedEndpoint.y ) );
    } );
    lineModel.visibleProperty.link( function( visible ) {
      self.visible = visible;
    } );
  }

  estimation.register( 'LineView', LineView );

  return inherit( Node, LineView );
} );