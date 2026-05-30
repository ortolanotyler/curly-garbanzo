import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const HQ = { lat: 43.6532, lng: -79.3832 };

const COVERAGE_CITIES = [
  'Toronto', 'Montreal', 'Vancouver', 'New York', 'Chicago',
  'Atlanta', 'Dallas', 'Los Angeles', 'San Francisco',
];

export default function LocationsMap() {
  return (
    <section className="relative py-24 md:py-32 bg-brand-dark border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-brand-silver"></div>
              <span className="text-white/60 font-light tracking-[0.3em] text-[10px] uppercase">
                One office. Continental reach.
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.1]">
              Based in Toronto. Recruiting across North America.
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Headquarters
            </span>
            <div className="flex items-center gap-3 text-white">
              <MapPin size={18} className="text-brand-silver" strokeWidth={1.5} />
              <span className="text-base md:text-lg font-light">
                91 Skyway Avenue, Suite 206 · Toronto
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative h-[420px] md:h-[500px] w-full rounded-sm overflow-hidden border border-white/10">
          {hasValidKey ? (
            <APIProvider apiKey={API_KEY} version="weekly">
              <Map
                defaultCenter={{ lat: 41.5, lng: -90 }}
                defaultZoom={4}
                mapId="DEMO_MAP_ID"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
                disableDefaultUI={true}
                styles={[
                  { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#1a2230' }] },
                  { featureType: 'all', elementType: 'labels.text.stroke', stylers: [{ color: '#1a2230' }] },
                  { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: '#5B6C7F' }] },
                  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0E141E' }] },
                ]}
              >
                <AdvancedMarker position={HQ}>
                  <Pin background="#FFFFFF" glyphColor="#0E141E" borderColor="#9FA8B5" />
                </AdvancedMarker>
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
