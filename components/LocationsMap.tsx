import React, { useEffect, useState } from 'react';
import { JobPosting } from '../types';
import * as jobService from '../services/jobService';

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

// Equirectangular projection (web Mercator's simple cousin). Good enough
// for a static North America view — pins land within ~50 mi of correct
// position on a continent-wide map.
const MAP_BOUNDS = {
  north: 60,
  south: 24,
  west: -135,
  east: -65,
};

const project = (lat: number, lng: number) => {
  const x = ((lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100;
  const y = ((MAP_BOUNDS.north - lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * 100;
  return { x, y };
};

export default function LocationsMap() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  useEffect(() => {
    jobService.getJobsByDomain().then(setJobs);
  }, []);

  const pins = groupJobsByCity(jobs);
  const totalShown = pins.reduce((sum, p) => sum + p.count, 0);
  const unmappedCount = jobs.length - totalShown;
  const hqProjected = project(HQ.lat, HQ.lng);

  return (
    <section className="relative py-24 md:py-32 bg-brand-dark border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.05]">
          Based in Toronto. Recruiting across North America.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative h-[420px] md:h-[500px] w-full rounded-sm overflow-hidden border border-white/10 bg-[#0a0f17]">
          {/* SVG silhouette of North America — drawn as a subtle backdrop */}
          <svg
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a2230" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="700" fill="url(#grid)" />
            {/* Rough North America outline */}
            <path
              d="M 100 200 Q 80 150, 150 120 L 250 100 Q 350 80, 450 100 L 600 90 Q 700 80, 780 110 L 850 150 L 880 220 L 890 320 L 870 420 L 820 500 L 750 560 L 650 590 L 550 610 L 450 620 L 380 600 L 320 560 L 280 500 L 240 450 L 200 400 L 170 350 L 140 290 Z"
              fill="#0e1721"
              stroke="#1f2a38"
              strokeWidth="1.5"
            />
          </svg>

          {/* HQ pin (small square) */}
          <div
            className="absolute"
            style={{
              left: `${hqProjected.x}%`,
              top: `${hqProjected.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            title="Toronto · HQ"
          >
            <div className="w-2.5 h-2.5 bg-brand-steel border border-brand-silver"></div>
          </div>

          {/* Active-search pins */}
          {pins.map((pin) => {
            const { x, y } = project(pin.lat, pin.lng);
            return (
              <div
                key={pin.key}
                className="absolute group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                title={pin.count > 1 ? `${pin.label} · ${pin.count} active` : pin.label}
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-8 h-8 rounded-full bg-brand-silver/20 animate-pulse"></div>
                  <div className="relative w-3.5 h-3.5 rounded-full bg-white border border-brand-silver flex items-center justify-center">
                    {pin.count > 1 && (
                      <span className="text-[8px] font-bold text-brand-dark leading-none">
                        {pin.count}
                      </span>
                    )}
                  </div>
                  <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {pin.label}
                  </span>
                </div>
              </div>
            );
          })}

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
