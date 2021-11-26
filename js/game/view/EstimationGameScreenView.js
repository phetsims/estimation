// Copyright 2014-2020, University of Colorado Boulder

import ScreenView from '../../../../joist/js/ScreenView.js';
import { Image } from '../../../../scenery/js/imports.js';
import screenshot1Image from '../../../images/screenshot-01-temp_jpg.js';
import EstimationConstants from '../../common/EstimationConstants.js';
import estimation from '../../estimation.js';

class EstimationGameScreenView extends ScreenView {

  constructor() {
    super( { layoutBounds: EstimationConstants.LAYOUT_BOUNDS } );

    // TODO: Temp for quick demo
    this.addChild( new Image( screenshot1Image, {
      scale: 0.75,
      centerX: this.layoutBounds.centerX,
      centerY: this.layoutBounds.centerY
    } ) );
  }
}

estimation.register( 'EstimationGameScreenView', EstimationGameScreenView );
export default EstimationGameScreenView;