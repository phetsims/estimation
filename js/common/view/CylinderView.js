// Copyright 2002-2014, University of Colorado Boulder

/**
 * View representation of a cylinder used within the Estimation simulation.
 * The cylinder is defined by a position, size, and color.  Some of these
 * attributes may change.
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
   * @param {ModelShape} cylinderModel
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function CylinderView( cylinderModel, mvt ) {
    Node.call( this );
    var thisNode = this;
    var path = new Path( null, { fill: cylinderModel.color, stroke: ( cylinderModel.showOutline ? 'white' : null ) } );
    this.addChild( path );

    function updatePosition() {
      var transformedPosition = mvt.modelToViewPosition( cylinderModel.positionProperty.value );
      // Position is defined as the bottom left in this sim.
      thisNode.left = transformedPosition.x;
      thisNode.bottom = transformedPosition.y;
    }

    // Hook up the update functions
    cylinderModel.sizeProperty.link( function() {
      path.setShape( new Shape.rectangle( 0, 0, mvt.modelToViewDeltaX( cylinderModel.sizeProperty.value.width ),
        -mvt.modelToViewDeltaY( cylinderModel.sizeProperty.value.height ) ) );
      updatePosition();
    } );
    cylinderModel.positionProperty.link( updatePosition );
    cylinderModel.visibleProperty.link( function( visible ) {
      thisNode.visible = visible;
    } );
  }

  return inherit( Node, CylinderView );
} );