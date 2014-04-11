// Copyright 2002-2014, University of Colorado Boulder

/**
 * View representation of a cylinder used within the Estimation simulation.
 * The cylinder is defined by a position, size, and color.  Some of these
 * attributes may change.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var CylinderModel = require( 'ESTIMATION/common/model/CylinderModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
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
    var side = new Path( null, { fill: cylinderModel.color, stroke: ( cylinderModel.showOutline ? 'white' : null ) } );
    this.addChild( side );
    var top = new Path( null, { fill: cylinderModel.color, stroke: ( cylinderModel.showOutline ? 'white' : null ) } );
    this.addChild( top );

    function updatePosition() {
      var transformedPosition = mvt.modelToViewPosition( cylinderModel.positionProperty.value );
      // Position is defined as the bottom left in this sim.
      thisNode.left = transformedPosition.x;
      thisNode.bottom = transformedPosition.y;
    }

    var baseColor = cylinderModel.color instanceof Color ? cylinderModel.color : new Color( cylinderModel.color );

    // Hook up the update functions
    cylinderModel.sizeProperty.link( function() {
      var ellipseWidth = mvt.modelToViewDeltaX( cylinderModel.sizeProperty.value.width );
      var ellipseHeight = -mvt.modelToViewDeltaY( cylinderModel.sizeProperty.value.width ) * Math.sin( CylinderModel.PERSPECTIVE_TILT );
      var cylinderHeight = -mvt.modelToViewDeltaY( cylinderModel.sizeProperty.value.height );
      top.setShape( new Shape.ellipse( 0, 0, ellipseWidth / 2, ellipseHeight / 2 ) );
      var shape = new Shape();
      shape.moveTo( -ellipseWidth / 2, 0 )
        .lineTo( -ellipseWidth / 2, cylinderHeight )
        .ellipticalArc( 0, 0, ellipseWidth / 2, ellipseHeight / 2, 0, Math.PI, 0, true )
        .lineTo( ellipseWidth / 2, 0 )
        .ellipticalArc( 0, cylinderHeight, ellipseWidth / 2, ellipseHeight / 2, 0, 0, Math.PI, false )
        .close();
      side.setShape( shape );
      side.fill = new LinearGradient( -ellipseWidth / 2, 0, ellipseWidth / 2, 0 ).
        addColorStop( 0, baseColor.colorUtilsDarker( 0.5 ) ).
        addColorStop( 0.5, baseColor.colorUtilsBrighter( 0.5 ) ).
        addColorStop( 1, baseColor.colorUtilsDarker( 0.5 ) );
      updatePosition();
    } );
    cylinderModel.positionProperty.link( updatePosition );
    cylinderModel.visibleProperty.link( function( visible ) {
      thisNode.visible = visible;
    } );
  }

  return inherit( Node, CylinderView );
} );