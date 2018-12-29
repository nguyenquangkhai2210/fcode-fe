import Starter from '../views/starter/starter.jsx';
// ui components
import CreateAccount from '../views/ui-components/createAccount.jsx';
import ListAccount from '../views/ui-components/listAccount.jsx';

var ThemeRoutes = [
  { 
    path: '/event', 
    name: 'Event', 
    icon: 'ti-loop', 
    component: Starter 
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
