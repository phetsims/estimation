// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Estimation' sim.
 *
 * @author John Blanco
 */

import Property from '../../axon/js/Property.js';
import Screen from '../../joist/js/Screen.js';
import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import Image from '../../scenery/js/nodes/Image.js';
import exploreScreenIcon from '../images/explore-screen-icon_png.js';
import gameScreenIcon from '../images/game-screen-icon_png.js';
import estimationStrings from './estimation-strings.js';
import ExploreModel from './explore/model/ExploreModel.js';
import ExploreScreenView from './explore/view/ExploreScreenView.js';
import EstimationGameModel from './game/model/EstimationGameModel.js';
import EstimationGameScreenView from './game/view/EstimationGameScreenView.js';

// strings and images
const estimationTitleString = estimationStrings.estimation.title;
const exploreString = estimationStrings.explore;
const gameString = estimationStrings.game;

const simOptions = {
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