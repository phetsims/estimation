// Copyright 2014-2025, University of Colorado Boulder

/**
 * @author John Blanco (PhET Interactive Simulations)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import screenshot01Temp_jpg from '../../../images/screenshot01Temp_jpg.js';
import EstimationConstants from '../../common/EstimationConstants.js';
import estimation from '../../estimation.js';

class EstimationGameScreenView extends ScreenView {

  constructor() {
    super( { layoutBounds: EstimationConstants.LAYOUT_BOUNDS } );

    // TODO: Temp for quick demo https://github.com/phetsims/tasks/issues/1129
    this.addChild( new Image( screenshot01Temp_jpg, {
      scale: 0.75,
      centerX: this.layoutBounds.centerX,
      centerY: this.layoutBounds.centerY
    } ) );
  }
}

estimation.register( 'EstimationGameScreenView', EstimationGameScreenView );
export default EstimationGameScreenView;