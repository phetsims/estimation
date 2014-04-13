// Copyright 2002-2014, University of Colorado Boulder

/**
 * Definition of the 'line exploration mode' for the exploration model.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var CubeModel = require( 'ESTIMATION/common/model/CubeModel' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Dimension3 = require( 'ESTIMATION/common/model/Dimension3' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var LineModel = require( 'ESTIMATION/common/model/LineModel' );
  var Property = require( 'AXON/Property' );
  var RectangleModel = require( 'ESTIMATION/common/model/RectangleModel' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var MAX_DISCRETE_RECTANGLES = 100;

  /**
   * @constructor
   */
  function RectangleExplorationMode( modeProperty, rectanglesArray ) {
    var thisMode = this;

    // Properties that are part of the public API.
    this.estimateProperty = new Property( 1 );
    this.continuousOrDiscreteProperty = new Property( 'continuous' );

    // Storage for this mode's estimate parameters for when the mode is inactive.
    this.selectedRange = EstimationConstants.RANGE_1_TO_10;
    this.offsetIntoRange = 0;

    var referenceRect = new RectangleModel( new Dimension2( 0.5, 0.5 ), new Vector2( -2.0, 0.5 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    var compareRectPosition = new Vector2( -1, 0 );
    var compareRect = new RectangleModel( new Dimension2( 2.0, 2.0 ), compareRectPosition, EstimationConstants.COMPARISON_OBJECT_COLOR, false, false );
    var continuousSizableRect = new RectangleModel( new Dimension2( 2, 1 ), compareRectPosition, EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    var discreteSizableRects = [];
    _.times( MAX_DISCRETE_RECTANGLES, function() {
      discreteSizableRects.push( new RectangleModel( new Dimension2( 1.0, 1.0 ), Vector2.ZERO, EstimationConstants.REFERENCE_OBJECT_COLOR, true, false ) );
    } );

    var numVisibleDiscreteRects = 0;

    function updateRectangleVisibility() {
      var estimationMode = modeProperty.value;
      var comparisonType = thisMode.continuousOrDiscreteProperty.value;
      referenceRect.visibleProperty.value = estimationMode === 'rectangles';
      compareRect.visibleProperty.value = estimationMode === 'rectangles';
      continuousSizableRect.visibleProperty.value = estimationMode === 'rectangles' && comparisonType === 'continuous';
      var targetNumVisibleDiscreteRects = estimationMode === 'rectangles' && comparisonType === 'discrete' ? thisMode.estimateProperty.value : 0;
      var startIndex = Math.min( numVisibleDiscreteRects, targetNumVisibleDiscreteRects );
      var endIndex = Math.max( numVisibleDiscreteRects, targetNumVisibleDiscreteRects );
      var visibility = targetNumVisibleDiscreteRects > numVisibleDiscreteRects;
      for ( var i = startIndex; i < endIndex && i < MAX_DISCRETE_RECTANGLES; i++ ) {
        discreteSizableRects[ i ].visibleProperty.value = visibility;
      }
      numVisibleDiscreteRects = targetNumVisibleDiscreteRects;
    }

    modeProperty.link( function() {
      updateRectangleVisibility();
    } );

    this.continuousOrDiscreteProperty.link( function() {
      updateRectangleVisibility();
    } );

    this.estimateProperty.link( function( estimateValue ) {

      // Handle the discrete rectangles by changing which ones are visible.
      if ( thisMode.continuousOrDiscreteProperty.value === 'discrete' ) {
        updateRectangleVisibility();
      }

      // Size the continuous rectangle
      continuousSizableRect.sizeProperty.value = new Dimension2( referenceRect.sizeProperty.value.width * Math.sqrt( estimateValue ),
        referenceRect.sizeProperty.value.height * Math.sqrt( estimateValue ) );
    } );

    // Size and position the discrete rectangles TODO: Will need to be linked to reference object size.
    var rectanglesPerRow = compareRect.sizeProperty.value.width / referenceRect.sizeProperty.value.width;
    var numRows = discreteSizableRects.length / rectanglesPerRow;
    var origin = compareRect.positionProperty.value;
    for ( var i = 0; i < numRows; i++ ) {
      for ( var j = 0; j < rectanglesPerRow; j++ ) {
        var index = i * rectanglesPerRow + j;
        discreteSizableRects[ index ].sizeProperty.value = referenceRect.sizeProperty.value;
        discreteSizableRects[ index ].positionProperty.value = new Vector2( origin.x + j * referenceRect.sizeProperty.value.width,
          origin.y + i * referenceRect.sizeProperty.value.height );
      }
    }

    rectanglesArray.push( referenceRect );
    rectanglesArray.push( compareRect );
    rectanglesArray.push( continuousSizableRect );
    _.times( discreteSizableRects.length, function( i ) { rectanglesArray.push( discreteSizableRects[i ] ) } );
  }

  return RectangleExplorationMode;
} );