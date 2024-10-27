// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/service',
      name: 'service',
      component:  ()=> import('../views/TestApiView.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: ()=> import('../views/AccountView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = false; 
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'account' });
  } else {
    next();
  }
});

export default router;
