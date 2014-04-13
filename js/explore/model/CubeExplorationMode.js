// Copyright 2002-2014, University of Colorado Boulder

/**
 * Definition of the 'cube exploration mode' for the exploration model.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var CubeModel = require( 'ESTIMATION/common/model/CubeModel' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Dimension3 = require( 'ESTIMATION/common/model/Dimension3' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var LineModel = require( 'ESTIMATION/common/model/LineModel' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var MAX_DISCRETE_CUBES = 100;

  /**
   * @constructor
   */
  function CubeExplorationMode( modeProperty, cubesArray ) {
    var thisMode = this;

    // Properties that are part of the public API.
    this.estimateProperty = new Property( 1 );
    this.continuousOrDiscreteProperty = new Property( 'continuous' );

    // Storage for this mode's estimate parameters for when the mode is inactive.
    this.selectedRange = EstimationConstants.RANGE_1_TO_10;
    this.offsetIntoRange = 0;

    var referenceCube = new CubeModel( new Dimension3( 0.25, 0.25, 0.25 ), new Vector2( -2.0, 0.5 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    var compareCubePosition = new Vector2( -1, 0 );
    var compareCube = new CubeModel( new Dimension3( 1, 1, 1 ), compareCubePosition, new Color( EstimationConstants.COMPARISON_OBJECT_COLOR ).setAlpha( 0.5 ), false, false );
    var continuousSizableCube = new CubeModel( new Dimension3( 0.25, 0.25, 0.25 ), compareCubePosition, EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    var discreteSizableCubes = [];
    _.times( MAX_DISCRETE_CUBES, function() {
      discreteSizableCubes.push( new CubeModel( new Dimension3( 0.25, 0.25, 0.25 ), Vector2.ZERO, EstimationConstants.REFERENCE_OBJECT_COLOR, true, false ) );
    } );
    var numVisibleDiscreteCubes = 0;

    function updateCubeVisibility() {
      var estimationMode = modeProperty.value;
      var comparisonType = thisMode.continuousOrDiscreteProperty.value;
      referenceCube.visibleProperty.value = estimationMode === 'cubes';
      compareCube.visibleProperty.value = estimationMode === 'cubes';
      continuousSizableCube.visibleProperty.value = estimationMode === 'cubes' && thisMode.continuousOrDiscreteProperty.value === 'continuous';
      var targetNumVisibleDiscreteCubes = estimationMode === 'cubes' && thisMode.continuousOrDiscreteProperty.value === 'discrete' ? thisMode.estimateProperty.value : 0;
      var startIndex = Math.min( numVisibleDiscreteCubes, targetNumVisibleDiscreteCubes );
      var endIndex = Math.max( numVisibleDiscreteCubes, targetNumVisibleDiscreteCubes );
      var visibility = targetNumVisibleDiscreteCubes > numVisibleDiscreteCubes;
      for ( var i = startIndex; i < endIndex && i < MAX_DISCRETE_CUBES; i++ ) {
        discreteSizableCubes[ i ].visibleProperty.value = visibility;
      }
      numVisibleDiscreteCubes = targetNumVisibleDiscreteCubes;
    }

    modeProperty.link( function() {
      updateCubeVisibility();
    } );

    this.continuousOrDiscreteProperty.link( function() {
      updateCubeVisibility();
    } );

    this.estimateProperty.link( function( estimateValue ) {
      // Handle the discrete cubes by changing which ones are visible.
      if ( thisMode.continuousOrDiscreteProperty.value === 'discrete' ) {
        updateCubeVisibility();
      }

      // Set the size of the continuous cube
      continuousSizableCube.sizeProperty.value = new Dimension3(
        referenceCube.sizeProperty.value.width * Math.pow( estimateValue, 1 / 3 ),
        referenceCube.sizeProperty.value.height * Math.pow( estimateValue, 1 / 3 ),
        referenceCube.sizeProperty.value.depth * Math.pow( estimateValue, 1 / 3 ) );

      // The following hairy calculation is about figuring out where to
      // position the continuous cube so that its back corner is in the same
      // place as that of the comparison cube.
      continuousSizableCube.positionProperty.value = compareCube.positionProperty.value.plus(
        new Vector2( ( compareCube.sizeProperty.value.depth - continuousSizableCube.sizeProperty.value.depth ) * EstimationConstants.DEPTH_PROJECTION_PROPORTION,
          0 ).rotated( EstimationConstants.CUBE_PROJECTION_ANGLE ) );
    } );

    // Size and position the discrete cubes TODO: Will need to be linked to reference object size.
    var cubesAcross = compareCube.sizeProperty.value.width / referenceCube.sizeProperty.value.width;
    var cubesFrontToBack = compareCube.sizeProperty.value.depth / referenceCube.sizeProperty.value.depth;
    var numCubesPlaced = 0;
    var compareCubeBackCorner = compareCube.positionProperty.value.plus( new Vector2( ( compareCube.sizeProperty.value.depth ) * EstimationConstants.DEPTH_PROJECTION_PROPORTION, 0 ).rotated( EstimationConstants.CUBE_PROJECTION_ANGLE ) );
    var xUnitDisplacement = new Vector2( referenceCube.sizeProperty.value.width, 0 );
    var yUnitDisplacement = new Vector2( 0, referenceCube.sizeProperty.value.height );
    var zUnitDisplacement = new Vector2( -referenceCube.sizeProperty.value.depth * EstimationConstants.DEPTH_PROJECTION_PROPORTION, 0 ).rotated( EstimationConstants.CUBE_PROJECTION_ANGLE );
    var xDisplacement = new Vector2( 0, 0 );
    var yDisplacement = new Vector2( 0, 0 );
    var zDisplacement = new Vector2( 0, 0 );
    for ( var y = 0; numCubesPlaced < MAX_DISCRETE_CUBES; y++ ) {
      yDisplacement.setY( yUnitDisplacement.y * y );
      for ( var z = 0; z < cubesFrontToBack && numCubesPlaced < MAX_DISCRETE_CUBES; z++ ) {
        zDisplacement.setXY( zUnitDisplacement.x * ( z + 1), zUnitDisplacement.y * ( z + 1 ) );
        for ( var x = 0; x < cubesAcross && numCubesPlaced < MAX_DISCRETE_CUBES; x++ ) {
          discreteSizableCubes[ numCubesPlaced ].sizeProperty.value = referenceCube.sizeProperty.value;
          xDisplacement.setX( xUnitDisplacement.x * x );
          discreteSizableCubes[ numCubesPlaced ].positionProperty.value = new Vector2( compareCubeBackCorner.x + xDisplacement.x + zDisplacement.x + yDisplacement.x,
            compareCubeBackCorner.y + xDisplacement.y + zDisplacement.y + yDisplacement.y );
          numCubesPlaced++;
        }
      }
    }

    // Add the cubes.  Order matters, as it determines z-order layering in the view.
    cubesArray.push( referenceCube );
    cubesArray.push( continuousSizableCube );
    _.times( discreteSizableCubes.length, function( i ) { cubesArray.push( discreteSizableCubes[i ] ) } );
    cubesArray.push( compareCube );

    // Make comparison cube visible externally so that the back can be portrayed in the view.
    this.compareCube = compareCube;
  }

  return CubeExplorationMode;

} );