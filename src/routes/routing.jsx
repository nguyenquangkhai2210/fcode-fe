import Starter from '../views/starter/starter.jsx';
// ui components
import Alerts from '../views/ui-components/alert.jsx';

var ThemeRoutes = [
  { 
    path: '/event', 
    name: 'Event', 
    icon: 'ti-location-pin', 
    component: Starter 
  },
  {
    path: `/pending/:eventId`,
    name: 'Alerts',
    icon: 'mdi mdi-comment-processing-outline',
    component: Alerts
  },
  { path: '/admin', pathTo: '/event', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
