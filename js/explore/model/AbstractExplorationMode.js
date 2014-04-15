// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base class for the various modes that the user can select in the "Explore"
 * screen.
 */
define( function( require ) {
  'use strict';

  // Imports
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function AbstractExplorationMode( selectedModeProperty, modeName ) {
    this.selectedModeProperty = selectedModeProperty;
    this.modeName = modeName;

    // Properties that are part of the public API.
    this.estimateProperty = new Property( 1 );
    this.continuousOrDiscreteProperty = new Property( 'continuous' );

    // Storage for this mode's estimate parameters for when the mode is
    // inactive. Necessary because the ranges overlap.
    this.selectedRange = EstimationConstants.RANGE_1_TO_10;
    this.offsetIntoRange = 0;

    // Every mode has the following objects.  Descendant classes should populate.
    this.referenceObject = null;
    this.compareObject = null;
    this.continuousSizableObject = null;
    this.discreteObjectList = [];
  }

  AbstractExplorationMode.prototype = {

    createNewReferenceObject: function() {
      throw new Error( 'createNewReferenceObject must be overridden in descendant class' )
    },

    updateDiscreteObjectVisibility: function( modeName ) {
      throw new Error( 'updateDiscreteObjectVisibility must be overridden in descendant class' )
    },

    updateContinuousObjectSize: function() {
      throw new Error( 'updateContinuousObjectSize must be overridden in descendant class' )
    },

    updateObjectVisibility: function() {
      var selectedMode = this.selectedModeProperty.value;
      this.referenceObject.visibleProperty.value = selectedMode === this.modeName;
      this.compareObject.visibleProperty.value = selectedMode === this.modeName;
      this.continuousSizableObject.visibleProperty.value = selectedMode === this.modeName && this.continuousOrDiscreteProperty.value === 'continuous';
      this.updateDiscreteObjectVisibility( selectedMode, this.estimateProperty.value );
    },

    // Must be called by descendant classes to complete initialization.
    hookUpVisibilityUpdates: function() {
      this.selectedModeProperty.link( this.updateObjectVisibility.bind( this ) );
      this.continuousOrDiscreteProperty.link( this.updateObjectVisibility.bind( this ) );
      this.estimateProperty.link( this.updateObjectVisibility.bind( this ) );
      this.estimateProperty.link( this.updateContinuousObjectSize.bind( this ) );
    }
  };

  return AbstractExplorationMode;
} );