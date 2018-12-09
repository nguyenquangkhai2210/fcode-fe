import Login from '../components/login/Login';
import Fulllayout from '../layouts/fulllayout.jsx';
import withAuthRouteComponent from "./withAuthRouteComponent";


const withAuth = withAuthRouteComponent("/");

var indexRoutes = [
    { 
        path: '/login', 
        name: 'Login', 
        component: Login 
    },
    { 
        path: '/admin', 
        name: 'Admin', 
        component: withAuth(Fulllayout),
        // component: Fulllayout,
    },
    { path: '/', pathTo: '/login', name: 'Login', redirect: true }
];

export default indexRoutes;
