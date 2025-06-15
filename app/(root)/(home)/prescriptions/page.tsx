'use client';

import { useState, useEffect } from 'react';
import { Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { PrescriptionCard } from '@/components/prescription-card';
import { fetchPrescriptions } from '@/lib/api';
import type { Prescription } from '@/types/prescription';

export default function PrescriptionsPage() {
  const [activePrescriptions, setActivePrescriptions] = useState<Prescription[]>([]);
  const [pastPrescriptions, setPastPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    const loadPrescriptions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPrescriptions();
        
        setActivePrescriptions(data.filter(p => p.status === 'active'));
        setPastPrescriptions(data.filter(p => p.status !== 'active'));
      } catch (error) {
        console.error('Error loading prescriptions:', error);
        // Handle error (show toast, etc.)
      } finally {
        setIsLoading(false);
      }
    };

    loadPrescriptions();
  }, []);

  const handleRefillRequested = (prescriptionId: string) => {
    // Update the local state to reflect the refill request
    setActivePrescriptions(prev => 
      prev.map(p => 
        p.id === prescriptionId 
          ? { ...p, refillsUsed: p.refillsUsed + 1 }
          : p
      )
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Prescriptions</h1>
          <Button disabled>
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg bg-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">My Prescriptions</h1>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>
      
      <Tabs 
        defaultValue="active" 
        className="w-full"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid w-full grid-cols-2 max-w-xs mb-6">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activePrescriptions.length > 0 ? (
            <div className="space-y-4">
              {activePrescriptions.map((prescription) => (
                <PrescriptionCard 
                  key={prescription.id}
                  prescription={prescription}
                  onRefillRequested={() => handleRefillRequested(prescription.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-900/50 rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white">No active prescriptions</h3>
              <p className="mt-1 text-gray-400">You don&apos;t have any active prescriptions at the moment.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastPrescriptions.length > 0 ? (
            <div className="space-y-4">
              {pastPrescriptions.map((prescription) => (
                <PrescriptionCard 
                  key={prescription.id}
                  prescription={prescription}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-900/50 rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-800/30 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-white">No past prescriptions</h3>
              <p className="mt-1 text-gray-400">Your past prescriptions will appear here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
