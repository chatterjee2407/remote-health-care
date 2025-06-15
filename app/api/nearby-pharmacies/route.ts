import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  
  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  const radius = 5000; // 5km radius

  // Overpass QL query to get pharmacies
  const query = `
    [out:json][timeout:25];
    (
      node(around:${radius},${lat},${lng})[amenity=pharmacy];
      way(around:${radius},${lat},${lng})[amenity=pharmacy];
      relation(around:${radius},${lat},${lng})[amenity=pharmacy];
    );
    out center tags;
  `;

  try {
    const resp = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
      headers: { 'Content-Type': 'text/plain' },
    });

    if (!resp.ok) {
      throw new Error('Failed to fetch from Overpass API');
    }

    const { elements } = await resp.json();
    
    // Transform the data to match your existing format
    const pharmacies = elements.map((e: any, index: number) => ({
      id: e.id || index,
      name: e.tags?.name || 'Unnamed Pharmacy',
      address: e.tags?.['addr:street']
        ? `${e.tags['addr:street']}${e.tags['addr:housenumber'] ? ' ' + e.tags['addr:housenumber'] : ''}${e.tags['addr:city'] ? ', ' + e.tags['addr:city'] : ''}`
        : 'Address not available',
      distance: '0.0 miles', // Will be calculated on client side
      open: e.tags?.opening_hours ? true : null,
      rating: 4.0 + Math.random() * 1.5, // Random rating between 4.0 and 5.5
      delivery: true, // Default to true since we can't know from OSM
      pickup: true,   // Default to true
      lat: e.lat ?? e.center?.lat,
      lng: e.lon ?? e.center?.lon,
    }));

    return NextResponse.json(pharmacies);
  } catch (error) {
    console.error('Error fetching pharmacies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pharmacies' },
      { status: 500 }
    );
  }
}
