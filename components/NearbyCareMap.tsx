'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export type Facility = { 
  id: string; 
  name: string; 
  lat: number; 
  lng: number; 
  type: string;
  address?: string;
  phone?: string;
  distance?: number;
};

// Dynamic import for the MapContainer to avoid SSR issues
const MapContainerDynamic = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

export default function NearbyCareMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  // 1. Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition([coords.latitude, coords.longitude]);
        setError(null);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to retrieve your location. Please enable location services.');
        setLoading(false);
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  // 2. Fetch nearby facilities
  useEffect(() => {
    if (!position) return;
    
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/nearby-facilities?lat=${position[0]}&lng=${position[1]}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch facilities');
        }
        
        const data = await response.json();
        setFacilities(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching facilities:', err);
        setError('Failed to load nearby facilities. Please try again later.');
        // Fallback to mock data if API fails
        const mockFacilities: Facility[] = [
          {
            id: '1',
            name: 'City General Hospital',
            lat: position[0] + 0.01,
            lng: position[1] + 0.01,
            type: 'Hospital',
            address: '123 Healthcare St, Medical District',
            phone: '(555) 123-4567',
            distance: 1.2
          },
          {
            id: '2',
            name: '24/7 Pharmacy',
            lat: position[0] - 0.01,
            lng: position[1] + 0.02,
            type: 'Pharmacy',
            address: '456 Meds Ave, Downtown',
            phone: '(555) 987-6543',
            distance: 1.8
          },
          {
            id: '3',
            name: 'Urgent Care Center',
            lat: position[0] + 0.02,
            lng: position[1] - 0.01,
            type: 'Clinic',
            address: '789 Emergency Rd, Health Plaza',
            phone: '(555) 456-7890',
            distance: 0.8
          }
        ];

        setFacilities(mockFacilities);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, [position]);

  const filteredFacilities = selectedType === 'all' 
    ? facilities 
    : facilities.filter(f => f.type.toLowerCase() === selectedType);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!position) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">Waiting for location permission...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedType === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedType('hospital')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedType === 'hospital' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Hospitals
        </button>
        <button
          onClick={() => setSelectedType('clinic')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedType === 'clinic' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Clinics
        </button>
        <button
          onClick={() => setSelectedType('pharmacy')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedType === 'pharmacy' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pharmacies
        </button>
      </div>

      <div className="relative h-[500px] rounded-lg overflow-hidden border border-gray-200">
        <MapContainerDynamic
          center={position}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* User's location marker */}
          <Marker position={position}>
            <Popup className="text-sm">
              <div className="font-medium">Your Location</div>
              <div className="text-gray-600">Approximate location</div>
            </Popup>
          </Marker>

          {/* Nearby facilities */}
          {filteredFacilities.map((facility) => (
            <Marker 
              key={facility.id} 
              position={[facility.lat, facility.lng]}
              icon={L.divIcon({
                className: 'custom-marker',
                html: `
                  <div class="bg-white rounded-full p-2 shadow-md border-2 border-blue-500">
                    <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                `
              })}
            >
              <Popup className="text-sm w-64">
                <div className="space-y-1">
                  <h4 className="font-semibold text-blue-700">{facility.name}</h4>
                  <p className="text-gray-600">{facility.type}</p>
                  {facility.address && (
                    <p className="text-gray-700 text-sm">{facility.address}</p>
                  )}
                  {facility.phone && (
                    <p className="text-gray-700 text-sm">📞 {facility.phone}</p>
                  )}
                  {facility.distance && (
                    <p className="text-sm text-gray-500">
                      {facility.distance.toFixed(1)} km away
                    </p>
                  )}
                  <button 
                    className="mt-2 w-full bg-blue-600 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      // Open in Google Maps
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`,
                        '_blank'
                      );
                    }}
                  >
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainerDynamic>
      </div>

      {/* Facilities list */}
      <div className="space-y-3 mt-4">
        <h3 className="font-medium text-gray-900">Nearby Facilities</h3>
        {filteredFacilities.length > 0 ? (
          <div className="space-y-2">
            {filteredFacilities.map((facility) => (
              <div 
                key={facility.id} 
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  // You could add functionality to highlight the marker on the map
                  // when a list item is clicked
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{facility.name}</h4>
                    <p className="text-sm text-gray-500">{facility.type}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {facility.distance?.toFixed(1)} km
                  </span>
                </div>
                {facility.address && (
                  <p className="text-sm text-gray-700 mt-1">{facility.address}</p>
                )}
                {facility.phone && (
                  <p className="text-sm text-blue-600 mt-1">📞 {facility.phone}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No {selectedType === 'all' ? 'facilities' : selectedType + 's'} found nearby.</p>
        )}
      </div>
    </div>
  );
}

// Add this to your global CSS file (globals.css or a dedicated CSS module)
// .leaflet-container {
//   width: 100%;
//   height: 100%;
//   z-index: 0;
// }


// .leaflet-popup-content-wrapper {
//   border-radius: 8px;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
// }


// .leaflet-popup-content {
//   margin: 0;
//   line-height: 1.4;
// }
