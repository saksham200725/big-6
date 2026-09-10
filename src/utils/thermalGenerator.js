// Generator for India-clipped high-fidelity thermal surface
// Strictly clipped to India's official national boundary with 0% spill into neighboring countries

export const MAP_LAYERS = {
  THERMAL_RISK: 'thermal_risk',
  WBGT: 'wbgt',
  UTCI: 'utci',
  MORTALITY: 'mortality',
  VULNERABILITY: 'vulnerability'
};

export const LAYER_CONFIGS = {
  [MAP_LAYERS.THERMAL_RISK]: {
    id: MAP_LAYERS.THERMAL_RISK,
    label: 'Human Thermal Risk',
    unit: '0 - 100 Index',
    legendTitle: 'Human Thermal Risk (0 - 100)',
    ticks: ['0', '20', '40', '60', '80', '100'],
    gradient: 'linear-gradient(to right, #10b981 0%, #eab308 35%, #f97316 65%, #ef4444 85%, #b91c1c 100%)'
  },
  [MAP_LAYERS.WBGT]: {
    id: MAP_LAYERS.WBGT,
    label: 'WBGT',
    unit: 'Wet Bulb Globe Temp (°C)',
    legendTitle: 'Wet Bulb Globe Temperature (°C)',
    ticks: ['26°', '28°', '30°', '32°', '34°', '36°+'],
    gradient: 'linear-gradient(to right, #06b6d4 0%, #10b981 25%, #eab308 55%, #f97316 80%, #ef4444 100%)'
  },
  [MAP_LAYERS.UTCI]: {
    id: MAP_LAYERS.UTCI,
    label: 'UTCI',
    unit: 'Universal Thermal Climate Index (°C)',
    legendTitle: 'Universal Thermal Climate Index (°C)',
    ticks: ['28°', '32°', '36°', '40°', '44°', '48°+'],
    gradient: 'linear-gradient(to right, #10b981 0%, #eab308 30%, #f97316 60%, #ef4444 85%, #7f1d1d 100%)'
  },
  [MAP_LAYERS.MORTALITY]: {
    id: MAP_LAYERS.MORTALITY,
    label: 'Mortality Risk',
    unit: 'Attributable Excess Mortality (%)',
    legendTitle: 'Attributable Heat Mortality Risk',
    ticks: ['+0%', '+8%', '+16%', '+24%', '+32%', '+40%+'],
    gradient: 'linear-gradient(to right, #059669 0%, #d97706 40%, #dc2626 75%, #991b1b 100%)'
  },
  [MAP_LAYERS.VULNERABILITY]: {
    id: MAP_LAYERS.VULNERABILITY,
    label: 'Vulnerability',
    unit: 'Composite Social Heat Vulnerability',
    legendTitle: 'Socio-Demographic Vulnerability Index',
    ticks: ['Low', 'Moderate', 'Elevated', 'High', 'Extreme', 'Critical'],
    gradient: 'linear-gradient(to right, #10b981 0%, #38bdf8 30%, #f59e0b 60%, #f97316 80%, #ef4444 100%)'
  }
};

// Geographic bounds for India raster projection
export const INDIA_RASTER_BOUNDS = {
  west: 67.5,
  east: 98.0,
  north: 37.5,
  south: 6.5
};

// MapLibre Image coordinates format: [top-left, top-right, bottom-right, bottom-left]
export const INDIA_IMAGE_COORDINATES = [
  [INDIA_RASTER_BOUNDS.west, INDIA_RASTER_BOUNDS.north],
  [INDIA_RASTER_BOUNDS.east, INDIA_RASTER_BOUNDS.north],
  [INDIA_RASTER_BOUNDS.east, INDIA_RASTER_BOUNDS.south],
  [INDIA_RASTER_BOUNDS.west, INDIA_RASTER_BOUNDS.south]
];

/**
 * Generates an India-clipped thermal heatmap as a data URL
 * Uses HTML5 2D Canvas with Path2D clip on official India boundaries
 */
export function generateIndiaThermalDataUrl(layerId = MAP_LAYERS.THERMAL_RISK, indiaGeoJson) {
  if (typeof document === 'undefined') return null;

  const width = 1200;
  const height = 1200;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const { west, east, north, south } = INDIA_RASTER_BOUNDS;
  const lngSpan = east - west;
  const latSpan = north - south;

  const toX = (lng) => ((lng - west) / lngSpan) * width;
  const toY = (lat) => ((north - lat) / latSpan) * height;

  // 1. Build clipping path for India's national boundary
  const clipPath = new Path2D();
  if (indiaGeoJson && indiaGeoJson.features) {
    indiaGeoJson.features.forEach((feat) => {
      const geom = feat.geometry;
      if (geom.type === 'MultiPolygon') {
        geom.coordinates.forEach((poly) => {
          poly.forEach((ring) => {
            ring.forEach(([lng, lat], i) => {
              const x = toX(lng);
              const y = toY(lat);
              if (i === 0) clipPath.moveTo(x, y);
              else clipPath.lineTo(x, y);
            });
            clipPath.closePath();
          });
        });
      } else if (geom.type === 'Polygon') {
        geom.coordinates.forEach((ring) => {
          ring.forEach(([lng, lat], i) => {
            const x = toX(lng);
            const y = toY(lat);
            if (i === 0) clipPath.moveTo(x, y);
            else clipPath.lineTo(x, y);
          });
          clipPath.closePath();
        });
      }
    });
  }

  ctx.save();
  // Clip strictly to India! Zero spill into Pakistan, China, Bangladesh, Nepal, oceans, etc.
  ctx.clip(clipPath);

  // 2. Render base ambient thermal gradient (South to North)
  const baseGrad = ctx.createLinearGradient(0, height, 0, 0);
  if (layerId === MAP_LAYERS.WBGT) {
    baseGrad.addColorStop(0, 'rgba(6, 182, 212, 0.7)');
    baseGrad.addColorStop(0.35, 'rgba(16, 185, 129, 0.75)');
    baseGrad.addColorStop(0.65, 'rgba(234, 179, 8, 0.8)');
    baseGrad.addColorStop(1, 'rgba(249, 115, 22, 0.85)');
  } else if (layerId === MAP_LAYERS.MORTALITY) {
    baseGrad.addColorStop(0, 'rgba(5, 150, 105, 0.75)');
    baseGrad.addColorStop(0.4, 'rgba(217, 119, 6, 0.8)');
    baseGrad.addColorStop(0.7, 'rgba(220, 38, 38, 0.85)');
    baseGrad.addColorStop(1, 'rgba(153, 27, 27, 0.9)');
  } else {
    // Default Human Thermal Risk / UTCI
    baseGrad.addColorStop(0, 'rgba(16, 185, 129, 0.75)');
    baseGrad.addColorStop(0.3, 'rgba(34, 197, 94, 0.78)');
    baseGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.82)');
    baseGrad.addColorStop(0.75, 'rgba(249, 115, 22, 0.88)');
    baseGrad.addColorStop(1, 'rgba(239, 68, 68, 0.9)');
  }
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // 3. Helper to draw smooth radial thermal hotspots
  const addHotspot = (lng, lat, radiusKm, stops) => {
    const cx = toX(lng);
    const cy = toY(lat);
    // Approximate pixel radius (1 deg lat ~ 111km -> height / 31 deg)
    const pxRadius = (radiusKm / 111) * (height / latSpan);
    const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pxRadius);
    stops.forEach(([offset, color]) => {
      radGrad.addColorStop(offset, color);
    });
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, pxRadius, 0, Math.PI * 2);
    ctx.fill();
  };

  // 4. Paint Regional Epidemiological Thermal Fields
  if (layerId === MAP_LAYERS.THERMAL_RISK || layerId === MAP_LAYERS.UTCI) {
    // Hotspot A: Rajasthan / Thar Desert / West Border (Severe Heatwave Core)
    addHotspot(71.5, 26.5, 420, [
      [0, 'rgba(185, 28, 28, 0.96)'],
      [0.35, 'rgba(220, 38, 38, 0.92)'],
      [0.65, 'rgba(239, 68, 68, 0.8)'],
      [0.85, 'rgba(249, 115, 22, 0.5)'],
      [1, 'rgba(249, 115, 22, 0)']
    ]);

    // Hotspot B: Gujarat (Ahmedabad / Saurashtra / Kutch Heat Dome)
    addHotspot(71.8, 23.0, 340, [
      [0, 'rgba(220, 38, 38, 0.95)'],
      [0.3, 'rgba(239, 68, 68, 0.9)'],
      [0.6, 'rgba(249, 115, 22, 0.75)'],
      [0.85, 'rgba(245, 158, 11, 0.45)'],
      [1, 'rgba(234, 179, 8, 0)']
    ]);

    // Hotspot C: Madhya Pradesh & Vidarbha (Central India Hot Belt)
    addHotspot(77.8, 22.8, 380, [
      [0, 'rgba(239, 68, 68, 0.9)'],
      [0.4, 'rgba(249, 115, 22, 0.8)'],
      [0.7, 'rgba(245, 158, 11, 0.55)'],
      [1, 'rgba(234, 179, 8, 0)']
    ]);

    // Hotspot D: Indo-Gangetic Plain (Delhi-NCR, UP, Haryana)
    addHotspot(77.5, 28.5, 360, [
      [0, 'rgba(220, 38, 38, 0.92)'],
      [0.4, 'rgba(249, 115, 22, 0.8)'],
      [0.75, 'rgba(245, 158, 11, 0.5)'],
      [1, 'rgba(234, 179, 8, 0)']
    ]);

    // Hotspot E: Telangana & Coastal Andhra Heatwave
    addHotspot(79.5, 17.5, 280, [
      [0, 'rgba(249, 115, 22, 0.85)'],
      [0.45, 'rgba(245, 158, 11, 0.7)'],
      [0.8, 'rgba(234, 179, 8, 0.4)'],
      [1, 'rgba(16, 185, 129, 0)']
    ]);

    // Cool Refuge 1: Western Ghats / Kerala / Tamil Nadu South
    addHotspot(76.5, 10.5, 320, [
      [0, 'rgba(5, 150, 105, 0.88)'],
      [0.5, 'rgba(16, 185, 129, 0.75)'],
      [0.85, 'rgba(52, 211, 153, 0.4)'],
      [1, 'rgba(52, 211, 153, 0)']
    ]);

    // Cool Refuge 2: Northeast (Assam, Meghalaya, Arunachal)
    addHotspot(93.0, 26.2, 380, [
      [0, 'rgba(5, 150, 105, 0.9)'],
      [0.55, 'rgba(16, 185, 129, 0.75)'],
      [0.85, 'rgba(52, 211, 153, 0.35)'],
      [1, 'rgba(52, 211, 153, 0)']
    ]);

    // Cool Refuge 3: Western Himalayas (Ladakh, Kashmir high altitude)
    addHotspot(77.5, 34.5, 380, [
      [0, 'rgba(13, 148, 136, 0.85)'],
      [0.5, 'rgba(16, 185, 129, 0.7)'],
      [0.8, 'rgba(52, 211, 153, 0.35)'],
      [1, 'rgba(52, 211, 153, 0)']
    ]);
  } else if (layerId === MAP_LAYERS.WBGT) {
    // Wet Bulb Globe Temp: High in coastal humid zones + Gangetic basin
    addHotspot(72.5, 21.0, 320, [
      [0, 'rgba(239, 68, 68, 0.9)'],
      [0.45, 'rgba(249, 115, 22, 0.75)'],
      [1, 'rgba(234, 179, 8, 0)']
    ]);
    addHotspot(86.5, 21.5, 360, [
      [0, 'rgba(239, 68, 68, 0.88)'],
      [0.5, 'rgba(249, 115, 22, 0.7)'],
      [1, 'rgba(234, 179, 8, 0)']
    ]);
    addHotspot(83.0, 25.5, 380, [
      [0, 'rgba(220, 38, 38, 0.9)'],
      [0.4, 'rgba(249, 115, 22, 0.75)'],
      [1, 'rgba(234, 179, 8, 0)']
    ]);
  } else if (layerId === MAP_LAYERS.MORTALITY) {
    // Mortality Risk: Concentrated in densely populated urban heat zones
    addHotspot(72.6, 23.0, 260, [
      [0, 'rgba(153, 27, 27, 0.95)'],
      [0.35, 'rgba(220, 38, 38, 0.88)'],
      [0.7, 'rgba(239, 68, 68, 0.5)'],
      [1, 'rgba(239, 68, 68, 0)']
    ]);
    addHotspot(77.2, 28.6, 260, [
      [0, 'rgba(153, 27, 27, 0.95)'],
      [0.35, 'rgba(220, 38, 38, 0.88)'],
      [0.7, 'rgba(239, 68, 68, 0.5)'],
      [1, 'rgba(239, 68, 68, 0)']
    ]);
    addHotspot(79.0, 21.1, 280, [
      [0, 'rgba(185, 28, 28, 0.92)'],
      [0.4, 'rgba(220, 38, 38, 0.8)'],
      [1, 'rgba(239, 68, 68, 0)']
    ]);
  } else if (layerId === MAP_LAYERS.VULNERABILITY) {
    // Vulnerability: High in arid rural belts and dense informal settlements
    addHotspot(71.5, 24.5, 340, [
      [0, 'rgba(239, 68, 68, 0.9)'],
      [0.4, 'rgba(249, 115, 22, 0.75)'],
      [1, 'rgba(245, 158, 11, 0)']
    ]);
    addHotspot(85.0, 25.0, 380, [
      [0, 'rgba(239, 68, 68, 0.88)'],
      [0.45, 'rgba(249, 115, 22, 0.7)'],
      [1, 'rgba(245, 158, 11, 0)']
    ]);
  }

  ctx.restore();
  return canvas.toDataURL('image/png');
}
