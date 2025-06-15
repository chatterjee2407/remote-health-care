import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type Facility = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  address?: string;
  phone?: string;
  distance?: number;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = 2000; // 2km radius in meters

    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // Overpass QL query to find hospitals, clinics, and pharmacies
    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:${radius},${lat},${lng});
        node["amenity"="clinic"](around:${radius},${lat},${lng});
        node["amenity"="pharmacy"](around:${radius},${lat},${lng});
        node["healthcare"](around:${radius},${lat},${lng});
        way["amenity"="hospital"](around:${radius},${lat},${lng});
        way["amenity"="clinic"](around:${radius},${lat},${lng});
        way["amenity"="pharmacy"](around:${radius},${lat},${lng});
        way["healthcare"](around:${radius},${lat},${lng});
      );
      out center;
      >;
      out skel qt;
    `;

    const url = 'https://overpass-api.de/api/interpreter';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/overpass-query',
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Overpass API');
    }

    const data = await response.json();

    // Process the response
    const facilities: Facility[] = [];
    const seenIds = new Set();

    data.elements.forEach((element: any) => {
      // Skip if we've already processed this element
      if (seenIds.has(element.id)) return;
      seenIds.add(element.id);

      // Get coordinates (they're in different places for nodes vs ways)
      let lat, lon;
      if (element.type === 'node') {
        lat = element.lat;
        lon = element.lon;
      } else if (element.center) {
        lat = element.center.lat;
        lon = element.center.lon;
      } else {
        return; // Skip if we can't get coordinates
      }

      // Skip if no name
      if (!element.tags?.name) return;

      // Determine facility type
      let type = 'Other';
      if (element.tags.amenity === 'hospital' || element.tags.healthcare === 'hospital') {
        type = 'Hospital';
      } else if (element.tags.amenity === 'clinic' || element.tags.healthcare === 'clinic') {
        type = 'Clinic';
      } else if (element.tags.amenity === 'pharmacy') {
        type = 'Pharmacy';
      } else if (element.tags.healthcare) {
        type = element.tags.healthcare
          .split(';')[0] // Take first if multiple values
          .split('_')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }


      // Calculate distance from user (simplified haversine formula)
      const R = 6371e3; // Earth's radius in meters
      const φ1 = (parseFloat(lat) * Math.PI) / 180;
      const φ2 = (parseFloat(lat) * Math.PI) / 180;
      const Δφ = ((parseFloat(lat) - parseFloat(lat)) * Math.PI) / 180;
      const Δλ = ((parseFloat(lon) - parseFloat(lng)) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = (R * c) / 1000; // Distance in kilometers

      const facility: Facility = {
        id: element.id.toString(),
        name: element.tags.name,
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        type,
        address: element.tags['addr:full'] || element.tags['addr:street'] || '',
        phone: element.tags.phone || element.tags['contact:phone'] || '',
        distance: parseFloat(distance.toFixed(1)),
      };

      facilities.push(facility);
    });

    // Sort by distance and limit results
    const sortedFacilities = facilities
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, 50); // Limit to top 50 results

    return NextResponse.json(sortedFacilities);
  } catch (error) {
    console.error('Error fetching nearby facilities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nearby facilities' },
      { status: 500 }
    );
  }
}
