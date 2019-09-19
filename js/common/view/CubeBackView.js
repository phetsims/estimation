// Copyright 2014-2017, University of Colorado Boulder

/**
 * View representation of the back portion of a cube, which is to say the
 * dotted lines that represent the back edges that are obscured by the front
 * surfaces.
 */
define( require => {
  'use strict';

  // modules
  const estimation = require( 'ESTIMATION/estimation' );
  const EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {ModelShape} cubeModel
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function CubeBackView( cubeModel, mvt ) {
    Node.call( this );
    var self = this;

    var dottedLineBack = new Path( null, { stroke: '#8b7d6b', lineDash: [ 4, 5 ] } );
    this.addChild( dottedLineBack );

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
      var origin = new Vector2( projectionVector.x, height + projectionVector.y );
      dottedLineBack.setShape( new Shape()
          .moveTo( origin.x, origin.y )
          .lineToRelative( 0, -height )
          .moveTo( origin.x, origin.y )
          .lineToRelative( -projectionVector.x, -projectionVector.y )
          .moveTo( origin.x, origin.y )
          .lineToRelative( faceWidth, 0 )
      );
      updatePosition();
    } );

    cubeModel.positionProperty.link( updatePosition );

    cubeModel.visibleProperty.link( function( visible ) {
      self.visible = visible;
    } );
  }

  estimation.register( 'CubeBackView', CubeBackView );
  
  return inherit( Node, CubeBackView );
} );