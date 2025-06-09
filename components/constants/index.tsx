// Import Lucide icons
// import {
//   Home,
//   CalendarClock,
//   Stethoscope,
//   FileText,
//   Video,
//   Pill,
//   CreditCard,
//   HelpCircle,
//   Settings,
//   PlusCircle
// } from 'lucide-react';

// export const sidebarLinks = [
//   {
//     icon: <Home size={20} />,
//     route: '/',
//     label: 'Dashboard',
//   },
//   {
//     icon: <CalendarClock size={20} />,
//     route: '/upcoming',
//     label: 'Appointments',
//   },
//   {
//     icon: <Stethoscope size={20} />,
//     route: '/previous',
//     label: 'My Doctors',
//   },
//   {
//     icon: <FileText size={20} />,
//     route: '/recordings',
//     label: 'Medical Records',
//   },
//   {
//     icon: <Video size={20} />,
//     route: '/joinconsultation',
//     label: 'Join Consultation',
//   },
//   {
//     icon: <Pill size={20} />,
//     route: '/prescriptions',
//     label: 'Prescriptions',
//   },
//   {
//     icon: <CreditCard size={20} />,
//     route: '/billing',
//     label: 'Billing',
//   },
//   {
//     icon: <HelpCircle size={20} />,
//     route: '/support',
//     label: 'Help & Support',
//   },
//   {
//     icon: <Settings size={20} />,
//     route: '/settings',
//     label: 'Settings',
//   },
//   {
//     icon: <PlusCircle size={20} />,
//     route: '/personal-room',
//     label: 'Personal Room',
//   },
// ];

import {
  Home,
  CalendarClock,
  Stethoscope,
  FileText,
  Video,
  Pill,
  CreditCard,
  HelpCircle,
  Settings,
  PlusCircle
} from 'lucide-react';

export const sidebarLinks = [
  {
    icon: Home,
    route: '/',
    label: 'Dashboard',
  },
  {
    icon: CalendarClock,
    route: '/appointments',
    label: 'Appointments',
  },
  {
    icon: Stethoscope,
    route: '/mydoctors',
    label: 'My Doctors',
  },
  {
    icon: FileText,
    route: '/medicalrecords',
    label: 'Medical Records',
  },

  {
    icon: Pill,
    route: '/prescriptions',
    label: 'Prescriptions',
  },
  {
    icon: CreditCard,
    route: '/billing',
    label: 'Billing',
  },
  {
    icon: HelpCircle,
    route: '/support',
    label: 'Help & Support',
  },
  {
    icon: Settings,
    route: '/settings',
    label: 'Settings',
  },
];


export const avatarImages = [
  '/public/images/avatar-1.jpeg',
  '/public/images/avatar-2.jpeg',
  '/public/images/avatar-3.png',
  '/public/images/avatar-4.png',
  '/public/images/avatar-5.png',
];
