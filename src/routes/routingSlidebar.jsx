import Starter from '../views/starter/starter.jsx';
// ui components

var ThemeRoutes = [
  { 
    path: '/event', 
    name: 'Event', 
    icon: 'ti-loop', 
    component: Starter 
  },
  { path: '/admin', pathTo: '/event', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
