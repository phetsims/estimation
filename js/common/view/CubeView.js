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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
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

    var baseColor = cubeModel.color instanceof Color ? cubeModel.color : new Color( cubeModel.color );

    var dottedLineBack = null;
    if ( baseColor.alpha !== 1 ) {
      // Only add the dotted lines if the base color is somewhat transparent
      dottedLineBack = new Path( null, { stroke: '#8b7d6b', lineDash: [ 4, 5 ] } );
      this.addChild( dottedLineBack );
    }

    var top = new Path( null, { fill: baseColor.colorUtilsBrighter( 0.3 ), stroke: ( cubeModel.showOutline ? 'white' : null ) } );
    this.addChild( top );
    var side = new Path( null, { fill: baseColor.colorUtilsDarker( 0.3 ), stroke: ( cubeModel.showOutline ? 'white' : null ) } );
    this.addChild( side );
    var front = new Rectangle( 0, 0, 1, 1, 0, 0, { fill: baseColor, stroke: ( cubeModel.showOutline ? 'white' : null ) } );
    this.addChild( front );

    function updatePosition() {
      var transformedPosition = mvt.modelToViewPosition( cubeModel.positionProperty.value );
      // Position is defined as the bottom left in this sim.
      thisNode.left = transformedPosition.x;
      thisNode.bottom = transformedPosition.y;
    }


    // Hook up the update functions
    cubeModel.sizeProperty.link( function() {
      var faceWidth = mvt.modelToViewDeltaX( cubeModel.sizeProperty.value.width );
      var projectedDepth = mvt.modelToViewDeltaX( cubeModel.sizeProperty.value.depth ) * EstimationConstants.DEPTH_PROJECTION_PROPORTION; // Assumes x & y scales are the same.
      var projectionVector = Vector2.createPolar( projectedDepth, -EstimationConstants.CUBE_PROJECTION_ANGLE );
      var height = -mvt.modelToViewDeltaY( cubeModel.sizeProperty.value.height );

      front.setRect( 0, 0, faceWidth, height );
      side.setShape( new Shape()
        .moveTo( faceWidth, height )
        .lineToRelative( projectionVector.x, projectionVector.y )
        .lineToRelative( 0, -height )
        .lineToRelative( -projectionVector.x, -projectionVector.y )
        .close()
      );

      top.setShape( new Shape()
        .moveTo( 0, 0 )
        .lineToRelative( projectionVector.x, projectionVector.y )
        .lineToRelative( faceWidth, 0 )
        .lineToRelative( -projectionVector.x, -projectionVector.y )
        .close()
      );

      if ( dottedLineBack ) {
        var origin = new Vector2( projectionVector.x, height + projectionVector.y );
        dottedLineBack.setShape( new Shape()
          .moveTo( origin.x, origin.y )
          .lineToRelative( 0, -height )
          .moveTo( origin.x, origin.y )
          .lineToRelative( -projectionVector.x, -projectionVector.y )
          .moveTo( origin.x, origin.y )
          .lineToRelative( faceWidth, 0 )
        )
      }
      updatePosition();
    } );
    cubeModel.positionProperty.link( updatePosition );
    cubeModel.visibleProperty.link( function( visible ) {
      thisNode.visible = visible;
    } );
  }

  return inherit( Node, CubeView );
} );