import React, { useState } from 'react';
import { 
  Map as MapIcon, 
  ThermometerSnowflake, 
  Users, 
  HeartPulse, 
  ShieldCheck, 
  SlidersHorizontal,
  Layers,
  HelpCircle
} from 'lucide-react';
import './NavRail.css';

export default function NavRail({ activeTab, onSelectTab }) {
  const navItems = [
    { id: 'monitoring', label: 'Monitor', icon: MapIcon },
    { id: 'thermal', label: 'Thermal', icon: ThermometerSnowflake },
    { id: 'vulnerability', label: 'Exposure', icon: Users },
    { id: 'health', label: 'Clinical', icon: HeartPulse },
    { id: 'protocols', label: 'Protocol', icon: ShieldCheck },
  ];

  return (
    <aside className="nav-rail">
      <div className="nav-group top">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-button ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
              title={item.label}
              aria-label={item.label}
            >
              <Icon size={18} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {isActive && <div className="nav-active-bar" />}
            </button>
          );
        })}
      </div>

      <div className="nav-group bottom">
        <button className="nav-button subtle" title="GIS Layer Preferences" aria-label="GIS Layer Preferences">
          <Layers size={17} className="nav-icon" />
          <span className="nav-label">Layers</span>
        </button>
        <button className="nav-button subtle" title="System Settings" aria-label="System Settings">
          <SlidersHorizontal size={17} className="nav-icon" />
          <span className="nav-label">Settings</span>
        </button>
        <button className="nav-button subtle" title="HAP Documentation" aria-label="HAP Documentation">
          <HelpCircle size={17} className="nav-icon" />
          <span className="nav-label">Guide</span>
        </button>
      </div>
    </aside>
  );
}
