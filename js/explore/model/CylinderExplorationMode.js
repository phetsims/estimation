// Copyright 2014-2018, University of Colorado Boulder

/**
 * Definition of the 'cylinder exploration mode' for the exploration model.
 */
define( require => {
  'use strict';

  // modules
  const AbstractExplorationMode = require( 'ESTIMATION/explore/model/AbstractExplorationMode' );
  const Color = require( 'SCENERY/util/Color' );
  const CylinderModel = require( 'ESTIMATION/common/model/CylinderModel' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const estimation = require( 'ESTIMATION/estimation' );
  const EstimationConstants = require( 'ESTIMATION/common/EstimationConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  var MAX_CYLINDER_SLICES = 100;
  var MODE_NAME = 'cylinders';
  var REFERENCE_CYLINDER_WIDTH = 1.5;
  var COMPARE_CYLINDER_SIZE = new Dimension2( REFERENCE_CYLINDER_WIDTH, 2 );
  var VALID_REF_OBJECT_SIZES = [
    new Dimension2( REFERENCE_CYLINDER_WIDTH, COMPARE_CYLINDER_SIZE.height / 50 ),
    new Dimension2( REFERENCE_CYLINDER_WIDTH, COMPARE_CYLINDER_SIZE.height / 20 ),
    new Dimension2( REFERENCE_CYLINDER_WIDTH, COMPARE_CYLINDER_SIZE.height / 15 ),
    new Dimension2( REFERENCE_CYLINDER_WIDTH, COMPARE_CYLINDER_SIZE.height / 10 ),
    new Dimension2( REFERENCE_CYLINDER_WIDTH, COMPARE_CYLINDER_SIZE.height / 5 ),
    new Dimension2( REFERENCE_CYLINDER_WIDTH, COMPARE_CYLINDER_SIZE.height / 3 ),
    new Dimension2( REFERENCE_CYLINDER_WIDTH, COMPARE_CYLINDER_SIZE.height / 2 )
  ];
  var INITIAL_REFERENCE_OBJECT_SIZE = VALID_REF_OBJECT_SIZES[ 2 ];

  /**
   * @constructor
   */
  function CylinderExplorationMode( selectedModeProperty ) {
    AbstractExplorationMode.call( this, selectedModeProperty, MODE_NAME );
    var self = this;

    // Create the reference, compare, continuous, and discrete objects.
    var compareCylinderPosition = new Vector2( 0.75, -0.5 );
    this.compareObject = new CylinderModel( COMPARE_CYLINDER_SIZE, compareCylinderPosition, new Color( EstimationConstants.COMPARISON_OBJECT_COLOR ).setAlpha( 0.5 ), false, false );
    this.continuousSizableObject = new CylinderModel( new Dimension2( 2, 1 ), compareCylinderPosition, EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    this.referenceObject = new CylinderModel( INITIAL_REFERENCE_OBJECT_SIZE, new Vector2( -2.0, 0 ), EstimationConstants.REFERENCE_OBJECT_COLOR, false, false );
    _.times( MAX_CYLINDER_SLICES, function() {
      // Initial size is arbitrary, will be sized as needed.
      self.discreteObjectList.push( new CylinderModel( new Dimension2( 1.0, 1.0 ), Vector2.ZERO, EstimationConstants.REFERENCE_OBJECT_COLOR, true, false ) );
    } );
    this.setReferenceObjectSize( INITIAL_REFERENCE_OBJECT_SIZE );
    this.numVisibleDiscreteCylinders = 0;

    // Complete initialization by hooking up visibility updates in the parent class.
    this.hookUpVisibilityUpdates();

    // Maintain a short history of reference object sizes so unique ones can be chosen.
    this.previousReferenceObjectSize = INITIAL_REFERENCE_OBJECT_SIZE;
  }

  estimation.register( 'CylinderExplorationMode', CylinderExplorationMode );

  return inherit( AbstractExplorationMode, CylinderExplorationMode, {

    setReferenceObjectSize: function( size ) {
      this.referenceObject.sizeProperty.value = size;

      // Size and position the discrete cylinder slices based on the sizes of
      // the reference cube and the compare cylinder.
      var cylindersPerRow = this.compareObject.sizeProperty.value.width / this.referenceObject.sizeProperty.value.width;
      var numRows = this.discreteObjectList.length / cylindersPerRow;
      var origin = this.compareObject.positionProperty.value;
      for ( var i = 0; i < numRows; i++ ) {
        for ( var j = 0; j < cylindersPerRow; j++ ) {
          var index = i * cylindersPerRow + j;
          this.discreteObjectList[ index ].sizeProperty.value = this.referenceObject.sizeProperty.value;
          this.discreteObjectList[ index ].positionProperty.value = new Vector2( origin.x + j * this.referenceObject.sizeProperty.value.width,
            origin.y + i * this.referenceObject.sizeProperty.value.height );
        }
      }

      // Set the initial size of the continuous object.
      this.updateContinuousObjectSize( this.estimateProperty.value );
    },

    newReferenceObject: function() {
      // Choose a random size that hasn't been chosen for a while.
      var unique = false;
      var referenceObjectSize = null;
      while ( !unique ) {
        referenceObjectSize = VALID_REF_OBJECT_SIZES[ Math.floor( phet.joist.random.nextDouble() * VALID_REF_OBJECT_SIZES.length ) ];
        unique = ( referenceObjectSize !== this.previousReferenceObjectSize && referenceObjectSize !== this.referenceObject.size );
      }
      this.previousReferenceObjectSize = referenceObjectSize;
      this.setReferenceObjectSize( referenceObjectSize );
    },

    setInitialReferenceObject: function() {
      this.setReferenceObjectSize( INITIAL_REFERENCE_OBJECT_SIZE );
    },

    updateDiscreteObjectVisibility: function( selectedMode, estimateValue ) {
      var targetNumVisibleDiscreteCylinders = selectedMode === 'cylinders' && this.continuousOrDiscreteProperty.value === 'discrete' ? this.estimateProperty.value : 0;
      var startIndex = Math.min( this.numVisibleDiscreteCylinders, targetNumVisibleDiscreteCylinders );
      var endIndex = Math.max( this.numVisibleDiscreteCylinders, targetNumVisibleDiscreteCylinders );
      var visibility = targetNumVisibleDiscreteCylinders > this.numVisibleDiscreteCylinders;
      for ( var i = startIndex; i < endIndex && i < MAX_CYLINDER_SLICES; i++ ) {
        this.discreteObjectList[ i ].visibleProperty.value = visibility;
      }
      this.numVisibleDiscreteCylinders = targetNumVisibleDiscreteCylinders;
    },

    updateContinuousObjectSize: function( estimateValue ) {
      this.continuousSizableObject.sizeProperty.value = new Dimension2( this.referenceObject.sizeProperty.value.width,
        this.referenceObject.sizeProperty.value.height * estimateValue );
    }
  } );

} );