import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile.vue';
import UpdateProfile from '../views/UpdateProfile.vue';
import ResetPasswordRequest from '../views/ResetPasswordRequest.vue';
import ResetPassword from '../views/ResetPassword.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import ManageUsers from '../views/ManageUsers.vue';


const routes = [
    { path: '/', name: 'login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/home', name: 'Home', component: Home },
    { path: '/userprofile', name: 'UserProfile', component: UserProfile },
    { path: '/updateprofile', name: 'UpdateProfile', component: UpdateProfile },
    { path: '/reset-password-request', name: 'ResetPasswordRequest',component: ResetPasswordRequest },
    { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
    { path: '/admin-dashboard', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' }},
    { path: '/users', name: 'ManageUSers', component: ManageUsers, meta: { requiresAuth: true, role: 'admin' }}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
