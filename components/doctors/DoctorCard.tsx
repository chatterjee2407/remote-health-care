"use client";

import Image from 'next/image';
import { Button } from '../ui/button';

interface DoctorCardProps {
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  experience: string;
  isAssigned?: boolean;
  onConnect?: () => void;
}

const DoctorCard = ({
  name,
  specialty,
  imageUrl,
  rating,
  experience,
  isAssigned,
  onConnect,
}: DoctorCardProps) => {
  return (
    <div className="bg-dark-2 rounded-lg p-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Image
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-gray-400">{specialty}</p>
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-400">
        <span>⭐ {rating.toFixed(1)}</span>
        <span>{experience} experience</span>
      </div>

      {!isAssigned && (
        <Button 
          onClick={onConnect}
          className="w-full bg-blue-1 hover:bg-blue-600"
        >
          Connect
        </Button>
      )}
      
      {isAssigned && (
        <Button 
          onClick={onConnect}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Schedule Appointment
        </Button>
      )}
    </div>
  );
};

export default DoctorCard;
