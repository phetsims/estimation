// Copyright 2020-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import estimation from './estimation.js';

type StringsType = {
  'estimation': {
    'title': string;
    'titleStringProperty': TReadOnlyProperty<string>;
  };
  'explore': string;
  'exploreStringProperty': TReadOnlyProperty<string>;
  'game': string;
  'gameStringProperty': TReadOnlyProperty<string>;
  'newObject': string;
  'newObjectStringProperty': TReadOnlyProperty<string>;
};

const EstimationStrings = getStringModule( 'ESTIMATION' ) as StringsType;

estimation.register( 'EstimationStrings', EstimationStrings );

export default EstimationStrings;
