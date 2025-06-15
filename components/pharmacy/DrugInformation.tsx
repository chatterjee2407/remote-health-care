'use client';

import { Search, AlertTriangle, Pill, Info, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const COMMON_DRUGS = [
  'Ibuprofen',
  'Amoxicillin',
  'Lisinopril',
  'Metformin',
  'Atorvastatin',
  'Omeprazole',
  'Metoprolol',
  'Sertraline'
];

const DRUG_INFO = {
  'Ibuprofen': {
    description: 'Nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation.',
    sideEffects: ['Nausea', 'Heartburn', 'Dizziness', 'Mild headache'],
    warnings: ['May increase risk of heart attack or stroke', 'Avoid alcohol', 'Take with food to prevent stomach upset'],
    interactions: ['Aspirin', 'Blood thinners', 'Diuretics', 'Lithium']
  },
  'Amoxicillin': {
    description: 'Antibiotic used to treat bacterial infections.',
    sideEffects: ['Diarrhea', 'Stomach pain', 'Rash', 'Nausea'],
    warnings: ['Complete the full course of treatment', 'May reduce effectiveness of birth control pills'],
    interactions: ['Probenecid', 'Blood thinners', 'Other antibiotics']
  },
  'Lisinopril': {
    description: 'ACE inhibitor used to treat high blood pressure and heart failure.',
    sideEffects: ['Dizziness', 'Headache', 'Dry cough', 'Fatigue'],
    warnings: ['May cause kidney problems', 'May increase potassium levels', 'Avoid during pregnancy'],
    interactions: ['Diuretics', 'Potassium supplements', 'NSAIDs', 'Lithium']
  },
  'Metformin': {
    description: 'Oral diabetes medicine that helps control blood sugar levels.',
    sideEffects: ['Nausea', 'Upset stomach', 'Diarrhea', 'Metallic taste'],
    warnings: ['Risk of lactic acidosis', 'Avoid excessive alcohol', 'May need to stop before surgery'],
    interactions: ['Contrast dyes', 'Topiramate', 'Carbonic anhydrase inhibitors']
  },
  'Atorvastatin': {
    description: 'Statin medication used to lower cholesterol and reduce risk of heart disease.',
    sideEffects: ['Muscle pain', 'Digestive problems', 'Liver enzyme abnormalities', 'Increased blood sugar'],
    warnings: ['Avoid grapefruit juice', 'May cause muscle problems', 'Regular liver function tests needed'],
    interactions: ['Grapefruit juice', 'Other cholesterol medications', 'Antibiotics', 'Antifungals']
  }
} as const;

type DrugName = keyof typeof DRUG_INFO;

export function DrugInformation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugName | null>(null);
  const [showInteractionWarning, setShowInteractionWarning] = useState(false);

  const filteredDrugs = COMMON_DRUGS.filter(drug =>
    drug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery && DRUG_INFO[searchQuery as DrugName]) {
      setSelectedDrug(searchQuery as DrugName);
    }
  };

  const handleDrugSelect = (drug: string) => {
    setSelectedDrug(drug as DrugName);
    setSearchQuery(drug);
  };

  const checkInteractions = () => {
    // In a real app, this would check against the user's current medications
    setShowInteractionWarning(true);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search for a medication..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {!selectedDrug ? (
        <>
          <h3 className="font-medium text-white">Commonly Searched Medications</h3>
          <div className="grid grid-cols-2 gap-3">
            {filteredDrugs.map((drug) => (
              <button
                key={drug}
                onClick={() => handleDrugSelect(drug)}
                className="p-3 bg-gray-800 rounded-lg text-left hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <Pill className="h-4 w-4 text-blue-400 mr-2" />
                  <span className="text-white">{drug}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Pill className="h-6 w-6 text-blue-400" />
              {selectedDrug}
            </h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setSelectedDrug(null);
                setSearchQuery('');
              }}
            >
              Back to Search
            </Button>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
              <p className="text-white">{DRUG_INFO[selectedDrug].description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Common Side Effects</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {DRUG_INFO[selectedDrug].sideEffects.map((effect, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-800 text-sm rounded-full text-gray-300">
                    {effect}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Warnings</h3>
              <ul className="space-y-2">
                {DRUG_INFO[selectedDrug].warnings.map((warning, i) => (
                  <li key={i} className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-400">Potential Drug Interactions</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={checkInteractions}
                  className="text-xs"
                >
                  Check My Medications
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {DRUG_INFO[selectedDrug].interactions.map((drug, i) => (
                  <span key={i} className="px-2 py-1 bg-red-900/30 text-sm rounded-full text-red-400">
                    {drug}
                  </span>
                ))}
              </div>
              {showInteractionWarning && (
                <div className="mt-3 p-3 bg-red-900/20 border border-red-800 rounded-lg text-sm text-red-300 flex items-start">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Potential Interaction Warning</p>
                    <p className="text-xs mt-1">This medication may interact with medications in your profile. Please consult your doctor.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
