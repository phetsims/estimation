// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the 'Estimation' sim.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // imports
  var EstimationModel = require( 'ESTIMATION/model/EstimationModel' );
  var EstimationScreen = require( 'ESTIMATION/view/EstimationScreen' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = require( 'string!ESTIMATION/estimation.name' );

  var simOptions = {
    credits: {
      leadDesign: 'Bryce Gruneich',
      softwareDevelopment: 'John Blanco',
      designTeam: ', Mike Dubson, Karina Hensberry, Ariel Paul, Kathy Perkins'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
      showHomeScreen: false,
      screenIndex: 0
    }, simOptions );
  }

  SimLauncher.launch( function() {

    //Create and start the sim
    new Sim( simTitle, [
      new Screen( simTitle, null,
        function() {return new EstimationModel();},
        function( model ) {return new EstimationScreen( model );},
        { backgroundColor: 'rgb( 255, 248, 186 )' }
      )
    ], simOptions ).start();
  } );
} );