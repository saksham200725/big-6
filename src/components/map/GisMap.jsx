import React, { useEffect, useRef, useState } from 'react';
import { Map, NavigationControl, ScaleControl, Marker } from 'maplibre-gl';
import { Search, Crosshair, RotateCcw } from 'lucide-react';
import { 
  DRILLDOWN_LEVELS, 
  CAMERA_PRESETS,
  STATE_PRESETS,
  indiaNationalGeoJson,
  indiaStatesGeoJson,
  punjabDistrictsGeoJson,
  patialaWardsGeoJson
} from '../../data/geoData';
import './GisMap.css';

// Professional Municipal GIS Basemap: Esri World Dark Gray Base (Clean, high-performance, watermark-free)
const darkBasemapStyle = {
  version: 8,
  sources: {
    'esri-dark-gray': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256,
      attribution: 'Esri, HERE, Garmin, &copy; OpenStreetMap contributors'
    }
  },
  layers: [
    {
      id: 'esri-dark-gray-layer',
      type: 'raster',
      source: 'esri-dark-gray',
      minzoom: 0,
      maxzoom: 16
    }
  ]
};

export default function GisMap({ 
  geoLevel, 
  selectedStateName,
  onSelectLevel 
}) {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const currentLevelRef = useRef(geoLevel);

  // Markers references
  const wardMarkerRef = useRef(null);
  const patialaBadgeMarkerRef = useRef(null);

  const [cursorPos, setCursorPos] = useState({ lng: 78.96, lat: 22.80 });
  const [currentZoom, setCurrentZoom] = useState(4.5);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Keep currentLevelRef in sync with geoLevel prop
  useEffect(() => {
    currentLevelRef.current = geoLevel;
  }, [geoLevel]);

  // Handle camera transition when geoLevel changes
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    let targetCenter, targetZoom, targetPitch = 0;

    if (CAMERA_PRESETS[geoLevel]) {
      targetCenter = CAMERA_PRESETS[geoLevel].center;
      targetZoom = CAMERA_PRESETS[geoLevel].zoom;
    } else if (STATE_PRESETS[geoLevel]) {
      targetCenter = STATE_PRESETS[geoLevel].center;
      targetZoom = STATE_PRESETS[geoLevel].zoom;
    } else {
      targetCenter = CAMERA_PRESETS[DRILLDOWN_LEVELS.INDIA].center;
      targetZoom = CAMERA_PRESETS[DRILLDOWN_LEVELS.INDIA].zoom;
    }
    
    // Stop any in-flight animation before initiating camera transition
    map.stop();
    map.flyTo({
      center: targetCenter,
      zoom: targetZoom,
      pitch: targetPitch,
      duration: 1200,
      essential: true
    });

    updateLayerVisibility(geoLevel);
  }, [geoLevel]);

  // Update visibility of vector layers based on current drilldown level
  const updateLayerVisibility = (level) => {
    const map = mapInstance.current;
    if (!map || !map.isStyleLoaded()) return;

    const isIndia = level === DRILLDOWN_LEVELS.INDIA;
    const isPunjab = level === DRILLDOWN_LEVELS.PUNJAB;
    const isPatiala = level === DRILLDOWN_LEVELS.PATIALA;
    const isWard04 = level === DRILLDOWN_LEVELS.WARD_04;
    const isPatialaOrWard = isPatiala || isWard04;

    // 1. India States Layers (visible ONLY at India level)
    if (map.getLayer('india-states-fill')) map.setLayoutProperty('india-states-fill', 'visibility', isIndia ? 'visible' : 'none');
    if (map.getLayer('india-states-line')) map.setLayoutProperty('india-states-line', 'visibility', isIndia ? 'visible' : 'none');

    // 2. Punjab Districts Layers (visible ONLY at Punjab level)
    if (map.getLayer('punjab-districts-fill')) map.setLayoutProperty('punjab-districts-fill', 'visibility', isPunjab ? 'visible' : 'none');
    if (map.getLayer('punjab-districts-line')) map.setLayoutProperty('punjab-districts-line', 'visibility', isPunjab ? 'visible' : 'none');

    // 3. Patiala Municipal Wards Layers (visible at Patiala & Ward 04 level)
    if (map.getLayer('patiala-wards-fill')) map.setLayoutProperty('patiala-wards-fill', 'visibility', isPatialaOrWard ? 'visible' : 'none');
    if (map.getLayer('patiala-wards-line')) map.setLayoutProperty('patiala-wards-line', 'visibility', isPatialaOrWard ? 'visible' : 'none');

    // Styling when Ward 04 is focused
    if (map.getLayer('patiala-wards-fill') && isPatialaOrWard) {
      if (isWard04) {
        map.setPaintProperty('patiala-wards-fill', 'fill-color', [
          'match',
          ['get', 'id'],
          'ward-04', 'rgba(249, 115, 22, 0.45)', // Focused Ward 04
          'rgba(255, 255, 255, 0.04)'           // Visually subdued surrounding wards
        ]);
        map.setPaintProperty('patiala-wards-fill', 'fill-outline-color', [
          'match',
          ['get', 'id'],
          'ward-04', '#f97316',
          'rgba(255, 255, 255, 0.15)'
        ]);
      } else {
        // Normal Patiala district overview
        map.setPaintProperty('patiala-wards-fill', 'fill-color', [
          'match',
          ['get', 'id'],
          'ward-04', 'rgba(249, 115, 22, 0.28)',
          'ward-18', 'rgba(239, 68, 68, 0.24)',
          'rgba(255, 255, 255, 0.08)'
        ]);
        map.setPaintProperty('patiala-wards-fill', 'fill-outline-color', '#f97316');
      }
    }

    // Toggle markers
    if (patialaBadgeMarkerRef.current) {
      const el = patialaBadgeMarkerRef.current.getElement();
      if (el) el.style.display = isPunjab ? 'flex' : 'none';
    }
    if (wardMarkerRef.current) {
      const el = wardMarkerRef.current.getElement();
      if (el) el.style.display = isWard04 ? 'flex' : 'none';
    }
  };

  useEffect(() => {
    if (mapInstance.current || !mapContainer.current) return;

    const initialPreset = CAMERA_PRESETS[geoLevel] || CAMERA_PRESETS[DRILLDOWN_LEVELS.INDIA];

    const map = new Map({
      container: mapContainer.current,
      style: darkBasemapStyle,
      center: initialPreset.center,
      zoom: initialPreset.zoom,
      pitch: initialPreset.pitch,
      attributionControl: true
    });

    map.addControl(new NavigationControl({ showCompass: false }), 'bottom-right');
    map.addControl(new ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-left');

    map.on('mousemove', (e) => {
      setCursorPos({
        lng: Number(e.lngLat.lng.toFixed(4)),
        lat: Number(e.lngLat.lat.toFixed(4))
      });
    });

    map.on('zoom', () => {
      setCurrentZoom(Number(map.getZoom().toFixed(1)));
    });

    map.on('load', () => {
      // 1. Source: India National Boundary
      map.addSource('source-india-national', {
        type: 'geojson',
        data: indiaNationalGeoJson
      });

      // 2. Source: India States (All 35 states)
      map.addSource('source-india-states', {
        type: 'geojson',
        data: indiaStatesGeoJson
      });

      // 3. Source: Punjab Districts
      map.addSource('source-punjab-districts', {
        type: 'geojson',
        data: punjabDistrictsGeoJson
      });

      // 4. Source: Patiala Wards
      map.addSource('source-patiala-wards', {
        type: 'geojson',
        data: patialaWardsGeoJson
      });

      // ==========================================
      // VECTOR LAYER DEFINITIONS (Clean GIS hierarchy)
      // ==========================================

      // A. India National Outline
      map.addLayer({
        id: 'india-national-outline',
        type: 'line',
        source: 'source-india-national',
        paint: {
          'line-color': 'rgba(255, 255, 255, 0.45)',
          'line-width': 1.5
        }
      });

      // B. India States Fill (Hover & Click detection)
      map.addLayer({
        id: 'india-states-fill',
        type: 'fill',
        source: 'source-india-states',
        paint: {
          'fill-color': [
            'match',
            ['get', 'id'],
            'punjab', 'rgba(255, 255, 255, 0.04)',
            'rgba(255, 255, 255, 0.001)'
          ]
        }
      });

      // C. India States Line
      map.addLayer({
        id: 'india-states-line',
        type: 'line',
        source: 'source-india-states',
        paint: {
          'line-color': 'rgba(255, 255, 255, 0.16)',
          'line-width': 0.8
        }
      });

      // D. Punjab Districts Fill
      map.addLayer({
        id: 'punjab-districts-fill',
        type: 'fill',
        source: 'source-punjab-districts',
        layout: { visibility: 'none' },
        paint: {
          'fill-color': [
            'match',
            ['get', 'id'],
            'patiala', 'rgba(249, 115, 22, 0.2)',
            'rgba(255, 255, 255, 0.03)'
          ]
        }
      });

      // E. Punjab Districts Line
      map.addLayer({
        id: 'punjab-districts-line',
        type: 'line',
        source: 'source-punjab-districts',
        layout: { visibility: 'none' },
        paint: {
          'line-color': [
            'match',
            ['get', 'id'],
            'patiala', '#f97316',
            'rgba(255, 255, 255, 0.22)'
          ],
          'line-width': [
            'match',
            ['get', 'id'],
            'patiala', 2.2,
            1
          ]
        }
      });

      // F. Patiala Wards Fill
      map.addLayer({
        id: 'patiala-wards-fill',
        type: 'fill',
        source: 'source-patiala-wards',
        layout: { visibility: 'none' },
        paint: {
          'fill-color': [
            'match',
            ['get', 'id'],
            'ward-04', 'rgba(249, 115, 22, 0.35)',
            'ward-18', 'rgba(239, 68, 68, 0.25)',
            'rgba(255, 255, 255, 0.08)'
          ]
        }
      });

      // G. Patiala Wards Line
      map.addLayer({
        id: 'patiala-wards-line',
        type: 'line',
        source: 'source-patiala-wards',
        layout: { visibility: 'none' },
        paint: {
          'line-color': '#f97316',
          'line-width': 1.6
        }
      });

      // ==========================================
      // HTML MARKERS
      // ==========================================

      // 1. Patiala District Marker in Punjab view
      const patialaBadge = document.createElement('div');
      patialaBadge.className = 'map-target-badge';
      patialaBadge.innerHTML = `
        <span class="target-title">PATIALA DISTRICT</span>
        <span class="target-sub">Click to explore wards</span>
      `;
      patialaBadge.style.display = 'none';
      patialaBadge.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelectLevel(DRILLDOWN_LEVELS.PATIALA, 'Punjab');
      });
      patialaBadgeMarkerRef.current = new Marker({ element: patialaBadge, anchor: 'center' })
        .setLngLat([76.3860, 30.3400])
        .addTo(map);

      // 2. Ward 04 Centroid Badge
      const wardBadge = document.createElement('div');
      wardBadge.className = 'map-ward-centroid-badge';
      wardBadge.innerHTML = `
        <div class="badge-pulse"></div>
        <div class="badge-content">
          <span class="badge-title">WARD 04 • MODEL TOWN</span>
          <span class="badge-temp">43.6°C • RISK 84</span>
        </div>
      `;
      wardBadge.style.display = 'none';
      wardMarkerRef.current = new Marker({ element: wardBadge, anchor: 'center' })
        .setLngLat([76.3750, 30.3340])
        .addTo(map);

      // Setup click and hover interaction handlers
      setupLayerEvents(map);

      // Apply initial layer visibility
      updateLayerVisibility(geoLevel);
    });

    mapInstance.current = map;
    window.__gisMap = map;

    return () => {
      if (patialaBadgeMarkerRef.current) patialaBadgeMarkerRef.current.remove();
      if (wardMarkerRef.current) wardMarkerRef.current.remove();
      map.remove();
      mapInstance.current = null;
      delete window.__gisMap;
    };
  }, []);

  // Configure Interactive Clicks & Friendly Tooltips
  const setupLayerEvents = (map) => {
    // 1. INDIA LEVEL: Every state is hoverable & clickable
    map.on('mousemove', 'india-states-fill', (e) => {
      if (currentLevelRef.current !== DRILLDOWN_LEVELS.INDIA) return;
      if (!e.features.length) return;
      const f = e.features[0];
      const stateName = f.properties.name || 'State';
      const isPunjab = f.properties.id === 'punjab';

      map.getCanvas().style.cursor = 'pointer';
      setHoveredInfo({
        x: e.point.x,
        y: e.point.y,
        title: stateName.toUpperCase(),
        badge: isPunjab ? 'DEMO PATH' : 'STATE',
        lines: [
          { label: 'Status', value: isPunjab ? 'Click to explore districts' : 'Click to inspect state' }
        ]
      });
    });

    map.on('mouseleave', 'india-states-fill', () => {
      if (currentLevelRef.current !== DRILLDOWN_LEVELS.INDIA) return;
      map.getCanvas().style.cursor = '';
      setHoveredInfo(null);
    });

    map.on('click', 'india-states-fill', (e) => {
      if (currentLevelRef.current !== DRILLDOWN_LEVELS.INDIA) return;
      if (!e.features.length) return;
      const f = e.features[0];
      const stateId = f.properties.id;
      const stateName = f.properties.name || 'State';

      if (stateId === 'punjab') {
        onSelectLevel(DRILLDOWN_LEVELS.PUNJAB, 'Punjab');
      } else {
        // Any other Indian state
        onSelectLevel(stateId, stateName);
      }
    });

    // 2. PUNJAB LEVEL: Districts are hoverable & clickable
    map.on('mousemove', 'punjab-districts-fill', (e) => {
      if (currentLevelRef.current !== DRILLDOWN_LEVELS.PUNJAB) return;
      if (!e.features.length) return;
      const f = e.features[0];
      const isPatiala = f.properties.id === 'patiala';
      const distName = f.properties.name || 'District';

      map.getCanvas().style.cursor = 'pointer';
      setHoveredInfo({
        x: e.point.x,
        y: e.point.y,
        title: distName.toUpperCase(),
        badge: isPatiala ? 'DEMO TARGET' : 'DISTRICT',
        lines: [
          { label: 'Population', value: f.properties.population || 'Regional' },
          { label: 'Action', value: isPatiala ? 'Click to explore municipal wards' : 'Monitored' }
        ]
      });
    });

    map.on('mouseleave', 'punjab-districts-fill', () => {
      if (currentLevelRef.current !== DRILLDOWN_LEVELS.PUNJAB) return;
      map.getCanvas().style.cursor = '';
      setHoveredInfo(null);
    });

    map.on('click', 'punjab-districts-fill', (e) => {
      if (currentLevelRef.current !== DRILLDOWN_LEVELS.PUNJAB) return;
      if (!e.features.length) return;
      const f = e.features[0];
      if (f.properties.id === 'patiala') {
        onSelectLevel(DRILLDOWN_LEVELS.PATIALA, 'Punjab');
      }
    });

    // 3. PATIALA & WARD LEVEL: Municipal wards are hoverable & clickable
    map.on('mousemove', 'patiala-wards-fill', (e) => {
      const cur = currentLevelRef.current;
      if (cur !== DRILLDOWN_LEVELS.PATIALA && cur !== DRILLDOWN_LEVELS.WARD_04) return;
      if (!e.features.length) return;
      const f = e.features[0];
      const wardName = f.properties.name || 'Ward';
      const riskScore = f.properties.heatRiskScore || '80';
      const wbgt = f.properties.wbgt || '34.0°C';

      map.getCanvas().style.cursor = 'pointer';
      setHoveredInfo({
        x: e.point.x,
        y: e.point.y,
        title: wardName.toUpperCase(),
        badge: f.properties.id === 'ward-04' ? 'TARGET' : 'WARD',
        lines: [
          { label: 'Risk Score', value: String(riskScore) },
          { label: 'WBGT', value: wbgt },
          { label: 'Action', value: 'Click to inspect local ward' }
        ]
      });
    });

    map.on('mouseleave', 'patiala-wards-fill', () => {
      const cur = currentLevelRef.current;
      if (cur !== DRILLDOWN_LEVELS.PATIALA && cur !== DRILLDOWN_LEVELS.WARD_04) return;
      map.getCanvas().style.cursor = '';
      setHoveredInfo(null);
    });

    map.on('click', 'patiala-wards-fill', (e) => {
      const cur = currentLevelRef.current;
      if (cur !== DRILLDOWN_LEVELS.PATIALA && cur !== DRILLDOWN_LEVELS.WARD_04) return;
      if (!e.features.length) return;
      const f = e.features[0];
      if (f.properties.id === 'ward-04') {
        onSelectLevel(DRILLDOWN_LEVELS.WARD_04, 'Punjab');
      }
    });
  };

  const handleResetToIndia = () => {
    onSelectLevel(DRILLDOWN_LEVELS.INDIA);
  };

  // Human-readable level header title
  const getLevelHeaderLabel = () => {
    if (geoLevel === DRILLDOWN_LEVELS.INDIA) {
      return 'NATIONAL OVERVIEW • 35 STATES & UNION TERRITORIES';
    }
    if (geoLevel === DRILLDOWN_LEVELS.PUNJAB) {
      return 'PUNJAB STATE • 23 ADMINISTRATIVE DISTRICTS';
    }
    if (geoLevel === DRILLDOWN_LEVELS.PATIALA) {
      return 'PATIALA DISTRICT • MUNICIPAL ADMINISTRATIVE WARDS';
    }
    if (geoLevel === DRILLDOWN_LEVELS.WARD_04) {
      return 'WARD 04 • MODEL TOWN / LEHAL LOCAL PROFILE';
    }
    return `${(selectedStateName || geoLevel).toUpperCase()} • STATE CLIMATE OVERVIEW`;
  };

  return (
    <div className="gis-map-container">
      {/* MapLibre Canvas Mount */}
      <div ref={mapContainer} className="maplibre-viewport" />

      {/* Friendly, Restrained Hover Tooltip */}
      {hoveredInfo && (
        <div 
          className="gis-hover-tooltip"
          style={{
            left: Math.min(hoveredInfo.x + 14, window.innerWidth - 650),
            top: hoveredInfo.y - 12
          }}
        >
          <div className="tooltip-head">
            <span className="tooltip-title">{hoveredInfo.title}</span>
            <span className="tooltip-badge">{hoveredInfo.badge}</span>
          </div>
          <div className="tooltip-body">
            {hoveredInfo.lines.map((l, i) => (
              <div key={i} className="tooltip-row">
                <span className="tooltip-lbl">{l.label}:</span>
                <span className="tooltip-val">{l.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Top Controls: Clean Hierarchy Status & Search */}
      <div className="gis-map-topbar">
        <div className="gis-domain-indicator">
          <span className="domain-txt">{getLevelHeaderLabel()}</span>
        </div>

        <div className="gis-topbar-right">
          <div className="gis-search-wrapper">
            <Search size={13} className="search-icon" />
            <input 
              type="text" 
              className="gis-search-input" 
              placeholder="Search state or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {geoLevel !== DRILLDOWN_LEVELS.INDIA && (
            <button 
              className="gis-reset-btn"
              onClick={handleResetToIndia}
              title="Return to National Overview"
            >
              <RotateCcw size={12} />
              <span>India View</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom GIS Metadata Bar */}
      <div className="gis-meta-bar">
        <div className="meta-item">
          <span className="meta-label">COORDINATES:</span>
          <span className="meta-value tabular-num">{cursorPos.lat}° N, {cursorPos.lng}° E</span>
        </div>
        <div className="meta-divider" />
        <div className="meta-item">
          <span className="meta-label">ZOOM:</span>
          <span className="meta-value tabular-num">{currentZoom}</span>
        </div>
        <div className="meta-divider" />
        <div className="meta-item">
          <span className="meta-label">LEVEL:</span>
          <span className="meta-value tabular-num">{geoLevel.toUpperCase()}</span>
        </div>
        <div className="meta-divider" />
        <div className="meta-item">
          <span className="meta-label">BASEMAP:</span>
          <span className="meta-value">Esri World Dark Gray (Clean GIS)</span>
        </div>
      </div>
    </div>
  );
}
