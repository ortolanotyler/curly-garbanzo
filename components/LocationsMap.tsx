import React, { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { ArrowRight, MapPin, DollarSign } from 'lucide-react';
import { JobPosting } from '../types';
import * as jobService from '../services/jobService';
import ApplicationModal from './ApplicationModal';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const NA_COUNTRY_IDS = new Set(['124', '840', '484']); // Canada, USA, Mexico

const HQ = { lat: 43.6532, lng: -79.3832 };

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'toronto,on': { lat: 43.6532, lng: -79.3832 },
  'mississauga,on': { lat: 43.5890, lng: -79.6441 },
  'sarnia,on': { lat: 42.9745, lng: -82.4066 },
  'windsor,on': { lat: 42.3149, lng: -83.0364 },
  'montreal,qc': { lat: 45.5019, lng: -73.5674 },
  'vancouver,bc': { lat: 49.2827, lng: -123.1207 },
  'calgary,ab': { lat: 51.0447, lng: -114.0719 },
  'ottawa,on': { lat: 45.4215, lng: -75.6972 },
  'edmonton,ab': { lat: 53.5461, lng: -113.4938 },
  'winnipeg,mb': { lat: 49.8951, lng: -97.1384 },
  'halifax,ns': { lat: 44.6488, lng: -63.5752 },
  'new york,ny': { lat: 40.7128, lng: -74.006 },
  'chicago,il': { lat: 41.8781, lng: -87.6298 },
  'los angeles,ca': { lat: 34.0522, lng: -118.2437 },
  'san francisco,ca': { lat: 37.7749, lng: -122.4194 },
  'seattle,wa': { lat: 47.6062, lng: -122.3321 },
  'boston,ma': { lat: 42.3601, lng: -71.0589 },
  'atlanta,ga': { lat: 33.749, lng: -84.388 },
  'dallas,tx': { lat: 32.7767, lng: -96.797 },
  'houston,tx': { lat: 29.7604, lng: -95.3698 },
  'austin,tx': { lat: 30.2672, lng: -97.7431 },
  'denver,co': { lat: 39.7392, lng: -104.9903 },
  'phoenix,az': { lat: 33.4484, lng: -112.074 },
  'miami,fl': { lat: 25.7617, lng: -80.1918 },
  'philadelphia,pa': { lat: 39.9526, lng: -75.1652 },
  'washington,dc': { lat: 38.9072, lng: -77.0369 },
  'minneapolis,mn': { lat: 44.9778, lng: -93.265 },
  'detroit,mi': { lat: 42.3314, lng: -83.0458 },
  'charlotte,nc': { lat: 35.2271, lng: -80.8431 },
  'nashville,tn': { lat: 36.1627, lng: -86.7816 },
  'portland,or': { lat: 45.5152, lng: -122.6784 },
  'san diego,ca': { lat: 32.7157, lng: -117.1611 },
  'pittsburgh,pa': { lat: 40.4406, lng: -79.9959 },
  'columbus,oh': { lat: 39.9612, lng: -82.9988 },
  'indianapolis,in': { lat: 39.7684, lng: -86.1581 },
  'kansas city,mo': { lat: 39.0997, lng: -94.5786 },
  'st louis,mo': { lat: 38.627, lng: -90.1994 },
  'cleveland,oh': { lat: 41.4993, lng: -81.6944 },
  'cincinnati,oh': { lat: 39.1031, lng: -84.512 },
  'monroe,oh': { lat: 39.4392, lng: -84.3622 },
  'tampa,fl': { lat: 27.9506, lng: -82.4572 },
  'orlando,fl': { lat: 28.5383, lng: -81.3792 },
};

const normalizeLocation = (raw: string): string | null => {
  if (!raw) return null;
  const cleaned = raw.replace(/remote\s*\/\s*/i, '').trim();
  const parts = cleaned.split(',').map((p) => p.trim());
  if (parts.length < 2) return null;
  const city = parts[0].toLowerCase();
  const region = parts[1].slice(0, 2).toLowerCase();
  return `${city},${region}`;
};

type JobPin = { lat: number; lng: number; key: string; label: string; jobs: JobPosting[] };

const groupJobsByCity = (jobs: JobPosting[]): JobPin[] => {
  const buckets = new Map<string, JobPin>();
  for (const job of jobs) {
    const key = normalizeLocation(job.location);
    if (!key) continue;
    const coords = CITY_COORDS[key];
    if (!coords) continue;
    const existing = buckets.get(key);
    if (existing) {
      existing.jobs.push(job);
    } else {
      const displayParts = job.location.replace(/remote\s*\/\s*/i, '').split(',').map((p) => p.trim());
      buckets.set(key, {
        ...coords,
        key,
        label: `${displayParts[0]}, ${displayParts[1].slice(0, 2).toUpperCase()}`,
        jobs: [job],
      });
    }
  }
  return Array.from(buckets.values());
};

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 700;

export default function LocationsMap() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [applyingTo, setApplyingTo] = useState<JobPosting | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    jobService.getJobsByDomain().then(setJobs);
  }, []);

  const pins = groupJobsByCity(jobs);
  const totalShown = pins.reduce((sum, p) => sum + p.jobs.length, 0);
  const hoveredPin = pins.find((p) => p.key === hoveredKey) || null;

  const handlePinEnter = (key: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setHoveredKey(key);
  };

  const handlePinLeave = () => {
    closeTimer.current = window.setTimeout(() => setHoveredKey(null), 200);
  };

  return (
    <section className="relative bg-[#070b12] border-y border-white/5 overflow-hidden h-[70vh] min-h-[520px]">
      {/* Full-bleed map */}
      <div className="absolute inset-0">
        <ComposableMap
          projection="geoAlbers"
          projectionConfig={{ scale: 900, center: [-3, 42] }}
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: Array<{ rsmKey: string; id?: string }> }) =>
              geographies
                .filter((geo) => geo.id && NA_COUNTRY_IDS.has(geo.id))
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#0E141E"
                    stroke="#1f2a38"
                    strokeWidth={0.6}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', fill: '#0E141E' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
            }
          </Geographies>

          {/* HQ */}
          <Marker coordinates={[HQ.lng, HQ.lat]}>
            <rect x={-3.5} y={-3.5} width={7} height={7} fill="#5B6C7F" stroke="#9FA8B5" strokeWidth={1} />
          </Marker>

          {/* Active-search pins (rendered first so popup overlays them) */}
          {pins.map((pin) => {
            const isHovered = hoveredKey === pin.key;
            return (
              <Marker
                key={pin.key}
                coordinates={[pin.lng, pin.lat]}
                onMouseEnter={() => handlePinEnter(pin.key)}
                onMouseLeave={handlePinLeave}
                style={{
                  default: { cursor: 'pointer' },
                  hover: { cursor: 'pointer' },
                  pressed: { cursor: 'pointer' },
                }}
              >
                <circle r={14} fill="#9FA8B5" fillOpacity={isHovered ? 0.45 : 0.18} />
                <circle r={isHovered ? 7 : 6} fill="#FFFFFF" stroke="#9FA8B5" strokeWidth={isHovered ? 2 : 1.5} />
                {pin.jobs.length > 1 && (
                  <text
                    textAnchor="middle"
                    y={2.5}
                    fontSize={8}
                    fontWeight={700}
                    fill="#0E141E"
                    style={{ fontFamily: 'system-ui, sans-serif', pointerEvents: 'none' }}
                  >
                    {pin.jobs.length}
                  </text>
                )}
              </Marker>
            );
          })}

          {/* Hover popup — rendered AFTER pins so it z-orders on top.
              foreignObject lets us put real HTML inside the SVG, so the popup
              uses the same projection as the markers (no alignment math). */}
          {hoveredPin && (
            <Marker coordinates={[hoveredPin.lng, hoveredPin.lat]}>
              <foreignObject
                x={-140}
                y={-(Math.min(hoveredPin.jobs.length, 3) * 56 + 60)}
                width={280}
                height={Math.min(hoveredPin.jobs.length, 3) * 56 + 56}
                style={{ overflow: 'visible' }}
              >
                <div
                  onMouseEnter={() => handlePinEnter(hoveredPin.key)}
                  onMouseLeave={handlePinLeave}
                  className="bg-brand-dark/95 backdrop-blur-md border border-white/10 rounded-sm p-3 shadow-2xl text-white"
                  style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
                >
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                    <MapPin size={11} className="text-brand-silver" strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                      {hoveredPin.label}
                    </span>
                    <span className="ml-auto text-[10px] text-white/40 font-mono">
                      {hoveredPin.jobs.length} {hoveredPin.jobs.length === 1 ? 'role' : 'roles'}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[156px] overflow-y-auto">
                    {hoveredPin.jobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="group">
                        <div className="text-xs font-medium text-white leading-tight line-clamp-2">
                          {job.title}
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-1.5">
                          <span className="text-[10px] text-white/40 font-light flex items-center gap-1">
                            <DollarSign size={10} strokeWidth={1.5} className="text-brand-silver" />
                            {job.salary}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setApplyingTo(job);
                            }}
                            className="inline-flex items-center gap-1 bg-white text-brand-dark hover:bg-brand-silver px-2.5 py-1 rounded-sm text-[9px] font-bold uppercase tracking-[0.15em] transition-colors"
                          >
                            Apply
                            <ArrowRight size={9} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {hoveredPin.jobs.length > 3 && (
                      <div className="text-[9px] text-white/40 uppercase tracking-[0.2em] text-center pt-1">
                        +{hoveredPin.jobs.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </foreignObject>
            </Marker>
          )}
        </ComposableMap>

        {/* Subtle vignette to push the map back, content forward */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Headline overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.05] max-w-2xl drop-shadow-2xl">
          Based in Toronto.
          <br />
          Recruiting across North America.
        </h2>
        <p className="mt-5 text-white/60 text-xs font-light uppercase tracking-[0.3em]">
          {totalShown > 0
            ? `${totalShown} active ${totalShown === 1 ? 'search' : 'searches'} · ${pins.length} ${pins.length === 1 ? 'city' : 'cities'}`
            : ''}
        </p>
        <p className="mt-3 text-white/40 text-[10px] font-light uppercase tracking-[0.3em]">
          Hover a pin to view roles
        </p>
      </div>

      {applyingTo && (
        <ApplicationModal
          job={applyingTo}
          isOpen={!!applyingTo}
          onClose={() => setApplyingTo(null)}
        />
      )}
    </section>
  );
}
