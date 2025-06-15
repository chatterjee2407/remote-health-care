import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Dynamically import the NearbyCareMap component with SSR disabled
const NearbyCareMap = dynamic(
  () => import('@/components/NearbyCareMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

export const metadata: Metadata = {
  title: 'Nearby Care | Saviour',
  description: 'Find nearby hospitals, clinics, and pharmacies',
};

export default function NearbyCarePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Find Care Near You</h1>
          <p className="text-white">
            Locate nearby healthcare providers, hospitals, and pharmacies. Your current location is used to show the most relevant results.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <NearbyCareMap />
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Need Emergency Care?</h2>
          <p className="text-gray-700 mb-4">
            If this is a medical emergency, please call your local emergency number immediately.
          </p>
          <div className="flex flex-wrap gap-3">
            <a 
              href="tel:911" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              🚑 Call Emergency (108)
            </a>
            <a 
              href="tel:988" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              🆘 Suicide & Crisis Lifeline (22-27546669)
            </a>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Note: The information provided is for general informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
