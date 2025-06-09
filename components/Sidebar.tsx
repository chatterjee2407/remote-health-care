 

'use client';

import { sidebarLinks } from './constants';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <section className="h-screen w-64 bg-[#1C1F2E] text-white flex flex-col border-r border-gray-700">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Saviour
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {sidebarLinks.map(({ icon: Icon, route, label }) => (
            <li key={label}>
              <Link
                href={route}
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md"
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
