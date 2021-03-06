// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Estimation' sim.
 *
 * @author John Blanco
 */

import Property from '../../axon/js/Property.js';
import Screen from '../../joist/js/Screen.js';
import ScreenIcon from '../../joist/js/ScreenIcon.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Image from '../../scenery/js/nodes/Image.js';
import exploreScreenIcon from '../images/explore-screen-icon_png.js';
import gameScreenIcon from '../images/game-screen-icon_png.js';
import estimationStrings from './estimationStrings.js';
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

simLauncher.launch( () => {

  //Create and start the sim
  new Sim( estimationTitleString, [

    // Explore screen
    new Screen(
      () => new ExploreModel(),
      model => new ExploreScreenView( model ),
      {
        name: exploreString,
        backgroundColorProperty: new Property( 'rgb( 255, 248, 186 )' ),
        homeScreenIcon: new ScreenIcon( new Image( exploreScreenIcon ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } )
      }
    ),

    // Game screen
    new Screen(
      () => new EstimationGameModel(),
      model => new EstimationGameScreenView( model ),
      {
        name: gameString,
        backgroundColorProperty: new Property( 'rgb( 255, 248, 186 )' ),
        homeScreenIcon: new ScreenIcon( new Image( gameScreenIcon ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } )
      }
    )
  ], simOptions ).start();
} );