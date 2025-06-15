'use client';

import { useState } from 'react';
import { Download, Share2, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Prescription } from '@/types/prescription';
import { requestRefill } from '@/lib/api';

interface PrescriptionCardProps {
  prescription: Prescription;
  onRefillRequested?: () => void;
}

export function PrescriptionCard({ prescription, onRefillRequested }: PrescriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefillRequested, setIsRefillRequested] = useState(false);
  
  const refillsRemaining = prescription.refillsAllowed - prescription.refillsUsed;
  const canRefill = refillsRemaining > 0 && prescription.status === 'active';
  
  const handleRefillRequest = async () => {
    if (!canRefill) return;
    
    setIsLoading(true);
    try {
      await requestRefill(prescription.id);
      setIsRefillRequested(true);
      toast.success('Refill request submitted successfully');
      onRefillRequested?.();
    } catch (error) {
      console.error('Error requesting refill:', error);
      toast.error('Failed to request refill. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    // In a real app, this would generate or fetch a PDF
    toast.info('Downloading prescription...');
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Prescription from ${prescription.doctorName}`,
        text: `Prescription details from ${prescription.doctorName}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <Card className="border-gray-700 bg-dark-2 text-white overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-xl font-semibold text-blue-400">
                {prescription.medications[0]?.name}
                {prescription.medications.length > 1 && ` +${prescription.medications.length - 1} more`}
              </CardTitle>
              <Badge 
                variant={prescription.status === 'active' ? 'default' : 'secondary'}
                className="ml-2"
              >
                {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-gray-400">
              Prescribed by Dr. {prescription.doctorName}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Date Prescribed</p>
              <p className="font-medium">
                {new Date(prescription.createdAt).toLocaleDateString()}
              </p>
            </div>
            {prescription.nextRefillDate && (
              <div>
                <p className="text-sm text-gray-400">Next Refill</p>
                <p className="font-medium">
                  {new Date(prescription.nextRefillDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-1">Medications</p>
            <div className="space-y-2">
              {prescription.medications.map((med, index) => (
                <div key={index} className="bg-gray-800/50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">{med.name}</span>
                    <span className="text-sm text-gray-400">{med.dosage}</span>
                  </div>
                  {med.instructions && (
                    <p className="text-sm text-gray-400 mt-1">{med.instructions}</p>
                  )}
                  <p className="text-sm text-gray-400 mt-1">Qty: {med.quantity}</p>
                </div>
              ))}
            </div>
          </div>
          
          {prescription.pharmacy && (
            <div className="mt-2">
              <p className="text-sm text-gray-400 mb-1">Pharmacy</p>
              <div className="bg-gray-800/50 p-3 rounded-md">
                <p className="font-medium">{prescription.pharmacy.name}</p>
                <p className="text-sm text-gray-400">{prescription.pharmacy.address}</p>
                <p className="text-sm text-blue-400">{prescription.pharmacy.phone}</p>
              </div>
            </div>
          )}
          
          {prescription.notes && (
            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded-r">
              <p className="text-sm text-blue-300">{prescription.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-800/30 p-3 border-t border-gray-700 justify-between">
        <div className="flex items-center">
          {prescription.status === 'active' && (
            <div className="flex items-center text-sm">
              <span className="text-gray-400 mr-2">Refills:</span>
              <span className={`font-medium ${
                refillsRemaining > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {refillsRemaining} of {prescription.refillsAllowed} remaining
              </span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-gray-600 hover:bg-gray-700"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-gray-600 hover:bg-gray-700"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          {prescription.status === 'active' && (
            <Button 
              variant={isRefillRequested ? 'secondary' : 'default'}
              size="sm" 
              disabled={!canRefill || isRefillRequested || isLoading}
              onClick={handleRefillRequest}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <RotateCcw className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : isRefillRequested ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Refill Requested
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4" />
                  Request Refill
                </>
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
