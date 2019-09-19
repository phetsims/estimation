// Copyright 2014-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const CubeExplorationMode = require( 'ESTIMATION/explore/model/CubeExplorationMode' );
  const CylinderExplorationMode = require( 'ESTIMATION/explore/model/CylinderExplorationMode' );
  const estimation = require( 'ESTIMATION/estimation' );
  const EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  const LineExplorationMode = require( 'ESTIMATION/explore/model/LineExplorationMode' );
  const Property = require( 'AXON/Property' );
  const RectangleExplorationMode = require( 'ESTIMATION/explore/model/RectangleExplorationMode' );

  /**
   * @constructor
   */
  function ExploreModel() {
    var self = this;

    // Externally visible properties.
    this.estimationModeProperty = new Property( 'lines' ); // Valid values are 'lines', 'rectangles', 'cubes', and 'cylinders'.
    this.estimationRangeProperty = new Property( EstimationConstants.RANGE_1_TO_10 );
    this.offsetIntoRangeProperty = new Property( 0 ); // Amount of offset into the current range
    this.comparisonTypeProperty = new Property( 'discrete' ); // Valid values are 'discrete' or 'continuous'.

    // The following property should only be observed outside of this model, never set.
    this.estimateProperty = new Property( 1 ); // Estimated quantity of reference objects to fill the compare object

    // Hook up internal property dependencies.
    this.estimationRangeProperty.link( function( range ) {
      self.offsetIntoRangeProperty.value = 0;
      self.estimateProperty.value = range.min;
    } );

    // to calculate the user's estimate, linearly map offset from  0-1 to  estimationRange.min-estimationRange.max, and
    // then make it an integer
    this.offsetIntoRangeProperty.link( function( offset ) {
      self.estimateProperty.value = Math.floor( offset * self.estimationRangeProperty.value.max - self.estimationRangeProperty.value.min * ( offset - 1) );
    } );

    // Create the various modes that the user can explore.
    this.modes = {
      lines: new LineExplorationMode( this.estimationModeProperty ),
      rectangles: new RectangleExplorationMode( this.estimationModeProperty ),
      cubes: new CubeExplorationMode( this.estimationModeProperty ),
      cylinders: new CylinderExplorationMode( this.estimationModeProperty, this.cylinders )
    };

    this.estimationModeProperty.link( function( newMode, oldMode ) {

      // Store the range associated with current mode.  It is necessary to
      // do this in order to restore it, since ranges are not mutually
      // exclusive.
      if ( oldMode ) {
        self.modes[ oldMode ].selectedRange = self.estimationRangeProperty.value;
        self.modes[ oldMode ].offsetIntoRange = self.offsetIntoRangeProperty.value;
      }

      // Restore the estimate for this mode.
      self.estimationRangeProperty.value = self.modes[ newMode ].selectedRange;
      self.offsetIntoRangeProperty.value = self.modes[ newMode ].offsetIntoRange;

      // Restore the comparison type.
      self.comparisonTypeProperty.value = self.modes[ newMode ].continuousOrDiscreteProperty.value;
    } );

    this.estimateProperty.link( function( estimate ) {
      // Propagate changes from the UI into the active mode.
      self.modes[ self.estimationModeProperty.value ].estimateProperty.value = estimate;
    } );

    this.comparisonTypeProperty.link( function( discreteOrContinuous ) {
      // Propagate changes from the UI into the active mode.
      self.modes[ self.estimationModeProperty.value ].continuousOrDiscreteProperty.value = discreteOrContinuous;
    } );
  }

  ExploreModel.prototype = {

    reset: function() {
      this.estimationModeProperty.reset();
      this.estimationRangeProperty.reset();
      this.offsetIntoRangeProperty.reset();
      this.comparisonTypeProperty.reset();
      for ( var mode in this.modes ) {
        this.modes[ mode ].reset();
      }
    },

    newReferenceObject: function() {
      this.estimationRangeProperty.reset();
      this.offsetIntoRangeProperty.reset();
      this.modes[ this.estimationModeProperty.value ].newReferenceObject();
    }
  };

  estimation.register( 'ExploreModel', ExploreModel );
  
  return ExploreModel;
} );