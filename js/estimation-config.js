// Copyright 2002-2014, University of Colorado Boulder

/*
 * RequireJS configuration file for the Estimation' sim. Paths are relative to
 * the location of this file.
 *
 * @author John Blanco
 */

require.config( {

  deps: ['estimation-main'],

  paths: {

    // third-party libs
    text: '../../sherpa/text',

    // PhET plugins
    image: '../../chipper/requirejs-plugins/image',
    string: '../../chipper/requirejs-plugins/string',

    // PhET libs, uppercase names to identify them in require.js imports
    ASSERT: '../../assert/js',
    AXON: '../../axon/js',
    DOT: '../../dot/js',
    JOIST: '../../joist/js',
    KITE: '../../kite/js',
    PHET_CORE: '../../phet-core/js',
    PHETCOMMON: '../../phetcommon/js',
    SCENERY: '../../scenery/js',
    SCENERY_PHET: '../../scenery-phet/js',
    SUN: '../../sun/js',
    VIBE: '../../vibe/js',
    VEGAS: '../../vegas/js',

    // this sim
    ESTIMATION: '.'
  },

  urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts
} );
