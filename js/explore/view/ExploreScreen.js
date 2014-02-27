// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main view for the 'Explore' screen.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PushButton = require( 'SUN/PushButton' );
  var RectanglePushButton = require( 'SUN/RectanglePushButton' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var Text = require( 'SCENERY/nodes/Text' );

  var newObjectString = require( 'string!ESTIMATION/newObject' );


  // Constants
  var EDGE_INSET = 10;

  /**
   * @param model
   * @constructor
   */
  function ExploreScreen( model ) {
    ScreenView.call( this );
    var thisScreen = this;

    // Add the various selectors and buttons for choosing which objects to explore
    var newObjectButton = new RectanglePushButton( new Text( newObjectString, { font: new PhetFont( 20 ) } ),
      {
        rectangleFillUp: new Color( 255, 252, 127 ),
        rectangleCornerRadius: 5,
        listener: function() { console.log( 'New object not implemented' ) }
      }
    );
    this.addChild( newObjectButton );

    // Add the general control buttons
    var resetAllButton = new ResetAllButton( function() { thisScreen.reset(); }, { scale: 0.75 } );
    this.addChild( resetAllButton );
    var soundToggleButton = new SoundToggleButton( model.soundEnabled );
    this.addChild( soundToggleButton );

    // Layout
    newObjectButton.top = EDGE_INSET;
    newObjectButton.left = 100;
    resetAllButton.right = this.layoutBounds.width - EDGE_INSET;
    resetAllButton.bottom = this.layoutBounds.height - EDGE_INSET;
    soundToggleButton.bottom = resetAllButton.bottom;
    soundToggleButton.right = resetAllButton.left - 10;
  }

  return inherit( ScreenView, ExploreScreen, {
    reset: function() {
      console.log( 'Reset not yet implemented' );
    }
  } );
} );