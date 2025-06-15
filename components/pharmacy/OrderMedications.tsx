'use client';

import { Search, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Medication = {
  id: number;
  name: string;
  inStock: boolean;
  price: number;
};

type OrderMedicationsProps = {
  medications: Medication[];
  onOrder: (medicationId: number) => Promise<void>;
  isLoading: boolean;
};

export function OrderMedications({ medications, onOrder, isLoading }: OrderMedicationsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeds = medications.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search medications..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredMeds.length > 0 ? (
          filteredMeds.map((med) => (
            <div key={med.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div>
                <h3 className="font-medium text-white">{med.name}</h3>
                <div className="flex items-center mt-1">
                  {med.inStock ? (
                    <span className="inline-flex items-center text-xs text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-xs text-red-400">
                      <XCircle className="h-3 w-3 mr-1" />
                      Out of Stock
                    </span>
                  )}
                  <span className="mx-2 text-gray-600">•</span>
                  <span className="text-xs text-gray-400">${med.price.toFixed(2)}</span>
                </div>
              </div>
              <Button 
                variant={med.inStock ? 'default' : 'outline'}
                disabled={!med.inStock || isLoading}
                onClick={() => onOrder(med.id)}
                className="min-w-[100px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : med.inStock ? (
                  'Add to Cart'
                ) : (
                  'Unavailable'
                )}
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No medications found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
