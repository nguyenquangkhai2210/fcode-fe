import Starter from '../views/starter/starter.jsx';
// ui components
import Pending from '../views/ui-components/pending.jsx';
import Attendance from '../views/ui-components/attendance.1.jsx';
import CreateAccount from '../views/ui-components/createAccount.jsx';
import ListAccount from '../views/ui-components/listAccount.jsx';
import TakeAttendancePage from "../views/ui-components/takeAttendance.jsx";




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
    component: Pending
  },
  {
    path: `/attendance/takeAttendance/:eventId`,
    name: 'Take attendance',
    icon: 'mdi mdi-comment-processing-outline',
    component: TakeAttendancePage
  },
  {
    path: `/attendance/`,
    name: 'Attendance',
    icon: 'mdi mdi-comment-processing-outline',
    component: Attendance
  },
  {
    path: '/createAccount',
    name: 'Create account',
    icon: 'mdi mdi-arrange-send-backward',
    component: CreateAccount
  },
  {
    path: '/listAccount',
    name: 'List account',
    icon: 'mdi mdi-arrange-send-backward',
    component: ListAccount
  },
  { path: '/admin', pathTo: '/event', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
