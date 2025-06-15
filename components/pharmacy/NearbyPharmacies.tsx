'use client';

import { MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Pharmacy = {
  id: number;
  name: string;
  address: string;
  distance: string;
  open: boolean;
  rating: number;
  delivery: boolean;
  pickup: boolean;
};

type NearbyPharmaciesProps = {
  pharmacies: Pharmacy[];
};

export function NearbyPharmacies({ pharmacies }: NearbyPharmaciesProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pharmacies.map((pharmacy) => (
        <Card key={pharmacy.id} className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-white">{pharmacy.name}</CardTitle>
                <p className="text-sm text-gray-400 mt-1">{pharmacy.distance} away</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                pharmacy.open ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
              }`}>
                {pharmacy.open ? 'Open Now' : 'Closed'}
              </div>
            </div>
            <CardDescription className="text-gray-400">{pharmacy.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(pharmacy.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-xs text-gray-500">{pharmacy.rating}</span>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              {pharmacy.delivery && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
                  Delivery
                </span>
              )}
              {pharmacy.pickup && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/30 text-purple-400">
                  Pickup
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled={!pharmacy.open}>
              {pharmacy.open ? 'View Details' : 'Closed'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
