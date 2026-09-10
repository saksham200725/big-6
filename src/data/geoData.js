// Hierarchical Geographic Architecture
// National (India) -> State (Punjab or any state) -> District (Patiala) -> Municipal Ward (Ward 04)

import { indiaNationalGeoJson } from './indiaNationalGeoJson.js';
import { indiaStatesGeoJson } from './indiaStatesGeoJson.js';
import { punjabDistrictsGeoJson } from './punjabDistrictsGeoJson.js';
import { patialaWardsGeoJson } from './patialaWardsGeoJson.js';
import { STATE_PRESETS } from './statePresets.js';

export {
  indiaNationalGeoJson,
  indiaStatesGeoJson,
  punjabDistrictsGeoJson,
  patialaWardsGeoJson,
  STATE_PRESETS
};

export const DRILLDOWN_LEVELS = {
  INDIA: 'india',
  STATE: 'state',
  PUNJAB: 'punjab',
  PATIALA: 'patiala',
  WARD_04: 'ward-04'
};

export const CAMERA_PRESETS = {
  [DRILLDOWN_LEVELS.INDIA]: {
    center: [78.9629, 22.8000],
    zoom: 4.5,
    pitch: 0
  },
  [DRILLDOWN_LEVELS.PUNJAB]: {
    center: [75.4000, 31.0000],
    zoom: 7.4,
    pitch: 0
  },
  [DRILLDOWN_LEVELS.PATIALA]: {
    center: [76.3860, 30.3400],
    zoom: 11.2,
    pitch: 0
  },
  [DRILLDOWN_LEVELS.WARD_04]: {
    center: [76.3750, 30.3340],
    zoom: 13.8,
    pitch: 0
  }
};
