// Copyright 2014-2017, University of Colorado Boulder

/**
 * View representation of a cube used within the Estimation simulation.
 * The cube is defined by a position, size, and color.  Some of these
 * attributes may change.
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var estimation = require( 'ESTIMATION/estimation' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
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
    var self = this;

    var baseColor = cubeModel.color instanceof Color ? cubeModel.color : new Color( cubeModel.color );

    var top = new Path( null, { fill: baseColor.colorUtilsBrighter( 0.3 ), stroke: ( cubeModel.showOutline ? 'white' : null ) } );
    this.addChild( top );
    var side = new Path( null, { fill: baseColor.colorUtilsDarker( 0.3 ), stroke: ( cubeModel.showOutline ? 'white' : null ) } );
    this.addChild( side );
    var front = new Rectangle( 0, 0, 1, 1, 0, 0, { fill: baseColor, stroke: ( cubeModel.showOutline ? 'white' : null ) } );
    this.addChild( front );

    function updatePosition() {
      var transformedPosition = mvt.modelToViewPosition( cubeModel.positionProperty.value );
      // Position is defined as the bottom left in this sim.
      self.left = transformedPosition.x;
      self.bottom = transformedPosition.y;
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

      updatePosition();
    } );
    cubeModel.positionProperty.link( updatePosition );
    cubeModel.visibleProperty.link( function( visible ) {
      self.visible = visible;
    } );
  }

  estimation.register( 'CubeView', CubeView );
  
  return inherit( Node, CubeView );
} );