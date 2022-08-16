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
    'titleProperty': TReadOnlyProperty<string>;
  };
  'explore': string;
  'exploreProperty': TReadOnlyProperty<string>;
  'game': string;
  'gameProperty': TReadOnlyProperty<string>;
  'newObject': string;
  'newObjectProperty': TReadOnlyProperty<string>;
};

const estimationStrings = getStringModule( 'ESTIMATION' ) as StringsType;

estimation.register( 'estimationStrings', estimationStrings );

export default estimationStrings;
