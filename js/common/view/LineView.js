// Copyright 2014-2015, University of Colorado Boulder

/**
 * View representation of a line used within the Estimation simulation.  The
 * line is defined by a position, width, and color.  Some of these attributes
 * may change.
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );
  var estimation = require( 'ESTIMATION/estimation' );

  /**
   * @param {LineModel} lineModel
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function LineView( lineModel, mvt ) {
    Node.call( this );
    var thisNode = this;
    var path = new Path( null, { stroke: lineModel.color, lineWidth: 3 } );
    this.addChild( path );
    lineModel.lengthProperty.link( function( width ) {
      var transformedOrigin = mvt.modelToViewPosition( lineModel.positionProperty.value );
      var transformedEndpoint = transformedOrigin.plus( new Vector2( mvt.modelToViewDeltaX( lineModel.lengthProperty.value, 0 ) ) );
      path.setShape( Shape.lineSegment( transformedOrigin.x, transformedOrigin.y, transformedEndpoint.x, transformedEndpoint.y ) );
    } );
    lineModel.visibleProperty.link( function( visible ) {
      thisNode.visible = visible;
    } );
  }

  estimation.register( 'LineView', LineView );
  
  return inherit( Node, LineView );
} );