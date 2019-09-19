// Copyright 2014-2017, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const estimation = require( 'ESTIMATION/estimation' );
  const EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ScreenView = require( 'JOIST/ScreenView' );

  // images
  const screenshot1Image = require( 'image!ESTIMATION/screenshot-01-temp.jpg' );


  function EstimationGameScreenView() {
    ScreenView.call( this, { layoutBounds: EstimationConstants.LAYOUT_BOUNDS } );

    // TODO: Temp for quick demo
    this.addChild( new Image( screenshot1Image, { scale: 0.75, centerX: this.layoutBounds.centerX, centerY: this.layoutBounds.centerY } ) );
  }

  estimation.register( 'EstimationGameScreenView', EstimationGameScreenView );
  
  return inherit( ScreenView, EstimationGameScreenView, {
    //TODO prototypes
  } );
} );