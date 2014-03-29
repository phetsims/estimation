// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
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
    var transformedOrigin = mvt.modelToViewPosition( lineModelShape.positionProperty.value );
    var transformedEndpoint = transformedOrigin.plus( new Vector2( mvt.modelToViewDeltaX( lineModelShape.width, 0 ) ) );
    this.addChild( new Line( transformedOrigin.x, transformedOrigin.y, transformedEndpoint.x, transformedEndpoint.y, { stroke: lineModelShape.color, lineWidth: 3 } ) );
    lineModelShape.visibleProperty.link( function( visible ) {
      thisNode.visible = visible;
    } );
  }

  return inherit( Node, LineView );
} );