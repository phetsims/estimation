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
  var Image = require( 'SCENERY/nodes/Image' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings and images
  var exploreScreenIcon = require( 'image!ESTIMATION/explore-screen-icon.png' );
  var gameScreenIcon = require( 'image!ESTIMATION/game-screen-icon.png' );
  var simTitle = require( 'string!ESTIMATION/estimation.name' );
  var exploreString = require( 'string!ESTIMATION/explore' );
  var gameString = require( 'string!ESTIMATION/game' );

  var simOptions = {
    credits: {
      leadDesign: 'Bryce Gruneich',
      softwareDevelopment: 'John Blanco',
      team: 'Mike Dubson, Karina K. R. Hensberry, Ariel Paul, Kathy Perkins'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.phetcommon.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
      showHomeScreen: false,
      screenIndex: 0
    }, simOptions );
  }

  SimLauncher.launch( function() {
    //Create and start the sim
    new Sim( simTitle, [
      new Screen( exploreString, new Image( exploreScreenIcon ),
        function() {return new ExploreModel();},
        function( model ) {return new ExploreScreen( model );},
        { backgroundColor: 'rgb( 255, 248, 186 )' }
      ),
      new Screen( gameString, new Image( gameScreenIcon ),
        function() {return new EstimationGameModel();},
        function( model ) {return new EstimationGameScreen( model );},
        { backgroundColor: 'rgb( 255, 248, 186 )' }
      )
    ], simOptions ).start();
  } );
} );