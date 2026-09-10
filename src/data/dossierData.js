// Public Health & Thermal Risk Intelligence Dossier Telemetry
// Structured for: National (India) -> State (Punjab or others) -> District (Patiala) -> Municipal Ward (Ward 04)

import { DRILLDOWN_LEVELS } from './geoData';

export const DOSSIER_DATA = {
  [DRILLDOWN_LEVELS.INDIA]: {
    superTitle: 'NATIONAL CLIMATE RISK ASSESSMENT',
    mainTitle: 'India Heat Vulnerability Overview',
    stageBadge: 'NATIONAL WATCH',
    badgeClass: 'yellow',
    weather: {
      dryBulb: '41.2°C',
      anomaly: '+3.1°C national average',
      humidity: '42%',
      irradiance: '820 W/m²',
      wind: '11.4 km/h W'
    },
    thermalStress: {
      wetBulb: '28.6°C',
      limit: '35.0°C critical threshold',
      heatIndex: '46.1°C',
      nightMinDeficit: '28.8°C',
      stressBadge: 'MODERATE RISK'
    },
    exposure: [
      { label: 'Total Exposed Population', value: '420 Million' },
      { label: 'States with Active Heat Advisories', value: '14 States' },
      { label: 'Agricultural & Outdoor Workers', value: '168 Million' }
    ],
    health: {
      admissions: '1,420',
      admissionsLabel: 'Hospital Heat Admissions',
      distressCalls: '8,450',
      icuOccupancy: '48% capacity utilized',
      progressPct: 48
    },
    actions: [
      { name: 'National Heat Health Advisory', sub: 'Synoptic heat bulletin distributed to state health departments' },
      { name: 'Grid Power Prioritization', sub: 'Surge power allocation for uninterrupted public hospital cooling' },
      { name: 'Outdoor Labor Advisory', sub: 'Recommended work shift restructuring during peak daytime heat' }
    ]
  },

  [DRILLDOWN_LEVELS.PUNJAB]: {
    superTitle: 'PUNJAB DISASTER MANAGEMENT (PSDMA)',
    mainTitle: 'Punjab State Heat Resilience Profile',
    stageBadge: 'HEAT ADVISORY ACTIVE',
    badgeClass: 'orange',
    weather: {
      dryBulb: '42.8°C',
      anomaly: '+3.9°C above normal',
      humidity: '38%',
      irradiance: '850 W/m²',
      wind: '9.2 km/h NW'
    },
    thermalStress: {
      wetBulb: '29.4°C',
      limit: '35.0°C critical threshold',
      heatIndex: '47.5°C',
      nightMinDeficit: '29.8°C',
      stressBadge: 'ELEVATED RISK'
    },
    exposure: [
      { label: 'Districts with Heat Advisories', value: '12 of 23 Districts' },
      { label: 'Agricultural & Farm Workforce', value: '4.8 Million' },
      { label: 'Senior & Vulnerable Citizens', value: '2.1 Million' }
    ],
    health: {
      admissions: '380',
      admissionsLabel: 'Statewide Heat Admissions',
      distressCalls: '2,140',
      icuOccupancy: '56% capacity utilized',
      progressPct: 56
    },
    actions: [
      { name: 'Statewide Drinking Water Stations', sub: 'Jal Sewa booths deployed at public bus stands and mandi centers' },
      { name: 'Modified Working Hours for Farm Labor', sub: 'Mandatory rest intervals advised between 12:00 and 15:30' },
      { name: 'Hospital Emergency ORS Stocking', sub: 'Dedicated cooling corners set up at civil hospitals' }
    ]
  },

  [DRILLDOWN_LEVELS.PATIALA]: {
    superTitle: 'PATIALA DISTRICT ADMINISTRATION',
    mainTitle: 'Patiala District Heat Action Plan',
    stageBadge: 'STAGE 2 ADVISORY',
    badgeClass: 'orange',
    weather: {
      dryBulb: '43.2°C',
      anomaly: '+4.2°C daytime peak',
      humidity: '36%',
      irradiance: '870 W/m²',
      wind: '8.1 km/h NW'
    },
    thermalStress: {
      wetBulb: '30.0°C',
      limit: '35.0°C critical threshold',
      heatIndex: '48.2°C',
      nightMinDeficit: '30.4°C',
      stressBadge: 'HIGH DISTRICT RISK'
    },
    exposure: [
      { label: 'Urban & Sub-urban Population', value: '685,000' },
      { label: 'Informal & Outdoor Workforce', value: '142,000' },
      { label: 'Active Cooling Shelters', value: '24 Designated Locations' }
    ],
    health: {
      admissions: '94',
      admissionsLabel: 'District Heat Illness Cases',
      distressCalls: '485',
      icuOccupancy: '62% capacity utilized',
      progressPct: 62
    },
    actions: [
      { name: 'Rajindra Hospital Heat Stroke Ward', sub: 'Pre-activated 30-bed rapid cooling emergency facility' },
      { name: 'Municipal Water Tanker Deployment', sub: 'Targeting Tripuri, Old City, and Sanauri Gate hubs' },
      { name: 'School & College Operating Hours', sub: 'Early dismissal enacted across all municipal institutions' }
    ]
  },

  [DRILLDOWN_LEVELS.WARD_04]: {
    superTitle: 'PATIALA MUNICIPAL CORPORATION',
    mainTitle: 'Ward 04 — Model Town / Lehal',
    stageBadge: 'LOCAL PRIORITY AREA',
    badgeClass: 'orange',
    weather: {
      dryBulb: '43.6°C',
      anomaly: '+4.6°C localized heat island',
      humidity: '37%',
      irradiance: '885 W/m²',
      wind: '6.4 km/h'
    },
    thermalStress: {
      wetBulb: '30.5°C',
      limit: '35.0°C critical threshold',
      heatIndex: '49.1°C',
      nightMinDeficit: '31.2°C',
      stressBadge: 'SEVERE LOCAL RISK'
    },
    exposure: [
      { label: 'Local Resident Population', value: '48,600' },
      { label: 'High-Exposure Commercial Workforce', value: '11,200' },
      { label: 'Unshaded Rooftops & Metal Sheeting', value: '58% Urban Fabric' }
    ],
    health: {
      admissions: '26',
      admissionsLabel: 'Ward Clinic Heat Cases',
      distressCalls: '118',
      icuOccupancy: '68% capacity utilized',
      progressPct: 68
    },
    actions: [
      { name: 'Model Town Community Cooling Center', sub: 'Air-conditioned public rest facility open 10:00 - 18:00' },
      { name: 'Mobile Electrolyte & Water Misting', sub: 'Deployed along Lehal bazaar and bus transit routes' },
      { name: 'Door-to-Door Health Worker Checks', sub: 'ASHA workers monitoring elderly and vulnerable households' }
    ]
  }
};

/**
 * Returns dossier data for a given level or generates a realistic state profile
 */
export function getDossierData(level, stateName = null) {
  if (DOSSIER_DATA[level]) {
    return DOSSIER_DATA[level];
  }

  // Generic fallback for any other clicked Indian state
  const displayName = stateName || (level ? level.toUpperCase() : 'State');
  return {
    superTitle: `${displayName.toUpperCase()} CLIMATE ASSESSMENT`,
    mainTitle: `${displayName} State Heat Overview`,
    stageBadge: 'MONITORED',
    badgeClass: 'yellow',
    weather: {
      dryBulb: '41.0°C',
      anomaly: '+2.8°C regional',
      humidity: '40%',
      irradiance: '820 W/m²',
      wind: '10.0 km/h'
    },
    thermalStress: {
      wetBulb: '28.8°C',
      limit: '35.0°C critical threshold',
      heatIndex: '46.5°C',
      nightMinDeficit: '28.5°C',
      stressBadge: 'MODERATE RISK'
    },
    exposure: [
      { label: 'Statewide Population', value: 'Regional Telemetry Active' },
      { label: 'Administrative Data Status', value: 'State Level Integration' },
      { label: 'Municipal Ward Breakdown', value: 'Detailed wards coming soon' }
    ],
    health: {
      admissions: '180',
      admissionsLabel: 'State Admissions',
      distressCalls: '920',
      icuOccupancy: '45% capacity utilized',
      progressPct: 45
    },
    actions: [
      { name: 'State Heat Monitoring Active', sub: 'Continuous meteorological monitoring via IMD and state disaster authorities' },
      { name: 'District Drill-down Available for Punjab', sub: 'Select Punjab in the map or breadcrumb to explore district and local ward drill-down' }
    ]
  };
}
