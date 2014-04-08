// Copyright 2002-2014, University of Colorado Boulder

/**
 * View representation of a rectangle used within the Estimation simulation.
 * The line is defined by a position, width, and color.  Some of these
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
   * @param {ModelShape} rectangleModel
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function RectangleView( rectangleModel, mvt ) {
    Node.call( this );
    var thisNode = this;
    var path = new Path( null, { fill: rectangleModel.color, stroke: ( rectangleModel.showOutline ? 'white' : null ) } );
    this.addChild( path );

    // Define function to update position
    function updatePosition() {
      var transformedPosition = mvt.modelToViewPosition( rectangleModel.positionProperty.value );
      // Position is defined as the bottom left in this sim.
      thisNode.left = transformedPosition.x;
      thisNode.bottom = transformedPosition.y;
    }

    // Define function to update shape
    function updateShape() {
      path.setShape( new Shape.rectangle( 0, 0, mvt.modelToViewDeltaX( rectangleModel.sizeProperty.value.width ),
        -mvt.modelToViewDeltaY( rectangleModel.sizeProperty.height.value ) ) );
    }

    // Hook up the update functions TODO: Maybe the model should be restructured so there is only one attributed (a dimension in this case) that defines the size
    rectangleModel.widthProperty.link( function() {
      updateShape();
    } );
    rectangleModel.heightProperty.link( function() {
      updateShape();
      updatePosition();
    } );
    rectangleModel.positionProperty.link( function() {
      updatePosition();
    } );
    rectangleModel.visibleProperty.link( function( visible ) {
      thisNode.visible = visible;
    } );
  }

  return inherit( Node, RectangleView );
} );