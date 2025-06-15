'use client';

import { Bell, Clock, CheckCircle, AlertCircle, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Reminder = {
  id: number;
  medication: string;
  time: string;
  taken: boolean;
};

type MedicationRemindersProps = {
  reminders: Reminder[];
  onToggleReminder: (reminderId: number) => void;
};

export function MedicationReminders({ reminders, onToggleReminder }: MedicationRemindersProps) {
  const upcomingReminders = reminders.filter(r => !r.taken);
  const pastReminders = reminders.filter(r => r.taken);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-900 rounded-lg">
        <h3 className="font-medium text-white mb-4 flex items-center gap-2">
          <Clock3 className="h-5 w-5 text-blue-400" />
          Today&apos;s Medication Schedule
        </h3>
        {upcomingReminders.length > 0 ? (
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-900/30 mr-3">
                    <Clock className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{reminder.medication}</p>
                    <p className="text-xs text-gray-400">{reminder.time}</p>
                  </div>
                </div>
                <Button 
                  variant="default"
                  size="sm"
                  onClick={() => onToggleReminder(reminder.id)}
                >
                  Mark as Taken
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-400">
            <p>No upcoming reminders for today.</p>
          </div>
        )}
      </div>
      
      {pastReminders.length > 0 && (
        <div className="p-4 bg-gray-900 rounded-lg">
          <h3 className="font-medium text-white mb-4">Completed Today</h3>
          <div className="space-y-3">
            {pastReminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg opacity-75"
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-900/30 mr-3">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{reminder.medication}</p>
                    <p className="text-xs text-gray-400">Taken at {reminder.time}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onToggleReminder(reminder.id)}
                >
                  Undo
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-white">Refill Reminders</h3>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-900/30">
            View All
          </Button>
        </div>
        <div className="p-3 bg-gray-800 rounded-lg text-sm text-gray-300">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p>Your next refill is scheduled for <span className="font-medium text-white">June 25, 2024</span></p>
              <p className="text-xs text-gray-400 mt-1">3 medications need refill</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
