// Copyright 2002-2014, University of Colorado Boulder

/**
 * View representation of a line used within the Estimation simulation.  The
 * line is defined by a position, width, and color.  Some of these attributes
 * may change.
 */
define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {ModelShape} lineModelShape
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function LineView( lineModelShape, mvt ) {
    if ( lineModelShape.type !== 'line' ) { throw new Error( 'Attempt to create a line view with incorrect model type, type = ' + lineModelShape.type )}
    Node.call( this );
    var thisNode = this;
    var path = new Path( null, { stroke: lineModelShape.color, lineWidth: 3 } );
    this.addChild( path );
    lineModelShape.widthProperty.link( function( width ) {
      var transformedOrigin = mvt.modelToViewPosition( lineModelShape.positionProperty.value );
      var transformedEndpoint = transformedOrigin.plus( new Vector2( mvt.modelToViewDeltaX( lineModelShape.widthProperty.value, 0 ) ) );
      path.setShape( new Shape.lineSegment( transformedOrigin.x, transformedOrigin.y, transformedEndpoint.x, transformedEndpoint.y ) );
    } );
    lineModelShape.visibleProperty.link( function( visible ) {
      thisNode.visible = visible;
    } );
  }

  return inherit( Node, LineView );
} );