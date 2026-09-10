import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import './ForecastDock.css';

const forecastData = [
  { time: '14:00', label: 'NOW', temp: 43.8, wetBulb: 30.4, risk: 'alert', night: false, alertName: 'Orange Alert' },
  { time: '16:00', label: '+2h', temp: 44.2, wetBulb: 30.6, risk: 'alert', night: false, alertName: 'Peak Diurnal' },
  { time: '18:00', label: '+4h', temp: 41.5, wetBulb: 29.8, risk: 'watch', night: false, alertName: 'Sunset Fall' },
  { time: '21:00', label: '+7h', temp: 37.0, wetBulb: 28.2, risk: 'watch', night: true, alertName: 'Night Thermal Trapping' },
  { time: '00:00', label: '+10h', temp: 34.2, wetBulb: 27.5, risk: 'normal', night: true, alertName: 'Elevated Night Min' },
  { time: '04:00', label: '+14h', temp: 31.4, wetBulb: 26.8, risk: 'watch', night: true, alertName: 'Night Min Deficit (31.4°C)' },
  { time: '08:00', label: '+18h', temp: 36.2, wetBulb: 28.0, risk: 'watch', night: false, alertName: 'Rapid Heating' },
  { time: '12:00', label: '+22h', temp: 42.5, wetBulb: 30.1, risk: 'alert', night: false, alertName: 'HAP Stage 2' },
  { time: '15:00 D2', label: 'TOMORROW', temp: 44.8, wetBulb: 31.0, risk: 'extreme', night: false, alertName: 'Red Alert Peak' },
  { time: '15:00 D3', label: 'DAY 3', temp: 45.1, wetBulb: 31.2, risk: 'extreme', night: false, alertName: 'Severe Heatwave' },
  { time: '15:00 D4', label: 'DAY 4', temp: 43.0, wetBulb: 29.5, risk: 'alert', night: false, alertName: 'Gradual Easing' },
  { time: '15:00 D5', label: 'DAY 5', temp: 41.2, wetBulb: 28.4, risk: 'watch', night: false, alertName: 'Pre-monsoon Cloud' },
];

export default function ForecastDock() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeSlot = forecastData[selectedIndex];

  return (
    <footer className="forecast-dock">
      {/* Forecast Meta & Municipal Summary */}
      <div className="forecast-summary-bar">
        <div className="summary-left">
          <div className="summary-title-group">
            <Calendar size={13} className="summary-icon" />
            <span className="summary-title">72-HOUR & 5-DAY SYNOPTIC TRAJECTORY</span>
          </div>
          <span className="summary-divider">•</span>
          <span className="summary-warning">
            <AlertTriangle size={12} className="inline-warn" />
            IMD Warning: 48-Hour Night Minimum Deficit (&gt;31°C) compounds cumulative cardiovascular stress
          </span>
        </div>

        <div className="summary-right">
          <span className="selection-indicator">
            Selected: <strong className="tabular-num">{activeSlot.label} ({activeSlot.time})</strong> — {activeSlot.temp}°C Air / {activeSlot.wetBulb}°C Wet-Bulb
          </span>
        </div>
      </div>

      {/* Interactive Timeline Rail */}
      <div className="forecast-timeline-scroll">
        <div className="timeline-items">
          {forecastData.map((item, idx) => {
            const isSelected = selectedIndex === idx;
            const isExtreme = item.risk === 'extreme';
            const isAlert = item.risk === 'alert';
            const isWatch = item.risk === 'watch';

            return (
              <div
                key={idx}
                className={`forecast-card ${isSelected ? 'selected' : ''} ${item.night ? 'night-slot' : ''}`}
                onClick={() => setSelectedIndex(idx)}
                role="button"
                tabIndex={0}
              >
                <div className="card-top">
                  <span className="slot-time tabular-num">{item.time}</span>
                  {item.night ? (
                    <Moon size={11} className="slot-icon night" />
                  ) : (
                    <Sun size={11} className="slot-icon day" />
                  )}
                </div>

                <div className="card-body">
                  <div className={`temp-value tabular-num ${isExtreme ? 'red' : isAlert ? 'orange' : isWatch ? 'yellow' : 'green'}`}>
                    {item.temp}°
                  </div>
                  <div className="wetbulb-sub tabular-num">
                    Tw {item.wetBulb}°
                  </div>
                </div>

                <div className={`risk-pill ${item.risk}`}>
                  <span>{item.risk.toUpperCase()}</span>
                </div>

                {/* Thermal Diurnal Indicator Bar */}
                <div className="diurnal-bar-track">
                  <div 
                    className={`diurnal-bar-fill ${item.risk}`}
                    style={{ height: `${Math.min(100, Math.max(20, (item.temp - 30) * 6))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
