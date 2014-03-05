// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main view for the 'Explore' screen.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var cubesIconImage = require( 'image!ESTIMATION/cubes-icon.png' );
  var continuousIconImage = require( 'image!ESTIMATION/continuous-icon.png' );
  var cylindersIconImage = require( 'image!ESTIMATION/cylinders-icon.png' );
  var discreteIconImage = require( 'image!ESTIMATION/discrete-icon.png' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var Image = require( 'SCENERY/nodes/Image' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var linesIconImage = require( 'image!ESTIMATION/lines-icon.png' );
  var newObjectString = require( 'string!ESTIMATION/newObject' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PushButton = require( 'SUN/PushButton' );
  var Rectangle = require( 'SCENERY/nodes/rectangle' );
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
  var RANGE_BUTTON_FONT = new PhetFont( { size: 20, weight: 'normal' } );
  var MIN_RANGE_BUTTON_WIDTH = new Text( EstimationConstants.RANGE_10_TO_100.min + ' - ' + EstimationConstants.RANGE_100_TO_1000.max,
    { font: RANGE_BUTTON_FONT } ).bounds.width;

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

    // Create and add the panel for controlling discrete vs. continuous mode.
    var discreteOrContinuousControlPanel = new Panel( new VBox(
      {
        children: [
          new InOutRadioButton( model.fillTypeProperty, 'continuous', this.createImageOfGivenWidth( continuousIconImage, BUTTON_IMAGE_WIDTH ), inOutButtonOptions ),
          new InOutRadioButton( model.fillTypeProperty, 'discrete', this.createImageOfGivenWidth( discreteIconImage, BUTTON_IMAGE_WIDTH ), inOutButtonOptions )
        ],
        spacing: 10
      } ),
      { fill: 'rgb( 252, 2, 47 )', stroke: null, yMargin: 10 } );

    this.addChild( discreteOrContinuousControlPanel );

    // Create and add the panel for selecting the range.
    var rangeSelectionPanel = new Panel( new HBox(
      {
        children: [
          this.createRangeButton( model.estimationRangeProperty, EstimationConstants.RANGE_1_TO_10 ),
          this.createRangeButton( model.estimationRangeProperty, EstimationConstants.RANGE_10_TO_100 ),
          this.createRangeButton( model.estimationRangeProperty, EstimationConstants.RANGE_100_TO_1000 )
        ],
        spacing: 10
      } ),
      { stroke: null, fill: null } );

    this.addChild( rangeSelectionPanel );

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
    discreteOrContinuousControlPanel.centerX = ( soundToggleButton.centerX + resetAllButton.centerX ) / 2;
    discreteOrContinuousControlPanel.bottom = this.layoutBounds.height - 100;
    rangeSelectionPanel.centerX = this.layoutBounds.width / 2;
    rangeSelectionPanel.bottom = this.layoutBounds.height - EDGE_INSET;
  }

  return inherit( ScreenView, ExploreScreen, {
    reset: function() {
      console.log( 'Reset not yet implemented' );
    },

    createImageOfGivenWidth: function( imageSource, width ) {
      var imageNode = new Image( imageSource );
      imageNode.scale( width / imageNode.width );
      return imageNode;
    },

    createRangeButton: function( property, range ) {
      // Create a node with a fixed size so that all range buttons are sized
      // the same.  Size was empirically determined.
      var background = new Rectangle( 0, 0, MIN_RANGE_BUTTON_WIDTH * 1.3, 40, 10, 10, { fill: 'white' } );
      background.addChild( new Text( range.min + ' - ' + range.max, { font: RANGE_BUTTON_FONT, centerX: background.width / 2, centerY: background.height / 2  } ) );
      return new InOutRadioButton( property, range, background, { cornerRadius: 5 } );
    }
  } );
} );