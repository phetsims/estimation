// Copyright 2002-2014, University of Colorado Boulder

/**
 * View representation of a cube used within the Estimation simulation.
 * The cube is defined by a position, size, and color.  Some of these
 * attributes may change.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var CubeModel = require( 'ESTIMATION/common/model/CubeModel' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {ModelShape} cubeModel
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function CubeView( cubeModel, mvt ) {
    Node.call( this );
    var thisNode = this;
    var dottedLineBack = new Path( null, { stroke: 'black' } );
    this.addChild( dottedLineBack );
    var visiblePortion = new Path( null, { fill: cubeModel.color, stroke: ( cubeModel.showOutline ? 'white' : null ) } );
    this.addChild( visiblePortion );

    function updatePosition() {
      var transformedPosition = mvt.modelToViewPosition( cubeModel.positionProperty.value );
      // Position is defined as the bottom left in this sim.
      thisNode.left = transformedPosition.x;
      thisNode.bottom = transformedPosition.y;
    }

    var baseColor = cubeModel.color instanceof Color ? cubeModel.color : new Color( cubeModel.color );

    // Hook up the update functions
    cubeModel.sizeProperty.link( function() {
      var faceWidth = mvt.modelToViewDeltaX( cubeModel.sizeProperty.value.width );
      var projectedDepth = mvt.modelToViewDeltaX( cubeModel.sizeProperty.value.depth ) * EstimationConstants.DEPTH_PROJECTION_PROPORTION; // Assumes x & y scales are the same.
      var projectionVector = Vector2.createPolar( projectedDepth, -EstimationConstants.CUBE_PROJECTION_ANGLE );
      var depth = -mvt.modelToViewDeltaY( cubeModel.sizeProperty.value.width ) * Math.sin( CubeModel.PERSPECTIVE_TILT );
      var height = -mvt.modelToViewDeltaY( cubeModel.sizeProperty.value.height );
      visiblePortion.setShape( new Shape()
        // starts in lower left corner
        .moveTo( 0, 0 )
        .lineTo( 0, -height )
        .lineToRelative( projectionVector.x, projectionVector.y )
        .lineToRelative( faceWidth, 0 )
        .lineTo( faceWidth, -height )
        .lineTo( faceWidth, 0 )
        .lineTo( 0, 0 )
      );
//      var shape = new Shape();
//      shape.moveTo( -faceWidth / 2, 0 )
//        .lineTo( -faceWidth / 2, height )
//        .cubicCurveTo( -faceWidth * 0.475, height + depth * 0.67, faceWidth * 0.475, height + depth * 0.67, faceWidth / 2, height )
//        .lineTo( faceWidth / 2, 0 )
//        .cubicCurveTo( faceWidth * 0.475, depth * 0.67, -faceWidth * 0.475, depth * 0.67, -faceWidth / 2, 0 )
//        .close();
//      dottedLineBack.setShape( shape );
      updatePosition();
    } );
    cubeModel.positionProperty.link( updatePosition );
    cubeModel.visibleProperty.link( function( visible ) {
      thisNode.visible = visible;
    } );
  }

  return inherit( Node, CubeView );
} );