// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main view for the 'Explore' screen.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var cubesIconImage = require( 'image!ESTIMATION/cubes-icon.png' );
  var cylindersIconImage = require( 'image!ESTIMATION/cylinders-icon.png' );
  var Image = require( 'SCENERY/nodes/Image' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var linesIconImage = require( 'image!ESTIMATION/lines-icon.png' );
  var newObjectString = require( 'string!ESTIMATION/newObject' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PushButton = require( 'SUN/PushButton' );
  var RectanglePushButton = require( 'SUN/RectanglePushButton' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var squaresIconImage = require( 'image!ESTIMATION/squares-icon.png' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // Constants
  var EDGE_INSET = 10;
  var BUTTON_IMAGE_WIDTH = 50; // In screen coords, which are roughly pixels

  /**
   * @param model
   * @constructor
   */
  function ExploreScreen( model ) {
    ScreenView.call( this );
    var thisScreen = this;

    // Add the various selectors and buttons for choosing which objects to explore.
    var newObjectButton = new RectanglePushButton( new Text( newObjectString, { font: new PhetFont( 20 ) } ),
      {
        rectangleFillUp: new Color( 255, 252, 127 ),
        rectangleCornerRadius: 5,
        listener: function() { console.log( 'New object not implemented' ) }
      }
    );
    this.addChild( newObjectButton );

    // Create and add the panel for controlling the estimation type (i.e. cubes, lines, etc).
    var inOutButtonOptions = { xMargin: 3, yMargin: 3 };

    var modeControlPanel = new Panel( new VBox(
      {
        children: [
          new InOutRadioButton( model.estimationModeProperty, 'lines', this.createImageOfGivenWidth( linesIconImage, BUTTON_IMAGE_WIDTH ), inOutButtonOptions ),
          new InOutRadioButton( model.estimationModeProperty, 'squares', this.createImageOfGivenWidth( squaresIconImage, BUTTON_IMAGE_WIDTH ), inOutButtonOptions ),
          new InOutRadioButton( model.estimationModeProperty, 'cubes', this.createImageOfGivenWidth( cubesIconImage, BUTTON_IMAGE_WIDTH ), inOutButtonOptions ),
          new InOutRadioButton( model.estimationModeProperty, 'cylinders', this.createImageOfGivenWidth( cylindersIconImage, BUTTON_IMAGE_WIDTH ), inOutButtonOptions )
        ],
        spacing: 10
      } ),
      { fill: 'rgb( 0, 171, 51 )', stroke: null, yMargin: 10 } );

    this.addChild( modeControlPanel );

    // Add the general control buttons.
    var resetAllButton = new ResetAllButton( function() { thisScreen.reset(); }, { scale: 0.75 } );
    this.addChild( resetAllButton );
    var soundToggleButton = new SoundToggleButton( model.soundEnabledProperty );
    this.addChild( soundToggleButton );

    // Layout
    modeControlPanel.top = EDGE_INSET;
    modeControlPanel.left = EDGE_INSET;
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
    },

    createImageOfGivenWidth: function( imageSource, width ) {
      var imageNode = new Image( imageSource );
      imageNode.scale( width / imageNode.width );
      return imageNode;
    }
  } );
} );