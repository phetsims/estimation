// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main view for the 'Explore' screen.
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Panel from '../../../../sun/js/Panel.js';
import continuousIconImage from '../../../images/continuous-icon_png.js';
import cubesIconImage from '../../../images/cubes-icon_png.js';
import cylindersIconImage from '../../../images/cylinders-icon_png.js';
import discreteIconImage from '../../../images/discrete-icon_png.js';
import linesIconImage from '../../../images/lines-icon_png.js';
import squaresIconImage from '../../../images/squares-icon_png.js';
import EstimationConstants from '../../common/EstimationConstants.js';
import CubeBackView from '../../common/view/CubeBackView.js';
import CubeView from '../../common/view/CubeView.js';
import CylinderView from '../../common/view/CylinderView.js';
import LineView from '../../common/view/LineView.js';
import RectangleView from '../../common/view/RectangleView.js';
import estimation from '../../estimation.js';
import estimationStrings from '../../estimationStrings.js';

const newObjectString = estimationStrings.newObject;

// constants
const EDGE_INSET = 10;
const MODE_ICON_SCALE = 0.68;
const DISCRETE_OR_CONTINUOUS_ICON_SCALE = 0.68;

class ExploreScreenView extends ScreenView {

  /**
   * @param model
   */
  constructor( model ) {
    super( { layoutBounds: EstimationConstants.LAYOUT_BOUNDS } );
    this.model = model;

    // Create the model-view transform.  The primary units used in the model
    // are meters, so significant zoom is used.  The multipliers for the 2nd
    // parameter can be used to adjust where the model point (0, 0) is located
    // in the view.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width * 0.5, this.layoutBounds.height * 0.5 ),
      105 );

    // Add the various selectors and buttons for choosing which objects to explore.
    const newObjectButton = new TextPushButton( newObjectString,
      {
        font: new PhetFont( 20 ),
        baseColor: 'rgb( 255, 252, 127 )',
        cornerRadius: 5,
        listener: () => {
          model.newReferenceObject();
        }
      }
    );
    this.addChild( newObjectButton );

    // Create and add the panel for controlling the estimation type (i.e. cubes, lines, etc).
    const modeRadioButtonGroup = new RectangularRadioButtonGroup( model.estimationModeProperty, [
      { value: 'lines', node: new Image( linesIconImage, { scale: MODE_ICON_SCALE } ) },
      { value: 'rectangles', node: new Image( squaresIconImage, { scale: MODE_ICON_SCALE } ) },
      { value: 'cubes', node: new Image( cubesIconImage, { scale: MODE_ICON_SCALE } ) },
      { value: 'cylinders', node: new Image( cylindersIconImage, { scale: MODE_ICON_SCALE } ) }
    ], {
      orientation: 'vertical',
      baseColor: 'white',
      cornerRadius: 10,
      spacing: 10,
      buttonContentXMargin: 6,
      buttonContentYMargin: 14
    } );
    const modeControlPanel = new Panel( modeRadioButtonGroup, {
      fill: 'rgb( 0, 171, 51 )',
      stroke: null,
      yMargin: 10
    } );
    this.addChild( modeControlPanel );

    // Create and add the panel for controlling discrete vs. continuous mode.
    const discreteOrContinuousButtons = new RectangularRadioButtonGroup( model.comparisonTypeProperty, [
      { value: 'continuous', node: new Image( continuousIconImage, { scale: DISCRETE_OR_CONTINUOUS_ICON_SCALE } ) },
      { value: 'discrete', node: new Image( discreteIconImage, { scale: DISCRETE_OR_CONTINUOUS_ICON_SCALE } ) }
    ], {
      orientation: 'vertical',
      baseColor: 'white',
      cornerRadius: 10,
      spacing: 10,
      buttonContentYMargin: 20
    } );
    const discreteOrContinuousControlPanel = new Panel( discreteOrContinuousButtons, {
      fill: 'rgb( 252, 2, 47 )',
      stroke: null,
      yMargin: 10
    } );
    this.addChild( discreteOrContinuousControlPanel );

    // The continuous or discrete panel doesn't make sense for one-dimensional
    // estimates, so hide it in those cases.
    model.estimationModeProperty.link( estimationMode => {
      discreteOrContinuousControlPanel.visible = estimationMode !== 'lines';
    } );

    // Create and add the panel for selecting the range.
    const rangeButtons = new RectangularRadioButtonGroup( model.estimationRangeProperty, [
      { value: EstimationConstants.RANGE_1_TO_10, node: createRangeLabel( EstimationConstants.RANGE_1_TO_10 ) },
      { value: EstimationConstants.RANGE_10_TO_100, node: createRangeLabel( EstimationConstants.RANGE_10_TO_100 ) },
      { value: EstimationConstants.RANGE_100_TO_1000, node: createRangeLabel( EstimationConstants.RANGE_100_TO_1000 ) }
    ], {
      orientation: 'horizontal',
      baseColor: 'white',
      buttonContentXMargin: 10,
      buttonContentYMargin: 12
    } );
    const rangeSelectionPanel = new Panel( rangeButtons, { stroke: null, fill: null } );

    this.addChild( rangeSelectionPanel );

    // Add the slider that will control the fine-grained estimate value.
    const slider = new HSlider( model.offsetIntoRangeProperty, new Range( 0, 1 ),
      {
        trackFill: 'black',
        trackSize: new Dimension2( 400, 4 )
      } );
    for ( let i = 0; i <= 1; i += 0.1 ) {
      slider.addMajorTick( i );
    }
    this.addChild( slider );

    // Add the readout that will display the current estimate quantity.
    const readout = new Rectangle( 0, 0, 60, 40, 5, 5, { fill: 'blue' } );
    this.addChild( readout );
    const readoutText = new Text( 'x', { font: new PhetFont( 20 ), fill: 'white' } );
    model.estimateProperty.link( value => {
      readoutText.text = value;
      readoutText.centerX = readout.width / 2;
      readoutText.centerY = readout.height / 2;
    } );
    readout.addChild( readoutText );

    // Add the general control buttons.
    const resetAllButton = new ResetAllButton( { listener: () => { this.reset(); } } );
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
    rangeSelectionPanel.centerX = modelViewTransform.modelToViewX( 0 );
    rangeSelectionPanel.bottom = this.layoutBounds.height - EDGE_INSET;
    slider.centerX = rangeSelectionPanel.centerX;
    slider.bottom = rangeSelectionPanel.top - 20;
    readout.centerX = modelViewTransform.modelToViewX( 0 );
    readout.bottom = slider.top - 20;

    //------------------------------------------------------------------------
    // Add the shapes for each of the exploration modes.
    //------------------------------------------------------------------------

    // Lines mode
    this.addChild( new LineView( model.modes.lines.referenceObject, modelViewTransform ) );
    model.modes.lines.discreteObjectList.forEach( line => {
      this.addChild( new LineView( line, modelViewTransform ) );
    } );
    this.addChild( new LineView( model.modes.lines.continuousSizableObject, modelViewTransform ) );
    this.addChild( new LineView( model.modes.lines.compareObject, modelViewTransform ) );

    // Rectangles mode
    this.addChild( new RectangleView( model.modes.rectangles.referenceObject, modelViewTransform ) );
    this.addChild( new RectangleView( model.modes.rectangles.compareObject, modelViewTransform ) );
    model.modes.rectangles.discreteObjectList.forEach( line => {
      this.addChild( new RectangleView( line, modelViewTransform ) );
    } );
    this.addChild( new RectangleView( model.modes.rectangles.continuousSizableObject, modelViewTransform ) );

    // Cubes mode
    this.addChild( new CubeView( model.modes.cubes.referenceObject, modelViewTransform ) );
    this.addChild( new CubeBackView( model.modes.cubes.compareObject, modelViewTransform ) );
    model.modes.cubes.discreteObjectList.forEach( cube => {
      this.addChild( new CubeView( cube, modelViewTransform ) );
    } );
    this.addChild( new CubeView( model.modes.cubes.continuousSizableObject, modelViewTransform ) );
    this.addChild( new CubeView( model.modes.cubes.compareObject, modelViewTransform ) );

    // Cylinders mode
    this.addChild( new CylinderView( model.modes.cylinders.referenceObject, modelViewTransform ) );
    model.modes.cylinders.discreteObjectList.forEach( line => {
      this.addChild( new CylinderView( line, modelViewTransform ) );
    } );
    this.addChild( new CylinderView( model.modes.cylinders.continuousSizableObject, modelViewTransform ) );
    this.addChild( new CylinderView( model.modes.cylinders.compareObject, modelViewTransform ) );
  }

  // @public
  reset() {
    this.model.reset();
  }
}

/**
 * Creates the label for a range button
 * @param {Range} range
 * @returns {Node}
 */
function createRangeLabel( range ) {
  return new Text( `${range.min} - ${range.max}`, { font: new PhetFont( 20 ) } );
}

estimation.register( 'ExploreScreenView', ExploreScreenView );
export default ExploreScreenView;