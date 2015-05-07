// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );

  // images
  var screenshot1Image = require( 'image!ESTIMATION/screenshot-01-temp.jpg' );


  function EstimationGameScreenView() {
    ScreenView.call( this, { layoutBounds: EstimationConstants.LAYOUT_BOUNDS } );

    // TODO: Temp for quick demo
    this.addChild( new Image( screenshot1Image, { scale: 0.75, centerX: this.layoutBounds.centerX, centerY: this.layoutBounds.centerY } ) );
  }

  return inherit( ScreenView, EstimationGameScreenView, {
    //TODO prototypes
  } );
} );