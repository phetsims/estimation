// Copyright 2014-2017, University of Colorado Boulder

/**
 * Main entry point for the 'Estimation' sim.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // imports
  const EstimationGameModel = require( 'ESTIMATION/game/model/EstimationGameModel' );
  const EstimationGameScreenView = require( 'ESTIMATION/game/view/EstimationGameScreenView' );
  const ExploreModel = require( 'ESTIMATION/explore/model/ExploreModel' );
  const ExploreScreenView = require( 'ESTIMATION/explore/view/ExploreScreenView' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );

  // strings and images
  const estimationTitleString = require( 'string!ESTIMATION/estimation.title' );
  const exploreScreenIcon = require( 'image!ESTIMATION/explore-screen-icon.png' );
  const exploreString = require( 'string!ESTIMATION/explore' );
  const gameScreenIcon = require( 'image!ESTIMATION/game-screen-icon.png' );
  const gameString = require( 'string!ESTIMATION/game' );

  var simOptions = {
    credits: {
      leadDesign: 'Bryce Gruneich',
      softwareDevelopment: 'John Blanco',
      team: 'Michael Dubson, Karina K. R. Hensberry, Ariel Paul, Kathy Perkins'
    }
  };

  SimLauncher.launch( function() {

    //Create and start the sim
    new Sim( estimationTitleString, [

      // Explore screen
      new Screen(
        function() {return new ExploreModel();},
        function( model ) {return new ExploreScreenView( model );},
        {
          name: exploreString,
          backgroundColorProperty: new Property( 'rgb( 255, 248, 186 )' ),
          homeScreenIcon: new Image( exploreScreenIcon )
        }
      ),

      // Game screen
      new Screen(
        function() {return new EstimationGameModel();},
        function( model ) {return new EstimationGameScreenView( model );},
        {
          name: gameString,
          backgroundColorProperty: new Property( 'rgb( 255, 248, 186 )' ),
          homeScreenIcon: new Image( gameScreenIcon )
        }
      )
    ], simOptions ).start();
  } );
} );
