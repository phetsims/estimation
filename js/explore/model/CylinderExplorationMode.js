// Copyright 2002-2014, University of Colorado Boulder

/**
 * Definition of the 'cylinder exploration mode' for the exploration model.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var CylinderModel = require( 'ESTIMATION/common/model/CylinderModel' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Dimension3 = require( 'ESTIMATION/common/model/Dimension3' );
  var EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  var LineModel = require( 'ESTIMATION/common/model/LineModel' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var MAX_CYLINDER_SLICES = 100;

  /**
   * @constructor
   */
  function CylinderExplorationMode( modeProperty, cylindersArray ) {
    var thisMode = this;

    // Properties that are part of the public API.
    this.estimateProperty = new Property( 1 );
    this.continuousOrDiscreteProperty = new Property( 'continuous' );

    // Storage for this mode's estimate parameters for when the mode is inactive.
    this.selectedRange = EstimationConstants.RANGE_1_TO_10;
    this.offsetIntoRange = 0;

    var refCylinderWidth = 1.5;
    var referenceCylinder = new CylinderModel( new Dimension2( refCylinderWidth, 0.25 ), new Vector2( -2.0, 0.5 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    var compareCylinderPosition = new Vector2( 1, 0 );
    var compareCylinder = new CylinderModel( new Dimension2( refCylinderWidth, 2.0 ), compareCylinderPosition, new Color( EstimationConstants.COMPARISON_OBJECT_COLOR ).setAlpha( 0.5 ), false, false );
    var continuousSizableCylinder = new CylinderModel( new Dimension2( 2, 1 ), compareCylinderPosition, EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    var discreteSizableCylinders = [];
    _.times( MAX_CYLINDER_SLICES, function() {
      discreteSizableCylinders.push( new CylinderModel( new Dimension2( 1.0, 1.0 ), Vector2.ZERO, EstimationConstants.REFERENCE_OBJECT_COLOR, true, false ) );
    } );

    var numVisibleDiscreteCylinders = 0;

    function updateCylinderVisibility() {
      var estimationMode = modeProperty.value;
      var continuousOrDiscrete = thisMode.continuousOrDiscreteProperty.value;
      referenceCylinder.visibleProperty.value = estimationMode === 'cylinders';
      compareCylinder.visibleProperty.value = estimationMode === 'cylinders';
      continuousSizableCylinder.visibleProperty.value = estimationMode === 'cylinders' && continuousOrDiscrete === 'continuous';
      var targetNumVisibleDiscreteCylinders = estimationMode === 'cylinders' && continuousOrDiscrete === 'discrete' ? thisMode.estimateProperty.value : 0;
      var startIndex = Math.min( numVisibleDiscreteCylinders, targetNumVisibleDiscreteCylinders );
      var endIndex = Math.max( numVisibleDiscreteCylinders, targetNumVisibleDiscreteCylinders );
      var visibility = targetNumVisibleDiscreteCylinders > numVisibleDiscreteCylinders;
      for ( var i = startIndex; i < endIndex && i < MAX_CYLINDER_SLICES; i++ ) {
        discreteSizableCylinders[ i ].visibleProperty.value = visibility;
      }
      numVisibleDiscreteCylinders = targetNumVisibleDiscreteCylinders;
    }

    modeProperty.link( function() {
      updateCylinderVisibility();
    } );

    this.continuousOrDiscreteProperty.link( function() {
      updateCylinderVisibility();
    } );

    this.estimateProperty.link( function( estimateValue ) {

      // Handle the discrete cylinders by changing which ones are visible.
      if ( thisMode.continuousOrDiscreteProperty.value === 'discrete' ) {
        updateCylinderVisibility();
      }

      // Size the continuous cylinder
      continuousSizableCylinder.sizeProperty.value = new Dimension2( referenceCylinder.sizeProperty.value.width,
        referenceCylinder.sizeProperty.value.height * estimateValue );
    } );

    // Size and position the discrete cylinders TODO: Will need to be linked to reference object size.
    var cylindersPerRow = compareCylinder.sizeProperty.value.width / referenceCylinder.sizeProperty.value.width;
    var numRows = discreteSizableCylinders.length / cylindersPerRow;
    var origin = compareCylinder.positionProperty.value;
    for ( var i = 0; i < numRows; i++ ) {
      for ( var j = 0; j < cylindersPerRow; j++ ) {
        var index = i * cylindersPerRow + j;
        discreteSizableCylinders[ index ].sizeProperty.value = referenceCylinder.sizeProperty.value;
        discreteSizableCylinders[ index ].positionProperty.value = new Vector2( origin.x + j * referenceCylinder.sizeProperty.value.width,
          origin.y + i * referenceCylinder.sizeProperty.value.height );
      }
    }

    // Add the cylinders.  Order matters, as it determines z-order layering in view.
    cylindersArray.push( referenceCylinder );
    cylindersArray.push( continuousSizableCylinder );
    _.times( discreteSizableCylinders.length, function( i ) { cylindersArray.push( discreteSizableCylinders[i ] ) } );
    cylindersArray.push( compareCylinder );
  }

  return CylinderExplorationMode;

} );