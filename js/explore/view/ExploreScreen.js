// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main view for the 'Explore' screen.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var CubeBackView = require( 'ESTIMATION/common/view/CubeBackView' );
  var CubeView = require( 'ESTIMATION/common/view/CubeView' );
  var CylinderView = require( 'ESTIMATION/common/view/CylinderView' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var cubesIconImage = require( 'image!ESTIMATION/cubes-icon.png' );
  var continuousIconImage = require( 'image!ESTIMATION/continuous-icon.png' );
  var cylindersIconImage = require( 'image!ESTIMATION/cylinders-icon.png' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var discreteIconImage = require( 'image!ESTIMATION/discrete-icon.png' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var linesIconImage = require( 'image!ESTIMATION/lines-icon.png' );
  var LineView = require( 'ESTIMATION/common/view/LineView' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var MyHSlider = require( 'ESTIMATION/common/MyHSlider' );
  var newObjectString = require( 'string!ESTIMATION/newObject' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/rectangle' );
  var RectanglePushButtonDeprecated = require( 'SUN/RectanglePushButtonDeprecated' );
  var RectangleView = require( 'ESTIMATION/common/view/RectangleView' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var squaresIconImage = require( 'image!ESTIMATION/squares-icon.png' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );

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
    this.model = model;

    // Create the model-view transform.  The primary units used in the model
    // are meters, so significant zoom is used.  The multipliers for the 2nd
    // parameter can be used to adjust where the model point (0, 0) is located
    // in the view.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( thisScreen.layoutBounds.width * 0.5, thisScreen.layoutBounds.height * 0.5 ),
      105 );

    // Add the various selectors and buttons for choosing which objects to explore.
    var newObjectButton = new RectanglePushButtonDeprecated( new Text( newObjectString, { font: new PhetFont( 20 ) } ),
      {
        rectangleFillUp: new Color( 255, 252, 127 ),
        rectangleCornerRadius: 5,
        listener: function() {
          model.newReferenceObject();
        }
      }
    );
    this.addChild( newObjectButton );

    // Create and add the panel for controlling the estimation type (i.e. cubes, lines, etc).
    var inOutButtonOptions = { xMargin: 3, yMargin: 3 };
    var modeControlPanel = new Panel( new VBox(
        {
          children: [
            new InOutRadioButton( model.estimationModeProperty, 'lines', this.createImageOfGivenWidth( linesIconImage, BUTTON_IMAGE_WIDTH ), inOutButtonOptions ),
            new InOutRadioButton( model.estimationModeProperty, 'rectangles', this.createImageOfGivenWidth( squaresIconImage, BUTTON_IMAGE_WIDTH ), inOutButtonOptions ),
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
            new InOutRadioButton( model.comparisonTypeProperty, 'continuous', this.createImageOfGivenWidth( continuousIconImage, BUTTON_IMAGE_WIDTH ), inOutButtonOptions ),
            new InOutRadioButton( model.comparisonTypeProperty, 'discrete', this.createImageOfGivenWidth( discreteIconImage, BUTTON_IMAGE_WIDTH ), inOutButtonOptions )
          ],
          spacing: 10
        } ),
      { fill: 'rgb( 252, 2, 47 )', stroke: null, yMargin: 10 } );

    this.addChild( discreteOrContinuousControlPanel );

    // The continuous or discrete panel doesn't make sense for one-dimensional
    // estimates, so hide it in those cases.
    model.estimationModeProperty.link( function( estimationMode ) {
      discreteOrContinuousControlPanel.visible = estimationMode !== 'lines';
    } );

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

    // Add the slider that will control the fine-grained estimate value.
    var slider = new MyHSlider( model.offsetIntoRangeProperty, { min: 0, max: 1 },
      {
        trackFill: 'black',
        trackSize: new Dimension2( 400, 4 )
      } );
    for ( var i = 0; i <= 1; i += 0.1 ) {
      slider.addMajorTick( i );
    }
    this.addChild( slider );

    // Add the readout that will display the current estimate quantity.
    var readout = new Rectangle( 0, 0, 60, 40, 5, 5, { fill: 'blue' } );
    this.addChild( readout );
    var readoutText = new Text( 'x', { font: new PhetFont( 20 ), fill: 'white' } );
    model.estimateProperty.link( function( value ) {
      readoutText.text = value;
      readoutText.centerX = readout.width / 2;
      readoutText.centerY = readout.height / 2;
    } );
    readout.addChild( readoutText );

    // Add the general control buttons.
    var resetAllButton = new ResetAllButton( { listener: function() { thisScreen.reset(); } } );
    this.addChild( resetAllButton );

    // Layout of controls
    modeControlPanel.top = EDGE_INSET;
    modeControlPanel.left = EDGE_INSET;
    newObjectButton.top = EDGE_INSET;
    newObjectButton.left = 100;
    discreteOrContinuousControlPanel.right = ( this.layoutBounds.width - EDGE_INSET );
    discreteOrContinuousControlPanel.bottom = this.layoutBounds.height - 100;
    resetAllButton.centerX = discreteOrContinuousControlPanel.centerX;
    resetAllButton.bottom = this.layoutBounds.height - EDGE_INSET;
    rangeSelectionPanel.centerX = mvt.modelToViewX( 0 );
    rangeSelectionPanel.bottom = this.layoutBounds.height - EDGE_INSET;
    slider.centerX = rangeSelectionPanel.centerX;
    slider.bottom = rangeSelectionPanel.top - 20;
    readout.centerX = mvt.modelToViewX( 0 );
    readout.bottom = slider.top - 20;

    //------------------------------------------------------------------------
    // Add the shapes for each of the exploration modes.
    //------------------------------------------------------------------------

    // Lines mode
    thisScreen.addChild( new LineView( model.modes.lines.referenceObject, mvt ) );
    model.modes.lines.discreteObjectList.forEach( function( line ) {
      thisScreen.addChild( new LineView( line, mvt ) );
    } );
    thisScreen.addChild( new LineView( model.modes.lines.continuousSizableObject, mvt ) );
    thisScreen.addChild( new LineView( model.modes.lines.compareObject, mvt ) );

    // Rectangles mode
    thisScreen.addChild( new RectangleView( model.modes.rectangles.referenceObject, mvt ) );
    thisScreen.addChild( new RectangleView( model.modes.rectangles.compareObject, mvt ) );
    model.modes.rectangles.discreteObjectList.forEach( function( line ) {
      thisScreen.addChild( new RectangleView( line, mvt ) );
    } );
    thisScreen.addChild( new RectangleView( model.modes.rectangles.continuousSizableObject, mvt ) );

    // Cubes mode
    thisScreen.addChild( new CubeView( model.modes.cubes.referenceObject, mvt ) );
    thisScreen.addChild( new CubeBackView( model.modes.cubes.compareObject, mvt ) );
    model.modes.cubes.discreteObjectList.forEach( function( cube ) {
      thisScreen.addChild( new CubeView( cube, mvt ) );
    } );
    thisScreen.addChild( new CubeView( model.modes.cubes.continuousSizableObject, mvt ) );
    thisScreen.addChild( new CubeView( model.modes.cubes.compareObject, mvt ) );

    // Cylinders mode
    thisScreen.addChild( new CylinderView( model.modes.cylinders.referenceObject, mvt ) );
    model.modes.cylinders.discreteObjectList.forEach( function( line ) {
      thisScreen.addChild( new CylinderView( line, mvt ) );
    } );
    thisScreen.addChild( new CylinderView( model.modes.cylinders.continuousSizableObject, mvt ) );
    thisScreen.addChild( new CylinderView( model.modes.cylinders.compareObject, mvt ) );
  }

  return inherit( ScreenView, ExploreScreen, {
    reset: function() {
      this.model.reset();
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