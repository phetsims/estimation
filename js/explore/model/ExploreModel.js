// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var CubeModel = require( 'ESTIMATION/common/model/CubeModel' );
  var CubeExplorationMode = require( 'ESTIMATION/explore/model/CubeExplorationMode' );
  var CylinderExplorationMode = require( 'ESTIMATION/explore/model/CylinderExplorationMode' );
  var CylinderModel = require( 'ESTIMATION/common/model/CylinderModel' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Dimension3 = require( 'ESTIMATION/common/model/Dimension3' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var LineModel = require( 'ESTIMATION/common/model/LineModel' );
  var LineExplorationMode = require( 'ESTIMATION/explore/model/LineExplorationMode' );
  var Property = require( 'AXON/Property' );
  var RectangleExplorationMode = require( 'ESTIMATION/explore/model/RectangleExplorationMode' );
  var RectangleModel = require( 'ESTIMATION/common/model/RectangleModel' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function ExploreModel() {
    var thisModel = this;

    // Externally visible properties.
    this.estimationModeProperty = new Property( 'lines' ); // Valid values are 'lines', 'rectangles', 'cubes', and 'cylinders'.
    this.estimationRangeProperty = new Property( EstimationConstants.RANGE_1_TO_10 );
    this.offsetIntoRangeProperty = new Property( 0 ); // Amount of offset into the current range
    this.comparisonTypeProperty = new Property( 'discrete' ); // Valid values are 'discrete' or 'continuous'.

    // The following property should only be observed outside of this model, never set.
    this.estimateProperty = new Property( 1 ); // Estimated quantity of reference objects to fill the compare object

    // Externally visible lists of all shapes in the model.  These are intended
    // as the place where the view finds the shapes.
    this.rectangles = [];
    this.cylinders = [];

    // Hook up internal property dependencies.
    this.estimationRangeProperty.link( function( range ) {
      thisModel.offsetIntoRangeProperty.value = 0;
      thisModel.estimateProperty.value = range.min;
    } );
    this.offsetIntoRangeProperty.link( function( offset ) {
      thisModel.estimateProperty.value = Math.floor( offset * thisModel.estimationRangeProperty.value.max - thisModel.estimationRangeProperty.value.min * ( offset - 1) );
    } );

    // Create the various modes that the user can explore.
    this.modes = {
      lines: new LineExplorationMode( this.estimationModeProperty, this.lines ),
      rectangles: new RectangleExplorationMode( this.estimationModeProperty, this.rectangles ),
      cylinders: new CylinderExplorationMode( this.estimationModeProperty, this.cylinders ),
      cubes: new CubeExplorationMode( this.estimationModeProperty, this.cubes )
    };

    this.estimationModeProperty.link( function( newMode, oldMode ) {

      // Store the range associated with current mode.  It is necessary to
      // do this in order to restore it, since ranges are not mutually
      // exclusive.
      if ( oldMode ) {
        thisModel.modes[ oldMode ].selectedRange = thisModel.estimationRangeProperty.value;
        thisModel.modes[ oldMode ].offsetIntoRange = thisModel.offsetIntoRangeProperty.value;
      }

      // Restore the estimate for this mode.
      thisModel.estimationRangeProperty.value = thisModel.modes[ newMode ].selectedRange;
      thisModel.offsetIntoRangeProperty.value = thisModel.modes[ newMode ].offsetIntoRange;

      // Restore the comparison type.
      thisModel.comparisonTypeProperty.value = thisModel.modes[ newMode ].continuousOrDiscreteProperty.value;
    } );

    this.estimateProperty.link( function( estimate ) {
      // Propagate changes from the UI into the active mode.
      thisModel.modes[ thisModel.estimationModeProperty.value ].estimateProperty.value = estimate;
    } );

    this.comparisonTypeProperty.link( function( discreteOrContinuous ) {
      // Propagate changes from the UI into the active mode.
      thisModel.modes[ thisModel.estimationModeProperty.value ].continuousOrDiscreteProperty.value = discreteOrContinuous;
    } );
  }

  ExploreModel.prototype = {

    reset: function() {
      this.estimationModeProperty.reset();
      this.estimationRangeProperty.reset();
      this.comparisonTypeProperty.reset();
    },

    newReferenceObject: function() {
      this.estimationRangeProperty.reset();
      this.offsetIntoRangeProperty.reset();
      this.modes[ this.estimationModeProperty.value ].newReferenceObject();
    }
  };

  return ExploreModel;
} );