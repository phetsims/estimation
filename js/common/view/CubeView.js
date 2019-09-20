// Copyright 2014-2019, University of Colorado Boulder

/**
 * View representation of a cube used within the Estimation simulation.
 * The cube is defined by a position, size, and color.  Some of these
 * attributes may change.
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const estimation = require( 'ESTIMATION/estimation' );
  const EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {ModelShape} cubeModel
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function CubeView( cubeModel, mvt ) {
    Node.call( this );
    const self = this;

    const baseColor = cubeModel.color instanceof Color ? cubeModel.color : new Color( cubeModel.color );

    const top = new Path( null, { fill: baseColor.colorUtilsBrighter( 0.3 ), stroke: ( cubeModel.showOutline ? 'white' : null ) } );
    this.addChild( top );
    const side = new Path( null, { fill: baseColor.colorUtilsDarker( 0.3 ), stroke: ( cubeModel.showOutline ? 'white' : null ) } );
    this.addChild( side );
    const front = new Rectangle( 0, 0, 1, 1, 0, 0, { fill: baseColor, stroke: ( cubeModel.showOutline ? 'white' : null ) } );
    this.addChild( front );

    function updatePosition() {
      const transformedPosition = mvt.modelToViewPosition( cubeModel.positionProperty.value );
      // Position is defined as the bottom left in this sim.
      self.left = transformedPosition.x;
      self.bottom = transformedPosition.y;
    }


    // Hook up the update functions
    cubeModel.sizeProperty.link( function() {
      const faceWidth = mvt.modelToViewDeltaX( cubeModel.sizeProperty.value.width );
      const projectedDepth = mvt.modelToViewDeltaX( cubeModel.sizeProperty.value.depth ) * EstimationConstants.DEPTH_PROJECTION_PROPORTION; // Assumes x & y scales are the same.
      const projectionVector = Vector2.createPolar( projectedDepth, -EstimationConstants.CUBE_PROJECTION_ANGLE );
      const height = -mvt.modelToViewDeltaY( cubeModel.sizeProperty.value.height );

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