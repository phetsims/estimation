// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var CylinderModel = require( 'ESTIMATION/common/model/CylinderModel' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var LineModel = require( 'ESTIMATION/common/model/LineModel' );
  var Property = require( 'AXON/Property' );
  var RectangleModel = require( 'ESTIMATION/common/model/RectangleModel' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var MAX_NUM_ITEMS = 100; // TODO: should derive from something

  /**
   * @constructor
   */
  function ExploreModel() {
    var thisModel = this;

    // Externally visible properties.
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

    // Externally visible lists of all shapes in the model.  These are intended
    // as the place where the view finds the shapes.
    this.lines = [];
    this.rectangles = [];
    this.cubes = [];
    this.cylinders = [];

    // Hook up internal property dependencies.
    this.estimationRangeProperty.link( updateEstimate );
    this.offsetIntoRangeProperty.link( updateEstimate );

    // TODO: Figure out how to better modualarize the different nodes.
    // Add the lines
    var referenceLine = new LineModel( 0.1, new Vector2( -2, 1.5 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    referenceLine.positionProperty.value = new Vector2( -2, 1.5 );
    var compareLine = new LineModel( 2, new Vector2( -1, 0.5 ), EstimationConstants.COMPARISON_OBJECT_COLOR, false );
    var discreteSizableLine = new LineModel( 2, new Vector2( -1, 0.45 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    var continuousSizableLine = new LineModel( 2, new Vector2( -1, 0.45 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false );

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
      discreteSizableLine.lengthProperty.value = referenceLine.lengthProperty.value * estimateValue;
      continuousSizableLine.lengthProperty.value = referenceLine.lengthProperty.value * estimateValue;
    } );

    this.lines.push( referenceLine );
    this.lines.push( compareLine );
    this.lines.push( discreteSizableLine );
    this.lines.push( continuousSizableLine );

    // Add the rectangles
    var referenceRect = new RectangleModel( new Dimension2( 0.5, 0.5 ), new Vector2( -2.0, 0.5 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    var compareRectPosition = new Vector2( -1, 0 );
    var compareRect = new RectangleModel( new Dimension2( 2.0, 2.0 ), compareRectPosition, EstimationConstants.COMPARISON_OBJECT_COLOR, false, false );
    var continuousSizableRect = new RectangleModel( new Dimension2( 2, 1 ), compareRectPosition, EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    var discreteSizableRects = [];
    _.times( MAX_NUM_ITEMS, function() {
      discreteSizableRects.push( new RectangleModel( new Dimension2( 1.0, 1.0 ), Vector2.ZERO, EstimationConstants.REFERENCE_OBJECT_COLOR, true, false ) );
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

    this.rectangles.push( referenceRect );
    this.rectangles.push( compareRect );
    this.rectangles.push( continuousSizableRect );
    _.times( discreteSizableRects.length, function( i ) { thisModel.rectangles.push( discreteSizableRects[i ] ) } );

    // Add the cylinders
    var refCylinderWidth = 1.5;
    var referenceCylinder = new CylinderModel( new Dimension2( refCylinderWidth, 0.25 ), new Vector2( -2.0, 0.5 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    var compareCylinderPosition = new Vector2( 1, 0 );
    var compareCylinder = new CylinderModel( new Dimension2( refCylinderWidth, 2.0 ), compareCylinderPosition, new Color( EstimationConstants.COMPARISON_OBJECT_COLOR ).setAlpha( 0.5 ), false, false );
    var continuousSizableCylinder = new CylinderModel( new Dimension2( 2, 1 ), compareCylinderPosition, EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    var discreteSizableCylinders = [];
    _.times( MAX_NUM_ITEMS, function() {
      discreteSizableCylinders.push( new CylinderModel( new Dimension2( 1.0, 1.0 ), Vector2.ZERO, EstimationConstants.REFERENCE_OBJECT_COLOR, true, false ) );
    } );

    var numVisibleDiscreteCylinders = 0;

    function updateCylinderVisibility() {
      var estimationMode = thisModel.estimationModeProperty.value;
      var comparisonType = thisModel.comparisonTypeProperty.value;
      referenceCylinder.visibleProperty.value = estimationMode === 'cylinders';
      compareCylinder.visibleProperty.value = estimationMode === 'cylinders';
      continuousSizableCylinder.visibleProperty.value = estimationMode === 'cylinders' && comparisonType === 'continuous';
      var targetNumVisibleDiscreteCylinders = estimationMode === 'cylinders' && comparisonType === 'discrete' ? thisModel.estimateProperty.value : 0;
      var startIndex = Math.min( numVisibleDiscreteCylinders, targetNumVisibleDiscreteCylinders );
      var endIndex = Math.max( numVisibleDiscreteCylinders, targetNumVisibleDiscreteCylinders );
      var visibility = targetNumVisibleDiscreteCylinders > numVisibleDiscreteCylinders;
      for ( var i = startIndex; i < endIndex; i++ ) {
        discreteSizableCylinders[ i ].visibleProperty.value = visibility;
      }
      numVisibleDiscreteCylinders = targetNumVisibleDiscreteCylinders;
    }

    this.estimationModeProperty.link( function() {
      updateCylinderVisibility();
    } );

    this.comparisonTypeProperty.link( function() {
      updateCylinderVisibility();
    } );

    this.estimateProperty.link( function( estimateValue ) {

      // Handle the discrete cylinders by changing which ones are visible.
      if ( thisModel.comparisonTypeProperty.value === 'discrete' ) {
        updateCylinderVisibility();
      }

      // Size the continuous cylinder
      continuousSizableCylinder.sizeProperty.value = new Dimension2( referenceCylinder.sizeProperty.value.width,
        referenceCylinder.sizeProperty.value.height * estimateValue );
    } );

    // Size and position the discrete cylinders TODO: Will need to be linked to reference object size.
    var cylindersPerRow = compareCylinder.sizeProperty.value.width / referenceCylinder.sizeProperty.value.width;
    numRows = discreteSizableCylinders.length / cylindersPerRow;
    origin = compareCylinder.positionProperty.value;
    for ( i = 0; i < numRows; i++ ) {
      for ( j = 0; j < cylindersPerRow; j++ ) {
        index = i * cylindersPerRow + j;
        discreteSizableCylinders[ index ].sizeProperty.value = referenceCylinder.sizeProperty.value;
        discreteSizableCylinders[ index ].positionProperty.value = new Vector2( origin.x + j * referenceCylinder.sizeProperty.value.width,
          origin.y + i * referenceCylinder.sizeProperty.value.height );
      }
    }

    // TODO: Probably want to separate these so that order doesn't matter.  Right now it does due to layering.
    this.cylinders.push( referenceCylinder );
    this.cylinders.push( continuousSizableCylinder );
    _.times( discreteSizableCylinders.length, function( i ) { thisModel.cylinders.push( discreteSizableCylinders[i ] ) } );
    this.cylinders.push( compareCylinder );

  }

  ExploreModel.prototype = {
    reset: function() {
      this.estimationModeProperty.reset();
      this.estimationRangeProperty.reset();
      this.comparisonTypeProperty.reset();
    }
  };

  return ExploreModel;
} );