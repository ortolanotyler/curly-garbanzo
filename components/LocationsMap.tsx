import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const HQ = { lat: 43.6532, lng: -79.3832 };

const COVERAGE_CITIES = [
  'Toronto', 'Montreal', 'Vancouver', 'New York', 'Chicago',
  'Atlanta', 'Dallas', 'Los Angeles', 'San Francisco',
];

// Dark theme for the map. Inline styles only take effect when no
// cloud-based mapId is set, which is why we use the legacy `Marker`
// component (AdvancedMarker requires mapId).
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

// SVG-encoded brand pin (silver dot inside a darker ring), so the
// legacy Marker matches the rest of the UI without needing AdvancedMarker.
const pinIcon =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="#9FA8B5" fill-opacity="0.18" />
      <circle cx="16" cy="16" r="7" fill="#FFFFFF" stroke="#9FA8B5" stroke-width="2" />
    </svg>
  `);

export default function LocationsMap() {
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
                  position={HQ}
                  icon={{ url: pinIcon, scaledSize: { width: 32, height: 32 } as google.maps.Size }}
                />
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

          <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-xs bg-brand-dark/90 backdrop-blur-md border border-white/10 rounded-sm px-5 py-4 pointer-events-none">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-brand-silver"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                Recent placements in
              </span>
            </div>
            <p className="text-white text-sm font-light leading-snug">
              {COVERAGE_CITIES.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
