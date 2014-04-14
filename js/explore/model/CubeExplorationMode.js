// Copyright 2002-2014, University of Colorado Boulder

/**
 * Definition of the 'cube exploration mode' for the exploration model.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var CubeModel = require( 'ESTIMATION/common/model/CubeModel' );
  var CubeView = require( 'ESTIMATION/common/view/CubeView' );
  var AbstractExplorationMode = require( 'ESTIMATION/explore/model/AbstractExplorationMode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Dimension3 = require( 'ESTIMATION/common/model/Dimension3' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineModel = require( 'ESTIMATION/common/model/LineModel' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var MAX_DISCRETE_CUBES = 100;
  var MODE_NAME = 'cubes';
  var INITIAL_REFERENCE_OBJECT_SIZE = new Dimension3( 0.25, 0.25, 0.25 );

  /**
   * @constructor
   */
  function CubeExplorationMode( selectedModeProperty ) {
    AbstractExplorationMode.call( this, selectedModeProperty, MODE_NAME, CubeView );
    var thisMode = this;

    // Create the reference, compare, continuous, and discrete objects.
    var compareCubePosition = new Vector2( -1, 0 );
    this.compareObject = new CubeModel( new Dimension3( 1, 1, 1 ), compareCubePosition, new Color( EstimationConstants.COMPARISON_OBJECT_COLOR ).setAlpha( 0.5 ), false, false );
    this.continuousSizableObject = new CubeModel( new Dimension3( 0.25, 0.25, 0.25 ), compareCubePosition, EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    this.referenceObject = new CubeModel( INITIAL_REFERENCE_OBJECT_SIZE, new Vector2( -2, 0 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    _.times( MAX_DISCRETE_CUBES, function() {
      // Initial size is arbitrary, will be sized as needed.
      thisMode.discreteObjectList.push( new CubeModel( new Dimension3( 0.25, 0.25, 0.25 ), Vector2.ZERO, EstimationConstants.REFERENCE_OBJECT_COLOR, true, false ) );
    } );
    this.createReferenceObject( INITIAL_REFERENCE_OBJECT_SIZE );
    this.numVisibleDiscreteCubes = 0;

    // Complete initialization by hooking up visibility updates in the parent class.
    this.hookUpVisibilityUpdates();
  }

  return inherit( AbstractExplorationMode, CubeExplorationMode, {

    createReferenceObject: function( size ) {
      this.referenceObject.sizeProperty.value = size;

      // Size and position the discrete cubes based on the sizes of the
      // reference cube and the compare cube.
      var cubesAcross = this.compareObject.sizeProperty.value.width / this.referenceObject.sizeProperty.value.width;
      var cubesFrontToBack = this.compareObject.sizeProperty.value.depth / this.referenceObject.sizeProperty.value.depth;
      var numCubesPlaced = 0;
      var compareCubeBackCorner = this.compareObject.positionProperty.value.plus( new Vector2( ( this.compareObject.sizeProperty.value.depth ) * EstimationConstants.DEPTH_PROJECTION_PROPORTION, 0 ).rotated( EstimationConstants.CUBE_PROJECTION_ANGLE ) );
      var xUnitDisplacement = new Vector2( this.referenceObject.sizeProperty.value.width, 0 );
      var yUnitDisplacement = new Vector2( 0, this.referenceObject.sizeProperty.value.height );
      var zUnitDisplacement = new Vector2( -this.referenceObject.sizeProperty.value.depth * EstimationConstants.DEPTH_PROJECTION_PROPORTION, 0 ).rotated( EstimationConstants.CUBE_PROJECTION_ANGLE );
      var xDisplacement = new Vector2( 0, 0 );
      var yDisplacement = new Vector2( 0, 0 );
      var zDisplacement = new Vector2( 0, 0 );
      for ( var y = 0; numCubesPlaced < MAX_DISCRETE_CUBES; y++ ) {
        yDisplacement.setY( yUnitDisplacement.y * y );
        for ( var z = 0; z < cubesFrontToBack && numCubesPlaced < MAX_DISCRETE_CUBES; z++ ) {
          zDisplacement.setXY( zUnitDisplacement.x * ( z + 1), zUnitDisplacement.y * ( z + 1 ) );
          for ( var x = 0; x < cubesAcross && numCubesPlaced < MAX_DISCRETE_CUBES; x++ ) {
            this.discreteObjectList[ numCubesPlaced ].sizeProperty.value = this.referenceObject.sizeProperty.value;
            xDisplacement.setX( xUnitDisplacement.x * x );
            this.discreteObjectList[ numCubesPlaced ].positionProperty.value = new Vector2( compareCubeBackCorner.x + xDisplacement.x + zDisplacement.x + yDisplacement.x,
                compareCubeBackCorner.y + xDisplacement.y + zDisplacement.y + yDisplacement.y );
            numCubesPlaced++;
          }
        }
      }
    },

    createNewReferenceObject: function() {
      // Choose a random size that hasn't been chosen for a while.
      // TODO: Implement
    },

    updateDiscreteObjectVisibility: function( selectedMode, estimateValue ) {
      var targetNumVisibleDiscreteCubes = selectedMode === 'cubes' && this.continuousOrDiscreteProperty.value === 'discrete' ? estimateValue : 0;
      var startIndex = Math.min( this.numVisibleDiscreteCubes, targetNumVisibleDiscreteCubes );
      var endIndex = Math.max( this.numVisibleDiscreteCubes, targetNumVisibleDiscreteCubes );
      var visibility = targetNumVisibleDiscreteCubes > this.numVisibleDiscreteCubes;
      for ( var i = startIndex; i < endIndex && i < MAX_DISCRETE_CUBES; i++ ) {
        this.discreteObjectList[ i ].visibleProperty.value = visibility;
      }
      this.numVisibleDiscreteCubes = targetNumVisibleDiscreteCubes;
    },

    updateContinuousObjectSize: function( estimateValue ) {
      // Set the size of the continuous cube
      this.continuousSizableObject.sizeProperty.value = new Dimension3(
          this.referenceObject.sizeProperty.value.width * Math.pow( estimateValue, 1 / 3 ),
          this.referenceObject.sizeProperty.value.height * Math.pow( estimateValue, 1 / 3 ),
          this.referenceObject.sizeProperty.value.depth * Math.pow( estimateValue, 1 / 3 ) );

      // The following hairy calculation is about figuring out where to
      // position the continuous cube so that its back corner is in the same
      // place as that of the comparison cube.
      this.continuousSizableObject.positionProperty.value = this.compareObject.positionProperty.value.plus(
        new Vector2( ( this.compareObject.sizeProperty.value.depth - this.continuousSizableObject.sizeProperty.value.depth ) * EstimationConstants.DEPTH_PROJECTION_PROPORTION,
          0 ).rotated( EstimationConstants.CUBE_PROJECTION_ANGLE ) );
    }
  } );
} );