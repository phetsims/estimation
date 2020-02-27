// Copyright 2014-2019, University of Colorado Boulder


import inherit from '../../../../phet-core/js/inherit.js';
import estimation from '../../estimation.js';

function EstimationGameModel() {
}

estimation.register( 'EstimationGameModel', EstimationGameModel );

export default inherit( Object, EstimationGameModel, {
  step: function() {}
} );