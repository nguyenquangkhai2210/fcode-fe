import Login from '../components/login/Login.jsx';
import AdminPage from '../webAdmin/webAdmin.jsx';
import UserPage from '../webUser/userPage.jsx';

import withAdminRouteComponent from "./withAdminRouteComponent";
import withUserRouteComponent from "./withUserRouteComponent";



const withAdmin = withAdminRouteComponent("/");

const withUser = withUserRouteComponent("/");


var indexRoutes = [
    { 
        path: '/login', 
        name: 'Login', 
        component: Login 
    },
    { 
        path: '/admin', 
        name: 'Admin', 
        component: withAdmin(AdminPage),
    },
    { 
        path: '/user', 
        name: 'User', 
        component: withUser(UserPage),
    },
    { path: '/', pathTo: '/login', name: 'Login', redirect: true }
];

export default indexRoutes;
