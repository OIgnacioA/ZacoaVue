import { createRouter, createWebHistory } from 'vue-router';
import ZacoaView from '../views/ZacoaView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/zacoa',
    name: 'Zacoa',
    component: ZacoaView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
