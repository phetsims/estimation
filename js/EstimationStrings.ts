// Copyright 2020-2024, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

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
