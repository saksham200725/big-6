import React from 'react';
import { 
  Building2, 
  Radio, 
  ChevronRight, 
  Flame
} from 'lucide-react';
import { DRILLDOWN_LEVELS } from '../../data/geoData';
import './Header.css';

export default function Header({ 
  geoLevel, 
  selectedStateName = 'Punjab',
  onSelectLevel 
}) {
  const isIndia = geoLevel === DRILLDOWN_LEVELS.INDIA;
  const isPunjab = geoLevel === DRILLDOWN_LEVELS.PUNJAB;
  const isPatiala = geoLevel === DRILLDOWN_LEVELS.PATIALA;
  const isWard04 = geoLevel === DRILLDOWN_LEVELS.WARD_04;
  
  // Non-Punjab state clicked
  const isCustomState = !isIndia && !isPunjab && !isPatiala && !isWard04;

  return (
    <header className="command-header">
      {/* Brand & Authority Identification */}
      <div className="header-brand-section">
        <div 
          className="brand-logo" 
          onClick={() => onSelectLevel(DRILLDOWN_LEVELS.INDIA)} 
          role="button" 
          tabIndex={0}
          title="Return to National Overview"
        >
          <Flame size={16} className="brand-icon" />
          <span className="brand-name">HEAT<span className="brand-slash">//</span>INTELLIGENCE</span>
        </div>
        <div className="brand-divider" />
        <div className="authority-badge">
          <Building2 size={13} className="authority-icon" />
          <span>Public Health & Climate Resilience</span>
          <span className="authority-plan">Live Synoptic</span>
        </div>
      </div>

      {/* Real Geographic Hierarchy Breadcrumb with Clickable Navigation */}
      <nav className="geo-breadcrumb" aria-label="Geographic Hierarchy Navigation">
        <button 
          className={`breadcrumb-item ${isIndia ? 'active-level' : ''}`}
          onClick={() => onSelectLevel(DRILLDOWN_LEVELS.INDIA)}
          title="Zoom to India national overview"
        >
          India
        </button>

        {/* State Level */}
        {(isPunjab || isPatiala || isWard04) && (
          <>
            <ChevronRight size={12} className="breadcrumb-arrow" />
            <button 
              className={`breadcrumb-item ${isPunjab ? 'active-level' : ''}`}
              onClick={() => onSelectLevel(DRILLDOWN_LEVELS.PUNJAB)}
              title="Zoom to Punjab state overview"
            >
              Punjab
            </button>
          </>
        )}

        {/* Custom State Level */}
        {isCustomState && (
          <>
            <ChevronRight size={12} className="breadcrumb-arrow" />
            <span className="breadcrumb-item active-level">
              {selectedStateName}
            </span>
          </>
        )}

        {/* District Level (Patiala) */}
        {(isPatiala || isWard04) && (
          <>
            <ChevronRight size={12} className="breadcrumb-arrow" />
            <button 
              className={`breadcrumb-item ${isPatiala ? 'active-level' : ''}`}
              onClick={() => onSelectLevel(DRILLDOWN_LEVELS.PATIALA)}
              title="Zoom to Patiala district"
            >
              Patiala
            </button>
          </>
        )}

        {/* Municipal Ward Level (Ward 04) */}
        {isWard04 && (
          <>
            <ChevronRight size={12} className="breadcrumb-arrow" />
            <span className="breadcrumb-tag active-ward">
              Ward 04 (Model Town)
            </span>
          </>
        )}
      </nav>

      {/* Real-time Synoptic Status & IMD Bulletin */}
      <div className="header-status-section">
        <div className="sync-status">
          <span className="sync-pulse" />
          <Radio size={12} className="sync-icon" />
          <span>IMD SYNOPTIC LIVE</span>
          <span className="sync-time tabular-num">14:00 IST</span>
        </div>

        <div className="alert-badge orange">
          <span className="alert-badge-text">HEAT ADVISORY ACTIVE</span>
        </div>

        <div className="temp-metric">
          <span className="temp-value tabular-num">42.8°C</span>
        </div>
      </div>
    </header>
  );
}
