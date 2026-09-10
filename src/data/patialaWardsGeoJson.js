// GeoJSON definition of Patiala Municipal Administrative Wards
// Demonstrating fine-grained local scale climate risk and exposure analysis

export const patialaWardsGeoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'ward-04',
      properties: {
        id: 'ward-04',
        code: '04',
        name: 'Ward 04 — Model Town / Lehal',
        zone: 'Central Urban Zone',
        heatRiskScore: 84,
        riskLevel: 'Severe Risk',
        avgTemp: '43.6°C',
        wbgt: '34.8°C',
        mortalityRisk: '+31%',
        population: '48,600',
        vulnerableCount: '11,200',
        highTinRoofPct: '58%',
        sheltersActive: 6,
        description: 'Dense commercial avenue and residential quarter with elevated daytime surface thermal absorption.',
        clickable: true,
        isTarget: true
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [76.368, 30.324],
          [76.385, 30.326],
          [76.388, 30.339],
          [76.375, 30.342],
          [76.364, 30.335],
          [76.368, 30.324]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'ward-07',
      properties: {
        id: 'ward-07',
        code: '07',
        name: 'Ward 07 — Baradari Heritage Area',
        zone: 'Civil Lines Zone',
        heatRiskScore: 74,
        riskLevel: 'Moderate Watch',
        avgTemp: '41.8°C',
        wbgt: '32.6°C',
        mortalityRisk: '+18%',
        population: '36,400',
        vulnerableCount: '6,800',
        highTinRoofPct: '22%',
        sheltersActive: 4,
        description: 'Heritage gardens, district administrative secretariat, and Government Medical College / Rajindra Hospital heat ward.',
        clickable: true
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [76.385, 30.339],
          [76.405, 30.341],
          [76.408, 30.356],
          [76.388, 30.358],
          [76.385, 30.339]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'ward-12',
      properties: {
        id: 'ward-12',
        code: '12',
        name: 'Ward 12 — Urban Estate Phase 1 & 2',
        zone: 'Eastern Suburban Zone',
        heatRiskScore: 76,
        riskLevel: 'Moderate Watch',
        avgTemp: '42.2°C',
        wbgt: '33.1°C',
        mortalityRisk: '+21%',
        population: '54,200',
        vulnerableCount: '9,400',
        highTinRoofPct: '28%',
        sheltersActive: 5,
        description: 'Planned residential sectors with wide asphalt thoroughfares experiencing moderate urban heat island retention.',
        clickable: true
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [76.415, 30.342],
          [76.446, 30.345],
          [76.448, 30.366],
          [76.416, 30.364],
          [76.415, 30.342]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'ward-18',
      properties: {
        id: 'ward-18',
        code: '18',
        name: 'Ward 18 — Tripuri Town',
        zone: 'Northwestern Industrial & Artisan Zone',
        heatRiskScore: 86,
        riskLevel: 'Severe Risk',
        avgTemp: '44.1°C',
        wbgt: '35.2°C',
        mortalityRisk: '+36%',
        population: '62,800',
        vulnerableCount: '16,500',
        highTinRoofPct: '68%',
        sheltersActive: 8,
        description: 'Compact artisan workshops and informal settlements with high solar radiative heat trapped under uninsulated tin roofs.',
        clickable: true
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [76.352, 30.344],
          [76.375, 30.346],
          [76.378, 30.368],
          [76.354, 30.366],
          [76.352, 30.344]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'ward-23',
      properties: {
        id: 'ward-23',
        code: '23',
        name: 'Ward 23 — Qila Mubarak & Walled City',
        zone: 'Historic Walled City Zone',
        heatRiskScore: 82,
        riskLevel: 'Orange Alert',
        avgTemp: '43.4°C',
        wbgt: '34.5°C',
        mortalityRisk: '+29%',
        population: '51,400',
        vulnerableCount: '13,100',
        highTinRoofPct: '54%',
        sheltersActive: 6,
        description: 'Historic high-density masonry fabric, narrow bazaars, and high overnight ambient minimum heat retention.',
        clickable: true
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [76.388, 30.322],
          [76.414, 30.324],
          [76.415, 30.340],
          [76.388, 30.339],
          [76.388, 30.322]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'ward-29',
      properties: {
        id: 'ward-29',
        code: '29',
        name: 'Ward 29 — Punjabi University Enclave',
        zone: 'Southeastern Campus Corridor',
        heatRiskScore: 71,
        riskLevel: 'Normal Watch',
        avgTemp: '41.1°C',
        wbgt: '32.0°C',
        mortalityRisk: '+14%',
        population: '38,000',
        vulnerableCount: '5,200',
        highTinRoofPct: '19%',
        sheltersActive: 4,
        description: 'University campus with botanical gardens, open recreational greens, and buffered microclimate mitigation.',
        clickable: true
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [76.442, 30.346],
          [76.478, 30.348],
          [76.480, 30.370],
          [76.445, 30.368],
          [76.442, 30.346]
        ]]
      }
    }
  ]
};

export default patialaWardsGeoJson;
