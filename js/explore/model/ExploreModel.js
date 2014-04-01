// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var Property = require( 'AXON/Property' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var ModelShape = require( 'ESTIMATION/common/model/ModelShape' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var MAX_NUM_ITEMS = 100; // TODO: should derive from something

  /**
   * @constructor
   */
  function ExploreModel() {
    var thisModel = this;

    // Externally visible properties.
    this.soundEnabledProperty = new Property( true ); // TODO: Is there really any sound for the 'Explore' screen?
    this.estimationModeProperty = new Property( 'lines' ); // Valid values are 'lines', 'rectangles', 'cubes', and 'cylinders'.
    this.estimationRangeProperty = new Property( EstimationConstants.RANGE_1_TO_10 );
    this.offsetIntoRangeProperty = new Property( 0 ); // Amount of offset into the current range
    this.comparisonTypeProperty = new Property( 'discrete' ); // Valid values are 'discrete' or 'continuous'.

    // The following property should only be observed outside of this model, never set.
    this.estimateProperty = new Property( 1 ); // Quantity of estimated objects

    // Function for calculating the estimate value based on range and offset into range.
    function updateEstimate() {
      thisModel.estimateProperty.value = Math.floor( thisModel.estimationRangeProperty.value.min +
                                                     thisModel.offsetIntoRangeProperty.value *
                                                     ( thisModel.estimationRangeProperty.value.max - thisModel.estimationRangeProperty.value.min ) );
    }

    // Externally visible list of all shapes in the model.  This is intended
    // as the place where the view finds the shapes.
    this.shapeList = [];

    // Hook up internal property dependencies.
    this.estimationRangeProperty.link( updateEstimate );
    this.offsetIntoRangeProperty.link( updateEstimate );

    // TODO: Figure out how to better modualarize the different nodes.
    // Add the lines
    var referenceLine = new ModelShape.line( 0.1, EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    referenceLine.positionProperty.value = new Vector2( -2, 1.5 );
    var compareLine = new ModelShape.line( 2, EstimationConstants.COMPARISON_OBJECT_COLOR, false );
    compareLine.positionProperty.value = new Vector2( -1, 0.5 );
    var discreteSizableLine = new ModelShape.line( 2, 'green', false );
    discreteSizableLine.positionProperty.value = new Vector2( -1, 0.45 );
    var continuousSizableLine = new ModelShape.line( 2, 'red', false );
    continuousSizableLine.positionProperty.value = new Vector2( -1, 0.45 );

    this.estimationModeProperty.link( function( estimationMode ) {
      referenceLine.visibleProperty.value = estimationMode === 'lines';
      compareLine.visibleProperty.value = estimationMode === 'lines';
      discreteSizableLine.visibleProperty.value = estimationMode === 'lines' && thisModel.comparisonTypeProperty.value === 'discrete';
      continuousSizableLine.visibleProperty.value = estimationMode === 'lines' && thisModel.comparisonTypeProperty.value === 'continuous';
    } );

    this.comparisonTypeProperty.link( function( comparisonType ) {
      discreteSizableLine.visibleProperty.value = thisModel.estimationModeProperty.value === 'lines' && comparisonType === 'discrete';
      continuousSizableLine.visibleProperty.value = thisModel.estimationModeProperty.value === 'lines' && comparisonType === 'continuous';
    } );

    this.estimateProperty.link( function( estimateValue ) {
      discreteSizableLine.widthProperty.value = referenceLine.widthProperty.value * estimateValue;
      continuousSizableLine.widthProperty.value = referenceLine.widthProperty.value * estimateValue;
    } );

    this.shapeList.push( referenceLine );
    this.shapeList.push( compareLine );
    this.shapeList.push( discreteSizableLine );
    this.shapeList.push( continuousSizableLine );

    // Add the rectangles
    var referenceRect = new ModelShape.rectangle( 0.5, 0.5, EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    referenceRect.positionProperty.value = new Vector2( -2.0, 0.5 );
    var compareRectPosition = new Vector2( -1, 0 );
    var compareRect = new ModelShape.rectangle( 2.0, 2.0, EstimationConstants.COMPARISON_OBJECT_COLOR, false );
    compareRect.positionProperty.value = compareRectPosition;
    var continuousSizableRect = new ModelShape.rectangle( 2, 1, EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    continuousSizableRect.positionProperty.value = compareRectPosition;
    var discreteSizableRects = [];
    _.times( MAX_NUM_ITEMS, function() {
      discreteSizableRects.push( new ModelShape.rectangle( 1.0, 1.0, EstimationConstants.REFERENCE_OBJECT_COLOR, true ) );
    } );

    var numVisibleDiscreteRects = 0;

    function updateRectangleVisibility() {
      var estimationMode = thisModel.estimationModeProperty.value;
      var comparisonType = thisModel.comparisonTypeProperty.value;
      referenceRect.visibleProperty.value = estimationMode === 'rectangles';
      compareRect.visibleProperty.value = estimationMode === 'rectangles';
      continuousSizableRect.visibleProperty.value = estimationMode === 'rectangles' && comparisonType === 'continuous';
      var targetNumVisibleDiscreteRects = estimationMode === 'rectangles' && comparisonType === 'discrete' ? thisModel.estimateProperty.value : 0;
      var startIndex = Math.min( numVisibleDiscreteRects, targetNumVisibleDiscreteRects );
      var endIndex = Math.max( numVisibleDiscreteRects, targetNumVisibleDiscreteRects );
      var visibility = targetNumVisibleDiscreteRects > numVisibleDiscreteRects;
      for ( var i = startIndex; i < endIndex; i++ ) {
        discreteSizableRects[ i ].visibleProperty.value = visibility;
      }
      numVisibleDiscreteRects = targetNumVisibleDiscreteRects;
    }

    this.estimationModeProperty.link( function() {
      updateRectangleVisibility();
    } );

    this.comparisonTypeProperty.link( function() {
      updateRectangleVisibility();
    } );

    this.estimateProperty.link( function( estimateValue ) {

      // Handle the discrete rectangles by changing which ones are visible.
      if ( thisModel.comparisonTypeProperty.value === 'discrete' ) {
        updateRectangleVisibility();
      }

      // Size the continuous rectangle
      continuousSizableRect.widthProperty.value = referenceRect.widthProperty.value * Math.sqrt( estimateValue );
      continuousSizableRect.heightProperty.value = referenceRect.heightProperty.value * Math.sqrt( estimateValue );
    } );

    // Size and position the discrete rectangles TODO: Will need to be linked to reference object size.
    var rectanglesPerRow = compareRect.widthProperty.value / referenceRect.widthProperty.value;
    var numRows = discreteSizableRects.length / rectanglesPerRow;
    var refWidth = referenceRect.widthProperty.value;
    var refHeight = referenceRect.widthProperty.value;
    var origin = compareRect.positionProperty.value;
    for ( var i = 0; i < numRows; i++ ) {
      for ( var j = 0; j < rectanglesPerRow; j++ ) {
        var index = i * rectanglesPerRow + j;
        discreteSizableRects[ index ].widthProperty.value = refWidth;
        discreteSizableRects[ index ].heightProperty.value = refHeight;
        discreteSizableRects[ index ].positionProperty.value = new Vector2( origin.x + j * refWidth, origin.y + i * refHeight );
      }
    }


    this.shapeList.push( referenceRect );
    this.shapeList.push( compareRect );
    this.shapeList.push( continuousSizableRect );
    _.times( discreteSizableRects.length, function( i ) { thisModel.shapeList.push( discreteSizableRects[i ] ) } );


  }

  ExploreModel.prototype = {
    reset: function() {
      this.soundEnabledProperty.reset();
      this.estimationModeProperty.reset();
      this.estimationRangeProperty.reset();
      this.comparisonTypeProperty.reset();
    }
  };

  return ExploreModel;
} );