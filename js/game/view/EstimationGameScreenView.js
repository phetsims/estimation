// Copyright 2014-2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var estimation = require( 'ESTIMATION/estimation' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );

  // images
  var screenshot1Image = require( 'image!ESTIMATION/screenshot-01-temp.jpg' );


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