import React, { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoAlbers } from 'd3-geo';
import { ArrowRight, MapPin, DollarSign } from 'lucide-react';
import { JobPosting } from '../types';
import * as jobService from '../services/jobService';
import JobDetailDrawer from './JobDetailDrawer';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const NA_COUNTRY_IDS = new Set(['124', '840', '484']); // Canada, USA, Mexico

const HQ = { lat: 43.6532, lng: -79.3832 };

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'toronto,on': { lat: 43.6532, lng: -79.3832 },
  'mississauga,on': { lat: 43.5890, lng: -79.6441 },
  'sarnia,on': { lat: 42.9745, lng: -82.4066 },
  'hamilton,on': { lat: 43.2557, lng: -79.8711 },
  'brantford,on': { lat: 43.1394, lng: -80.2644 },
  'lachine,qc': { lat: 45.4351, lng: -73.6776 },
  'vancouver,bc': { lat: 49.2827, lng: -123.1207 },
  'calgary,ab': { lat: 51.0447, lng: -114.0719 },
  'winnipeg,mb': { lat: 49.8951, lng: -97.1384 },
  'new york,ny': { lat: 40.7128, lng: -74.006 },
  'chicago,il': { lat: 41.8781, lng: -87.6298 },
  'seattle,wa': { lat: 47.6062, lng: -122.3321 },
  'boston,ma': { lat: 42.3601, lng: -71.0589 },
  'dallas,tx': { lat: 32.7767, lng: -96.797 },
  'denver,co': { lat: 39.7392, lng: -104.9903 },
  'miami,fl': { lat: 25.7617, lng: -80.1918 },
  'carlisle,pa': { lat: 40.2017, lng: -77.1997 },
  'charlotte,nc': { lat: 35.2271, lng: -80.8431 },
  'columbus,oh': { lat: 39.9612, lng: -82.9988 },
  'monroe,oh': { lat: 39.4392, lng: -84.3622 },
  'tampa,fl': { lat: 27.9506, lng: -82.4572 },
  'alpharetta,ga': { lat: 34.0754, lng: -84.2941 },
  'chattanooga,tn': { lat: 35.0456, lng: -85.3097 },
  'buffalo,ny': { lat: 42.8864, lng: -78.8784 },
  'york,pa': { lat: 39.9626, lng: -76.7277 },
  'south shore montreal,qc': { lat: 45.5312, lng: -73.5181 }, // Rive-Sud / Longueuil
  'northern los angeles,ca': { lat: 34.2381, lng: -118.5301 }, // San Fernando Valley
  'sarnia / windsor / mississauga,on': { lat: 42.9745, lng: -82.4066 }, // pinned at Sarnia (preferred)
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

type JobPin = { lat: number; lng: number; key: string; label: string; jobs: JobPosting[]; cluster?: boolean };

// Remote roles have no city, so they normally don't pin. Anchor specific ones
// to a representative hub (the role still reads "Remote ..." on the board).
const REMOTE_PINS: Record<string, { key: string; label: string }> = {
  'Remote (US)': { key: 'chicago,il', label: 'Chicago, IL' },
  'Remote (Central US)': { key: 'dallas,tx', label: 'Dallas, TX' },
};

const groupJobsByCity = (jobs: JobPosting[]): JobPin[] => {
  const buckets = new Map<string, JobPin>();
  for (const job of jobs) {
    const override = REMOTE_PINS[job.location.trim()];
    const key = override ? override.key : normalizeLocation(job.location);
    if (!key) continue;
    const coords = CITY_COORDS[key];
    if (!coords) continue;
    const existing = buckets.get(key);
    if (existing) {
      existing.jobs.push(job);
    } else {
      let label = override?.label;
      if (!label) {
        const displayParts = job.location.replace(/remote\s*\/\s*/i, '').split(',').map((p) => p.trim());
        label = `${displayParts[0]}, ${displayParts[1].slice(0, 2).toUpperCase()}`;
      }
      buckets.set(key, { ...coords, key, label, jobs: [job] });
    }
  }
  return Array.from(buckets.values());
};

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 700;
const MAP_SCALE = 1150;
const MAP_CENTER: [number, number] = [4, 40]; // a touch less Mexico

// Mirror of react-simple-maps' internal projection so we can compute a pin's
// on-map Y position and flip its hover popup downward when there's no room above.
const projection = geoAlbers()
  .scale(MAP_SCALE)
  .translate([SVG_WIDTH / 2, SVG_HEIGHT / 2])
  .center(MAP_CENTER);

// Pins closer than this (in on-map SVG units) overlap and can't be tapped
// apart — especially on touch. Collapse them into one marker. Tuned so the
// tight GTA core (Toronto/Mississauga/Hamilton/Brantford, all <17 apart) merges
// while distinct metros (Columbus/Monroe ~23, London ~30, Buffalo ~17) stay separate.
const CLUSTER_PX = 14;

const clusterPins = (cityPins: JobPin[]): JobPin[] => {
  const nodes = cityPins.map((pin) => ({ pin, xy: projection([pin.lng, pin.lat]) as [number, number] | null }));
  const used = new Array(nodes.length).fill(false);
  const out: JobPin[] = [];
  for (let i = 0; i < nodes.length; i++) {
    if (used[i]) continue;
    used[i] = true;
    const group = [i];
    // Single-link: transitively gather every pin within CLUSTER_PX.
    for (let a = 0; a < group.length; a++) {
      const A = nodes[group[a]].xy;
      if (!A) continue;
      for (let j = 0; j < nodes.length; j++) {
        if (used[j]) continue;
        const B = nodes[j].xy;
        if (B && Math.hypot(A[0] - B[0], A[1] - B[1]) <= CLUSTER_PX) {
          used[j] = true;
          group.push(j);
        }
      }
    }
    if (group.length === 1) {
      out.push(nodes[i].pin);
      continue;
    }
    const members = group.map((k) => nodes[k].pin);
    const primary = members.reduce((m, p) => (p.jobs.length > m.jobs.length ? p : m), members[0]);
    out.push({
      lat: primary.lat,
      lng: primary.lng,
      key: members.map((m) => m.key).join('+'),
      label: `${primary.label} +${members.length - 1}`,
      jobs: members.flatMap((m) => m.jobs),
      cluster: true,
    });
  }
  return out;
};

export default function LocationsMap() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [viewingJob, setViewingJob] = useState<JobPosting | null>(null);
  const closeTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    jobService.getJobsByDomain().then(setJobs);
  }, []);

  // Track the section's pixel size so we can place the hover popup as a
  // top-layer HTML overlay (above the headline copy), aligned to the map
  // projection. Mirrors react-simple-maps' preserveAspectRatio="xMidYMid meet".
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pins = clusterPins(groupJobsByCity(jobs));
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
    <section
      ref={containerRef}
      onClick={() => setHoveredKey(null)}
      className="relative bg-[#070b12] border-y border-white/5 overflow-hidden h-[70vh] min-h-[520px]"
    >
      {/* Full-bleed map — decorative; every role is reachable via the job board,
          so the SVG + hover/tap pins are hidden from assistive tech. */}
      <div className="absolute inset-0" aria-hidden="true">
        <ComposableMap
          projection="geoAlbers"
          projectionConfig={{ scale: MAP_SCALE, center: MAP_CENTER }}
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <filter id="pinGlow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>
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
            const multi = pin.jobs.length > 1;
            return (
              <Marker
                key={pin.key}
                coordinates={[pin.lng, pin.lat]}
                onMouseEnter={() => handlePinEnter(pin.key)}
                onMouseLeave={handlePinLeave}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  // Open on tap (touch fires mouseenter→click; setting, not toggling,
                  // keeps it deterministically open). Tap-away / role-tap closes it.
                  handlePinEnter(pin.key);
                }}
                style={{
                  default: { cursor: 'pointer' },
                  hover: { cursor: 'pointer' },
                  pressed: { cursor: 'pointer' },
                }}
              >
                {/* Enlarged invisible hit target so pins are tappable on touch */}
                <circle r={16} fill="transparent" pointerEvents="all" />
                {/* White glow */}
                <circle
                  r={(isHovered ? 9 : 7) + (multi ? 1.5 : 0)}
                  fill="#FFFFFF"
                  opacity={isHovered ? 0.6 : 0.4}
                  filter="url(#pinGlow)"
                  pointerEvents="none"
                />
                {/* Certus-blue center with a crisp white outline */}
                <circle
                  r={(isHovered ? 6 : 5) + (multi ? 2 : 0)}
                  fill="#0d2444"
                  stroke="#FFFFFF"
                  strokeWidth={isHovered ? 2 : 1.5}
                  pointerEvents="none"
                />
              </Marker>
            );
          })}

          {/* Hover popup is rendered as a top-layer HTML overlay (below),
              so it can paint above the headline copy and bottom gradient. */}
        </ComposableMap>

        {/* Subtle left vignette to push the map back, content forward */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-transparent pointer-events-none"></div>
        {/* Soft, tall multi-stop fade at the bottom — lets the southern map (Mexico)
            spill through above it, while the very bottom edge melts into the hero below */}
        <div className="absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-t from-brand-dark via-brand-dark/55 to-transparent pointer-events-none"></div>
      </div>

      {/* Headline overlay — anchored bottom-right, aligned to the content gutter */}
      <div className="absolute inset-x-0 bottom-0 z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-12 md:pb-16 pointer-events-none">
        <div className="ml-auto max-w-xl text-right relative">
          {/* Soft right-weighted backdrop so the headline reads cleanly over any
              pin sitting behind it, without dimming pins elsewhere on the map */}
          <div className="pointer-events-none absolute -inset-x-10 -top-10 -bottom-6 bg-gradient-to-l from-brand-dark/90 via-brand-dark/55 to-transparent blur-md"></div>
          <h2 className="relative text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.05] drop-shadow-2xl">
            Recruiting across North America
          </h2>
          <p className="relative mt-4 text-white/40 text-[10px] font-light uppercase tracking-[0.3em]">
            Hover or tap a pin · select a role for details
          </p>
        </div>
      </div>

      {/* Hover popup — top-layer HTML overlay (z-30) so it sits over the
          headline copy. Positioned from the map projection + measured size. */}
      {hoveredPin && size.w > 0 && (() => {
        const vb = projection([hoveredPin.lng, hoveredPin.lat]);
        if (!vb) return null;
        const scale = Math.min(size.w / SVG_WIDTH, size.h / SVG_HEIGHT);
        const offX = (size.w - SVG_WIDTH * scale) / 2;
        const offY = (size.h - SVG_HEIGHT * scale) / 2;
        const px = offX + vb[0] * scale;
        const py = offY + vb[1] * scale;
        const BOX_W = 300;
        const boxH = Math.min(hoveredPin.jobs.length, 3) * 66 + 64;
        const HEADER_SAFE = 72; // keep the box clear of the overlaid header
        const openAbove = py - boxH - 16 > HEADER_SAFE;
        const top = openAbove ? py - boxH - 14 : py + 18;
        const left = Math.max(8, Math.min(px - BOX_W / 2, size.w - BOX_W - 8));
        return (
          <div className="absolute inset-0 z-30 pointer-events-none" aria-hidden="true">
            <div
              onMouseEnter={() => handlePinEnter(hoveredPin.key)}
              onMouseLeave={handlePinLeave}
              onClick={(e) => e.stopPropagation()}
              style={{ left, top, width: BOX_W, fontFamily: 'Outfit, system-ui, sans-serif' }}
              className="absolute pointer-events-auto bg-brand-dark/95 backdrop-blur-md border border-white/10 rounded-sm p-3 shadow-2xl text-white"
            >
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                <MapPin size={11} className="text-brand-silver" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                  {hoveredPin.label}
                </span>
                <span className="ml-auto text-[10px] text-white/40 font-light tracking-wide">
                  {hoveredPin.jobs.length} {hoveredPin.jobs.length === 1 ? 'role' : 'roles'}
                </span>
              </div>
              <div className="space-y-1 max-h-[210px] overflow-y-auto">
                {hoveredPin.jobs.map((job) => (
                  <button
                    key={job.id}
                    type="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingJob(job);
                      setHoveredKey(null);
                    }}
                    className="group/role w-full text-left rounded-sm px-2 -mx-2 py-2 hover:bg-white/5 transition-colors flex items-start gap-2.5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-white leading-snug line-clamp-2 group-hover/role:text-brand-silver transition-colors">
                        {job.title}
                      </div>
                      {hoveredPin.cluster && (
                        <div className="mt-1 text-[10px] text-white/40 font-light flex items-center gap-1">
                          <MapPin size={9} strokeWidth={1.5} className="text-brand-silver/70 flex-shrink-0" />
                          <span className="truncate">{job.location.replace(/\s*\(.*\)$/, '')}</span>
                        </div>
                      )}
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-white/40 font-light">
                        <DollarSign size={10} strokeWidth={1.5} className="text-brand-silver flex-shrink-0" />
                        <span className="truncate">{job.salary}</span>
                      </div>
                    </div>
                    <ArrowRight
                      size={13}
                      strokeWidth={2}
                      className="mt-0.5 flex-shrink-0 text-white/25 group-hover/role:text-brand-silver group-hover/role:translate-x-0.5 transition-all"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      <JobDetailDrawer
        job={viewingJob}
        isOpen={!!viewingJob}
        onClose={() => setViewingJob(null)}
      />
    </section>
  );
}
