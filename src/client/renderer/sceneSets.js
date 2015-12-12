import GameMenu from '../../components/GameMenu';
import createEarth from './meshBuilders/earth';
import createGalaxy from './meshBuilders/galaxy';
import createEarthLines from './meshBuilders/earthLines';
import createAmbientBlack from './lightBuilders/ambientBlack';
import createSunny from './lightBuilders/sunny';
import MapControls from './controls/MapControls';

export default {
  map: {
    name: 'map',
    Controls: MapControls,
    guiComponents: [GameMenu],
    builders: [createEarth, createGalaxy, createEarthLines, createAmbientBlack, createSunny],
  },
  world: {
    name: 'world',
    Controls: MapControls,
    guiComponents: [GameMenu],
    builders: [createAmbientBlack, createSunny],
  }
};
