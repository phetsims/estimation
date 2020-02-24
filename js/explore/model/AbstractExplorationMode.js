// Copyright 2014-2020, University of Colorado Boulder

/**
 * Base class for the various modes that the user can select in the "Explore"
 * screen.
 *
 * TODO: There are several things in the descendant classes that can be pulled into this class,
 * such as the function to set the initial and new reference objects.  I just didn't want to
 * take the time when doing early proof of concept to do this.
 */
define( require => {
  'use strict';

  // modules
  const estimation = require( 'ESTIMATION/estimation' );
  const EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function AbstractExplorationMode( selectedModeProperty, modeName ) {
    this.selectedModeProperty = selectedModeProperty;
    this.modeName = modeName;

    // Properties that are part of the public API.
    this.estimateProperty = new Property( 1 );
    this.continuousOrDiscreteProperty = new Property( 'discrete' );

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

  estimation.register( 'AbstractExplorationMode', AbstractExplorationMode );

  return inherit( Object, AbstractExplorationMode, {

    createNewReferenceObject: function() {
      throw new Error( 'createNewReferenceObject must be overridden in descendant class' );
    },

    updateDiscreteObjectVisibility: function( modeName ) {
      throw new Error( 'updateDiscreteObjectVisibility must be overridden in descendant class' );
    },

    updateContinuousObjectSize: function() {
      throw new Error( 'updateContinuousObjectSize must be overridden in descendant class' );
    },

    setInitialReferenceObject: function() {
      throw new Error( 'setInitialReferenceObject must be overridden in descendant class' );
    },

    updateObjectVisibility: function() {
      const selectedMode = this.selectedModeProperty.value;
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
    },

    reset: function() {
      this.continuousOrDiscreteProperty.reset();
      this.estimateProperty.reset();
      this.selectedRange = EstimationConstants.RANGE_1_TO_10;
      this.offsetIntoRange = 0;
      this.setInitialReferenceObject();
    }
  } );
} );