// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the 'Estimation' sim.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // imports
  var ExploreModel = require( 'ESTIMATION/explore/model/ExploreModel' );
  var ExploreScreen = require( 'ESTIMATION/explore/view/ExploreScreen' );
  var EstimationGameModel = require( 'ESTIMATION/game/model/EstimationGameModel' );
  var EstimationGameScreen = require( 'ESTIMATION/game/view/EstimationGameScreen' );
  var Rectangle = require( 'SCENERY/nodes/rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = require( 'string!ESTIMATION/estimation.name' );
  var exploreString = require( 'string!ESTIMATION/explore' );
  var gameString = require( 'string!ESTIMATION/game' );

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
    new Sim( exploreString, [
      new Screen( simTitle, new Rectangle( 0, 0, 100, 100, 0, 0, { fill: 'green' } ),
        function() {return new ExploreModel();},
        function( model ) {return new ExploreScreen( model );},
        { backgroundColor: 'rgb( 255, 248, 186 )' }
      ),
      new Screen( gameString, new Rectangle( 0, 0, 100, 100, 0, 0, { fill: 'blue' } ),
        function() {return new EstimationGameModel();},
        function( model ) {return new EstimationGameScreen( model );},
        { backgroundColor: 'rgb( 255, 248, 186 )' }
      )
    ], simOptions ).start();
  } );
} );