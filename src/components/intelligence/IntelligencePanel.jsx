import React from 'react';
import { 
  Sun, 
  Wind, 
  Droplets, 
  Thermometer, 
  Users, 
  Home, 
  HeartPulse, 
  PhoneCall, 
  CheckCircle2
} from 'lucide-react';
import { DRILLDOWN_LEVELS } from '../../data/geoData';
import { getDossierData } from '../../data/dossierData';
import './IntelligencePanel.css';

export default function IntelligencePanel({ geoLevel, selectedStateName }) {
  const dossier = getDossierData(geoLevel, selectedStateName);
  const isWard04 = geoLevel === DRILLDOWN_LEVELS.WARD_04;

  return (
    <aside className="intel-panel">
      <div className="intel-panel-header">
        <div className="intel-title-block">
          <span className="intel-super">{dossier.superTitle}</span>
          <h2 className="intel-title">{dossier.mainTitle}</h2>
        </div>
        <div className={`intel-stage-badge ${dossier.badgeClass || 'orange'}`}>
          <span>{dossier.stageBadge}</span>
        </div>
      </div>

      <div className="intel-scroll-body">
        {/* WARD 04 LOCAL PRIORITY BANNER IF SELECTED */}
        {isWard04 && (
          <div className="ward-hero-card">
            <div className="ward-hero-top">
              <span className="ward-hero-title">WARD 04 (MODEL TOWN / LEHAL)</span>
              <span className="ward-hero-tag">PRIORITY ACTION AREA</span>
            </div>
            <div className="ward-hero-metrics">
              <div className="hero-metric">
                <span className="hero-lbl">HUMAN THERMAL RISK</span>
                <span className="hero-val text-red tabular-num">84</span>
              </div>
              <div className="hero-metric">
                <span className="hero-lbl">WBGT INDEX</span>
                <span className="hero-val text-orange tabular-num">34.8°C</span>
              </div>
              <div className="hero-metric">
                <span className="hero-lbl">MORTALITY SURGE RISK</span>
                <span className="hero-val text-red tabular-num">+31%</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 1: WEATHER BASELINE */}
        <section className="intel-section">
          <div className="section-header">
            <div className="section-number">01</div>
            <h3 className="section-title">WEATHER CONDITIONS</h3>
            <span className="section-source">IMD SYNOPTIC</span>
          </div>

          <div className="grid-2col">
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Dry Bulb Air Temp</span>
                <Thermometer size={14} className="metric-icon" />
              </div>
              <div className="metric-main">
                <span className="metric-value tabular-num">{dossier.weather.dryBulb}</span>
                <span className="metric-delta positive">{dossier.weather.anomaly}</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Relative Humidity</span>
                <Droplets size={14} className="metric-icon" />
              </div>
              <div className="metric-main">
                <span className="metric-value tabular-num">{dossier.weather.humidity}</span>
                <span className="metric-delta neutral">Atmospheric moisture</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Solar Radiation</span>
                <Sun size={14} className="metric-icon" />
              </div>
              <div className="metric-main">
                <span className="metric-value tabular-num">{dossier.weather.irradiance}</span>
                <span className="metric-delta neutral">Peak daytime radiation</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Surface Wind</span>
                <Wind size={14} className="metric-icon" />
              </div>
              <div className="metric-main">
                <span className="metric-value tabular-num">{dossier.weather.wind}</span>
                <span className="metric-delta neutral">Dry advection</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: HUMAN THERMAL STRESS */}
        <section className="intel-section">
          <div className="section-header">
            <div className="section-number">02</div>
            <h3 className="section-title">HUMAN THERMAL STRESS</h3>
            <span className="section-source">PHYSIOLOGICAL ASSESSMENT</span>
          </div>

          <div className="wbgt-primary-card">
            <div className="wbgt-top">
              <span className="wbgt-label">Wet-Bulb Globe Temp (WBGT)</span>
              <span className="wbgt-badge">{dossier.thermalStress.stressBadge}</span>
            </div>
            <div className="wbgt-value-row">
              <span className="wbgt-number tabular-num">{dossier.thermalStress.wetBulb}</span>
              <span className="wbgt-threshold">{dossier.thermalStress.limit}</span>
            </div>
            <div className="wbgt-bar-container">
              <div className="wbgt-bar-fill" style={{ width: '84%' }} />
            </div>
          </div>

          <div className="grid-2col mt-8">
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Heat Index</span>
              </div>
              <div className="metric-main">
                <span className="metric-value tabular-num">{dossier.thermalStress.heatIndex}</span>
                <span className="metric-delta negative">Perceived thermal load</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Night Minimum Temp</span>
              </div>
              <div className="metric-main">
                <span className="metric-value tabular-num">{dossier.thermalStress.nightMinDeficit}</span>
                <span className="metric-delta negative">Thermal recovery deficit</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: POPULATION EXPOSURE */}
        <section className="intel-section">
          <div className="section-header">
            <div className="section-number">03</div>
            <h3 className="section-title">POPULATION EXPOSURE</h3>
            <span className="section-source">CENSUS & DEMOGRAPHICS</span>
          </div>

          <div className="exposure-list">
            {dossier.exposure.map((item, idx) => (
              <div key={idx} className="exposure-item">
                <div className="exposure-meta">
                  {idx === 0 && <Users size={13} className="exposure-icon" />}
                  {idx === 1 && <Home size={13} className="exposure-icon" />}
                  {idx === 2 && <Users size={13} className="exposure-icon" />}
                  <span className="exposure-name">{item.label}</span>
                </div>
                <span className="exposure-val tabular-num">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: HEALTH IMPACT & HOSPITAL LOAD */}
        <section className="intel-section">
          <div className="section-header">
            <div className="section-number">04</div>
            <h3 className="section-title">HEALTH IMPACT & ADMISSIONS</h3>
            <span className="section-source">CLINICAL SURVEILLANCE</span>
          </div>

          <div className="grid-2col">
            <div className="metric-card highlight-metric">
              <div className="metric-top">
                <span className="metric-label">{dossier.health.admissionsLabel}</span>
                <HeartPulse size={14} className="metric-icon text-red" />
              </div>
              <div className="metric-main">
                <span className="metric-value text-red tabular-num">{dossier.health.admissions}</span>
                <span className="metric-delta negative">Admitted today</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Emergency Helpline Calls</span>
                <PhoneCall size={14} className="metric-icon" />
              </div>
              <div className="metric-main">
                <span className="metric-value tabular-num">{dossier.health.distressCalls}</span>
                <span className="metric-delta neutral">Heat distress queries</span>
              </div>
            </div>
          </div>

          <div className="icu-card">
            <div className="icu-top">
              <span className="icu-label">Hospital Cooling Ward Capacity</span>
              <span className="icu-value tabular-num">{dossier.health.icuOccupancy}</span>
            </div>
            <div className="icu-progress-bg">
              <div className="icu-progress-bar" style={{ width: `${dossier.health.progressPct}%` }} />
            </div>
          </div>
        </section>

        {/* SECTION 5: RECOMMENDED ACTIONS */}
        <section className="intel-section">
          <div className="section-header">
            <div className="section-number">05</div>
            <h3 className="section-title">RECOMMENDED ACTIONS</h3>
            <span className="section-source">PUBLIC HEALTH RESPONSE</span>
          </div>

          <div className="action-checklist">
            {dossier.actions.map((act, idx) => (
              <div key={idx} className="action-row">
                <div className="action-check active">
                  <CheckCircle2 size={13} />
                </div>
                <div className="action-content">
                  <span className="action-heading">{act.name}</span>
                  <span className="action-detail">{act.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
