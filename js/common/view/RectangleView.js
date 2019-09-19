// Copyright 2014-2017, University of Colorado Boulder

/**
 * View representation of a rectangle used within the Estimation simulation.
 * The rectangle is defined by a position, size, and color.  Some of these
 * attributes may change.
 */
define( require => {
  'use strict';

  // modules
  const estimation = require( 'ESTIMATION/estimation' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  /**
   * @param {ModelShape} rectangleModel
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function RectangleView( rectangleModel, mvt ) {
    Node.call( this );
    var self = this;
    var path = new Path( null, { fill: rectangleModel.color, stroke: ( rectangleModel.showOutline ? 'white' : null ) } );
    this.addChild( path );

    function updatePosition() {
      var transformedPosition = mvt.modelToViewPosition( rectangleModel.positionProperty.value );
      // Position is defined as the bottom left in this sim.
      self.left = transformedPosition.x;
      self.bottom = transformedPosition.y;
    }

    // Hook up the update functions
    rectangleModel.sizeProperty.link( function() {
      path.setShape( Shape.rectangle( 0, 0, mvt.modelToViewDeltaX( rectangleModel.sizeProperty.value.width ),
        -mvt.modelToViewDeltaY( rectangleModel.sizeProperty.value.height ) ) );
      updatePosition();
    } );
    rectangleModel.positionProperty.link( updatePosition );
    rectangleModel.visibleProperty.link( function( visible ) {
      self.visible = visible;
    } );
  }

  estimation.register( 'RectangleView', RectangleView );
  
  return inherit( Node, RectangleView );
} );