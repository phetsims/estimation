// Copyright 2002-2014, University of Colorado Boulder

/**
 * Definition of the 'line exploration mode' for the exploration model.
 */
define( function( require ) {
  'use strict';

  // Imports
  var AbstractExplorationMode = require( 'ESTIMATION/explore/model/AbstractExplorationMode' );
  var Color = require( 'SCENERY/util/Color' );
  var CubeModel = require( 'ESTIMATION/common/model/CubeModel' );
  var CylinderModel = require( 'ESTIMATION/common/model/CylinderModel' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Dimension3 = require( 'ESTIMATION/common/model/Dimension3' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var LineModel = require( 'ESTIMATION/common/model/LineModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var RectangleModel = require( 'ESTIMATION/common/model/RectangleModel' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var MODE_NAME = 'lines';
  var COMPARE_LINE_LENGTH = 0.75; // In meters
  var VALID_REF_OBJECT_SIZES = [
      COMPARE_LINE_LENGTH / 100,
      COMPARE_LINE_LENGTH / 60,
      COMPARE_LINE_LENGTH / 40,
      COMPARE_LINE_LENGTH / 10,
      COMPARE_LINE_LENGTH / 4,
      COMPARE_LINE_LENGTH / 2
  ];
  var INITIAL_REFERENCE_LINE_LENGTH = VALID_REF_OBJECT_SIZES[ 4 ];

  /**
   * @constructor
   */
  function LineExplorationMode( selectedModeProperty, linesArray ) {
    AbstractExplorationMode.call( this, selectedModeProperty, MODE_NAME );
    var thisMode = this;

    // Create the reference, compare, continuous, and discrete objects.
    this.compareObject = new LineModel( 2, new Vector2( -1, 0.5 ), EstimationConstants.COMPARISON_OBJECT_COLOR, false );
    this.continuousSizableObject = new LineModel( 2, new Vector2( -1, 0.45 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    this.referenceObject = new LineModel( 0.1, new Vector2( -2, 1.5 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    this.discreteObjectList.push( new LineModel( 2, new Vector2( -1, 0.45 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false ) );
    this.setReferenceObjectSize( INITIAL_REFERENCE_LINE_LENGTH );

    // Complete initialization by hooking up visibility updates in the parent class.
    this.hookUpVisibilityUpdates();

    // Maintain a short history of reference object sizes so unique ones can be chosen.
    this.previousReferenceObjectSize = INITIAL_REFERENCE_LINE_LENGTH;
  }

  return inherit( AbstractExplorationMode, LineExplorationMode, {

    setReferenceObjectSize: function( length ) {
      this.referenceObject.lengthProperty.value = length;

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

    updateDiscreteObjectVisibility: function( selectedMode, estimateValue ) {
      this.discreteObjectList[0].visibleProperty.value = selectedMode === MODE_NAME && this.continuousOrDiscreteProperty.value === 'discrete';
      this.discreteObjectList[0].lengthProperty.value = this.referenceObject.lengthProperty.value * estimateValue;
    },

    updateContinuousObjectSize: function( estimateValue ) {
      this.continuousSizableObject.lengthProperty.value = this.referenceObject.lengthProperty.value * estimateValue;
    }
  } );
} );