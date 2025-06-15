import { Prescription } from '@/types/prescription';

export async function fetchPrescriptions(): Promise<Prescription[]> {
  // In a real app, this would be an actual API call
  // const response = await fetch('/api/prescriptions');
  // if (!response.ok) throw new Error('Failed to fetch prescriptions');
  // return response.json();
  
  // Mock data for demonstration
  return [
    {
      id: '1',
      patientId: 'user-123',
      doctorId: 'doc-456',
      doctorName: 'Sarah Johnson',
      createdAt: '2025-05-15T10:30:00Z',
      medications: [
        {
          id: 'med-1',
          name: 'Lisinopril',
          dosage: '10mg',
          quantity: 30,
          instructions: 'Take once daily in the morning'
        }
      ],
      refillsAllowed: 5,
      refillsUsed: 2,
      status: 'active',
      nextRefillDate: '2025-07-15T00:00:00Z',
      notes: 'Monitor blood pressure regularly',
      pharmacy: {
        name: 'City Health Pharmacy',
        address: '123 Main St, Anytown',
        phone: '(555) 123-4567'
      }
    },
    // Add more mock prescriptions as needed
  ];
}

export async function requestRefill(prescriptionId: string): Promise<void> {
  // In a real app, this would be an actual API call
  // const response = await fetch(`/api/prescriptions/${prescriptionId}/refill`, {
  //   method: 'POST',
  // });
  // if (!response.ok) throw new Error('Failed to request refill');
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
}
