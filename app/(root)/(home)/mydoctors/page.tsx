"use client";

import { useState } from 'react';
import DoctorCard from '@/components/doctors/DoctorCard';
import DoctorSearch from '@/components/doctors/DoctorSearch';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - replace with actual API calls in production
const mockAssignedDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    imageUrl: "/doctors/doctor-1.jpg",
    rating: 4.8,
    experience: "15 years"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    imageUrl: "/doctors/doctor-2.jpg",
    rating: 4.9,
    experience: "12 years"
  }
];

const mockAvailableDoctors = [
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Dermatologist",
    imageUrl: "/doctors/doctor-3.jpg",
    rating: 4.7,
    experience: "8 years"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    imageUrl: "/doctors/doctor-4.jpg",
    rating: 4.9,
    experience: "20 years"
  },
  {
    id: 5,
    name: "Dr. Lisa Martinez",
    specialty: "Pediatrician",
    imageUrl: "/doctors/doctor-5.jpg",
    rating: 4.8,
    experience: "10 years"
  }
];

const MyDoctorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleConnect = (doctorId: number) => {
    toast({
      title: "Connection Request Sent",
      description: "The doctor will review your request shortly.",
    });
  };

  const handleSchedule = (doctorId: number) => {
    // Implement scheduling logic
    toast({
      title: "Schedule Appointment",
      description: "Redirecting to appointment scheduling...",
    });
  };

  const filterDoctors = (doctors: any[]) => {
    return doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="flex flex-col gap-8 p-6 text-white">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">My Doctors</h1>
        <DoctorSearch onSearch={setSearchQuery} />
      </div>

      <Tabs defaultValue="assigned" className="w-full">
        <TabsList className="bg-dark-2">
          <TabsTrigger value="assigned">Assigned Doctors</TabsTrigger>
          <TabsTrigger value="available">Available Doctors</TabsTrigger>
        </TabsList>

        <TabsContent value="assigned" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterDoctors(mockAssignedDoctors).map((doctor) => (
              <DoctorCard
                key={doctor.id}
                {...doctor}
                isAssigned={true}
                onConnect={() => handleSchedule(doctor.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterDoctors(mockAvailableDoctors).map((doctor) => (
              <DoctorCard
                key={doctor.id}
                {...doctor}
                isAssigned={false}
                onConnect={() => handleConnect(doctor.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyDoctorsPage;
