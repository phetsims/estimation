// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var Property = require( 'AXON/Property' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );

  // Constants
  var RANGE_1_TO_10 = { min: 1, max: 10 };

  /**
   * @constructor
   */
  function EstimationModel() {

    // Externally visible properties.
    this.soundEnabled = new Property( true ); // TODO: Is there really any sound for the 'Explore' screen?
    this.estimationMode = new Property( 'cubes' ); // Valid values are 'lines', 'rectangles', 'cubes', and 'cylinders'.
    this.estimationRange = new Property( EstimationConstants.RANGE_1_TO_10 );
    this.quantity = new Property( 1 ); // Quantity of estimated objects
    this.fillType = new Property( 'discrete' ); // Valid values are 'discrete' or 'continuous'.
  }

  EstimationModel.prototype = {
    reset: function() {
      this.soundEnabled.reset();
      this.estimationMode.reset();
      this.estimationRange.reset();
      this.quantity.reset();
      this.fillType.reset();
    }
  };

  return EstimationModel;
} );