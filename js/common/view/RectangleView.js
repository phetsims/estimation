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
   * @param {ModelShape} rectangleModelShape
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function RectangleView( rectangleModelShape, mvt ) {
    if ( rectangleModelShape.type !== 'rectangle' ) { throw new Error( 'Attempt to create a rectangle view with incorrect model type, type = ' + rectangleModelShape.type )}
    Node.call( this );
    var thisNode = this;
    var path = new Path( null, { fill: rectangleModelShape.color, stroke: ( rectangleModelShape.showOutline ? 'white' : null ) } );
    this.addChild( path );

    // Define function to update position
    function updatePosition() {
      var transformedPosition = mvt.modelToViewPosition( rectangleModelShape.positionProperty.value );
      // Position is defined as the bottom left in this sim.
      thisNode.left = transformedPosition.x;
      thisNode.bottom = transformedPosition.y;
    }

    // Define function to update shape
    function updateShape() {
      path.setShape( new Shape.rectangle( 0, 0, mvt.modelToViewDeltaX( rectangleModelShape.widthProperty.value ), -mvt.modelToViewDeltaY( rectangleModelShape.heightProperty.value ) ) );
    }

    // Hook up the update functions TODO: Maybe the model should be restructured so there is only one attributed (a dimension in this case) that defines the size
    rectangleModelShape.widthProperty.link( function() {
      updateShape();
    } );
    rectangleModelShape.heightProperty.link( function() {
      updateShape();
      updatePosition();
    } );
    rectangleModelShape.positionProperty.link( function() {
      updatePosition();
    } );
    rectangleModelShape.visibleProperty.link( function( visible ) {
      thisNode.visible = visible;
    } );
  }

  return inherit( Node, RectangleView );
} );