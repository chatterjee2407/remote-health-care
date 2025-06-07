import React from 'react';

interface PrescriptionItemProps {
  medicationName: string;
  doctorName: string;
  datePrescribed: string;
  dosage: string;
  instructions: string;
  pharmacy?: string; 
}

const PrescriptionItem: React.FC<PrescriptionItemProps> = ({ 
  medicationName, 
  doctorName, 
  datePrescribed, 
  dosage, 
  instructions,
  pharmacy 
}) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-dark-2 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-400">{medicationName}</h2>
        <span className="text-sm text-gray-400">{datePrescribed}</span>
      </div>
      <p className="text-sm text-gray-300">
        <span className="font-medium">Prescribed by:</span> Dr. {doctorName}
      </p>
      <p className="text-sm text-gray-300">
        <span className="font-medium">Dosage:</span> {dosage}
      </p>
      <p className="text-sm text-gray-300">
        <span className="font-medium">Instructions:</span> {instructions}
      </p>
      {pharmacy && (
        <p className="text-sm text-gray-300">
          <span className="font-medium">Pharmacy:</span> {pharmacy}
        </p>
      )}
    </div>
  );
};

const PrescriptionsPage = () => {
  const mockPrescriptions: PrescriptionItemProps[] = [
    {
      medicationName: 'Amoxicillin 250mg',
      doctorName: 'Sarah Connor',
      datePrescribed: '2024-05-20',
      dosage: '1 tablet every 8 hours for 7 days',
      instructions: 'Take with food. Complete the entire course.',
      pharmacy: 'Central Pharmacy'
    },
    {
      medicationName: 'Lisinopril 10mg',
      doctorName: 'John Kim',
      datePrescribed: '2024-04-15',
      dosage: '1 tablet daily in the morning',
      instructions: 'Monitor blood pressure regularly.',
      pharmacy: 'Downtown Health Mart'
    },
    {
      medicationName: 'Metformin 500mg',
      doctorName: 'Emily White',
      datePrescribed: '2024-03-01',
      dosage: '1 tablet twice daily with meals',
      instructions: 'Follow dietary recommendations. Check blood sugar levels as advised.',
    },
    {
      medicationName: 'Atorvastatin 20mg',
      doctorName: 'Michael Brown',
      datePrescribed: '2024-05-02',
      dosage: '1 tablet daily at bedtime',
      instructions: 'Avoid grapefruit juice. Report any muscle pain.',
      pharmacy: 'Citywide Drugs'
    },
  ];

  return (
    <section className="flex size-full flex-col gap-10 text-white p-6">
      <h1 className="text-4xl font-bold text-sky-1">Prescriptions</h1>
      {mockPrescriptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPrescriptions.map((prescription, index) => (
            <PrescriptionItem key={index} {...prescription} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg text-gray-400">No prescriptions found.</p>
        </div>
      )}
    </section>
  );
};

export default PrescriptionsPage;
