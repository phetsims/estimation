// Copyright 2014-2020, University of Colorado Boulder


import ScreenView from '../../../../joist/js/ScreenView.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import screenshot1Image from '../../../images/screenshot-01-temp_jpg.js';
import EstimationConstants from '../../common/EstimationConstants.js';
import estimation from '../../estimation.js';

function EstimationGameScreenView() {
  ScreenView.call( this, { layoutBounds: EstimationConstants.LAYOUT_BOUNDS } );

  // TODO: Temp for quick demo
  this.addChild( new Image( screenshot1Image, {
    scale: 0.75,
    centerX: this.layoutBounds.centerX,
    centerY: this.layoutBounds.centerY
  } ) );
}

estimation.register( 'EstimationGameScreenView', EstimationGameScreenView );

inherit( ScreenView, EstimationGameScreenView, {
  //TODO prototypes
} );

export default EstimationGameScreenView;