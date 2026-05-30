import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// Representative job locations in North America
const LOCATIONS = [
  { key: 'ny', position: { lat: 40.7128, lng: -74.0060 } },
  { key: 'sf', position: { lat: 37.7749, lng: -122.4194 } },
  { key: 'chi', position: { lat: 41.8781, lng: -87.6298 } },
  { key: 'tor', position: { lat: 43.6532, lng: -79.3832 } },
];

export default function LocationsMap() {
  if (!hasValidKey) {
    return (
      <section className="py-20 bg-brand-dark border-y border-white/5 text-center">
        <h2 className="text-2xl text-white mb-4">Google Maps API Key Required for Location Map</h2>
        <p className="text-gray-400">
          <strong>Step 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noopener" className="text-brand-silver hover:underline">Get an API Key</a><br />
          <strong>Step 2:</strong> Add your key as <code>GOOGLE_MAPS_PLATFORM_KEY</code> in Settings -&gt; Secrets.
        </p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-brand-dark border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-4xl font-light text-white tracking-wide">Our Presence</h2>
      </div>
      <div className="h-[500px] w-full">
        <APIProvider apiKey={API_KEY} version="weekly">
          <Map
            defaultCenter={{ lat: 39.8283, lng: -98.5795 }} // Center of NA
            defaultZoom={4}
            mapId="DEMO_MAP_ID"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
            disableDefaultUI={true}
            styles={[
              {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{ "color": "#242f3e" }]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{ "color": "#242f3e" }]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#746855" }]
              }
            ]}
          >
            {LOCATIONS.map(loc => (
              <AdvancedMarker key={loc.key} position={loc.position}>
                <Pin background="#C0C0C0" glyphColor="#000" />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </div>
    </section>
  );
}
