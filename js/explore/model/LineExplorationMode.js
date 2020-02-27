// Copyright 2014-2019, University of Colorado Boulder

/**
 * Definition of the 'line exploration mode' for the exploration model.
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import EstimationConstants from '../../common/EstimationConstants.js';
import LineModel from '../../common/model/LineModel.js';
import estimation from '../../estimation.js';
import AbstractExplorationMode from './AbstractExplorationMode.js';

// constants
const MODE_NAME = 'lines';
const COMPARE_LINE_LENGTH = 2.5; // In meters
const VALID_REF_OBJECT_SIZES = [
  COMPARE_LINE_LENGTH / 120,
  COMPARE_LINE_LENGTH / 60,
  COMPARE_LINE_LENGTH / 40,
  COMPARE_LINE_LENGTH / 10,
  COMPARE_LINE_LENGTH / 4,
  COMPARE_LINE_LENGTH / 2
];
const INITIAL_REFERENCE_LINE_LENGTH = VALID_REF_OBJECT_SIZES[ 4 ];

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

export default inherit( AbstractExplorationMode, LineExplorationMode, {

  setReferenceObjectSize: function( length ) {
    this.referenceObject.lengthProperty.value = length;

    // Set the initial size of the objects.
    this.updateContinuousObjectSize( this.estimateProperty.value );
    this.updateDiscreteObjectVisibility( this.selectedModeProperty.value, this.estimateProperty.value );
  },

  newReferenceObject: function() {
    // Choose a random size that hasn't been chosen for a while.
    let unique = false;
    let referenceObjectSize = null;
    while ( !unique ) {
      referenceObjectSize = VALID_REF_OBJECT_SIZES[ Math.floor( phet.joist.random.nextDouble() * VALID_REF_OBJECT_SIZES.length ) ];
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