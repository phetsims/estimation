// Copyright 2014-2015, University of Colorado Boulder

/**
 * Definition of the 'line exploration mode' for the exploration model.
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractExplorationMode = require( 'ESTIMATION/explore/model/AbstractExplorationMode' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var LineModel = require( 'ESTIMATION/common/model/LineModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var estimation = require( 'ESTIMATION/estimation' );

  // constants
  var MODE_NAME = 'lines';
  var COMPARE_LINE_LENGTH = 2.5; // In meters
  var VALID_REF_OBJECT_SIZES = [
    COMPARE_LINE_LENGTH / 120,
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
  function LineExplorationMode( selectedModeProperty ) {
    AbstractExplorationMode.call( this, selectedModeProperty, MODE_NAME );

    // Create the reference, compare, continuous, and discrete objects.
    this.compareObject = new LineModel( COMPARE_LINE_LENGTH, new Vector2( -0.5, 0.5 ), EstimationConstants.COMPARISON_OBJECT_COLOR, false );
    this.continuousSizableObject = new LineModel( 2, new Vector2( -0.5, 0.4 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    this.referenceObject = new LineModel( 0.1, new Vector2( -2, 1.0 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false );
    this.discreteObjectList.push( new LineModel( 2, new Vector2( -0.5, 0.4 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false ) );
    this.setReferenceObjectSize( INITIAL_REFERENCE_LINE_LENGTH );

    // Complete initialization by hooking up visibility updates in the parent class.
    this.hookUpVisibilityUpdates();

    // Maintain a short history of reference object sizes so unique ones can be chosen.
    this.previousReferenceObjectSize = INITIAL_REFERENCE_LINE_LENGTH;
  }

  estimation.register( 'LineExplorationMode', LineExplorationMode );

  return inherit( AbstractExplorationMode, LineExplorationMode, {

    setReferenceObjectSize: function( length ) {
      this.referenceObject.lengthProperty.value = length;

      // Set the initial size of the objects.
      this.updateContinuousObjectSize( this.estimateProperty.value );
      this.updateDiscreteObjectVisibility( this.selectedModeProperty.value, this.estimateProperty.value );
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
      this.setReferenceObjectSize( INITIAL_REFERENCE_LINE_LENGTH );
    },

    updateDiscreteObjectVisibility: function( selectedMode, estimateValue ) {
      this.discreteObjectList[ 0 ].visibleProperty.value = selectedMode === MODE_NAME && this.continuousOrDiscreteProperty.value === 'discrete';
      this.discreteObjectList[ 0 ].lengthProperty.value = this.referenceObject.lengthProperty.value * estimateValue;
    },

    updateContinuousObjectSize: function( estimateValue ) {
      this.continuousSizableObject.lengthProperty.value = this.referenceObject.lengthProperty.value * estimateValue;
    }
  } );
} );