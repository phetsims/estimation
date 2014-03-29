// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var Property = require( 'AXON/Property' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var ModelShape = require( 'ESTIMATION/common/model/ModelShape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function ExploreModel() {
    var thisModel = this;

    // Externally visible properties.
    this.soundEnabledProperty = new Property( true ); // TODO: Is there really any sound for the 'Explore' screen?
    this.estimationModeProperty = new Property( 'cubes' ); // Valid values are 'lines', 'rectangles', 'cubes', and 'cylinders'.
    this.estimationRangeProperty = new Property( EstimationConstants.RANGE_1_TO_10 );
    this.offsetIntoRangeProperty = new Property( 0 ); // Amount of offset into the current range
    this.fillTypeProperty = new Property( 'discrete' ); // Valid values are 'discrete' or 'continuous'.

    // The following property should only be observed outside of this model, never set.
    this.estimateProperty = new Property( 1 ); // Quantity of estimated objects

    // Function for calculating the estimate value based on range and offset into range.
    function updateEstimate() {
      thisModel.estimateProperty.value = Math.floor( thisModel.estimationRangeProperty.value.min +
                                                     thisModel.offsetIntoRangeProperty.value *
                                                     ( thisModel.estimationRangeProperty.value.max - thisModel.estimationRangeProperty.value.min ) );
    }

    // Externally visible list of all shapes in the model.  This intended as
    // the place where the view finds the shapes.
    this.shapeList = [];

    // Hook up internal property dependencies.
    this.estimationRangeProperty.link( updateEstimate );
    this.offsetIntoRangeProperty.link( updateEstimate );

    // TODO: Work in progress
    var lineModelShape1 = new ModelShape.line( 1, 'blue' );
    lineModelShape1.positionProperty.value = new Vector2( -2, 1.5 );
    var lineModelShape2 = new ModelShape.line( 2, 'orange' );
    lineModelShape2.positionProperty.value = new Vector2( -1, 0.5 );
    this.shapeList.push( lineModelShape1 );
    this.shapeList.push( lineModelShape2 );
  }

  ExploreModel.prototype = {
    reset: function() {
      this.soundEnabledProperty.reset();
      this.estimationModeProperty.reset();
      this.estimationRangeProperty.reset();
      this.fillTypeProperty.reset();
    }
  };

  return ExploreModel;
} );