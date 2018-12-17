import Starter from '../views/starter/starter.jsx';
// ui components
import Alerts from '../views/ui-components/alert.jsx';
import Attendance from '../views/ui-components/attendance.jsx';


var ThemeRoutes = [
  { 
    path: '/event', 
    name: 'Event', 
    icon: 'ti-location-pin', 
    component: Starter 
  },
  {
    path: `/pending/:eventId`,
    name: 'Pending',
    icon: 'mdi mdi-comment-processing-outline',
    component: Alerts
  },
  {
    path: `/attendance/3`,
    name: 'Attendance',
    icon: 'mdi mdi-comment-processing-outline',
    component: Attendance
  },
  { path: '/admin', pathTo: '/event', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
