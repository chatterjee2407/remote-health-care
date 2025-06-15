import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nearby Care | Saviour',
  description: 'Find nearby healthcare facilities including hospitals, clinics, and pharmacies.',
};

export default function NearbyCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
