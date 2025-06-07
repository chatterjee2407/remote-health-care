"use client";

import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface DoctorSearchProps {
  onSearch: (query: string) => void;
}

const DoctorSearch = ({ onSearch }: DoctorSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <Input
        placeholder="Search doctors by name or specialty..."
        className="pl-10 bg-dark-2 border-none text-white w-full md:w-[400px] focus-visible:ring-0"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default DoctorSearch;
