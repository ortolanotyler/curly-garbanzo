import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { JobPosting } from '../types';
import * as jobService from '../services/jobService';

// World topojson at 110m resolution (small countries lost, fine for continent view)
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
// ISO-3166 numeric codes for North America countries we want to render
const NA_COUNTRY_IDS = new Set(['124', '840', '484']); // Canada, USA, Mexico

const HQ = { lat: 43.6532, lng: -79.3832 };

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'toronto,on': { lat: 43.6532, lng: -79.3832 },
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

type JobPin = { lat: number; lng: number; key: string; label: string; count: number };

const groupJobsByCity = (jobs: JobPosting[]): JobPin[] => {
  const buckets = new Map<string, JobPin>();
  for (const job of jobs) {
    const key = normalizeLocation(job.location);
    if (!key) continue;
    const coords = CITY_COORDS[key];
    if (!coords) continue;
    const existing = buckets.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      const displayParts = job.location.replace(/remote\s*\/\s*/i, '').split(',').map((p) => p.trim());
      buckets.set(key, {
        ...coords,
        key,
        label: `${displayParts[0]}, ${displayParts[1].slice(0, 2).toUpperCase()}`,
        count: 1,
      });
    }
  }
  return Array.from(buckets.values());
};

export default function LocationsMap() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  useEffect(() => {
    jobService.getJobsByDomain().then(setJobs);
  }, []);

  const pins = groupJobsByCity(jobs);
  const totalShown = pins.reduce((sum, p) => sum + p.count, 0);
  const unmappedCount = jobs.length - totalShown;

  return (
    <section className="relative py-24 md:py-32 bg-brand-dark border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.05]">
          Based in Toronto. Recruiting across North America.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative h-[420px] md:h-[500px] w-full rounded-sm overflow-hidden border border-white/10 bg-[#0a0f17]">
          <ComposableMap
            projection="geoAlbers"
            projectionConfig={{ scale: 700, center: [-3, 38] }}
            width={800}
            height={500}
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
                      fill="#0e1721"
                      stroke="#2a3340"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none', fill: '#0e1721' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
              }
            </Geographies>

            {/* HQ marker */}
            <Marker coordinates={[HQ.lng, HQ.lat]}>
              <rect x={-3} y={-3} width={6} height={6} fill="#5B6C7F" stroke="#9FA8B5" strokeWidth={1} />
            </Marker>

            {/* Active-search markers */}
            {pins.map((pin) => (
              <Marker key={pin.key} coordinates={[pin.lng, pin.lat]}>
                <circle r={10} fill="#9FA8B5" fillOpacity={0.2} />
                <circle r={5} fill="#FFFFFF" stroke="#9FA8B5" strokeWidth={1.5} />
                {pin.count > 1 && (
                  <text
                    textAnchor="middle"
                    y={2}
                    fontSize={7}
                    fontWeight={700}
                    fill="#0E141E"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {pin.count}
                  </text>
                )}
                <title>{pin.count > 1 ? `${pin.label} · ${pin.count} active` : pin.label}</title>
              </Marker>
            ))}
          </ComposableMap>

          {pins.length > 0 && (
            <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-xs bg-brand-dark/90 backdrop-blur-md border border-white/10 rounded-sm px-5 py-4 pointer-events-none">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-silver"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                  Active searches
                </span>
              </div>
              <p className="text-white text-sm font-light leading-snug">
                {totalShown} open {totalShown === 1 ? 'role' : 'roles'} across{' '}
                {pins.length} {pins.length === 1 ? 'city' : 'cities'}
                {unmappedCount > 0 ? ` (+${unmappedCount} other)` : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
