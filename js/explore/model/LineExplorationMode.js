// Copyright 2002-2014, University of Colorado Boulder

/**
 * Definition of the 'line exploration mode' for the exploration model.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var CubeModel = require( 'ESTIMATION/common/model/CubeModel' );
  var CylinderModel = require( 'ESTIMATION/common/model/CylinderModel' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Dimension3 = require( 'ESTIMATION/common/model/Dimension3' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var LineModel = require( 'ESTIMATION/common/model/LineModel' );
  var Property = require( 'AXON/Property' );
  var RectangleModel = require( 'ESTIMATION/common/model/RectangleModel' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var MAX_DISCRETE_LINE_SEGMENTS = 100;

  /**
   * @constructor
   */
  function LineExplorationMode( modeProperty, linesArray ) {
    var thisMode = this;

    // Properties that are part of the public API.
    this.estimateProperty = new Property( 1 );
    this.continuousOrDiscreteProperty = new Property( 'continuous' );

    // Storage for this mode's estimate parameters for when the mode is inactive.
    this.selectedRange = EstimationConstants.RANGE_1_TO_10;
    this.offsetIntoRange = 0;

    var referenceLine = new LineModel( 0.1, new Vector2( -2, 1.5 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    referenceLine.positionProperty.value = new Vector2( -2, 1.5 );
    var compareLine = new LineModel( 2, new Vector2( -1, 0.5 ), EstimationConstants.COMPARISON_OBJECT_COLOR, false );
    var discreteSizableLine = new LineModel( 2, new Vector2( -1, 0.45 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    var continuousSizableLine = new LineModel( 2, new Vector2( -1, 0.45 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false );

    modeProperty.link( function( estimationMode ) {
      referenceLine.visibleProperty.value = estimationMode === 'lines';
      compareLine.visibleProperty.value = estimationMode === 'lines';
      discreteSizableLine.visibleProperty.value = estimationMode === 'lines' && thisMode.continuousOrDiscreteProperty.value === 'discrete';
      continuousSizableLine.visibleProperty.value = estimationMode === 'lines' && thisMode.continuousOrDiscreteProperty.value === 'continuous';
    } );

    this.continuousOrDiscreteProperty.link( function( comparisonType ) {
      discreteSizableLine.visibleProperty.value = modeProperty.value === 'lines' && comparisonType === 'discrete';
      continuousSizableLine.visibleProperty.value = modeProperty.value === 'lines' && comparisonType === 'continuous';
    } );

    this.estimateProperty.link( function( estimateValue ) {
      discreteSizableLine.lengthProperty.value = referenceLine.lengthProperty.value * estimateValue;
      continuousSizableLine.lengthProperty.value = referenceLine.lengthProperty.value * estimateValue;
    } );

    linesArray.push( referenceLine );
    linesArray.push( compareLine );
    linesArray.push( discreteSizableLine );
    linesArray.push( continuousSizableLine );
  }

  return LineExplorationMode;
} );