import React, { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { JobPosting } from '../types';
import * as jobService from '../services/jobService';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const HQ = { lat: 43.6532, lng: -79.3832, label: 'Toronto · HQ' };

// Lightweight client-side geocoder. Add cities here as needed — this avoids
// hitting the Google Geocoding API on every page load.
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

// Parse "Chicago, IL", "Remote / Atlanta, GA", "Toronto, ON, Canada" → key.
const normalizeLocation = (raw: string): string | null => {
  if (!raw) return null;
  // Strip "Remote /" prefix; take the last comma'd pair if multiple
  const cleaned = raw.replace(/remote\s*\/\s*/i, '').trim();
  const parts = cleaned.split(',').map((p) => p.trim());
  if (parts.length < 2) return null;
  const city = parts[0].toLowerCase();
  // Region might be a 2-letter state/province
  const region = parts[1].slice(0, 2).toLowerCase();
  return `${city},${region}`;
};

// Group jobs by their geocoded city. Returns one pin per city with a count.
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
      // Use the original location label so "Toronto, ON" doesn't become "toronto,on"
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

const darkMapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#0E141E' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0E141E' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#5B6C7F' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#2a3340' }] },
  { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#1f2632' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#9FA8B5' }] },
  { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.neighborhood', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1a2230' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#222b3a' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#070b12' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#38393A' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#0E141E' }] },
];

// Active-search pin: silver dot in a glowing ring
const searchPin = (count: number) =>
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="#9FA8B5" fill-opacity="0.2" />
      <circle cx="16" cy="16" r="7" fill="#FFFFFF" stroke="#9FA8B5" stroke-width="2" />
      ${count > 1 ? `<text x="16" y="20" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" font-weight="700" fill="#0E141E">${count}</text>` : ''}
    </svg>
  `);

// HQ pin: smaller, square — visually distinct from the round search pins
const hqPin =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <rect x="4" y="4" width="12" height="12" fill="#5B6C7F" stroke="#9FA8B5" stroke-width="1.5" />
    </svg>
  `);

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
        <div className="relative h-[420px] md:h-[500px] w-full rounded-sm overflow-hidden border border-white/10">
          {hasValidKey ? (
            <APIProvider apiKey={API_KEY} version="weekly">
              <Map
                defaultCenter={{ lat: 41.5, lng: -90 }}
                defaultZoom={4}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
                disableDefaultUI={true}
                gestureHandling="cooperative"
                styles={darkMapStyles}
              >
                <Marker
                  position={{ lat: HQ.lat, lng: HQ.lng }}
                  icon={hqPin}
                  title={HQ.label}
                />
                {pins.map((pin) => (
                  <Marker
                    key={pin.key}
                    position={{ lat: pin.lat, lng: pin.lng }}
                    icon={searchPin(pin.count)}
                    title={pin.count > 1 ? `${pin.label} · ${pin.count} active` : pin.label}
                  />
                ))}
              </Map>
            </APIProvider>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/30 text-center px-8">
              <div className="max-w-md">
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Add a <code className="text-brand-silver text-xs">GOOGLE_MAPS_PLATFORM_KEY</code> environment
                  variable to enable the coverage map.
                </p>
              </div>
            </div>
          )}

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
