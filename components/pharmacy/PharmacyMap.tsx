'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Loader2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

export type Pharmacy = {
  id: number;
  name: string;
  address: string;
  distance?: string;
  open: boolean | null;
  rating: number | null;
  delivery: boolean | null; 
  pickup: boolean | null;
  lat: number;
  lng: number;
};

export default function PharmacyMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Unable to retrieve your location');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // Fetch nearby pharmacies when position is available
  useEffect(() => {
    if (!position) return;

    const [lat, lng] = position;
    setLoading(true);
    
    fetch(`/api/nearby-pharmacies?lat=${lat}&lng=${lng}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch pharmacies');
        }
        return res.json();
      })
      .then((data) => {
        // Add distance to each pharmacy
        const pharmaciesWithDistance = data.map((pharmacy: any) => {
          const distance = calculateDistance(lat, lng, pharmacy.lat, pharmacy.lng);
          return {
            ...pharmacy,
            distance
          };
        });
        setPharmacies(pharmaciesWithDistance);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to load pharmacies');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [position]);

  // Helper function to calculate distance between two points in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(1) + ' miles';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Finding nearby pharmacies...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!position) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
        Please enable location services to see nearby pharmacies.
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={position}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* User's location marker */}
        <Marker position={position}>
          <Popup>Your Location</Popup>
        </Marker>

        {/* Pharmacy markers */}
        {pharmacies.map((pharmacy: Pharmacy) => (
          <Marker 
            key={pharmacy.id} 
            position={[pharmacy.lat, pharmacy.lng]}
            icon={L.icon({
              iconUrl: '/pharmacy-marker.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            })}
          >
            <Popup>
              <div className="space-y-1">
                <h3 className="font-semibold">{pharmacy.name}</h3>
                <p className="text-sm">{pharmacy.address}</p>
                <div className="flex items-center text-sm">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${pharmacy.open ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {pharmacy.open ? 'Open Now' : 'Closed'}
                </div>
                {pharmacy.distance && (
                  <p className="text-sm text-gray-600">{pharmacy.distance} away</p>
                )}
                <div className="flex space-x-2 mt-1">
                  {pharmacy.delivery && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Delivery</span>
                  )}
                  {pharmacy.pickup && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Pickup</span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
