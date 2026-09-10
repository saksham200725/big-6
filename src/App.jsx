import React, { useState } from 'react';
import Header from './components/layout/Header';
import NavRail from './components/layout/NavRail';
import GisMap from './components/map/GisMap';
import IntelligencePanel from './components/intelligence/IntelligencePanel';
import ForecastDock from './components/forecast/ForecastDock';
import { DRILLDOWN_LEVELS } from './data/geoData';
import './App.css';

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState('monitoring');
  
  // Drill-down level state starting at INDIA level
  const [geoLevel, setGeoLevel] = useState(DRILLDOWN_LEVELS.INDIA);
  const [selectedStateName, setSelectedStateName] = useState('Punjab');

  const handleSelectLevel = (level, stateName = null) => {
    setGeoLevel(level);
    if (stateName) {
      setSelectedStateName(stateName);
    } else if (level === DRILLDOWN_LEVELS.INDIA) {
      setSelectedStateName('');
    } else if (level === DRILLDOWN_LEVELS.PUNJAB || level === DRILLDOWN_LEVELS.PATIALA || level === DRILLDOWN_LEVELS.WARD_04) {
      setSelectedStateName('Punjab');
    }
  };

  return (
    <div className="command-center-app">
      {/* Top Navigation Header with Interactive Breadcrumb */}
      <Header 
        geoLevel={geoLevel} 
        selectedStateName={selectedStateName}
        onSelectLevel={handleSelectLevel} 
      />

      {/* Main Operational Workspace */}
      <div className="workspace-container">
        {/* Left Navigation Rail */}
        <NavRail 
          activeNavTab={activeNavTab} 
          onSelectTab={setActiveNavTab} 
        />

        {/* Large Central GIS Map Container (Clean, Intuitive Geographic Drill-Down) */}
        <main className="map-viewport-section">
          <GisMap 
            geoLevel={geoLevel}
            selectedStateName={selectedStateName}
            onSelectLevel={handleSelectLevel}
          />
        </main>

        {/* Right Public Health & Climate Intelligence Panel */}
        <IntelligencePanel 
          geoLevel={geoLevel} 
          selectedStateName={selectedStateName}
        />
      </div>

      {/* Bottom Diurnal Forecast Timeline Dock */}
      <ForecastDock />
    </div>
  );
}
