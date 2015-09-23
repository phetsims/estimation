// Copyright 2002-2014, University of Colorado Boulder

/**
 * Definition of the 'line exploration mode' for the exploration model.
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractExplorationMode = require( 'ESTIMATION/explore/model/AbstractExplorationMode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RectangleModel = require( 'ESTIMATION/common/model/RectangleModel' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var MAX_DISCRETE_RECTANGLES = 200;
  var MODE_NAME = 'rectangles';
  var COMPARE_RECTANGLE_SIZE = new Dimension2( 2, 2 );
  var VALID_REF_OBJECT_SIZES = [
    new Dimension2( COMPARE_RECTANGLE_SIZE.width / 20, COMPARE_RECTANGLE_SIZE.height / 20 ),
    new Dimension2( COMPARE_RECTANGLE_SIZE.width / 12, COMPARE_RECTANGLE_SIZE.height / 12 ),
    new Dimension2( COMPARE_RECTANGLE_SIZE.width / 8, COMPARE_RECTANGLE_SIZE.height / 8 ),
    new Dimension2( COMPARE_RECTANGLE_SIZE.width / 5, COMPARE_RECTANGLE_SIZE.height / 5 ),
    new Dimension2( COMPARE_RECTANGLE_SIZE.width / 3, COMPARE_RECTANGLE_SIZE.height / 3 ),
    new Dimension2( COMPARE_RECTANGLE_SIZE.width / 2, COMPARE_RECTANGLE_SIZE.height / 2 ),
    new Dimension2( COMPARE_RECTANGLE_SIZE.width / 2, COMPARE_RECTANGLE_SIZE.height / 4 ),
    new Dimension2( COMPARE_RECTANGLE_SIZE.width / 4, COMPARE_RECTANGLE_SIZE.height / 2 ),
    new Dimension2( COMPARE_RECTANGLE_SIZE.width / 4, COMPARE_RECTANGLE_SIZE.height / 8 ),
    new Dimension2( COMPARE_RECTANGLE_SIZE.width / 8, COMPARE_RECTANGLE_SIZE.height / 4 )
  ];
  var INITIAL_REFERENCE_OBJECT_SIZE = VALID_REF_OBJECT_SIZES[ 3 ];

  /**
   * @constructor
   */
  function RectangleExplorationMode( selectedModeProperty ) {
    AbstractExplorationMode.call( this, selectedModeProperty, MODE_NAME );
    var thisMode = this;

    // Create the reference, compare, continuous, and discrete objects.
    var compareRectPosition = new Vector2( 0, 0 );
    this.compareObject = new RectangleModel( new Dimension2( 2.0, 2.0 ), compareRectPosition, EstimationConstants.COMPARISON_OBJECT_COLOR, false, false );
    this.continuousSizableObject = new RectangleModel( new Dimension2( 2, 1 ), compareRectPosition, EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    this.referenceObject = new RectangleModel( new Dimension2( 0.5, 0.5 ), new Vector2( -2.0, 0.5 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    _.times( MAX_DISCRETE_RECTANGLES, function() {
      // Initial size is arbitrary, will be sized as needed.
      thisMode.discreteObjectList.push( new RectangleModel( new Dimension2( 1.0, 1.0 ), Vector2.ZERO, EstimationConstants.REFERENCE_OBJECT_COLOR, true, false ) );
    } );
    this.setReferenceObjectSize( INITIAL_REFERENCE_OBJECT_SIZE );
    this.numVisibleDiscreteRects = 0;

    // Complete initialization by hooking up visibility updates in the parent class.
    this.hookUpVisibilityUpdates();

    // Maintain a short history of reference object sizes so unique ones can be chosen.
    this.previousReferenceObjectSize = INITIAL_REFERENCE_OBJECT_SIZE;
  }

  return inherit( AbstractExplorationMode, RectangleExplorationMode, {

    setReferenceObjectSize: function( size ) {
      this.referenceObject.sizeProperty.value = size;

      // Size and position the discrete rectangles based on the sizes of the
      // reference rectangle and the compare rectangle.
      var rectanglesPerRow = this.compareObject.sizeProperty.value.width / this.referenceObject.sizeProperty.value.width;
      var numRows = this.discreteObjectList.length / rectanglesPerRow;
      var origin = this.compareObject.positionProperty.value;
      for ( var i = 0; i < numRows; i++ ) {
        for ( var j = 0; j < rectanglesPerRow; j++ ) {
          var index = i * rectanglesPerRow + j;
          if ( index < MAX_DISCRETE_RECTANGLES ) {
            this.discreteObjectList[ index ].sizeProperty.value = this.referenceObject.sizeProperty.value;
            this.discreteObjectList[ index ].positionProperty.value = new Vector2( origin.x + j * this.referenceObject.sizeProperty.value.width,
              origin.y + i * this.referenceObject.sizeProperty.value.height );
          }
        }
      }

      // Set the initial size of the continuous object.
      this.updateContinuousObjectSize( this.estimateProperty.value );
    },

    newReferenceObject: function() {
      // Choose a random size that hasn't been chosen for a while.
      var unique = false;
      var referenceObjectSize = null;
      while ( !unique ) {
        referenceObjectSize = VALID_REF_OBJECT_SIZES[ Math.floor( Math.random() * VALID_REF_OBJECT_SIZES.length ) ];
        unique = ( referenceObjectSize !== this.previousReferenceObjectSize && referenceObjectSize !== this.referenceObject.size );
      }
      this.previousReferenceObjectSize = referenceObjectSize;
      this.setReferenceObjectSize( referenceObjectSize );
    },

    setInitialReferenceObject: function() {
      this.setReferenceObjectSize( INITIAL_REFERENCE_OBJECT_SIZE );
    },

    updateDiscreteObjectVisibility: function( selectedMode, estimateValue ) {
      var targetNumVisibleDiscreteRects = selectedMode === 'rectangles' && this.continuousOrDiscreteProperty.value === 'discrete' ? estimateValue : 0;
      var startIndex = Math.min( this.numVisibleDiscreteRects, targetNumVisibleDiscreteRects );
      var endIndex = Math.max( this.numVisibleDiscreteRects, targetNumVisibleDiscreteRects );
      var visibility = targetNumVisibleDiscreteRects > this.numVisibleDiscreteRects;
      for ( var i = startIndex; i < endIndex && i < MAX_DISCRETE_RECTANGLES; i++ ) {
        this.discreteObjectList[ i ].visibleProperty.value = visibility;
      }
      this.numVisibleDiscreteRects = targetNumVisibleDiscreteRects;
    },

    updateContinuousObjectSize: function( estimateValue ) {
      var hr = this.referenceObject.sizeProperty.value.height;
      var wr = this.referenceObject.sizeProperty.value.width;
      var hc = this.compareObject.sizeProperty.value.height;
      var wc = this.compareObject.sizeProperty.value.width;
      var answer = hc * wc / ( hr * wr );
      var a = ( ( 1 - wc / wr ) / ( 1 - answer ) ) * ( estimateValue - 1 ) + 1;
      var b = ( ( 1 - hc / hr ) / ( 1 - answer ) ) * ( estimateValue - 1 ) + 1;
      // Set the size of the continuous rectangle
      this.continuousSizableObject.sizeProperty.value = new Dimension2( a * wr, b * hr );
    }
  } );
} );