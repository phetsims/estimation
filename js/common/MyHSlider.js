// Copyright 2014-2019, University of Colorado Boulder

/**
 * TODO This is a copy of sun.HSlider, it should be removed.
 */
define( require => {
  'use strict';

  // imports
  const Dimension2 = require( 'DOT/Dimension2' );
  const estimation = require( 'ESTIMATION/estimation' );
  const FillHighlightListener = require( 'SCENERY_PHET/input/FillHighlightListener' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  /**
   * @param {Property<Number>} valueProperty
   * @param {Range} range
   * @param {Object} [options]
   * @constructor
   */
  function MyHSlider( valueProperty, range, options ) {

    const self = this;
    Node.call( self );

    // default options, these will not be passed to supertype
    const defaultOptions = {
      // track
      trackSize: new Dimension2( 100, 5 ),
      trackFill: 'white',
      trackStroke: 'black',
      trackLineWidth: 1,
      // thumb
      thumbSize: new Dimension2( 22, 45 ),
      thumbFillEnabled: 'rgb(50,145,184)',
      thumbFillHighlighted: 'rgb(71,207,255)',
      thumbFillDisabled: '#F0F0F0',
      thumbStroke: 'black',
      thumbLineWidth: 1,
      // ticks
      tickLabelSpacing: 6,
      majorTickLength: 25,
      majorTickStroke: 'black',
      majorTickLineWidth: 1,
      minorTickLength: 10,
      minorTickStroke: 'black',
      minorTickLineWidth: 1,
      // other
      cursor: 'pointer',
      enabledProperty: new Property( true ),
      startDrag: function() {}, // called when a drag sequence starts
      endDrag: function() {} // called when a drag sequence ends
    };

    assert && assert( range instanceof Range, 'range must be of type Range:' + range );

    // fill in options with defaults
    self._options = _.extend( defaultOptions, options );

    // ticks are added to this parent, so they are behind knob
    self._ticksParent = new Node();
    self.addChild( self._ticksParent );

    // mapping between value and track position
    self._valueToPosition = new LinearFunction( range.min, range.max, 0, this._options.trackSize.width, true /* clamp */ );

    // track
    self._track = new Rectangle( 0, 0, self._options.trackSize.width, self._options.trackSize.height,
      { fill: self._options.trackFill, stroke: self._options.trackStroke, lineWidth: self._options.trackLineWidth } );
    self.addChild( self._track );

    function handleTrackEvent( event ) {
      if ( self._options.enabledProperty.get() ) {
        const x = self._track.globalToLocalPoint( event.pointer.point ).x;
        valueProperty.set( self._valueToPosition.inverse( x ) );
      }
    }

    // click in the track to change the value, continue dragging if desired
    const trackHandler = new SimpleDragHandler( {
      start: function( event ) {
        if ( self._options.enabledProperty.get() ) {
          self._options.startDrag();
        }
        handleTrackEvent( event );
      },
      drag: function( event ) {
        handleTrackEvent( event );
      },
      end: function() {
        if ( self._options.enabledProperty.get() ) {
          self._options.endDrag();
        }
      }
    } );
    self._track.addInputListener( trackHandler );

    // thumb, points up
    const arcWidth = 0.25 * this._options.thumbSize.width;
    const thumbFill = self._options.enabledProperty.get() ? self._options.thumbFillEnabled : self._options.thumbFillDisabled;
    const thumb = new Rectangle( -self._options.thumbSize.width / 2, -self._options.thumbSize.height / 2, self._options.thumbSize.width, self._options.thumbSize.height, arcWidth, arcWidth,
      {
        cursor: self._options.cursor,
        fill: thumbFill,
        stroke: self._options.thumbStroke,
        lineWidth: self._options.thumbLineWidth
      } );
    const centerLineYMargin = 3;
    thumb.addChild( new Path( Shape.lineSegment( 0, -( self._options.thumbSize.height / 2 ) + centerLineYMargin, 0, ( self._options.thumbSize.height / 2 ) - centerLineYMargin ), { stroke: 'white' } ) );
    thumb.centerY = self._track.centerY;
    self.addChild( thumb );

    // thumb touch area
    const dx = 0.5 * thumb.width;
    const dy = 0.25 * thumb.height;
    thumb.touchArea = Shape.rectangle( ( -thumb.width / 2 ) - dx, ( -thumb.height / 2 ) - dy, thumb.width + dx + dx, thumb.height + dy + dy );

    // highlight on mouse enter
    thumb.addInputListener( new FillHighlightListener( self._options.thumbFillEnabled, self._options.thumbFillHighlighted, self._options.enabledProperty ) );

    let clickXOffset; // x-offset between initial click and thumb's origin

    // update value when thumb is dragged
    const thumbHandler = new SimpleDragHandler( {
      allowTouchSnag: true,
      start: function( event ) {
        if ( self._options.enabledProperty.get() ) {
          self._options.startDrag();
        }
        clickXOffset = thumb.globalToParentPoint( event.pointer.point ).x - thumb.x;
      },
      drag: function( event ) {
        if ( self._options.enabledProperty.get() ) {
          const x = thumb.globalToParentPoint( event.pointer.point ).x - clickXOffset;
          valueProperty.set( self._valueToPosition.inverse( x ) );
        }
      },
      end: function() {
        if ( self._options.enabledProperty.get() ) {
          self._options.endDrag();
        }
      }
    } );
    thumb.addInputListener( thumbHandler );

    // enable/disable thumb
    self._options.enabledProperty.link( function( enabled ) {
      thumb.fill = enabled ? self._options.thumbFillEnabled : self._options.thumbFillDisabled;
      thumb.cursor = enabled ? 'pointer' : 'default';
      if ( !enabled ) {
        if ( thumbHandler.dragging ) { thumbHandler.interrupt(); }
        if ( trackHandler.dragging ) { trackHandler.interrupt(); }
      }
    } );

    // update thumb location when value changes
    valueProperty.link( function( value ) {
      thumb.centerX = self._valueToPosition( value );
    } );

    self.mutate( _.omit( self._options, Object.keys( defaultOptions ) ) );
  }

  estimation.register( 'MyHSlider', MyHSlider );

  return inherit( Node, MyHSlider, {

    /**
     * Adds a major tick mark.
     * @param {number} value
     * @param {Node} label optional
     */
    addMajorTick: function( value, label ) {
      this._addTick( value, label, this._options.majorTickLength, this._options.majorTickStroke, this._options.majorTickLineWidth );
    },

    /**
     * Adds a minor tick mark.
     * @param {number} value
     * @param {Node} label optional
     */
    addMinorTick: function( value, label ) {
      this._addTick( value, label, this._options.minorTickLength, this._options.minorTickStroke, this._options.minorTickLineWidth );
    },

    setRange: function( range ) {

    },

    /*
     * Adds a tick mark above the track.
     * @param {number} value
     * @param {Node} label optional
     * @param {number} length
     * @param {number} stroke
     * @param {number} lineWidth
     */
    _addTick: function( value, label, length, stroke, lineWidth ) {
      const labelX = this._valueToPosition( value );
      // ticks
      const tick = new Path( new Shape()
          .moveTo( labelX, this._track.top )
          .lineTo( labelX, this._track.top - length ),
        { stroke: stroke, lineWidth: lineWidth } );
      this._ticksParent.addChild( tick );
      // label
      if ( label ) {
        this._ticksParent.addChild( label );
        label.centerX = tick.centerX;
        label.bottom = tick.top - this._options.tickLabelSpacing;
      }
    }
  } );
} );