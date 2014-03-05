// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var Property = require( 'AXON/Property' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );

  /**
   * @constructor
   */
  function ExploreModel() {

    // Externally visible properties.
    this.soundEnabledProperty = new Property( true ); // TODO: Is there really any sound for the 'Explore' screen?
    this.estimationModeProperty = new Property( 'cubes' ); // Valid values are 'lines', 'rectangles', 'cubes', and 'cylinders'.
    this.estimationRangeProperty = new Property( EstimationConstants.RANGE_1_TO_10 );
    this.quantityProperty = new Property( 1 ); // Quantity of estimated objects
    this.fillTypeProperty = new Property( 'discrete' ); // Valid values are 'discrete' or 'continuous'.
  }

  ExploreModel.prototype = {
    reset: function() {
      this.soundEnabledProperty.reset();
      this.estimationModeProperty.reset();
      this.estimationRangeProperty.reset();
      this.quantityProperty.reset();
      this.fillTypeProperty.reset();
    }
  };

  return ExploreModel;
} );