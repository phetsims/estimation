// Copyright 2014-2015, University of Colorado Boulder

/**
 * Main entry point for the 'Estimation' sim.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // imports
  var ExploreModel = require( 'ESTIMATION/explore/model/ExploreModel' );
  var ExploreScreenView = require( 'ESTIMATION/explore/view/ExploreScreenView' );
  var EstimationGameModel = require( 'ESTIMATION/game/model/EstimationGameModel' );
  var EstimationGameScreenView = require( 'ESTIMATION/game/view/EstimationGameScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Property = require( 'AXON/Property' );
  var Color = require( 'SCENERY/util/Color' );

  // strings and images
  var exploreScreenIcon = require( 'image!ESTIMATION/explore-screen-icon.png' );
  var gameScreenIcon = require( 'image!ESTIMATION/game-screen-icon.png' );
  var estimationTitleString = require( 'string!ESTIMATION/estimation.title' );
  var exploreString = require( 'string!ESTIMATION/explore' );
  var gameString = require( 'string!ESTIMATION/game' );

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
          backgroundColorProperty: new Property( Color.toColor( 'rgb( 255, 248, 186 )' ) ),
          homeScreenIcon: new Image( exploreScreenIcon )
        }
      ),

      // Game screen
      new Screen(
        function() {return new EstimationGameModel();},
        function( model ) {return new EstimationGameScreenView( model );},
        {
          name: gameString,
          backgroundColorProperty: new Property( Color.toColor( 'rgb( 255, 248, 186 )' ) ),
          homeScreenIcon: new Image( gameScreenIcon )
        }
      )
    ], simOptions ).start();
  } );
} );