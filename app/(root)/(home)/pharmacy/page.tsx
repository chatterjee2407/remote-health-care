'use client';

import { useState } from 'react';
import { MapPin, ShoppingCart, Bell, Pill, Plus, MessageSquare, Map, List } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PharmacyChat } from '@/components/pharmacy/PharmacyChat';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const PharmacyMap = dynamic(
  () => import('@/components/pharmacy/PharmacyMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

type PharmacyTab = 'nearby' | 'order' | 'reminders' | 'drug-info';

export default function PharmacyPage() {
  const [activeTab, setActiveTab] = useState<PharmacyTab>('nearby');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  // Mock data for other sections
  const medications = [
    { id: 1, name: 'Atorvastatin 20mg', inStock: true, price: 12.99 },
    { id: 2, name: 'Metformin 500mg', inStock: true, price: 8.50 },
    { id: 3, name: 'Lisinopril 10mg', inStock: false, price: 10.25 },
    { id: 4, name: 'Amoxicillin 250mg', inStock: true, price: 15.75 },
    { id: 5, name: 'Ibuprofen 400mg', inStock: true, price: 5.99 },
  ];
  
  const [reminders, setReminders] = useState([
    { id: 1, medication: 'Atorvastatin', time: '08:00', taken: true },
    { id: 2, medication: 'Metformin', time: '12:30', taken: false },
    { id: 3, medication: 'Lisinopril', time: '20:00', taken: false },
  ]);
  

  const handleOrderMedication = async (medicationId: number) => {
    // In a real app, this would be an API call
    console.log('Ordered medication:', medicationId);
  };
  
  const handleToggleReminder = (reminderId: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, taken: !reminder.taken } 
        : reminder
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Pharmacy Services</h1>
          <p className="text-gray-400 mt-2">Find nearby pharmacies and manage your medications</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat with Pharmacist
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Prescription
          </Button>
          <PharmacyChat />
        </div>
      </div>
      
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Nearby Pharmacies</h2>
        <div className="flex bg-gray-800 rounded-lg p-1">
          <Button
            variant={viewMode === 'map' ? 'default' : 'ghost'}
            size="sm"
            className={`gap-2 ${viewMode === 'map' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            onClick={() => setViewMode('map')}
          >
            <Map className="h-4 w-4" />
            Map
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            className={`gap-2 ${viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
            List
          </Button>
        </div>
      </div>
      
      {/* Map or List View */}
      <div className="mb-8">
        {viewMode === 'map' ? (
          <PharmacyMap />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Feature Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">The list view is currently under development. Please use the map view to explore nearby pharmacies.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as PharmacyTab)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="nearby" className="gap-2">
            <MapPin className="h-4 w-4" />
            Nearby
          </TabsTrigger>
          <TabsTrigger value="order" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Order
          </TabsTrigger>
          <TabsTrigger value="reminders" className="gap-2">
            <Bell className="h-4 w-4" />
            Reminders
          </TabsTrigger>
          <TabsTrigger value="drug-info" className="gap-2">
            <Pill className="h-4 w-4" />
            Drug Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nearby" className="mt-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <p className="text-gray-400">Use the map above to explore nearby pharmacies. Click on a pharmacy marker for more details.</p>
          </div>
        </TabsContent>

        <TabsContent value="order" className="mt-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Available Medications</h3>
            <div className="space-y-4">
              {medications.map((med) => (
                <div key={med.id} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium">{med.name}</h4>
                    <p className="text-sm text-gray-400">
                      {med.inStock ? 'In Stock' : 'Out of Stock'} • ${med.price.toFixed(2)}
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={!med.inStock}
                    onClick={() => handleOrderMedication(med.id)}
                  >
                    Order Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reminders" className="mt-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Medication Reminders</h3>
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div 
                  key={reminder.id} 
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={reminder.taken}
                      onChange={() => handleToggleReminder(reminder.id)}
                      className="h-5 w-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <p className="font-medium">{reminder.medication}</p>
                      <p className="text-sm text-gray-400">{reminder.time}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${reminder.taken ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'}`}>
                    {reminder.taken ? 'Taken' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="drug-info" className="mt-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Drug Information</h3>
            <p className="text-gray-400">Search for drug information, side effects, and interactions.</p>
            {/* Add drug search functionality here */}
          </div>
        </TabsContent>
      </Tabs>
      
      <PharmacyChat />
    </div>
  );
}