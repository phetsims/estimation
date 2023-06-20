// Copyright 2020-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
import estimation from './estimation.js';

type StringsType = {
  'estimation': {
    'title': string;
    'titleStringProperty': LocalizedStringProperty;
  };
  'explore': string;
  'exploreStringProperty': LocalizedStringProperty;
  'game': string;
  'gameStringProperty': LocalizedStringProperty;
  'newObject': string;
  'newObjectStringProperty': LocalizedStringProperty;
};

const EstimationStrings = getStringModule( 'ESTIMATION' ) as StringsType;

estimation.register( 'EstimationStrings', EstimationStrings );

export default EstimationStrings;
