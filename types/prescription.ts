export interface Medication {
  id: string;
  name: string;
  dosage: string;
  quantity: number;
  instructions?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  createdAt: string;
  medications: Medication[];
  refillsAllowed: number;
  refillsUsed: number;
  status: 'active' | 'expired' | 'refilled';
  lastFilled?: string;
  nextRefillDate?: string;
  notes?: string;
  pharmacy?: {
    name: string;
    address: string;
    phone: string;
  };
}
